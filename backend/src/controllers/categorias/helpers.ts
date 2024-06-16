import { Categoria, database } from "../../database"

export async function findById(id: string): Promise<Categoria | null> {
  const findCategoria = await database.promise().query(
    `SELECT * FROM Categoria WHERE id = ? LIMIT 1`, [id]
  )

  const cliente = findCategoria[0][0] as Categoria

  return cliente ?? null
}

export async function findByEmail(email: string): Promise<Categoria | null> {
  const findCategoria = await database.promise().query(
    `SELECT * FROM Categoria WHERE email = ? LIMIT 1`, [email]
  )

  const categoria = findCategoria[0][0] as Categoria
  return categoria ?? null
}

export async function nameExists(name: string): Promise<Categoria | null> {
  const findCategoria = await database.promise().query(
    `SELECT * FROM Categoria WHERE nome = ? LIMIT 1`, [name]
  )

  const categoria = findCategoria[0][0] as Categoria
  return categoria ?? null
}
