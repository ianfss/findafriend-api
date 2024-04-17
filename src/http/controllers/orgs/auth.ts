import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthOrgUseCase } from '@/use-cases/factories/auth-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const authOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authOrgBodySchema.parse(request.body)

  try {
    const authOrgUseCase = makeAuthOrgUseCase()

    const { org } = await authOrgUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )

    reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw Error
  }
}
