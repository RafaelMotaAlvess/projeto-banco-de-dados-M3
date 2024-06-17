import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { database } from "../../database/db";
import { nameExists } from "./helpers";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    nome: z.string(),
  })

  const { nome } = createBodySchema.parse(request.body)

  try {
    const categoriaWithSameName = await nameExists(nome)

    if (categoriaWithSameName) {
      return reply.status(409).send({ message: "Categoria já cadastrada" })
    }

    await database.promise().query(
      `INSERT INTO Categoria (nome) VALUES (?)`,
      [nome]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send({ message: 'Categoria criada com sucesso' })
}