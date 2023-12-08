import s3 from '~/config/s3'

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event)

  const file = body[0].data
  const storage = body[1].data
  const type = body[2].data
  const mountPath = body[3].data

  if (storage && storage.toString() === 's3') {
    const uploadParams = { Bucket: process.env.Bucket, Key: '', Body: '' }
    const fileName = process.env.STORAGE_FOLDER && process.env.STORAGE_FOLDER !== '/'
      ? `${process.env.STORAGE_FOLDER}/${type}/${body[0].filename}`
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
      url: process.env.CDN_URL && process.env.CDN_URL !== ''
        ? `https://${process.env.CDN_URL}/${fileName}`
        : `https://${process.env.Bucket}.${process.env.Endpoint}/${fileName}`,
    }
  } else if (storage && storage.toString() === 'alist') {
    await $fetch(`${process.env.ALIST_URL}/api/fs/put`, {
      timeout: 60000,
      method: 'put',
      headers: {
        'Authorization': process.env.ALIST_TOKEN,
        'File-Path': encodeURIComponent(`${mountPath.toString() === '/' ? '' : mountPath}/${type}/${body[0].filename}`),
      },
      body: file,
    }).catch(e => {
      console.log(e)
      throw createError({ statusCode: 500, statusMessage: 'Upload Error!' })
    })
    return {
      data: 0,
      url: `${process.env.ALIST_URL}/d${mountPath.toString() === '/' ? '' : mountPath}/${type}/${body[0].filename}`,
    }
  } else {
    throw createError({ statusCode: 500, statusMessage: 'Upload Error!' })
  }
})
