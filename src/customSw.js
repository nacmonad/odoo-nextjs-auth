//public/sw.js

import {precacheAndRoute} from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);


self.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker 🤙");
});

self.addEventListener('push', event => {
    const options = {
      body: event.data.text(),
      icon: 'path/to/icon.png',
      badge: 'path/to/badge.png',
    };
    console.log("customSw.js[pushEvent]", event)
    event.waitUntil(
      self.registration.showNotification(process.env.APP_NAME, options)
    );
  });
  