import s3 from '~/config/s3'
import { fetchStorageInfo } from '~/utils/query'

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event)

  const file = body[0].data
  const storage = body[1].data
  const type = body[2].data
  const mountPath = body[3].data

  const { alistToken, alistUrl, bucket, cdnUrl, endpoint, storageFolder } = await fetchStorageInfo()

  if (storage && storage.toString() === 's3') {
    const uploadParams = { Bucket: bucket, Key: '', Body: '' }
    const fileName = storageFolder && storageFolder !== '/'
      ? `${storageFolder}/${type}/${body[0].filename}`
      : `${type}/${body[0].filename}`
    uploadParams.Body = file
    uploadParams.Key = fileName

    await s3.upload(uploadParams, (err, data) => {
      if (err) {
        throw createError({ statusCode: 500, statusMessage: 'Upload Error!' })
      }
    })
    return {
      data: 0,
      url: cdnUrl && cdnUrl !== ''
        ? `https://${cdnUrl}/${fileName}`
        : `https://${bucket}.${endpoint}/${fileName}`,
    }
  } else if (storage && storage.toString() === 'alist') {
    await $fetch(`${alistUrl}/api/fs/put`, {
      timeout: 60000,
      method: 'put',
      headers: {
        'Authorization': alistToken,
        'File-Path': encodeURIComponent(`${mountPath.toString() === '/' ? '' : mountPath}/${type}/${body[0].filename}`),
      },
      body: file,
    }).catch(e => {
      console.log(e)
      throw createError({ statusCode: 500, statusMessage: 'Upload Error!' })
    })
    return {
      data: 0,
      url: `${alistUrl}/d${mountPath.toString() === '/' ? '' : mountPath}/${type}/${body[0].filename}`,
    }
  } else {
    throw createError({ statusCode: 500, statusMessage: 'Upload Error!' })
  }
})
