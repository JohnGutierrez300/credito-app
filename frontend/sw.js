const CACHE_NAME = "credito-app-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/responsive.css",
  "./js/app.js",
  "./js/clientes.js",
  "./js/caja.js",
  "./js/resumen.js",
  "https://cdn.tailwindcss.com",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});