import sql from '~/config/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const type = body.type
  const url = body.url
  const exif = body.exif
  const detail = body.detail
  const rating = body.rating || 0

  const data = await sql`
        INSERT INTO public.kamera_image (type, url, exif, detail, rating)
        VALUES (${type}, ${url}, ${JSON.stringify(exif)}, ${detail}, ${rating})
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
