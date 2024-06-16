import { Fornecedor, EnderecoFornecedor, ContatoFornecedor, database } from "../../database"

export async function findById(id: string): Promise<Fornecedor | null> {
  const findFornecedor = await database.promise().query(
    `SELECT * FROM Fornecedor WHERE id = ? LIMIT 1`, [id]
  )

  const fornecedor = findFornecedor[0][0] as Fornecedor

  return fornecedor ?? null
}

export async function findEnderecoById(id: string): Promise<EnderecoFornecedor | null> {
  const findEndereco = await database.promise().query(
    `SELECT * FROM EnderecoFornecedor WHERE id = ? LIMIT 1`, [id]
  )

  const endereco = findEndereco[0][0] as EnderecoFornecedor

  return endereco ?? null
}

export async function findContatoById(id: string): Promise<ContatoFornecedor | null> {
  const findContato = await database.promise().query(
    `SELECT * FROM ContatoFornecedor WHERE id = ? LIMIT 1`, [id]
  )

  const contato = findContato[0][0] as ContatoFornecedor

  return contato ?? null
}

export async function nameExists(name: string): Promise<Fornecedor | null> {
  const findFornecedor = await database.promise().query(
    `SELECT * FROM Fornecedores WHERE nome = ? LIMIT 1`, [name]
  )

  const fornecedor = findFornecedor[0][0] as Fornecedor
  return fornecedor ?? null
}