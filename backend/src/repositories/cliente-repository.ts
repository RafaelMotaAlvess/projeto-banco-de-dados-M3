import { Cliente } from "../database/model/Cliente"

export interface ClienteRepository {
  create(nome: string, email: string, senha: string): Promise<void>
  delete(id: number): Promise<void>
  fetchAll(): Promise<Cliente[]>
  findById(id: number): Promise<Cliente | null>
  findByEmail(email: string): Promise<Cliente | null>
}