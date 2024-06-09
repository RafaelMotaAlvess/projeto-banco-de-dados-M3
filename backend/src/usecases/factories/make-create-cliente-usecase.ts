import { MySQLClientesRepository } from "../../repositories/mysql/mysql-clientes-repository";
import { CreateClienteUsecase } from "../clientes/create-cliente-usecase";

export function makeCreateClienteUsecase() {
  const clientesRepository = new MySQLClientesRepository()
  const usecase = new CreateClienteUsecase(clientesRepository)

  return usecase
}