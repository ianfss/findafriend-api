import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthOrgUseCase } from './auth-org'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthOrgUseCase

describe('Auth Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthOrgUseCase(orgsRepository)
  })

  it('should be able to auth a org', async () => {
    await orgsRepository.create({
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

    const { org } = await sut.execute({
      email: 'email@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to auth a org with wrong email', async () => {
    await orgsRepository.create({
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

    await expect(
      sut.execute({
        email: 'example@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to auth a org with wrong password', async () => {
    await orgsRepository.create({
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

    await expect(
      sut.execute({
        email: 'email@example.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
