import { FastifyInstance } from 'fastify'
import { create } from './create'
import { auth } from './auth'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/auth', auth)

  app.patch('/token/refresh', refresh)

  app.get('/org', { onRequest: [verifyJWT] }, profile)
}
