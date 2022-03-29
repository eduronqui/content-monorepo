import { genReqId, correlationIdPlugin } from './correlationId'
import fastify, { FastifyInstance } from 'fastify'

describe('correlationId', () => {
  describe('genReqId', () => {
    it('should generate a uuid', () => {
      const reqId = genReqId()

      expect(reqId).not.toBeNull()
      expect(reqId).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi)
    })
  })

  describe('plugins', () => {
    let server: FastifyInstance

    beforeEach(() => {
      server = fastify({
        genReqId
      })
      server.register(correlationIdPlugin())
      server.get('/', async () => {
        return 'OK'
      })
    })

    it('should add x-correlation-id if not present', async () => {
      const { headers } = await server.inject({ method: 'GET', path: '/' })

      expect(headers['x-correlation-id']).not.toBeNull()
      expect(headers['x-correlation-id']).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi)
    })

    it('should reuse x-correlation-id if present', async () => {
      const { headers } = await server.inject({
        method: 'GET',
        path: '/',
        headers: {
          'x-correlation-id': '12345'
        }
      })

      expect(headers['x-correlation-id']).not.toBeNull()
      expect(headers['x-correlation-id']).toEqual('12345')
    })
  })
})
