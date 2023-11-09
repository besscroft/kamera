import timelineData from 'assets/server/json/timeline.json'
import { Database } from '~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let dataList = timelineData
    const appConfig = useAppConfig()
    const returnData = dataList
        .sort((a, b) => b.id - a.id)
        .slice((body.pageNum - 1) * body.pageSize, body.pageNum * body.pageSize)

    const client = await serverSupabaseClient<Database>(event)

    const { data, error } = await client.from('kamera_user').select().eq('username', 'admin')

    console.log(data)

    return {
        total: dataList.length,
        totalPage: Math.ceil(dataList.length / body.pageSize),
        pageNum: body.pageNum,
        pageSize: body.pageSize,
        data: returnData.map(item => {
            // 替换 url 属性的值
            return {
                ...item,
                url: appConfig.backBlazeCdnBaseUrl.timeline + item.url
            }
        }),
    }
})
