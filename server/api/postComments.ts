import sql from '~/config/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const imageId = body.imageId;
  const comment = body.comment;
  
  try {
    const data = await sql`
      INSERT INTO public.Comments (PictureID, CommentText)
      VALUES (${imageId}, ${comment})
      RETURNING *;`;
    
      if (!data.length) {
        return {
          data: 1,
        }
      } else {
        return {
          data: 0,
        }
      }
  } catch (error) {
    console.error('Error inserting data:', error);
    return {
      data: 1, // 插入失败
    };
  }
});
