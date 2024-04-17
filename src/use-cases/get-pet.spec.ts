import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetUseCase } from './get-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet details', async () => {
    const createdOrg = await orgsRepository.create({
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
    })

    const createdPet = await petsRepository.create({
      name: 'Mel',
      about: 'Pinscher',
      age: '3 anos',
      size: 'Pequeno',
      energy_level: 'Agitada',
      environment: 'Casa',
      org_id: createdOrg.id,
    })

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Mel')
  })

  it('should be able to get a pet with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        id: 'this-id-does-not-exists',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
