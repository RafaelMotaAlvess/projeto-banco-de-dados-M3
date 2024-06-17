import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { database } from "../../database/db";
import { ResultSetHeader } from "mysql2";
import { findById } from "./helpers";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    id_cliente: z.number(),
    metodo_compra: z.string().min(1),
    detalhes: z.array(z.object({
      id_produto: z.number(),
      quantidade_produto: z.number(),
    })),
    descricao: z.string(),
    observacoes: z.string()
  })

  const {
    id_cliente,
    metodo_compra,
    detalhes,
    descricao,
    observacoes
  } = createBodySchema.parse(request.body)

  try {
    const subtotal = detalhes.map(
      async (item) => {
        const produto = await findById(item.id_produto.toString())

        if (!produto) {
          throw new Error('Produto não encontrado')
        }

        return item.quantidade_produto * produto.preco
      }
    )

    const total_pedido = await subtotal.reduce(async (acc, curr) => await acc + await curr)
    const data = new Date()

    console.log(id_cliente, data, metodo_compra, total_pedido)

    const [pedido] = await database.promise().query(
      `INSERT INTO Pedido (id_cliente, data, metodo_compra, total_pedido) VALUES (?, ?, ?, ?)`,
      [id_cliente, data, metodo_compra, total_pedido]
    ) as ResultSetHeader[]

    console.log('checkpoint 0.2')

    detalhes.forEach(async (item) => {
      const produto = await findById(item.id_produto.toString())

      if (!produto) {
        throw new Error('Produto não encontrado')
      }

      console.log('checkpoint 1')
      const haveStock = produto.quantidade_estoque - item.quantidade_produto > 0

      if (!haveStock) {
        throw new Error('Produto sem estoque suficiente')
      }

      await database.promise().query(
        `INSERT INTO Detalhes (
          id_pedido, 
          id_produto, 
          quantidade_produto, 
          subtotal
          )
          VALUES (?, ?, ?, ?)`,
        [
          pedido.insertId,
          item.id_produto,
          item.quantidade_produto,
          (item.quantidade_produto * produto.preco)
        ]
      )

      console.log('checkpoint 2')

      await database.promise().query(
        `UPDATE Produto SET quantidade_estoque = quantidade_estoque - ? WHERE id = ?`,
        [item.quantidade_produto, item.id_produto]
      )
    })

    console.log('checkpoint 3')

    await database.promise().query(
      `INSERT INTO Status (
        id_pedido,
        descricao, 
        data_atualizacao, 
        observacoes
        )
        VALUES (?, ?, ?, ?)`,
      [pedido.insertId, descricao, data, observacoes]
    )
    console.log('checkpoint 4')

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send({ message: 'Pedido realizado com sucesso' })
}