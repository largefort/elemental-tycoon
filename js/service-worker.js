const CACHE_NAME = 'elemental-tycoon-cache-v1';
const urlsToCache = [
    '/',
    '/index_alpha.html',
    '/index_beta.html',
    '/index_live.html',
    '/index_mobile.html',
    '/game.js',
    '/mobile.css',
    '/css/offlinemodal.css',
    '/css/progressstyles.css',
    '/js/offline.js',
    '/js/reset.js',
    '/js/upgrades.js',
    '/fire.gif',
    '/earth.gif',
    '/air.gif',
    '/light.gif',
    '/void.gif',
    '/water.gif',
];

// Install the service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Fetch assets
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return the response from the cached version
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
