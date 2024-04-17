import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetsUseCase } from './get-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetsUseCase

describe('Get Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetsUseCase(petsRepository)
  })

  it('should be able to get pets by city', async () => {
    await orgsRepository.create({
      id: 'org-01',
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

    await orgsRepository.create({
      id: 'org-02',
      responsible_name: 'João',
      name: 'Cãopanheiro',
      email: 'email@example.com',
      cep: '44700-000',
      state: 'BA',
      city: 'Piritiba',
      neighborhood: 'Centro',
      street: 'Rua Fulano de Tal',
      whatsapp: '(74) 98765-1234',
      password: '123456',
    })

    await petsRepository.create({
      name: 'Mel',
      about: 'Pinscher',
      age: '3 anos',
      size: 'Pequeno',
      energy_level: 'Agitada',
      environment: 'Casa',
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Mel',
      about: 'Pinscher',
      age: '3 anos',
      size: 'Pequeno',
      energy_level: 'Agitada',
      environment: 'Casa',
      org_id: 'org-02',
    })

    const { pets } = await sut.execute({
      city: 'Jacobina',
    })

    console.log(pets)

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        org_id: 'org-01',
      }),
    ])
  })

  it('should be able to get pets by their details', async () => {
    await orgsRepository.create({
      id: 'org-01',
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

    await orgsRepository.create({
      id: 'org-02',
      responsible_name: 'João',
      name: 'Cãopanheiro',
      email: 'email@example.com',
      cep: '44700-000',
      state: 'BA',
      city: 'Piritiba',
      neighborhood: 'Centro',
      street: 'Rua Fulano de Tal',
      whatsapp: '(74) 98765-1234',
      password: '123456',
    })

    await petsRepository.create({
      name: 'Mel',
      about: 'Pinscher',
      age: '3 anos',
      size: 'Pequeno',
      energy_level: 'Agitada',
      environment: 'Casa',
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Mel',
      about: 'Pinscher',
      age: '15 anos',
      size: 'Grande',
      energy_level: 'Calma',
      environment: 'Apartamento',
      org_id: 'org-02',
    })

    await petsRepository.create({
      name: 'Alfredo',
      about: 'SRD',
      age: '16 anos',
      size: 'Médio',
      energy_level: 'Calmo',
      environment: 'Casa',
      org_id: 'org-02',
    })

    const { pets } = await sut.execute({
      city: 'Piritiba',
      age: '15 anos',
      size: 'Grande',
      energyLevel: 'Calma',
      environment: 'Apartamento',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        org_id: 'org-02',
        age: '15 anos',
        size: 'Grande',
        energy_level: 'Calma',
        environment: 'Apartamento',
      }),
    ])
  })
})
