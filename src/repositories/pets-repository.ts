import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByCity(
    city: string,
    age?: string,
    size?: string,
    energyLevel?: string,
    environment?: string,
  ): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
