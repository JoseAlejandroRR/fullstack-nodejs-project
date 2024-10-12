import 'dotenv/config'
import 'reflect-metadata'
import 'tsconfig-paths/register'

import { AddressInfo } from 'net'
import httpServer from './infra/http/HTTPServer'
import { serve } from '@hono/node-server'
import HTTPGateway from './infra/http/HTTPGateway'
import ApplicationContext from './infra/ApplicationContext'
import { container } from 'tsyringe'
import IDatabase from './domain/database/IDatabase'
import { ServiceProviderIds } from './domain/ServiceProvideIds'
import { swaggerDoc } from './infra/http/swagger';
import { swaggerUI} from '@hono/swagger-ui'
import { Context } from 'hono'

const { NODE_ENV } = process.env

ApplicationContext.initialize()

const database:IDatabase = container.resolve(ServiceProviderIds.Database)
const gateway: HTTPGateway = container.resolve(HTTPGateway)

gateway.bindRoutes(httpServer)

if (NODE_ENV !== 'production') {
  httpServer.get('/swagger', swaggerUI({ url:'/docs' }))
  httpServer.use('/docs', async (ctx: Context) => {
    return ctx.json(swaggerDoc)
  })
}

serve({
    fetch: httpServer.fetch,
    port: 8787,
  },
  async (info: AddressInfo) => {
    console.log(`Server at: http://${info.address}:${info.port}`)
    await database.startConnection()
  }
)
