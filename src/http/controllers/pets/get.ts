import { makeGetPetUseCase } from '@/use-cases/factories/get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const listPetsParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = listPetsParamsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  const { pet } = await getPetUseCase.execute({
    id,
  })

  reply.status(200).send({ pet })
}
