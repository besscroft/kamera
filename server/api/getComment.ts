import sql from '~/config/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const imageId = body.imageId
  // const { imageId } = event.context.params || event.context.query;
  const data = await sql`
  SELECT Comments.*
  FROM Comments
  JOIN kamera_image ON Comments.PictureID = kamera_image.id
  WHERE kamera_image.id = ${imageId};
    `

  return data
})
