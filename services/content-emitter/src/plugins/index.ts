import fp from 'fastify-plugin'

type GetHealthcheck = () => Promise<
  {
    service: string
    healthy: boolean
  }[]
>

export function bootstrapPlugins(getHealthcheck: GetHealthcheck = () => Promise.resolve([])) {
  return fp(async (fastify) => {
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

    fastify.get('/ping', async (_request, reply) => {
      reply.type('text').code(200)

      return 'PONG'
    })

    fastify.get('/healthcheck', async (_request, reply) => {
      reply.type('application/json').code(200)

      const healthcheck = await getHealthcheck()

      return {
        service: 'content-emitter',
        status: 'healthy',
        dependencies: healthcheck
      }
    })
  })
}
