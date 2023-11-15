import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
    const { noLoginPageWhiteList, loginPageWhiteList, apiWhiteList } = useAppConfig()
    if ([noLoginPageWhiteList, loginPageWhiteList, apiWhiteList].some(i => i.includes(event._path))) {
        return
    }
    const token = event.headers.get('authorization')?.replace("Bearer ", "")
    const secretKey = process.env.JWT_KEY
    try {
        const { err } = jwt.verify(token, secretKey);
    } catch (e) {
        sendRedirect(event, '/login', 302)
    }
})
