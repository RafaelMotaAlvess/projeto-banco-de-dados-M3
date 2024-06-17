import { FastifyReply, FastifyRequest } from "fastify";
import { Fornecedor, database } from "../../database";
import { findById, nameExists } from "./helpers";
import { z } from "zod";

type FetchRequest = FastifyRequest<{ Params: { id: string } }>

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as FetchRequest

  const createBodySchema = z.object({
    nome: z.string(),
  })


  try {
    let fornecedor = createBodySchema.parse(request.body) as Fornecedor
    const fornecedorExist = await findById(id)

    if (!fornecedorExist) {
      return reply.status(404).send({ message: "Fornecedor não encontrado" })
    }

    fornecedor = { ...fornecedorExist, ...fornecedor }

    await database.promise().query(
      `UPDATE Fornecedor SET ? WHERE id = ?`, [fornecedor, id]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(204).send({ message: 'Fornecedor atualizado com sucesso' })
}