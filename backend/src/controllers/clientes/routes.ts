import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetchAll } from "./fetchall-controller";
import { fetch } from "./fetch-controller";
import { remove } from "./delete-controller";

export async function clientesRoutes(app: FastifyInstance) {
  app.get('/clientes', fetchAll)
  app.get('/clientes/:id', fetch)
  app.post('/clientes', create)
  app.delete('/clientes/:id', remove)
}
