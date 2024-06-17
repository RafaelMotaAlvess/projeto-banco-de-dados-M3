import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetch } from "./fetch-controller";

export async function pedidosRoutes(app: FastifyInstance) {
  app.get('/pedidos/:id', fetch)
  app.post('/pedido', create)
}
