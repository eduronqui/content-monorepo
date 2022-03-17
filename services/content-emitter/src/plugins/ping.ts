import { FastifyInstance } from "fastify"

export async function ping(fastify: FastifyInstance) {
  fastify.get('/ping', async (_request, reply) => {
    reply.type('text').code(200)

    return 'PONG'
  })
}
