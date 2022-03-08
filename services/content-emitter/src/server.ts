import { randomUUID } from 'crypto';
import Fastify from 'fastify'
import { bootstrapPlugins } from './plugins'
import { bootstrapHooks } from './hooks'

export async function bootstrap() {
  const server = Fastify({
    logger: true,
    genReqId: () => randomUUID({ disableEntropyCache: false })
  })

  server.register(bootstrapPlugins())
  server.register(bootstrapHooks())

  server.get('/', async (request, reply) => {
    reply.type('application/json').code(200)

    return { hello: 'world' }
  })

  server.listen(3000)

  return server.ready()
}
