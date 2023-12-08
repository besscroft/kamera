import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const username = process.env.KAMERA_USERNAME || ''
  const password = process.env.KAMERA_PASSWORD || ''

  const hashedPassword = CryptoJS.HmacSHA512(body.password, process.env.AUTH_KEY).toString()

  if (password && username === body.username && hashedPassword === process.env.KAMERA_PASSWORD) {
    const payload = { username }
    const secretKey = process.env.AUTH_KEY
    const token = jwt.sign(payload, secretKey, { expiresIn: '24h' })
    return {
      token,
      tokenName: 'Bearer',
    }
  }
})
