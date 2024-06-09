import { ClienteRepository } from "../../repositories/cliente-repository";

export class FetchAllClienteUsecase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute() {
    const clientes = await this.clienteRepository.fetchAll()
    return {
      clientes
    }
  }
}