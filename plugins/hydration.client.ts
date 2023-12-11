export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hookOnce('app:mounted', () => {
    isHydrated.value = true
  })
})
