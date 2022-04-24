import { generateRequestId, correlationIdPlugin } from './correlationId'
import fastify, { FastifyInstance } from 'fastify'

describe('correlationId', () => {
  describe('generateRequestId', () => {
    it('should generate a uuid', () => {
      const reqId = generateRequestId()

      expect(reqId).not.toBeNull()
      expect(reqId).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi)
    })
  })

  describe('plugins', () => {
    let server: FastifyInstance

    beforeEach(() => {
      server = fastify({
        genReqId: generateRequestId
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

    it('should have x-correlation-id available on request handler', (done) => {
      server.get('/test', async ({ headers }, reply) => {
        expect(headers['x-correlation-id']).not.toBeNull()
        expect(headers['x-correlation-id']).toEqual('1234')
        reply.send()
      })

      server
        .inject({
          method: 'GET',
          path: '/',
          headers: {
            'x-correlation-id': '12345'
          }
        })
        .then(() => {
          done()
        })
    })
  })
})
