import { FastifyReply, FastifyRequest } from "fastify";
import { Produto, database } from "../../database";
import { findById } from "./helpers";
import { z } from "zod";
import { findById as findCategoriaById } from "../categorias/helpers"
import { findById as findFornecedorById } from "../fornecedores/helpers"

type FetchRequest = FastifyRequest<{ Params: { id: string } }>

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as FetchRequest

  const createBodySchema = z.object({
    id_categoria: z.number(),
    id_fornecedor: z.number(),
    nome: z.string().optional(),
    descricao: z.string(),
    preco: z.number(),
    quantidade_estoque: z.number()
  })

  let produto = createBodySchema.parse(request.body) as Produto

  try {
    const produtoExist = await findById(id)

    if (!produtoExist) {
      return reply.status(404).send({ message: "Produto não encontrado" })
    }

    const categoriaExist = await findCategoriaById(produto.id_categoria + '')

    if (!categoriaExist) {
      return reply.status(404).send({ message: "Categoria não encontrada" })
    }

    const fornecedorExists = await findFornecedorById(produto.id_fornecedor + '')

    if (!fornecedorExists) {
      return reply.status(404).send({ message: "Fornecedor não encontrado" })
    }

    produto = { ...produtoExist, ...produto }

    await database.promise().query(
      `UPDATE Categoria SET ? WHERE id = ?`, [produto, id]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(204).send({ message: 'Produto atualizado com sucesso' })
}
