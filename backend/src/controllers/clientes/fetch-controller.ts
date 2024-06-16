import { FastifyReply, FastifyRequest } from "fastify";
import { findById } from "./helpers";

type FetchRequest = FastifyRequest<{ Params: { id: string } }>

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as FetchRequest

  try {
    const cliente = await findById(id)

    return reply.status(200).send(cliente)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}