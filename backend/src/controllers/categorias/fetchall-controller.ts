import { FastifyReply, FastifyRequest } from "fastify";
import { Categoria, database } from "../../database/";

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchCategorias = await database.promise().query(
      `SELECT * FROM Categoria`,
    )

    const categorias = fetchCategorias[0] as Categoria[]

    return reply.status(200).send(categorias)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}