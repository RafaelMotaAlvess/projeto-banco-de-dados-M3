import { FastifyReply, FastifyRequest } from "fastify";
import { findById } from "./helpers";

type FetchRequest = FastifyRequest<{ Params: { id: string } }>

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as FetchRequest

  try {
    const fornecedor = await findById(id)

    return reply.status(200).send(fornecedor)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}