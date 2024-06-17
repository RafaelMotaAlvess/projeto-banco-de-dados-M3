import { FastifyReply, FastifyRequest } from "fastify";
import { findEnderecoById } from "./helpers";

type FetchRequest = FastifyRequest<{ Params: { id: string } }>

export async function fetchEndereco(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as FetchRequest

  try {
    const endereco = await findEnderecoById(id)

    return reply.status(200).send(endereco)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}