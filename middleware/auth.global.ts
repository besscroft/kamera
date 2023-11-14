export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const user = useUserStore()

        if (to.path === '/login' || to.path === '/' || to.path === '/tietie' || to.path === '/cosplay' || to.path === '/timeline')
            return
        if (to.path.startsWith('/admin') && !user.token) {
            return navigateTo('/login')
        }
        const { data } = await $fetch('/api/verify', {
            method: 'get',
            headers: {
                Authorization: `${user.tokenName} ${user.token}`
            }
        }).catch((error) => {
            console.log(error)
            return navigateTo('/login')
        })
        if (data === !0) {
            return navigateTo('/login')
        }
    }
})
