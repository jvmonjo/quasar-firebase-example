/* eslint-disable no-undef */
/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    console.log('skipwaiting called')
    self.skipWaiting()
  }
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (event) => {
  const title = 'TS Blades'
  const options = {
    body: event.data.text(),
    renotify: true,
    icon: event.data && event.data.notification && event.data.notification.icon ? event.data.notification.icon : '/statics/icons/icon-512x512.png',
    badge: event.data && event.data.notification && event.data.notification.badge ? event.data.notification.badge : '/statics/icons/icon-128x128.png',
    image: event.data && event.data.notification && event.data.notification.image ? event.data.notification.image : '',
    // sound: event.data.notification.sound || '/statics/sounds/notificacio.mp3',
    timestamp: event.data && event.data.notification && event.data.notification.timestamp ? event.data.notification.timestamp : Date.parse(new Date()),
    vibrate: event.data && event.data.notification && event.data.notification.vibrate ? event.data.notification.vibrate : [200, 100, 200, 100, 200, 100, 200],
    tag: event.data && event.data.notification && event.data.notification.tag ? event.data.notification.tag : 'tsblades-tag',
    click_action: event.data && event.data.notification && event.data.notification.click_action ? event.data.notification.click_action : `${functions.config().app.baseurl}`
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function (event) {
  const url = event.click_action || `${functions.config().app.baseurl}`
  event.notification.close() // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i]
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus()
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url)
      }
    })
  )
})

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
