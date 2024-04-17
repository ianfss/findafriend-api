import { makeGetOrgProfileUseCase } from '@/use-cases/factories/get-org-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfile = makeGetOrgProfileUseCase()

  const { org } = await getOrgProfile.execute({
    orgId: request.user.sub,
  })

  reply.status(200).send({
    org: {
      ...org,
      password: undefined,
    },
  })
}
