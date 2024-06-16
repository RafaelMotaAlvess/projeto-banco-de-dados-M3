import { FastifyReply, FastifyRequest } from "fastify";
import { findById } from "./helpers";

type ParamsRequest = FastifyRequest<{ Params: { id: string } }>

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as ParamsRequest

  try {
    const cliente = await findById(id)

    return reply.status(200).send(cliente)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}