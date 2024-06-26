import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { database } from "../../database/db";
import { ResultSetHeader } from "mysql2";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    nome: z.string(),
    contatos: z.array(z.object({
      info: z.string(),
      tipo: z.string()
    })),
    endereco: z.object({
      bairro: z.string(),
      rua: z.string(),
      cep: z.string(),
      cidade: z.string(),
      estado: z.string(),
      numero: z.string(),
    })
  })


  try {
    const {
      nome,
      contatos,
      endereco
    } = createBodySchema.parse(request.body)

    const parsed = createBodySchema.parse(request.body)

    console.log(parsed)

    const [fornecedor] = await database.promise().query(
      `INSERT INTO Fornecedor (nome) VALUES (?)`,
      [nome]
    ) as ResultSetHeader[]

    contatos.forEach(async (contato) => {
      await database.promise().query(
        `INSERT INTO ContatoFornecedor (id_fornecedor, info, tipo) VALUES (?, ?, ?)`,
        [fornecedor.insertId, contato.info, contato.tipo]
      )
    })

    await database.promise().query(
      `INSERT INTO EnderecoFornecedor (id_fornecedor, bairro, rua, cep, cidade, estado, numero) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [fornecedor.insertId, endereco.bairro, endereco.rua, endereco.cep, endereco.cidade, endereco.estado, endereco.numero]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send({ message: 'Fornecedor criado com sucesso' })
}