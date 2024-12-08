const CACHE_NAME = "mi-pwa-cache-v2";
const urlsToCache = [
'/',
'./assets/favicon.ico',
'./assets/img/animeli.png',
'./assets/img/carrusel1.jpeg',
'./assets/img/carrusel2.jpeg',
'./assets/img/carrusel3.jpeg',
'./assets/img/carrusel4.jpeg',
'./assets/img/carrusel5.jpeg',
'./assets/img/carrusel6.jpeg',
'./assets/img/carrusel7.jpeg',
'./assets/img/cursos.png',
'./assets/img/Develop.png',
'./assets/img/iea.png',
'./assets/img/img1.png',
'./assets/img/img2.png',
'./assets/img/img3.png',
'./assets/img/img4.png',
'./assets/img/leds.png',
'./assets/img/portafolio1.png',
'./assets/img//smarth.png',
'./assets/img/yo.jpg',
'./img/fav-icon-192x192.png',
'./img/fav-icon-512x512.png.png',
'./index.html',
'./css/style.css',
'/js/scripts.js',
];

self.addEventListener('install', e =>{
    e.waitUntil( //le decimos que detenga el evento hasta que se ejecute lo siguiente
        caches.open(CACHE_NAME)
        .then(cache =>{
            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting)
        })

    )
})

self.addEventListener('activate', e =>{
    const listaBlancaCache = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(nombresCache => {
            return Promise.all(
                nombresCache.map(nombresCache =>{
                    if(listaBlancaCache.indexOf(nombresCache) === -1){
                        return caches.delete(nombresCache)
                    }
                })
            )
        })
        //activamos la cache actualizada
        .then(()=> self.clients.claim())
    )

})

//fetch consulta al servidor para saber si esta en linea
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res)
            {
                return res
            }
            return fetch(e.request)
        })
    )
})