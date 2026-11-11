const CACHE = "zroute-v11";
const CORE = [
  "./", "./index.html", "./manifest.webmanifest", "./icon.svg",
  "./fonts/fonts.css", "./fonts/font-1.ttf", "./fonts/font-2.ttf", "./fonts/font-3.ttf", "./fonts/font-4.ttf", "./fonts/font-5.ttf", "./fonts/font-6.ttf", "./fonts/font-7.ttf", "./fonts/font-8.ttf",
  "./fonts/noto-sans-regular.woff", "./fonts/noto-sans-bold.woff", "./fonts/noto-display-condensed-bold.woff", "./fonts/Noto-LICENSE.txt",
  "./assets/ui/road-bg.webp", "./assets/ui/road-bg-mobile.webp", "./assets/ui/city-map.webp", "./assets/ui/dmp-banner.webp",
  "./assets/heroes/aria-ssr.webp", "./assets/heroes/aria-ur.webp", "./assets/heroes/arnold.webp", "./assets/heroes/bekka.webp", "./assets/heroes/carter.webp", "./assets/heroes/celeste.webp", "./assets/heroes/conan.webp", "./assets/heroes/dirk.webp", "./assets/heroes/jack.webp", "./assets/heroes/katya.webp", "./assets/heroes/kim-mina.webp", "./assets/heroes/leah.webp", "./assets/heroes/lee-yu.webp", "./assets/heroes/logan.webp", "./assets/heroes/lucian.webp", "./assets/heroes/monroe.webp", "./assets/heroes/nicole.webp", "./assets/heroes/nora.webp", "./assets/heroes/rachel.webp", "./assets/heroes/silas.webp", "./assets/heroes/taylor.webp", "./assets/heroes/toxina.webp", "./assets/heroes/vera.webp", "./assets/heroes/victor.webp", "./assets/heroes/vince.webp", "./assets/heroes/virgilio.webp", "./assets/heroes/yana.webp", "./assets/heroes/zara.webp",
  "./assets/gear/ur_rifle.webp", "./assets/gear/ur_helmet.webp", "./assets/gear/ur_scope.webp", "./assets/gear/ur_vest.webp"
];
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
