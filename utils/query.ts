import sql from '~/config/db'

export async function fetchAuth() {
  const data = await sql`
    SELECT config_value
    FROM public.kamera_config
    WHERE config_key IN ('auth_key','username','password')
    ORDER BY
    CASE config_key
      WHEN 'auth_key' THEN 1
      WHEN 'username' THEN 2
      WHEN 'password' THEN 3
    END;
  `
  const secretKey = data[0].config_value
  const username = data[1].config_value
  const password = data[2].config_value
  return { username, password, secretKey }
}

export async function fetchStorageInfo() {
  const data = await sql`
    SELECT config_value
    FROM public.kamera_config
    WHERE config_key IN ('accesskey_id','accesskey_secret','region','endpoint','bucket','storage_folder','cdn_url', 'alist_url','alist_token')
    ORDER BY
    CASE config_key
      WHEN 'accesskey_id' THEN 1
      WHEN 'accesskey_secret' THEN 2
      WHEN 'region' THEN 3
      WHEN 'endpoint' THEN 4
      WHEN 'bucket' THEN 5
      WHEN 'storage_folder' THEN 6
      WHEN 'cdn_url' THEN 7
      WHEN 'alist_url' THEN 8
      WHEN 'alist_token' THEN 9
    END;
  `
  const accesskeyId = data[0].config_value
  const accesskeySecret = data[1].config_value
  const region = data[2].config_value
  const endpoint = data[3].config_value
  const bucket = data[4].config_value
  const storageFolder = data[5].config_value
  const cdnUrl = data[6].config_value
  const alistUrl = data[7].config_value
  const alistToken = data[8].config_value
  return { accesskeyId, accesskeySecret, region, endpoint, bucket, storageFolder, cdnUrl, alistUrl, alistToken }
}
