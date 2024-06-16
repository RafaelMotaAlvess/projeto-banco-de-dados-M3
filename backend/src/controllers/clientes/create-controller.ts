import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { database } from "../../database/db";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    nome: z.string(),
    email: z.string().email().max(50),
    senha: z.string().min(6)
  })

  const { nome, email, senha } = createBodySchema.parse(request.body)

  try {
    const data_criacao = new Date()
    const data_atualizacao = new Date()

    const cliente = await database.promise().query(
      `INSERT INTO Cliente (nome, email, senha, data_criacao, data_atualizacao) VALUES (?, ?, ?, ?, ?)`,
      [nome, email, senha, data_criacao, data_atualizacao]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send({ message: 'Cliente criado com sucesso' })
}