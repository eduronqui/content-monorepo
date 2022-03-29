import fp from 'fastify-plugin'
import { onRequest } from './onRequest'
import { onSend } from './onSend'

export function bootstrapHooks() {
  return fp(async (fastify) => {
    fastify.addHook('onRequest', onRequest)
    fastify.addHook('onSend', onSend)
  })
}
