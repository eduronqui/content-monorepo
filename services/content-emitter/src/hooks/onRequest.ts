import { FastifyReply, FastifyRequest } from 'fastify'
import config from 'config'

export async function onRequest(request: FastifyRequest, reply: FastifyReply) {
  (request as any).config = config
}
