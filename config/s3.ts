import AWS from 'aws-sdk'
import { accesskeyId, accesskeySecret, endpoint, region } from '~/utils/query'

AWS.config.update({
  accessKeyId: accesskeyId,
  secretAccessKey: accesskeySecret,
  region: region,
  endpoint: endpoint,
})

const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

export default s3
