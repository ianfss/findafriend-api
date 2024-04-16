import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
}
