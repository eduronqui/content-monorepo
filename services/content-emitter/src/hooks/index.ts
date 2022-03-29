import fp from 'fastify-plugin'
import { onRequest } from './onRequest'

export function bootstrapHooks() {
  return fp(async (fastify) => {
    fastify.addHook('onRequest', onRequest)
  })
}
