import { bootstrap } from './server'

bootstrap().catch(error => {
  console.error('Failed to start server: ', { error })
})
