import { app } from './app'
import { createTables } from './database/create-tables'

app.listen({
  host: '0.0.0.0',
  port: 3000
})
  .then(() => {
    console.log('Server is running at http://localhost:3333')
    createTables()
  })
  .catch((error) => {
    console.log('Error starting server: ', error.message)
  })
