import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetchAll } from "./fetchall-controller";
import { fetch } from "./fetch-controller";

export async function categoriasRoutes(app: FastifyInstance) {
  app.get('/categorias', fetchAll)
  app.post('/categorias', create)

  app.get('/categorias/:id', fetch)
}
