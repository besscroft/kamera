import { fetchStorageInfo } from '~/utils/query'

export default defineEventHandler(async (event) => {
  const { alistToken, alistUrl } = await fetchStorageInfo()
  const { data } = await $fetch(`${alistUrl}/api/admin/storage/list`, {
    timeout: 60000,
    method: 'get',
    headers: {
      Authorization: alistToken,
    },
  }).catch((e) => {
    console.log(e)
    throw createError({ statusCode: 500, statusMessage: '获取存储列表失败！' })
  })
  return {
    data: data.content || [],
  }
})
