import jwt from 'jsonwebtoken'
import { Database } from '~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const token = event.headers.get('authorization').replace("Bearer ", "")
    const secretKey = process.env.JWT_KEY
    const { err } = jwt.verify(token, secretKey)

    const body = await readBody(event)
    let type = body.type
    let url = body.url
    let exif = body.exif
    let detail = body.detail
    let rating = body.rating || 0

    const client = await serverSupabaseClient<Database>(event)
    const { error } = await client
        .from('kamera_image')
        .insert({ type: type, url: url, exif: JSON.stringify(exif), detail: detail, rating: rating })

    if (error) {
        console.log(error)
        return {
            data: 1,
        }
    } else {
        return {
            data: 0,
        }
    }
})
