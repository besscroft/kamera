import jwt from 'jsonwebtoken'
import sql from '~/config/db'

export default defineEventHandler(async (event) => {
    const token = event.headers.get('authorization').replace("Bearer ", "")
    const secretKey = process.env.JWT_KEY
    const { err } = jwt.verify(token, secretKey)

    const body = await readBody(event)

    const length = await sql`
        SELECT
            COUNT(1)
        FROM
            public.kamera_image
        ${ sql(body.type !== `` ? `WHERE type = ` + body.type : 'WHERE 1=1') }
    `

    const data = await sql`
        SELECT 
            * 
        FROM 
            public.kamera_image
        ${ sql(body.type !== `` ? `WHERE type = ` + body.type : 'WHERE 1=1') }
        ORDER BY create_time DESC, update_time DESC
        LIMIT ${body.pageSize} OFFSET ${((body.pageNum > 1 ? body.pageNum : 1) - 1) * body.pageSize}
    `

    return {
        total: length[0].count,
        totalPage: !data.length ? 0 : Math.ceil(length[0].count / body.pageSize),
        pageNum: body.pageNum,
        pageSize: body.pageSize,
        data: !data.length ? [] : data
    }
})
