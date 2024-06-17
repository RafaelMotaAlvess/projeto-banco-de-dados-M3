import { FastifyReply, FastifyRequest } from "fastify";
import { findContatoById } from "./helpers";

type FetchRequest = FastifyRequest<{ Params: { id: string } }>

export async function fetchContato(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as FetchRequest

  try {
    const contato = await findContatoById(id)

    return reply.status(200).send(contato)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}