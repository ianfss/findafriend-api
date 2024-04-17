import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseResquest {
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  environment: string
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    orgId,
  }: CreatePetUseCaseResquest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      environment,
      org_id: orgId,
    })

    return { pet }
  }
}
