import { ClienteRepository } from "../../repositories/cliente-repository";

export class CreateClienteUsecase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute(nome: string, email: string, senha: string) {
    const clienteWithSameEmail = await this.clienteRepository.findByEmail(email)

    if (clienteWithSameEmail) {
      throw new Error('Cliente já cadastrado com esse e-mail')
    }

    const cliente = await this.clienteRepository.create(nome, email, senha)

    return {
      cliente
    }
  }
}