import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { KafkaClient } from '../../clients'
import config from 'config'
import { stringify } from 'querystring'

const bodySchema = Type.Object(
  {
    contentId: Type.String(),
    contentType: Type.Union([Type.Literal('MOVIE'), Type.Literal('movie')])
  },
  { additionalProperties: false }
)

type BodyType = Static<typeof bodySchema>

export function publish(server: FastifyInstance) {
  server.post<{
    Body: BodyType
  }>('/publish', { schema: { body: bodySchema } }, async (request, reply) => {
    reply.type('application/json').code(202)

    const { contentId, contentType } = request.body

    const kafkaConfig = config.get<{ clientId: string, topic: string; brokers: string[] }>('kafka')

    const producer = KafkaClient(kafkaConfig).producer()
    await producer.connect()
    await producer.send({
      topic: kafkaConfig.topic,
      messages: [
        {
          key: 'content:index',
          value: JSON.stringify({ contentId, contentType })
        }
      ]
    })

    await producer.disconnect()

    return { status: 'ok' }
  })
}
