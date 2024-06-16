import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { database } from "../../database/db";
import { Cliente } from "../../database";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    nome: z.string(),
    email: z.string().email().max(50),
    senha: z.string().min(6),
    contatos: z.array(z.object({
      info: z.string(),
      tipo: z.string()
    })),

    endereco: z.object({
      bairro: z.string(),
      rua: z.string(),
      cep: z.string(),
      cidade: z.string(),
      numero: z.string(),
    })
  })

  const {
    nome,
    email,
    senha,
    contatos,
    endereco
  } = createBodySchema.parse(request.body)

  try {
    const data_criacao = new Date()
    const data_atualizacao = new Date()

    const cliente = await database.promise().query(
      `INSERT INTO Cliente (nome, email, senha, data_criacao, data_atualizacao) VALUES (?, ?, ?, ?, ?)`,
      [nome, email, senha, data_criacao, data_atualizacao]
    )[0] as Cliente

    contatos.forEach(async (contato) => {
      await database.promise().query(
        `INSERT INTO ContatoCliente (id_cliente, info, tipo) VALUES (?, ?, ?)`,
        [cliente.id, contato.info, contato.tipo]
      )
    })

    await database.promise().query(
      `INSERT INTO EnderecoCliente (id_cliente, bairro, rua, cep, cidade, numero) VALUES (?, ?, ?, ?, ?, ?)`,
      [cliente.id, endereco.bairro, endereco.rua, endereco.cep, endereco.cidade, endereco.numero]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send({ message: 'Cliente criado com sucesso' })
}