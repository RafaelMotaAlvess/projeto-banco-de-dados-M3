import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetchAll } from "./fetchall-controller";

export async function clientesRoutes(app: FastifyInstance) {
  app.post('/clientes', create)
  app.get('/clientes', fetchAll)
}