import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface CreateOrgUseCaseResquest {
  responsible_name: string
  name: string
  email: string
  cep: string
  address: string
  whatsapp: string
  password: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    responsible_name,
    name,
    email,
    cep,
    address,
    whatsapp,
    password,
  }: CreateOrgUseCaseResquest): Promise<CreateOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      responsible_name,
      name,
      email,
      cep,
      address,
      whatsapp,
      password,
    })

    return { org }
  }
}
