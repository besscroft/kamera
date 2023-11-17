import sql from '~/config/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let id = body.id || 0
    let type = body.type || ''
    let url = body.url || ''
    let detail = body.detail || ''
    let rating = body.rating || 0
    let sort = body.sort || 0

    if (sort < 0 || sort > 32767) {
        sort = 0
    }

    if (id && id > 0) {
        const data = await sql`
            UPDATE public.kamera_image
            SET type = ${ type }, url = ${ url }, detail = ${ detail }, rating = ${ rating }, sort = ${ sort }
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
