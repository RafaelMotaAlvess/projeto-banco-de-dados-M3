import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetchAll } from "./fetchall-controller";
import { fetch } from "./fetch-controller";
import { remove } from "./delete-controller";
import { update } from "./update-controller";
import { fetchAllEnderecos } from "./fetchall-enderecos-controller";
import { fetchEndereco } from "./fetch-endereco-controller";
import { fetchContato } from "./fetch-contatos-controller";
import { fetchAllContatos } from "./fetchall-contatos-controller";

export async function clientesRoutes(app: FastifyInstance) {
  app.get('/clientes', fetchAll)
  app.get('/clientes/enderecos', fetchAllEnderecos)
  app.get('/clientes/contatos', fetchAllContatos)


  app.post('/clientes', create)

  app.get('/clientes/:id', fetch)
  app.get('/clientes/contato/:id', fetchContato)
  app.get('/clientes/endereco/:id', fetchEndereco)
  app.put('/clientes/:id', update)
  app.delete('/clientes/:id', remove)
}
