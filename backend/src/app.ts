import fastify from 'fastify'
import { clientesRoutes } from './controllers/clientes/routes'
import { fornecedoresRoutes } from './controllers/fornecedores/routes'

export const app = fastify()

app.register(clientesRoutes)
app.register(fornecedoresRoutes)