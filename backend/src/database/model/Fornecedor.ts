import { ContatoFornecedor } from "./ContatoFornecedor"
import { EnderecoFornecedor } from "./EnderecoFornecedor"

export type Fornecedor = {
  id: number,
  nome: string,
  contato: ContatoFornecedor[],
  endereco: EnderecoFornecedor,
}