const CACHE_NAME = "credito-app-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/responsive.css",
  "./js/app.js",
  "./js/clientes.js",
  "./js/caja.js",
  "./js/resumen.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});