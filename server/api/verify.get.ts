import jwt from 'jsonwebtoken'

export default defineEventHandler(async (req) => {
    const token = req.headers.get('authorization').replace("Bearer ", "")
    const secretKey = process.env.AUTH_KEY;
    try {
        const { err } = jwt.verify(token, secretKey);
    } catch (e) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        })
    }
    return {
        data: 0,
    }
})
