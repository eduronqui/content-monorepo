import { FastifyInstance } from "fastify"

export async function shutdown(fastify: FastifyInstance) {
  fastify.get('/shutdown', async (request, reply) => {
    request.log.info('Shutdown requested')

    reply.type('text').status(202)

    fastify.close().then(
      () => {
        request.log.info('Shutdown completed')
      },
      (err) => {
        request.log.error('Shutdown failed', err)
      }
    )

    return 'shutting down'
  })
}
