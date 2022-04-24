import Fastify from 'fastify'
import { bootstrapPlugins } from './plugins'
import { bootstrapHooks } from './hooks'
import { bootstrapHandlers } from './handlers'
import { KafkaClient } from './clients'
import config from 'config'
import { generateRequestId, correlationIdPlugin } from '@cts/correlation-id'

export async function bootstrap() {
  const server = Fastify({
    logger: true,
    genReqId: generateRequestId
  })

  server.register(correlationIdPlugin())
  server.register(bootstrapPlugins())
  server.register(bootstrapHooks())
  server.register(bootstrapHandlers())

  const kafkaConfig = config.get<{ clientId: string; brokers: string[] }>('kafka')
  const kafka = KafkaClient(kafkaConfig)
  const kafkaProducer = kafka.producer({
    retry: {
      initialRetryTime: 1000,
      retries: 5
    }
  })

  server.addHook('onReady', async () => {
    await kafkaProducer.connect()
  })

  server.addHook('onClose', async () => {
    await kafkaProducer.disconnect()
  })

  server.get('/', async (request, reply) => {
    try {
      const response = await kafkaProducer.send({
        topic: 'hello-world-topic',
        messages: [
          {
            key: 'hello-world-message',
            headers: {
              'correlation-id': request.headers['correlation-id']?.toString()
            },
            value: JSON.stringify({ hello: 'world' })
          }
        ]
      })
      request.log.info({ response }, 'Message sent')
    } catch (error) {
      request.log.error({ error }, 'Failed to post kafka message')

      reply.type('application/json').code(500)
      return (error as Error).message
    }

    reply.type('application/json').code(202)
    return 'Accepted'
  })

  await server.listen(3000)

  return server.ready()
}
