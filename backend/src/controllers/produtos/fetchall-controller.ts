import { FastifyReply, FastifyRequest } from "fastify";
import { Produto, database } from "../../database";

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchProdutos = await database.promise().query(
      `SELECT * FROM Produto`,
    )

    const produtos = fetchProdutos[0] as Produto[]

    return reply.status(200).send(produtos)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}