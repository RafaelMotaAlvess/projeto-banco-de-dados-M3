import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetchAll } from "./fetchall-controller";
import { fetch } from "./fetch-controller";
import { update } from "./update-controller";
import { remove } from "./delete-controller";

export async function produtosRoutes(app: FastifyInstance) {
  app.post('/produtos', create)
  app.get('/produtos', fetchAll)
  app.get('/produtos/:id', fetch)
  app.put('/produtos/:id', update)
  app.delete('/produtos/:id', remove)
}