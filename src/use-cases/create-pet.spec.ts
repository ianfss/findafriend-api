import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create pet', async () => {
    const org = await orgsRepository.create({
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

    const { pet } = await sut.execute({
      name: 'Mel',
      about: 'Pinscher',
      age: '3 anos',
      size: 'Pequeno',
      energyLevel: 'Agitada',
      environment: 'Casa',
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
