import fp from 'fastify-plugin'
import { randomUUID } from 'crypto'

const CORRELATION_ID = 'x-correlation-id'

export function generateRequestId() {
  return randomUUID()
}

export function correlationIdPlugin() {
  return fp(async (fastify) => {
    fastify.addHook('onRequest', async function (request) {
      if (!request.headers[CORRELATION_ID]) {
        request.headers[CORRELATION_ID] = request.id
      }
    })

    fastify.addHook('onSend', async function (request, reply) {
      reply.header(CORRELATION_ID, request.headers[CORRELATION_ID])
    })
  })
}
