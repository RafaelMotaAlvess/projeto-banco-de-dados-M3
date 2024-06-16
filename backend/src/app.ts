import fastify from 'fastify'
import { clientesRoutes } from './controllers/clientes/routes'

export const app = fastify()

app.register(clientesRoutes)