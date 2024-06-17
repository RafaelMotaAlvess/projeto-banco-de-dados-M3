import { FastifyReply, FastifyRequest } from "fastify";
import { findStatusById } from "./helpers";

type ParamsRequest = FastifyRequest<{ Params: { id: string } }>

export async function fetchStatus(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as ParamsRequest

  try {
    const status = await findStatusById(id)

    return reply.status(200).send(status)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}