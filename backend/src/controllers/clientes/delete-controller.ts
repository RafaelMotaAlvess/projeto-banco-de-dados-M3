import { FastifyReply, FastifyRequest } from "fastify";
import { database } from "../../database";
import { findById } from "./helpers";

type FetchRequest = FastifyRequest<{ Params: { id: string } }>

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as FetchRequest

  try {
    const cliente = await findById(id)

    if (!cliente) {
      return reply.status(404).send({ message: "Cliente não encontrado" })
    }

    await database.promise().query(
      `DELETE FROM Cliente WHERE id = ?`,
      [id]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(204).send({ message: 'Cliente removido com sucesso' })
}