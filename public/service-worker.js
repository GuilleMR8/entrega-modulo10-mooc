const CACHE_NAME = 'shooter-pwa-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/game.css',
  '/Game.js',
  '/Entity.js',
  '/Character.js',
  '/Player.js',
  '/Opponent.js',
  '/Shot.js',
  '/main.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});
