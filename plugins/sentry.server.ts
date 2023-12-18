import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import { H3Error } from 'h3'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useAppConfig()

  if (!config.sentry.dsn) {
    console.warn('Sentry DSN not set, skipping Sentry initialization')
    return
  }

  Sentry.init({
    dsn: config.sentry.dsn,
    integrations: [
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 0.5,
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 0.5,
  })

  nuxtApp.hooks.hook('error', (error) => {
    // Do not handle 404s and 422s
    if (error instanceof H3Error) {
      if (error.statusCode === 404 || error.statusCode === 422) {
        return
      }
    }

    Sentry.captureException(error)
  })

  nuxtApp.hooks.hook('request', (event) => {
    event.context.$sentry = Sentry
  })

  nuxtApp.hooks.hookOnce('close', async () => {
    await Sentry.close(2000)
  })
})
