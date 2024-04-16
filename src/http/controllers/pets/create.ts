import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
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
    orgId: z.string().uuid(),
  })

  const pet = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name: pet.name,
      about: pet.about,
      age: pet.age,
      size: pet.size,
      energyLevel: pet.energyLevel,
      environment: pet.environment,
      orgId: pet.orgId,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw Error
  }

  reply.status(201).send()
}
