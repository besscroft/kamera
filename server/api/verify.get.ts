import jwt from 'jsonwebtoken'
import { fetchAuth } from '~/utils/query'

export default defineEventHandler(async (req) => {
  const token = req?.headers?.get('authorization')?.replace('Bearer ', '')
  const { secretKey } = await fetchAuth()
  try {
    const { err } = jwt.verify(token, secretKey)
  } catch (e) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
  return {
    data: 0,
  }
})
