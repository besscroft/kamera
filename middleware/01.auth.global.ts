export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUserStore()
    if (to.path === '/login') {
        return
    }
    if (to.path.startsWith('/admin') && process.client && !user.token) {
        return navigateTo('/login')
    }
})
