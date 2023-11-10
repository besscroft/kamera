import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: process.env.AccessKey_ID,
    secretAccessKey: process.env.AccessKey_Secret,
    region: process.env.Region,
    endpoint: process.env.Endpoint,
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'})

export default s3;
