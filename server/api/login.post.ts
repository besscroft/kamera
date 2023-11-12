import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sql from '~/config/db'

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
    let username = body.username
    let password = body.password

    const data = await sql`
        SELECT * FROM public.kamera_user
        WHERE username = ${ username }
        LIMIT 1
    `

    if (await comparePasswords(password, data[0].password)) {
        const payload = { id: data[0].id, username: data[0].username };
        const secretKey = process.env.JWT_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
        return {
            token: token,
            tokenName: 'Bearer',
            name: data[0].name,
            avatar: data[0].avatar,
            roleCode: data[0].role,
            email: data[0].email
        }
    }
})
