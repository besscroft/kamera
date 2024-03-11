export default defineAppConfig({
  noLoginPageWhiteList: [
    '/',
    '/login',
    '/tietie',
    '/cosplay',
    '/timeline',
    '/about',
    '/error',
  ],
  loginPageWhiteList: [
    '/admin',
    '/admin/list',
    '/admin/system',
    '/admin/upload',
  ],
  apiWhiteList: [
    '/api/login',
    '/api/verify',
    '/api/getImageList',
  ],
  mobileRow: 2,
  ui: {
    notifications: {
      position: 'top-0 bottom-auto',
    },
  },
  sentry: {
    dsn: 'https://442aa2629152ea087ea09db3e5157f37@o4505038753759232.ingest.sentry.io/4506268434104320',
  },
})
