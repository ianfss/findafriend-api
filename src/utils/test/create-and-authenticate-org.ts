import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      id: randomUUID(),
      responsible_name: 'João',
      name: 'Cãopanheiro',
      email: 'email@example.com',
      cep: '44700-000',
      state: 'BA',
      city: 'Jacobina',
      neighborhood: 'Centro',
      street: 'Rua Fulano de Tal',
      whatsapp: '(74) 98765-1234',
      password: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/auth').send({
    email: 'email@example.com',
    password: '123456',
  })

  const cookies = authResponse.get('Set-Cookie')

  const { token } = authResponse.body

  return { token, cookies, ...org }
}
