
const CACHE_NAME = "V1_cache_PWA_IDGS";

//todo va en cache audios, estilos, etc
urlsToCache = [
    './',
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
    './assets/img/smarth.png',
    './assets/img/yo.jpg',
    './css/styles.css'
];

//Funcion de instalacion
//almacena el nombre y los archivos que van a ir guardados en cache

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