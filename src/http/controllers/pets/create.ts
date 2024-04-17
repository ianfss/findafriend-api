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
  })

  const body = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  try {
    const { pet } = await createPetUseCase.execute({
      name: body.name,
      about: body.about,
      age: body.age,
      size: body.size,
      energyLevel: body.energyLevel,
      environment: body.environment,
      orgId: request.user.sub,
    })

    return reply.status(201).send(pet)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
