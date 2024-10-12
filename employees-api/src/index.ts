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

ApplicationContext.initialize()

const database:IDatabase = container.resolve(ServiceProviderIds.Database)
const gateway: HTTPGateway = container.resolve(HTTPGateway)

gateway.bindRoutes(httpServer)

serve({
    fetch: httpServer.fetch,
    port: 8787,
  },
  async (info: AddressInfo) => {
    console.log(`Server at: http://${info.address}:${info.port}`)
    await database.startConnection()
  }
)
