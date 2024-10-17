import 'dotenv/config'
import 'reflect-metadata'
import 'tsconfig-paths/register'

import { AddressInfo } from 'net'
import httpServer from './infra/http/HTTPServer'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import HTTPGateway from './infra/http/HTTPGateway'
import ApplicationContext from './infra/ApplicationContext'
import { container } from 'tsyringe'
import IDatabase from './domain/database/IDatabase'
import { ServiceProviderIds } from './domain/ServiceProvideIds'
import { swaggerDoc } from './infra/http/swagger'
import { swaggerUI} from '@hono/swagger-ui'
import { Context } from 'hono'

const { NODE_ENV, PORT } = process.env

ApplicationContext.initialize()

const database:IDatabase = container.resolve(ServiceProviderIds.Database)
const gateway: HTTPGateway = container.resolve(HTTPGateway)

gateway.bindRoutes(httpServer)

if (NODE_ENV !== 'production') {
  httpServer.get('/swagger', swaggerUI({ url:'/docs' }))
  httpServer.use('/docs', async (ctx: Context) => {
    return ctx.json(swaggerDoc)
  })

  httpServer.get(
    '/tdd-reports/*',
    serveStatic({
      root: './tdd-reports',
      rewriteRequestPath: (path) => {
        return path.replace(/^\/tdd-reports\//, './')
      }
    })
  )

  httpServer.get('/tdd-reports/', (ctx:Context) => {
    return ctx.html(`
      <a href="./jest-stare/">-> Jest Stare</a>
      <hr>
      <a href="./coverage/lcov-report/">-> Coverage</a>
    `)
  })
}

serve({
    fetch: httpServer.fetch,
    port: Number(PORT),
  },
  async (info: AddressInfo) => {
    console.log(`Server at: http://${info.address}:${info.port}`)
    await database.startConnection()
  }
)
