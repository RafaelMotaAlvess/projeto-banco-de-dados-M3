import { FastifyReply, FastifyRequest } from "fastify";
import { Pedido, Status, database } from "../../database";
import { findById, findStatusById } from "./helpers";
import { z } from "zod";
import console from "console";

type FetchRequest = FastifyRequest<{ Params: { id: string } }>

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as FetchRequest

  const createBodySchema = z.object({
    descricao: z.string().optional(),
    observacoes: z.string().optional(),
  })

  let status = createBodySchema.parse(request.body) as Status
  try {
    const pedido = await findById(id)

    if (!pedido) {
      return reply.status(404).send({ message: "Pedido não encontrado" })
    }

    const statusExists = await findStatusById(id)

    if (!statusExists) {
      return reply.status(404).send({ message: "Status não encontrado" })
    }

    status.data_atualizacao = new Date()

    status = { ...statusExists, ...status }

    console.log(status)
    const result = await database.promise().query(
      `UPDATE Status SET ? WHERE id_pedido = ?`, [status, id]
    )

    console.log(result)

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(204).send({ message: 'Status atualizado com sucesso' })
}
