import { FastifyReply, FastifyRequest } from "fastify";
import { EnderecoFornecedor, database } from "../../database/";


export async function fetchAllEnderecos(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchEnderecos = await database.promise().query(
      `SELECT * FROM EnderecoFornecedor`,
    )

    const enderecos = fetchEnderecos[0] as EnderecoFornecedor[]

    return reply.status(200).send(enderecos)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}