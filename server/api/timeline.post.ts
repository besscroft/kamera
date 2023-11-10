import timelineData from 'assets/server/json/timeline.json'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let dataList = timelineData
    const appConfig = useAppConfig()
    const returnData = dataList
        .sort((a, b) => b.id - a.id)
        .slice((body.pageNum - 1) * body.pageSize, body.pageNum * body.pageSize)

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
