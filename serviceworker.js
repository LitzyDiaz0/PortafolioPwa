const CACHE_NAME = "V1_cache_PWA_IDGS";
const urlsToCache = [
    "/", // Asegúrate de que esta sea la raíz
    "/index.html",
    "/css/style.css",
    "/js/scripts.js",
    "/assets/favicon.ico",
    "/assets/img/animeli.png",
    "/assets/img/carrusel1.jpeg",
    "/assets/img/carrusel2.jpeg",
    "/assets/img/carrusel3.jpeg",
    "/assets/img/carrusel4.jpeg",
    "/assets/img/carrusel5.jpeg",
    "/assets/img/carrusel6.jpeg",
    "/assets/img/carrusel7.jpeg",
    "/assets/img/cursos.png",
    "/assets/img/Develop.png",
    "/assets/img/iea.png",
    "/assets/img/img1.png",
    "/assets/img/img2.png",
    "/assets/img/img3.png",
    "/assets/img/img4.png",
    "/assets/img/leds.png",
    "/assets/img/portafolio1.png",
    "/assets/img/smarth.png",
    "/assets/img/yo.jpg",
    "/img/fav-icon-60x60.png",
    "/img/fav-icon-96x96.png",
    "/img/fav-icon-120x120.png",
    "/img/fav-icon-180x180.png",
    "/img/fav-icon-192x192.png",
    "/img/fav-icon-512x512.png",
    "/img/favicon-16x16.png",
    "/img/favicon-32x32.png",
    "/manifest.json",
];

// Evento de instalación
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Archivos en caché:");
                return cache.addAll(urlsToCache);
            })
            .catch((err) => console.error("Error al agregar archivos al caché:", err))
    );
});

// Evento de activación
self.addEventListener("activate", (e) => {
    const allowedCaches = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames.map((cache) => {
                        if (!allowedCaches.includes(cache)) {
                            console.log("Caché eliminado:", cache);
                            return caches.delete(cache);
                        }
                    })
                )
            )
            .then(() => self.clients.claim())
    );
});

// Evento de fetch
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request)
            .then((response) => {
                // Devuelve el recurso desde la caché o realiza un fetch
                return response || fetch(e.request);
            })
            .catch(() => {
                // Página de respaldo si no hay conexión y el recurso no está en caché
                if (e.request.mode === "navigate") {
                    return caches.match("/index.html");
                }
            })
    );
});

self.addEventListener('fetch', e => {
    console.log('Interceptando:', e.request.url);
    e.respondWith(
    caches.match(e.request)
        .then(response => {
        if (response) {
            console.log('Recurso servido desde la caché:', e.request.url);
            return response;
        }
        console.log('Recurso solicitado desde la red:', e.request.url);
        return fetch(e.request).catch(() => new Response('No disponible'));
        })
    );
});

