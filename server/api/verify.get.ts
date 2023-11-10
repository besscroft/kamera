import jwt from 'jsonwebtoken'

export default defineEventHandler(async (req) => {
    const token = req.headers.get('authorization').replace("Bearer ", "")
    const secretKey = process.env.JWT_KEY;
    const { err } = jwt.verify(token, secretKey);
    if (err) {
        return {
            data: 1,
        }
    } else {
        return {
            data: 0,
        }
    }
})
