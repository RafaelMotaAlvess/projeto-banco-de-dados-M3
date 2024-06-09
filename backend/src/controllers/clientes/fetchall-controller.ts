import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllClienteUsecase } from "../../usecases/factories/make-fetchall-cliente-usecase";

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createUseCase = makeFetchAllClienteUsecase()

    const clientes = await createUseCase.execute()

    return reply.status(200).send(clientes)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }
}