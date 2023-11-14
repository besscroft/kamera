import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
}
const comparePasswords = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    let username = process.env.KAMERA_USERNAME || ''
    let password = process.env.KAMERA_PASSWORD || ''

    if (password && password !== '' && username === body.username && await comparePasswords(body.password, password)) {
        const payload = { username: username };
        const secretKey = process.env.JWT_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
        return {
            token: token,
            tokenName: 'Bearer'
        }
    }
})
