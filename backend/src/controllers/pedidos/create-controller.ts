import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { database } from "../../database/db";
import { Pedido } from "../../database";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    id_cliente: z.number(),
    data: z.date(),
    metodo_compra: z.string().min(1),
    detalhes: z.array(z.object({
      id_produto: z.number(),
      quantidade_produto: z.number(),
      preco_unitario: z.number(),
    })),
    descricao: z.string(),
    observacoes: z.string()
  })

  const {
    id_cliente,
    data,
    metodo_compra,
    detalhes,
    descricao,
    observacoes
  } = createBodySchema.parse(request.body)

  try {
    const subtotal = detalhes.map(
      item => item.quantidade_produto * item.preco_unitario
    )

    const total_pedido = subtotal.reduce((acc, curr) => acc + curr)

    const pedido = await database.promise().query(
      `INSERT INTO PEDIDO (id_cliente, data, metodo_compra, total_pedido) VALUES
      (?, ?, ?, ?)`,
      [id_cliente, data, metodo_compra, total_pedido]
    )[0] as Pedido

    detalhes.forEach(async (item) => {

      await database.promise().query(
        `INSERT INTO Detalhes (
          id_pedido, 
          id_produto, 
          quantidade_produto, 
          preco_unitario, 
          subtotal, 
          id_pedido, 
          id_produto
          )
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          pedido.id,
          item.id_produto,
          item.quantidade_produto,
          item.preco_unitario,
          (item.quantidade_produto * item.preco_unitario)
        ]
      )
    })

    await database.promise().query(
      `INSERT INTO Status (
        id_pedido
        descricao, 
        data_atualizacao, 
        observacoes, 
        )
        VALUES (?, ?, ?, ?)`,
      [pedido.id, descricao, data, observacoes]
    )

  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send({ message: 'Cliente criado com sucesso' })
}