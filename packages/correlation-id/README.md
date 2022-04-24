# `@cts/correlation-id`

Adds a request identifier header to help improving request traceability.

It will add a `x-correlation-id` header and will do one two things:

* If the incoming request already provides this header it will be reused and returned back as response.
* If no `x-correlation-id` header is provided it will create a new _UUID_ and add it as a header to the incoming request object and consequently to the response.

## Usage with fastify

```javascript
import fastify from 'fastify'
import {
  generateRequestId, // wraps uuid creation, can be replaced by randomUUID() from node:crypto
  correlationIdPlugin // handles adding the correlation id header to the response and reply objects
} from './correlationId'

const server = fastify({
  genReqId: generateRequestId
})

server.register(correlationIdPlugin())
server.get('/', (request, reply) => {
  request.headers['x-correlation-id'] // will be available
})
```
