import { FastifyReply, FastifyRequest } from "fastify";
import { database } from "../../database";
import { findById } from "./helpers";

type ParamsRequest = FastifyRequest<{ Params: { id: string } }>

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as ParamsRequest

  try {
    const fornecedor = await findById(id)

    if (!fornecedor) {
      return reply.status(404).send({ message: "Fornecedor não encontrado" })
    }

    await database.promise().query(
      `DELETE FROM Fornecedor WHERE id = ?`,
      [id]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(204).send({ message: 'Fornecedor removido com sucesso' })
}