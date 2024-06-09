import { database } from "../../database/db";
import { Cliente } from "../../database/model/Cliente";
import { ClienteRepository } from "../cliente-repository";

export class MySQLClientesRepository implements ClienteRepository {
  async create(nome: string, email: string, senha: string): Promise<void> {
    const data_criacao = new Date()
    const data_atualizacao = new Date()

    const cliente = await database.promise().query(
      `INSERT INTO Cliente (nome, email, senha, data_criacao, data_atualizacao) VALUES (?, ?, ?, ?, ?)`,
      [nome, email, senha, data_criacao, data_atualizacao]
    )

    console.log('Cliente criado com sucesso', cliente)
  }

  async fetchAll(): Promise<Cliente[]> {
    const fetchClientes = await database.promise().query(
      `SELECT * FROM Cliente`,
    )

    const clientes = fetchClientes[0] as Cliente[]

    return clientes
  }

  async findById(id: number): Promise<Cliente | null> {
    const findCliente = await database.promise().query(
      `SELECT * FROM Cliente WHERE id = ? LIMIT 1`, [id]
    )

    const cliente = findCliente[0][0] as Cliente

    return cliente ?? null
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    const findCliente = await database.promise().query(
      `SELECT * FROM Cliente WHERE email = ? LIMIT 1`, [email]
    )

    const cliente = findCliente[0][0] as Cliente
    return cliente ?? null
  }

}