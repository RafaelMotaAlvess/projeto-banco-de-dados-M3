import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetchAll } from "./fetchall-controller";
import { fetch } from "./fetch-controller";
import { remove } from "./delete-controller";
import { update } from "./update-controller";

export async function clientesRoutes(app: FastifyInstance) {
  app.get('/clientes', fetchAll)
  app.post('/clientes', create)

  app.get('/clientes/:id', fetch)
  app.put('/clientes/:id', update)
  app.delete('/clientes/:id', remove)
}
