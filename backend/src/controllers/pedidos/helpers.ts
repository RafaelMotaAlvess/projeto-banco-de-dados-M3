import { Produto, Pedido, Status, database } from "../../database"

export async function findById(id: string): Promise<Pedido | null> {
  const findPedido = await database.promise().query(
    `SELECT * FROM Pedido WHERE id = ? LIMIT 1`, [id]
  )

  const pedido = findPedido[0][0] as Pedido

  return pedido ?? null
}

export async function findStatusById(id: string): Promise<Status | []> {
  const findStatus = await database.promise().query(
    `SELECT * FROM Status WHERE id_pedido = ? LIMIT 1`, [id]
  )

  const status = findStatus[0][0] as Status

  return status ?? []
}

export async function findProduct(id: string) {
  const findProduct = await database.promise().query(
    `SELECT * FROM Produto WHERE id = ? LIMIT 1`, [id]
  )

  const produto = findProduct[0][0] as Produto

  return produto ?? null
}