import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthOrgUseCaseResquest {
  email: string
  password: string
}

interface AuthOrgUseCaseResponse {
  org: Org
}

export class AuthOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthOrgUseCaseResquest): Promise<AuthOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
