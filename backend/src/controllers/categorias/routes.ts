import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetchAll } from "./fetchall-controller";
import { fetch } from "./fetch-controller";

export async function clientesRoutes(app: FastifyInstance) {
  app.get('/clientes', fetchAll)
  app.post('/clientes', create)

  app.get('/clientes/:id', fetch)
}
