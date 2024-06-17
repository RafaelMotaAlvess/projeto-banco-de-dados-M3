import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetch } from "./fetch-controller";
import { fetchAll } from "./fetchall-controller";
import { remove } from "./delete-controller";
import { fetchStatus } from "./fetch-status-controller";
import { update } from "./update-status-controller";

export async function pedidosRoutes(app: FastifyInstance) {
  app.get('/pedido/:id', fetch)
  app.get('/pedidos', fetchAll)
  app.post('/pedido', create)
  app.get('/pedido/status/:id', fetchStatus)
  app.put('/pedido/status/:id', update)
  app.delete('/pedido/:id', remove)
}
