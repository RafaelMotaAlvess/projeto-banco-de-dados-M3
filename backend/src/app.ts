import fastify from 'fastify'
import { clientesRoutes } from './controllers/clientes/routes'
import { fornecedoresRoutes } from './controllers/fornecedores/routes'
import { categoriasRoutes } from './controllers/categorias/routes'
import { produtosRoutes } from './controllers/produtos/routes'
import { pedidosRoutes } from './controllers/pedidos/routes'

export const app = fastify()

app.register(clientesRoutes)
app.register(fornecedoresRoutes)
app.register(categoriasRoutes)
app.register(pedidosRoutes)
app.register(produtosRoutes)