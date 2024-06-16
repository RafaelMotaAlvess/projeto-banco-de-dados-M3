import { FastifyReply, FastifyRequest } from "fastify";
import { Categoria, database } from "../../database";
import { findByEmail, findById, nameExists } from "./helpers";
import { z } from "zod";

type FetchRequest = FastifyRequest<{ Params: { id: string } }>

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as FetchRequest

  const createBodySchema = z.object({
    nome: z.string().optional(),
  })

  let categoria = createBodySchema.parse(request.body) as Categoria

  try {
    const categoriaExist = await findById(id)

    if (!categoriaExist) {
      return reply.status(404).send({ message: "Categoria não encontrada" })
    }

    const categoriaWithSameName = await nameExists(categoria.nome)

    if (categoriaWithSameName) {
      return reply.status(409).send({ message: "Categoria já cadastrada" })
    }

    categoria = { ...categoriaExist, ...categoria }

    await database.promise().query(
      `UPDATE Categoria SET ? WHERE id = ?`, [categoria, id]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(204).send({ message: 'Categoria atualizada com sucesso' })
}