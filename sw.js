const CACHE = "zroute-v3";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg", "./fonts/fonts.css", "./fonts/font-1.ttf", "./fonts/font-2.ttf", "./fonts/font-3.ttf", "./fonts/font-4.ttf", "./fonts/font-5.ttf", "./fonts/font-6.ttf", "./fonts/font-7.ttf", "./fonts/font-8.ttf"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || (event.request.mode === "navigate" ? caches.match("./index.html") : undefined))));
});
