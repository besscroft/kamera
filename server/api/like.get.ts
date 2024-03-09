import sql from '~/config/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const imageId = body.imageId

  const data = await sql`
  SELECT
    Likes.LikeID,
    Likes.LikeCount,
    Likes.PictureID,
    Likes.LikeTime,
    Likes.IPAddress,
    Likes.UserAgent,
    kamera_image.*
FROM
    public.Likes
INNER JOIN public.kamera_image ON Likes.PictureID = kamera_image.id
WHERE
    kamera_image.id = ${imageId};
    `
  return data
})
