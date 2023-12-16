import sql from '~/config/db'

export default defineEventHandler(async (event) => {
  const total = await sql`
      SELECT 
          COUNT(1) AS total,
          SUM(CASE WHEN show = 0 THEN 1 ELSE 0 END) AS show_total
      FROM
          public.kamera_image
      WHERE
          del = 0
  `

  const typeTotal = await sql`
      SELECT 
          type,
          COUNT(1)
      FROM 
          public.kamera_image
      WHERE 
          del = 0
      GROUP BY type
  `

  return {
    data: {
      total: total[0],
      typeTotal,
    },
  }
})
