import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { database } from "../../database/db";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    nome: z.string(),
  })

  const { nome } = createBodySchema.parse(request.body)

  try {
    const cliente = await database.promise().query(
      `INSERT INTO Categoia (nome) VALUES (?)`,
      [nome]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send({ message: 'Categoria criada com sucesso' })
}
