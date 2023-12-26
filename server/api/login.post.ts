import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import { fetchAuth } from '~/utils/query'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { password, secretKey, username } = await fetchAuth()

  const hashedPassword = CryptoJS.HmacSHA512(body.password, secretKey).toString()

  if (password && username === body.username && hashedPassword === password) {
    const payload = { username }
    const token = jwt.sign(payload, secretKey, { expiresIn: '24h' })
    return {
      token,
      tokenName: 'Bearer',
    }
  } else {
    throw createError({
      statusCode: 500,
      statusMessage: 'Username or password is incorrect',
    })
  }
})
