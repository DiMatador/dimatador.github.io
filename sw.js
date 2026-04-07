const CACHE_NAME = 'yyc-trauma-v1'; // Update this version when you change files
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
];

// 1. Install Event: Saves the assets to the phone's storage
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('SW: Pre-caching essential assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); // Forces the new service worker to take over immediately
});

// 2. Activate Event: Cleans up old caches from previous versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('SW: Clearing old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 3. Fetch Event: The "Bridge" that makes it work offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return the cached file if found, otherwise try the network
            return response || fetch(event.request);
        }).catch(() => {
            // Optional: If both fail (offline and not cached), show index.html
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
            }
        })
    );
});
