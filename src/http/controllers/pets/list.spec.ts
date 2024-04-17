import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('List Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list a pets', async () => {
    const { token, city } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Mel',
        about: 'Pinscher',
        age: '3 anos',
        size: 'Pequeno',
        energyLevel: 'Agitada',
        environment: 'Casa',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Mel',
        about: 'Pinscher',
        age: '3 anos',
        size: 'Pequeno',
        energyLevel: 'Agitada',
        environment: 'Casa',
      })

    const response = await request(app.server)
      .get('/pets')
      .query({ city })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
