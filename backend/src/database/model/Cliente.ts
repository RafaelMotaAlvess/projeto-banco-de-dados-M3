export type Cliente = {
  id: number,
  nome: string,
  email: string,
  senha: string,
  data_criacao?: Date,
  data_atualizacao?: Date
}