import fastify from 'fastify'
import cors from '@fastify/cors'
import { clientesRoutes } from './controllers/clientes/routes'

export const app = fastify()

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
})

app.register(clientesRoutes)