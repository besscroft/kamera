import timelineData from '~/assets/json/timeline.json'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let dataList = timelineData


    return {
        total: dataList.length,
        totalPage: Math.ceil(dataList.length / body.pageSize),
        pageNum: body.pageNum,
        pageSize: body.pageSize,
        data: dataList.slice((body.pageNum - 1) * body.pageSize, body.pageNum * body.pageSize)
    }
})
