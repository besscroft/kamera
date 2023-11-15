import CryptoJS from 'crypto-js'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const hashedPassword = CryptoJS.HmacSHA512(body.password, process.env.JWT_KEY).toString();

    return {
        data: hashedPassword
    }
})
