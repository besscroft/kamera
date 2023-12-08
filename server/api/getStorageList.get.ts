export default defineEventHandler(async (event) => {
  const { data } = await $fetch(`${process.env.ALIST_URL}/api/admin/storage/list`, {
    timeout: 60000,
    method: 'get',
    headers: {
      Authorization: process.env.ALIST_TOKEN,
    },
  }).catch((e) => {
    console.log(e)
    throw createError({ statusCode: 500, statusMessage: '获取存储列表失败！' })
  })
  return {
    data: data.content || [],
  }
})
