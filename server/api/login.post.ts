import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    let username = process.env.KAMERA_USERNAME || ''
    let password = process.env.KAMERA_PASSWORD || ''

    const hashedPassword = CryptoJS.HmacSHA512(body.password, process.env.JWT_KEY).toString();

    if (password && username === body.username && hashedPassword === process.env.KAMERA_PASSWORD) {
        const payload = { username: username };
        const secretKey = process.env.JWT_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
        return {
            token: token,
            tokenName: 'Bearer'
        }
    }
})
