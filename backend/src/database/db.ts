import mysql from 'mysql2'

export const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projetodbm3'
})

database.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.message)
    return
  }
  console.log('Conectado ao banco de dados!')
})

