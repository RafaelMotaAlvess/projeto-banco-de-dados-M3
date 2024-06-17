import { Cliente, EnderecoCliente, database } from "../../database"
import { ContatoCliente } from "../../database/model/ContatoCliente"

export async function findById(id: string): Promise<Cliente | null> {
  const findCliente = await database.promise().query(
    `SELECT * FROM Cliente WHERE id = ? LIMIT 1`, [id]
  )

  const cliente = findCliente[0][0] as Cliente

  return cliente ?? null
}

export async function findByEmail(email: string): Promise<Cliente | null> {
  const findCliente = await database.promise().query(
    `SELECT * FROM Cliente WHERE email = ? LIMIT 1`, [email]
  )

  const cliente = findCliente[0][0] as Cliente
  return cliente ?? null
}

export async function findContatoById(id: string): Promise<ContatoCliente | null> {
  const findContato = await database.promise().query(
    `SELECT * FROM ContatoCliente WHERE id = ? LIMIT 1`, [id]
  )

  const contato = findContato[0][0] as ContatoCliente

  return contato ?? null
}

export async function findEnderecoById(id: string): Promise<EnderecoCliente | null> {
  const findEndereco = await database.promise().query(
    `SELECT * FROM EnderecoCliente WHERE id = ? LIMIT 1`, [id]
  )

  const endereco = findEndereco[0][0] as EnderecoCliente

  return endereco ?? null
}