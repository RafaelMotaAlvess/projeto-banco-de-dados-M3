import { Produto, database } from "../../database"

export async function findById(id: string): Promise<Produto | null> {
  const findProduto = await database.promise().query(
    `SELECT * FROM Produto WHERE id = ? LIMIT 1`, [id]
  )

  const produto = findProduto[0][0] as Produto

  return produto ?? null
}