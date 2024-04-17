import { makeGetPetsUseCase } from '@/use-cases/factories/get-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    environment: z.string().optional(),
  })

  const { city, age, size, energyLevel, environment } =
    listPetsQuerySchema.parse(request.query)

  const getPetsUseCase = makeGetPetsUseCase()

  const { pets } = await getPetsUseCase.execute({
    city,
    age,
    size,
    energyLevel,
    environment,
  })

  reply.status(200).send({ pets })
}
