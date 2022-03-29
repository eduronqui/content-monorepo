import { FastifyReply, FastifyRequest } from 'fastify'

const CORRELATION_ID = 'correlation-id'

export async function onSend(request: FastifyRequest, reply: FastifyReply) {
  reply.header(CORRELATION_ID, request.headers[CORRELATION_ID])
}
