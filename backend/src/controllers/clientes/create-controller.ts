import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { makeCreateClienteUsecase } from "../../usecases/factories/make-create-cliente-usecase";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    nome: z.string(),
    email: z.string().email().max(50),
    senha: z.string().min(6)
  })

  const { nome, email, senha } = createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateClienteUsecase()

    await createUseCase.execute(nome, email, senha)
  } catch (error) {
    reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send({ message: 'Cliente criado com sucesso' })
}