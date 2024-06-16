import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetchAll } from "./fetchall-controller";
import { fetch } from "./fetch-controller";

export async function clientesRoutes(app: FastifyInstance) {
  app.post('/clientes', create)
  app.get('/clientes', fetchAll)
  app.get('/clientes/:id', fetch)
}
