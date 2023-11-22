import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter()
    const config = useAppConfig()

    if (!config.sentry.dsn) {
        return
    }

    Sentry.init({
        app: nuxtApp.vueApp,
        dsn: config.sentry.dsn,
        integrations: [
            new Sentry.BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            }),
            new Sentry.Replay(),
        ],

        // Configure this whole part as you need it!

        tracesSampleRate: 0.2, // Change in prod

        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ['https://kamera.heming.dev'],

        replaysSessionSampleRate: 1.0, // Change in prod
        replaysOnErrorSampleRate: 1.0, // Change in prod if necessary
    })
})
