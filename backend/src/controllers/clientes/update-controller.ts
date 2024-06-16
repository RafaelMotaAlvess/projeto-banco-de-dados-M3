import { FastifyReply, FastifyRequest } from "fastify";
import { Cliente, database } from "../../database";
import { findByEmail, findById } from "./helpers";
import { z } from "zod";

type FetchRequest = FastifyRequest<{ Params: { id: string } }>

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as FetchRequest

  const createBodySchema = z.object({
    nome: z.string().optional(),
    email: z.string().email().max(50).optional(),
    senha: z.string().min(6).optional()
  })

  let cliente = createBodySchema.parse(request.body) as Cliente

  try {
    const clienteExist = await findById(id)

    if (!clienteExist) {
      return reply.status(404).send({ message: "Cliente não encontrado" })
    }


    if (cliente.email) {
      const emailExists = await findByEmail(cliente.email)

      if (emailExists) {
        return reply.status(409).send({ message: "Email já cadastrado" })
      }
    }

    cliente = { ...clienteExist, ...cliente }

    cliente.data_atualizacao = new Date()

    console.log(cliente)

    await database.promise().query(
      `UPDATE Cliente SET ? WHERE id = ?`, [cliente, id]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(204).send({ message: 'Cliente atualizado com sucesso' })
}