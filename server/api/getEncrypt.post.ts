import CryptoJS from 'crypto-js'
import { secretKey } from '~/utils/query'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const hashedPassword = CryptoJS.HmacSHA512(body.password, secretKey).toString()

  return {
    data: hashedPassword,
  }
})
