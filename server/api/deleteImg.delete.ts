import sql from '~/config/db'

export default defineEventHandler(async (event) => {
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
