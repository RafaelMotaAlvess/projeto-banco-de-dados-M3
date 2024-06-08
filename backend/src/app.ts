import fastify from 'fastify'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
})