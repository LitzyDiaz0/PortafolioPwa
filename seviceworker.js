const CACHE_NAME = "mi-pwa-cache-v1";
const urlsToCache = [
"/",
"./index.html",
"./css/style.css",
"/js/scripts.js",
"./assets/favicon.ico",
"./assets/img/animeli.png",
"./assets/img/carrusel1.jpeg",
"./assets/img/carrusel2.jpeg",
"./assets/img/carrusel3.jpeg",
"./assets/img/carrusel4.jpeg",
"./assets/img/carrusel5.jpeg",
"./assets/img/carrusel6.jpeg",
"./assets/img/carrusel7.jpeg",
"./assets/img/cursos.png",
"./assets/img/Develop.png",
"./assets/img/iea.png",
"./assets/img/img1.png",
"./assets/img/img2.png",
"./assets/img/img3.png",
"./assets/img/img4.png",
"./assets/img/leds.png",
"./assets/img/portafolio1.png",
"./assets/img//smarth.png",
"./assets/img/yo.jpg",
"./img/fav-icon-192x192.png",
"./img/fav-icon-512x512.png.png",
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
        console.log("Abriendo cache...");
        return cache.addAll(urlsToCache);
    })
    );
});

// Interceptar solicitudes de recursos
self.addEventListener("fetch", (event) => {
    event.respondWith(
    caches.match(event.request).then((response) => {
        return response || fetch(event.request);
    })
    );
});

// Borrar caché antigua
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
    caches.keys().then((cacheNames) => {
        return Promise.all(
        cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
            }
        })
        );
    })
    );
});