import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { fetchAll } from "./fetchall-controller";
import { fetch } from "./fetch-controller";
import { fetchAllContatos } from "./fetchall-contatos-controller";
import { fetchContato } from "./fetch-contato-controller";
import { fetchAllEnderecos } from "./fetchall-enderecos-controller";
import { fetchEndereco } from "./fetch-endereco-controller";

export async function fornecedoresRoutes(app: FastifyInstance) {
  app.post('/fornecedores', create)
  app.get('/fornecedores', fetchAll)
  app.get('/fornecedores/:id', fetch)
  app.get('/fornecedores/contatos', fetchAllContatos)
  app.get('/fornecedores/contato/:id', fetchContato)
  app.get('/fornecedores/enderecos', fetchAllEnderecos)
  app.get('/fornecedores/endereco/:id', fetchEndereco)
  app.put('/fornecedores/:id', update)
}
