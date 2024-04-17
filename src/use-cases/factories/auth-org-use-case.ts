import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthOrgUseCase } from '../auth-org'

export function makeAuthOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthOrgUseCase(orgsRepository)

  return useCase
}
