import sql from '~/config/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (body.pageSize > 20 || body.pageSize < 1) {
        body.pageSize = 10
    }

    let length;
    let data;
    if (process.env.STORAGE_MODEL === 's3' || !process.env.STORAGE_MODEL) {
        if (body.type === '') {
            length = await sql`
                SELECT
                    COUNT(1)
                FROM
                    public.kamera_image
                WHERE
                    del = 0
                AND
                    show = 0
            `

            data = await sql`
                SELECT 
                    * 
                FROM 
                    public.kamera_image
                WHERE
                    del = 0
                AND
                    show = 0
                ORDER BY sort DESC, create_time DESC, update_time DESC
                LIMIT ${body.pageSize} OFFSET ${((body.pageNum > 1 ? body.pageNum : 1) - 1) * body.pageSize}
            `
        } else {
            length = await sql`
                SELECT
                    COUNT(1)
                FROM
                    public.kamera_image
                WHERE
                    del = 0
                AND
                    show = 0
                AND 
                    type = ${ body.type }
            `

            data = await sql`
                SELECT 
                    * 
                FROM 
                    public.kamera_image
                WHERE
                    del = 0
                AND
                    show = 0
                AND
                    type = ${ body.type }
                ORDER BY sort DESC, create_time DESC, update_time DESC
                LIMIT ${body.pageSize} OFFSET ${((body.pageNum > 1 ? body.pageNum : 1) - 1) * body.pageSize}
            `
        }

        return {
            total: length[0].count,
            totalPage: !data.length ? 0 : Math.ceil(length[0].count / body.pageSize),
            pageNum: body.pageNum,
            pageSize: body.pageSize,
            data: !data.length ? [] : data.map(item => {
                return {
                    ...item,
                    exif: JSON.parse(item.exif)
                }
            })
        }
    } else {
        return {
            total: 0,
            totalPage: 0,
            pageNum: body.pageNum,
            pageSize: body.pageSize,
            data: 0
        }
    }
})
