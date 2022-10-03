importScripts('https://unpkg.com/blurhash-sw@1.0.11/dist/index.js');

blurhashSW({
  routeUrl: '/.blurhash/:blurhash',
  width: 32,
  height: 32,
});

self.addEventListener('install', (ev) => {
  ev.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(self.clients.claim());
});
