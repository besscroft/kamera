import sql from '~/config/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const imageId = body.imageId
  const comment = body.comment
  const data = await sql`
  INSERT INTO public.Comments (PictureID, CommentText, )
  VALUES (${imageId}, ${comment});
  
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
