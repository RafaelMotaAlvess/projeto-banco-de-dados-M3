import { MySQLClientesRepository } from "../../repositories/mysql/mysql-clientes-repository";
import { FetchAllClienteUsecase } from "../clientes/fetchall-cliente-usecase";

export function makeFetchAllClienteUsecase() {
  const clientesRepository = new MySQLClientesRepository();
  const usecase = new FetchAllClienteUsecase(clientesRepository);
  return usecase;
}