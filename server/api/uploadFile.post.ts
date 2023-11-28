import s3 from '~/config/s3'

export default defineEventHandler(async (event) => {
    const body = await readMultipartFormData(event)

    const uploadParams = { Bucket: process.env.Bucket, Key: '', Body: '' }
    const file = body[0].data
    const type = body[1].data
    const fileName = process.env.STORAGE_FOLDER && process.env.STORAGE_FOLDER !== '/'
        ? process.env.STORAGE_FOLDER + '/' + type + '/' + body[0].filename
        : type + '/' + body[0].filename
    uploadParams.Body = file
    uploadParams.Key = fileName

    await s3.upload(uploadParams, function (err, data) {
        if (err) {
            throw createError({ statusCode: 500, statusMessage: 'Upload Error!' })
        }
    });
    return {
        data: 0,
        url: process.env.CDN_URL && process.env.CDN_URL !== ''
            ? `https://${process.env.CDN_URL}/${fileName}`
            : `https://${process.env.Bucket}.${process.env.Endpoint}/${fileName}`,
    }
})
