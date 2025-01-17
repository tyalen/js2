self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('password-manager').then((cache) => {
            return cache.addAll(['/', '/manifest.json', '/icon.png']);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
