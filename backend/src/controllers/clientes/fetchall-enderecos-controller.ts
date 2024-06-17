import { FastifyReply, FastifyRequest } from "fastify";
import { EnderecoCliente, database } from "../../database/";


export async function fetchAllEnderecos(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchEnderecos = await database.promise().query(
      `SELECT * FROM EnderecoCliente`,
    )

    const enderecos = fetchEnderecos[0] as EnderecoCliente[]

    return reply.status(200).send(enderecos)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}