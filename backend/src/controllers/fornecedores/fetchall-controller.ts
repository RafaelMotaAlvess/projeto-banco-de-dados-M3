import { FastifyReply, FastifyRequest } from "fastify";
import { Fornecedor, database } from "../../database/";


export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchFornecedores = await database.promise().query(
      `SELECT * FROM Fornecedor`,
    )

    const fornecedores = fetchFornecedores[0] as Fornecedor[]

    return reply.status(200).send(fornecedores)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}