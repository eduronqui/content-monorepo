import { IConfig } from 'config'

// Augmenting fastify types
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
// declare module 'fastify' {
//   type FastifyInstance = FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>

//   interface FastifyRequest<RouteGeneric, RawServer, RawRequest> {
//     config: IConfig
//   }
// }
