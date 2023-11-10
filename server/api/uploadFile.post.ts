import s3 from '~/config/s3'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const token = event.headers.get('authorization').replace("Bearer ", "")
    const secretKey = process.env.JWT_KEY
    const { err } = jwt.verify(token, secretKey)

    if (err) {
        return {
            data: 1,
        }
    } else {
        const body = await readMultipartFormData(event)

        const uploadParams = { Bucket: process.env.Bucket, Key: '', Body: '' }
        const file = body[0].data
        const fileName = body[0].filename
        uploadParams.Body = file
        uploadParams.Key = fileName


        await s3.upload(uploadParams, function (err, data) {
            if (err) {
                throw createError({ statusCode: 500, statusMessage: 'Upload Error!' })
            }
            console.log(data.Location)
        });
        return {
            data: 0,
            url: `https://${process.env.Bucket}.${process.env.Endpoint}/${fileName}`,
        }
    }

    // s3.listObjects({
    //     Bucket : process.env.Bucket,
    //     Prefix : 'cosplay/',
    //     Marker : 'cosplay/'
    // }, function(err, data) {
    //     if (err) {
    //         console.log("Error", err);
    //     } else {
    //         console.log("Success", data);
    //     }
    // });

})
