/*
 * This file is picked up by the build system only
 * when building for PRODUCTION
 */

import { register } from 'register-service-worker'
import { Notify } from 'quasar'

register(process.env.SERVICE_WORKER_FILE, {
  ready () {
    console.log('App is being served from cache by a service worker.')
  },
  registered (registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('Service worker has been registered.')
  },
  cached (registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('Content has been cached for offline use.')
  },
  updatefound (registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('New content is downloading.')
  },
  updated (registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('New content is available; please refresh.')
    return Notify.create({
      timeout: 0,
      message: 'New version available. Press UPDATE button now',
      actions: [
        { icon: 'fal fa-sync-alt',
          label: 'UPDATE',
          handler: () => {
            return registration.waiting.postMessage('skipWaiting')
          } }]
    })
  },
  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error (err) {
    console.error('Error during service worker registration:', err)
  }
})

// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
