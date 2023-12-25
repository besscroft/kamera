import jwt from 'jsonwebtoken'
import { secretKey } from '~/utils/query'

export default defineEventHandler(async (event) => {
  const { noLoginPageWhiteList, loginPageWhiteList, apiWhiteList } = useAppConfig()
  if ([noLoginPageWhiteList, loginPageWhiteList, apiWhiteList].some(i => i.includes(event._path))) {
    return
  }
  const token = event.headers.get('authorization')?.replace('Bearer ', '')
  try {
    const {err} = jwt.verify(token, secretKey)
  } catch (e) {
    console.log(e)
    sendRedirect(event, '/login', 302)
  }
})
