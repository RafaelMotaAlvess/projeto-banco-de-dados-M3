import { Produto, database } from "../../database"

export async function findById(id: string): Promise<Produto | null> {
  const findPedido = await database.promise().query(
    `SELECT * FROM Pedido WHERE id = ? LIMIT 1`, [id]
  )

  const produto = findPedido[0][0] as Produto

  return produto ?? null
}

export async function findProduct(id: string) {
  const findProduct = await database.promise().query(
    `SELECT * FROM Produto WHERE id = ? LIMIT 1`, [id]
  )

  const produto = findProduct[0][0] as Produto

  return produto ?? null
}