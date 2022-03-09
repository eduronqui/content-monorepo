import { FastifyReply, FastifyRequest } from 'fastify'
import config from 'config'

const CORRELATION_ID = 'correlation-id'

export async function onRequest(request: FastifyRequest, reply: FastifyReply) {
  if (!request.headers[CORRELATION_ID]) {
    request.headers[CORRELATION_ID] = request.id
  }

  request.config = config
}
