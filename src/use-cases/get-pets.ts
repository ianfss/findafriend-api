import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'

interface GetPetsUseCaseResquest {
  city: string
  age?: string
  size?: string
  energyLevel?: string
  environment?: string
}

interface GetPetsUseCaseResponse {
  pets: Pet[]
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    environment,
  }: GetPetsUseCaseResquest): Promise<GetPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(
      city,
      age,
      size,
      energyLevel,
      environment,
    )

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
