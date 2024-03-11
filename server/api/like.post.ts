import sql from '~/config/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const imageId = body.imageId
  const score = body.score
  const data = await sql`
  INSERT INTO public.Likes (LikeCount, PictureID)
VALUES (${score}, ${imageId});
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
