import jwt from 'jsonwebtoken'
import sql from '~/config/db'
import timelineData from 'assets/server/json/timeline.json'
import tietieData from 'assets/server/json/tietie.json'
import cosplayData from 'assets/server/json/cosplay.json'

export default defineEventHandler(async (event) => {
    const token = event.headers.get('authorization').replace("Bearer ", "")
    const secretKey = process.env.JWT_KEY
    const { err } = jwt.verify(token, secretKey)

    const body = await readBody(event)

    let length;
    let data;
    if (process.env.STORAGE_MODEL === 's3') {
        if (body.type === '') {
            length = await sql`
                SELECT
                    COUNT(1)
                FROM
                    public.kamera_image
                WHERE
                    del = 0
            `

            data = await sql`
                SELECT 
                    * 
                FROM 
                    public.kamera_image
                WHERE
                    del = 0
                ORDER BY create_time DESC, update_time DESC
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
                    type = ${ body.type }
                ORDER BY create_time DESC, update_time DESC
                LIMIT ${body.pageSize} OFFSET ${((body.pageNum > 1 ? body.pageNum : 1) - 1) * body.pageSize}
            `
        }

        return {
            total: length[0].count,
            totalPage: !data.length ? 0 : Math.ceil(length[0].count / body.pageSize),
            pageNum: body.pageNum,
            pageSize: body.pageSize,
            data: !data.length ? [] : data.map(item => {
                // 替换 url 属性的值
                return {
                    ...item,
                    exif: JSON.parse(item.exif)
                }
            })
        }
    } else {
        let dataList;
        if (body.type === 'timeline') {
            dataList = timelineData
        } else if (body.type === 'tietie') {
            dataList = tietieData
        } else if (body.type === 'cosplay') {
            dataList = cosplayData
        }
        const returnData = dataList
            .sort((a, b) => b.id - a.id)
            .slice((body.pageNum - 1) * body.pageSize, body.pageNum * body.pageSize)

        return {
            total: dataList.length,
            totalPage: Math.ceil(dataList.length / body.pageSize),
            pageNum: body.pageNum,
            pageSize: body.pageSize,
            data: returnData
        }
    }
})
