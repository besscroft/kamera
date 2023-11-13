import jwt from 'jsonwebtoken'
import sql from '~/config/db'

export default defineEventHandler(async (event) => {
    const token = event.headers.get('authorization').replace("Bearer ", "")
    const secretKey = process.env.JWT_KEY
    const { err } = jwt.verify(token, secretKey)

    const body = await readBody(event)
    let id = body.id || 0
    let type = body.type || ''
    let url = body.url || ''
    let detail = body.detail || ''
    let rating = body.rating || 0

    if (id && id > 0) {
        const data = await sql`
            UPDATE public.kamera_image
            SET type = ${ type }, url = ${ url }, detail = ${ detail }, rating = ${ rating }
            WHERE id = ${ id }
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
    } else {
        return {
            data: 1,
        }
    }
})
