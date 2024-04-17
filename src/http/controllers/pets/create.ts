import { makeCreatePetUseCase } from '@/use-cases/factories/create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    environment: z.string(),
  })

  const pet = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name: pet.name,
    about: pet.about,
    age: pet.age,
    size: pet.size,
    energyLevel: pet.energyLevel,
    environment: pet.environment,
    orgId: request.user.sub,
  })

  reply.status(201).send()
}
