import jwt from 'jsonwebtoken'
import sql from '~/config/db'

export default defineEventHandler(async (event) => {
    const token = event.headers.get('authorization').replace("Bearer ", "")
    const secretKey = process.env.JWT_KEY
    const { err } = jwt.verify(token, secretKey)

    const body = await readBody(event)

    const data = await sql`
        UPDATE public.kamera_image
        SET del = 1
        WHERE id = ${ body.id }
    `

    if (!data.length) {
        return {
            data: 0,
        }
    } else {
        return {
            data: 1,
        }
    }
})
