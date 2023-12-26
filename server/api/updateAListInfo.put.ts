import sql from '~/config/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const alistUrl = body.alistUrl || 'N&A'
  const alistToken = body.alistToken || 'N&A'

  const data = await sql`
      UPDATE public.kamera_config
      SET config_value = CASE
         WHEN config_key = 'alist_url' THEN ${alistUrl}
         WHEN config_key = 'alist_token' THEN ${alistToken}
         ELSE 'N&A'
      END
      WHERE config_key IN ('alist_url', 'alist_token');
  `
  if (!data.length) {
    return {
      data: 0,
    }
  }
  else {
    return {
      data: 1,
    }
  }
})
