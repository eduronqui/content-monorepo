import fp from 'fastify-plugin'
import { GetHealthcheck, healthcheck } from './healthcheck'
import { ping } from './ping'
import { shutdown } from './shutdown'

export function bootstrapPlugins(getHealthcheck?: GetHealthcheck) {
  return fp(async (fastify) => {
    shutdown(fastify)
    ping(fastify)
    healthcheck(fastify, getHealthcheck)
  })
}
