import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsUseCase } from '../get-pets'

export function makeGetPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetsUseCase(petsRepository)

  return useCase
}
