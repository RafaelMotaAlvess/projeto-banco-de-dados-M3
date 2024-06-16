import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { database } from "../../database/db";
import { Fornecedor } from "../../database";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    nome: z.string(),
    info: z.string(),
    tipo: z.string(),
    bairro: z.string(),
    rua: z.string(),
    cep: z.string(),
    cidade: z.string(),
    estado: z.string(),
    numero: z.string()
  })

  const {
    nome,
    info,
    tipo,
    bairro,
    rua,
    cep,
    cidade,
    estado,
    numero
  } = createBodySchema.parse(request.body)

  try {
    const fornecedor = await database.promise().query(
      `INSERT INTO Fornecedor (nome) VALUES (?)`,
      [nome]
    )[0] as Fornecedor

    await database.promise().query(
      `INSERT INTO EnderecoFornecedor (id_fornecedor, bairro, rua, cep, cidade, estado, numero) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [fornecedor.id, bairro, rua, cep, cidade, estado, numero]
    )

    await database.promise().query(
      `INSERT INTO ContatoFornecedor (id_fornecedor, info, tipo) VALUES (?, ?, ?)`,
      [fornecedor.id, info, tipo]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send({ message: 'Fornecedor criado com sucesso' })
}