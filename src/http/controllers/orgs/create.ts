import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    responsibleName: z.string(),
    name: z.string(),
    email: z.string(),
    cep: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string(),
  })

  const org = createOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute({
      responsible_name: org.responsibleName,
      name: org.name,
      email: org.email,
      cep: org.cep,
      address: org.address,
      whatsapp: org.whatsapp,
      password: org.password,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw Error
  }

  reply.status(201).send()
}
