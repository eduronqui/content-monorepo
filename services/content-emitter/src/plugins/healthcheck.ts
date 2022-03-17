import { FastifyInstance } from "fastify"

export type GetHealthcheck = () => Promise<
  {
    service: string
    healthy: boolean
  }[]
>

export async function healthcheck(fastify: FastifyInstance, getHealthcheck: GetHealthcheck = () => Promise.resolve([])) {
  fastify.get('/healthcheck', async (_request, reply) => {
    reply.type('application/json').code(200)

    const healthcheck = await getHealthcheck()

    return {
      service: 'content-emitter',
      status: 'healthy',
      dependencies: healthcheck
    }
  })
}
