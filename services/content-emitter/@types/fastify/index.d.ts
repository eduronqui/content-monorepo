import { IConfig } from 'config'

// Augmenting fastify types
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare module 'fastify' {
  interface FastifyRequest<RouteGeneric, RawServer, RawRequest> {
    config: IConfig
  }
}
