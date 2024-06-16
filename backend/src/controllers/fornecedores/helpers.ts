import { Cliente, database } from "../../database"

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