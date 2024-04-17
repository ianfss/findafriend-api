import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      responsible_name: data.responsible_name,
      name: data.name,
      email: data.email,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      whatsapp: data.whatsapp,
      password: data.password,
    }

    this.items.push(org)

    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
