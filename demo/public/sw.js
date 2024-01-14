importScripts('https://unpkg.com/blurhash-sw@1.0.15/dist/index.js');

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

self.addEventListener('fetch', (/** @type {FetchEvent} */ ev) => {
  const url = new URL(ev.request.url);
  const delay = parseInt(url.searchParams.get('__delay__'));

  if (Number.isFinite(delay)) {
    return ev.respondWith(
      Promise.all([
        fetch(ev.request, { cache: 'no-store', mode: 'cors', credentials: 'omit' }).then((res) => {
          return new Response(res.body, {
            headers: new Headers([...res.headers, ['Cache-Control', 'no-store']]),
          });
        }),
        new Promise((resolve) => setTimeout(resolve, delay)),
      ]).then(([res]) => res),
    );
  } else {
    return;
  }
});
