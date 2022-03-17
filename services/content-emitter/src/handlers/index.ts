import fp from 'fastify-plugin'
import { publish } from './content/publish'

export function bootstrapHandlers() {
  return fp(async (server) => {
    publish(server)
  })
}
