import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findManyByCity(
    city: string,
    age?: string,
    size?: string,
    energyLevel?: string,
    environment?: string,
  ) {
    const filteredOrgs = this.orgsRepository.items.filter((item) =>
      item.city.includes(city),
    )

    const pets = this.items
      .filter((item) => filteredOrgs.some((org) => item.org_id === org.id))
      .filter((item) => (age ? item.age === age : true))
      .filter((item) => (size ? item.size === size : true))
      .filter((item) =>
        energyLevel ? item.energy_level === energyLevel : true,
      )
      .filter((item) => (environment ? item.environment === environment : true))

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
