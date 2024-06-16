import { FastifyReply, FastifyRequest } from "fastify";
import { Cliente, database } from "../../database/";

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchClientes = await database.promise().query(
      `SELECT * FROM Cliente`,
    )

    const clientes = fetchClientes[0] as Cliente[]

    return reply.status(200).send(clientes)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}