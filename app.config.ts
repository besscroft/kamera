export default defineAppConfig({
    noLoginPageWhiteList: [
        '/',
        '/login',
        '/tietie',
        '/cosplay',
        '/timeline',
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
    ]
})
