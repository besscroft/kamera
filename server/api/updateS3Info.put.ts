import sql from '~/config/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const accesskeyId = body.accesskeyId || 'N&A'
  const accesskeySecret = body.accesskeySecret || 'N&A'
  const region = body.region || 'N&A'
  const endpoint = body.endpoint || 'N&A'
  const bucket = body.bucket || 'N&A'
  const storageFolder = body.storageFolder || 'N&A'
  const cdnUrl = body.cdnUrl || 'N&A'

  const data = await sql`
      UPDATE public.kamera_config
      SET config_value = CASE
         WHEN config_key = 'accesskey_id' THEN ${accesskeyId}
         WHEN config_key = 'accesskey_secret' THEN ${accesskeySecret}
         WHEN config_key = 'region' THEN ${region}
         WHEN config_key = 'endpoint' THEN ${endpoint}
         WHEN config_key = 'bucket' THEN ${bucket}
         WHEN config_key = 'storage_folder' THEN ${storageFolder}
         WHEN config_key = 'cdn_url' THEN ${cdnUrl}
         ELSE ''
      END
      WHERE config_key IN ('accesskey_id', 'accesskey_secret', 'region', 'endpoint', 'bucket', 'storage_folder', 'cdn_url');
  `
  if (!data.length) {
    return {
      data: 0,
    }
  } else {
    return {
      data: 1,
    }
  }
})
