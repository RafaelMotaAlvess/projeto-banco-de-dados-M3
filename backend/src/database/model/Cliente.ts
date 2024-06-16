import { ContatoCliente } from "./ContatoCliente"
import { EnderecoCliente } from "./EnderecoCliente"

export type Cliente = {
  id: number,
  nome: string,
  email: string,
  senha: string,
  contato: ContatoCliente[],
  endereco: EnderecoCliente,
  data_criacao?: Date,
  data_atualizacao?: Date
}