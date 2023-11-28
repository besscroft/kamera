export default defineAppConfig({
    photos: [
        {
            title: 'Cosplay',
            url: '/cosplay',
        },
        {
            title: '集邮',
            url: '/tietie',
        },
        {
            title: '时光相册',
            url: '/timeline',
        },
    ],
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
    ],
    apiWhiteList: [
        '/api/login',
        '/api/verify',
        '/api/music',
        '/api/getImageList',
    ],
    ui: {
        notifications: {
            position: 'top-0 bottom-auto',
        }
    },
    sentry: {
        dsn: 'https://442aa2629152ea087ea09db3e5157f37@o4505038753759232.ingest.sentry.io/4506268434104320',
    }
})
