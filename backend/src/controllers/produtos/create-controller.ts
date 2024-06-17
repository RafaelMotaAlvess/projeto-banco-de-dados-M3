import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { database } from "../../database/db";
import { Produto } from "../../database";
import { ResultSetHeader } from "mysql2";
import { findById as findCategoriaById } from "../categorias/helpers"
import { findById as findFornecedorById } from "../fornecedores/helpers"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    id_categoria: z.number(),
    id_fornecedor: z.number(),
    nome: z.string(),
    descricao: z.string(),
    preco: z.number(),
    quantidade_estoque: z.number()
  })

  const {
    id_categoria,
    id_fornecedor,
    nome,
    descricao,
    preco,
    quantidade_estoque
  } = createBodySchema.parse(request.body)

  try {
    const categoriaExists = await findCategoriaById(id_categoria + '')

    if (!categoriaExists) {
      return reply.status(404).send({ message: "Categoria não encontrada" })
    }

    const fornecedorExists = await findFornecedorById(id_fornecedor + '')

    if (!fornecedorExists) {
      return reply.status(404).send({ message: "Fornecedor não encontrado" })
    }

    const [produto] = await database.promise().query(
      `INSERT INTO Produto (
        nome, 
        descricao, 
        preco, 
        quantidade_estoque, 
        id_fornecedor, 
        id_categoria
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, descricao, preco, quantidade_estoque, id_fornecedor, id_categoria]
    ) as ResultSetHeader[]

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send({ message: 'Produto criado com sucesso' })
}