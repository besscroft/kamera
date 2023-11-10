import bcrypt from 'bcryptjs'
import { Database } from '~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'
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
    let username = body.username
    let password = body.password

    const client = await serverSupabaseClient<Database>(event)

    const { data, error } = await client.from('kamera_user').select().eq('username', username).single()

    if (await comparePasswords(password, data.password)) {
        const payload = { id: data.id, username: data.username };
        const secretKey = process.env.JWT_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
        return {
            token: token,
            tokenName: 'Bearer',
            name: data.name,
            avatar: data.avatar,
            roleCode: data.role,
            email: data.email
        }
    }
})
