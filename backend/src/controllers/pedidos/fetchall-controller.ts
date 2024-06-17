import { FastifyReply, FastifyRequest } from "fastify";
import { Pedido, Produto, database } from "../../database";

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchPedidos = await database.promise().query(
      `SELECT * FROM Pedido`,
    )

    const pedidos = fetchPedidos[0] as Pedido[]

    return reply.status(200).send(pedidos)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}