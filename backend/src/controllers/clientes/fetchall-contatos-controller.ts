import { FastifyReply, FastifyRequest } from "fastify";
import { ContatoFornecedor, database } from "../../database/";


export async function fetchAllContatos(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchContatos = await database.promise().query(
      `SELECT * FROM ContatoCliente`,
    )

    const contatos = fetchContatos[0] as ContatoFornecedor[]

    return reply.status(200).send(contatos)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}