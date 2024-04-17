import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create org', async () => {
    const { org } = await sut.execute({
      responsible_name: 'João',
      name: 'Cãopanheiro',
      email: 'email@example.com',
      cep: '44700-000',
      state: 'BA',
      city: 'Jacobina',
      neighborhood: 'Centro',
      street: 'Rua Fulano de Tal',
      whatsapp: '(74) 98765-1234',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
