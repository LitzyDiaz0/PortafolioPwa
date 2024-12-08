
const CACHE_NAME = "V1_cache_PWA_IDGS";

urlsToCache = [
    '/',
    '/css/style.css',
    '/js/scripts.js',
    '/assets/favicon.ico',
    '/assets/img/animeli.png',
    '/assets/img/carrusel1.jpeg',
    '/assets/img/carrusel2.jpeg',
    '/assets/img/carrusel3.jpeg',
    '/assets/img/carrusel4.jpeg',
    '/assets/img/carrusel5.jpeg',
    '/assets/img/carrusel6.jpeg',
    '/assets/img/carrusel7.jpeg',
    '/assets/img/cursos.png',
    '/assets/img/Develop.png',
    '/assets/img/iea.png',
    '/assets/img/img1.png',
    '/assets/img/img2.png',
    '/assets/img/img3.png',
    '/assets/img/img4.png',
    '/assets/img/leds.png',
    '/assets/img/portafolio1.png',
    '/assets/img/smarth.png',
    '/assets/img/yo.jpg',
    '/img/fav-icon-60x60.png',
    '/img/fav-icon-96x96.png',
    '/img/fav-icon-120x120.png',
    '/img/fav-icon-180x180.png',
    '/img/fav-icon-192x192.png',
    '/img/fav-icon-512x512.png',
    '/img/favicon-16x16.png',
    '/img/favicon-32x32.png',
    'index.html',
    'serviceworker.js',
    'manifest.json',
    'script.js',    
];

//Funcion de instalacion
//almacena el nombre y los archivos que van a ir guardados en cache
self.addEventListener('install', e => {
    e.waitUntil(
    caches.open(CACHE_NAME)
        .then(cache => {
        console.log('Cache abierta y recursos agregados');
        return cache.addAll(urlsToCache);
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    const allowedCaches = [CACHE_NAME];
    e.waitUntil(
    caches.keys()
        .then(cacheNames => {
        return Promise.all(
            cacheNames.map(cache => {
            if (!allowedCaches.includes(cache)) {
                return caches.delete(cache);
            }
            })
        );
        })
        .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
    caches.match(e.request)
        .then(response => {
        if (response) {
            return response; // Devuelve el recurso desde la caché si existe
        }
        return fetch(e.request).catch(() => new Response('No disponible'));
        })
    );
});
