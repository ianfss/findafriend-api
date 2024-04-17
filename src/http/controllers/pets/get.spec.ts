import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet details', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const pet = await request(app.server)
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

    const response = await request(app.server).get(`/pet/${pet.body.id}`).send()

    expect(response.statusCode).toEqual(200)
  })
})
