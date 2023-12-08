import sql from '~/config/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = body.id || 0
  const show = body.show || 0

  if (id && id > 0) {
    const data = await sql`
            UPDATE public.kamera_image
            SET show = ${show}
            WHERE id = ${id}
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
  }
  else {
    return {
      data: 1,
    }
  }
})
