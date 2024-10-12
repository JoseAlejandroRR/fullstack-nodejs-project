import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { authMiddleware } from './middlewares/AuthMiddleware'

const { AUTH_LAYER_ACTIVE } =  process.env

const httpServer = new Hono()

// Middleware for CORS
httpServer.use('*', cors({ origin: '*' }))

httpServer.use(logger())

// Auth Middleware
if (AUTH_LAYER_ACTIVE === 'true') {
  console.info('AUTH_LAYER its working.')
  httpServer.use('/api/*', authMiddleware);
} else {
  console.info('AUTH_LAYER its disabled.')
}

// Healtcheck
httpServer.get('/health', (c) => {
  return c.json({ currentTime: new Date() })
});

httpServer.get('/', (c) => {
    return c.text('It`s working!')
});

export default httpServer
