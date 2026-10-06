// Aqua service worker: caches app shell, Leaflet assets and Google map tiles
const CACHE_NAME = 'aqua-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  './css/quasar.prod.css',
  './css/fonts.css',
  './css/app.css',
  './css/transitions.css',
  './js/vue.global.prod.js',
  './js/vue-router.global.prod.js',
  './js/quasar.umd.prod.js',
  './js/en-US.umd.prod.js',
  './js/fr.umd.prod.js',
  './js/ar.umd.prod.js',
  './manifest.json'
];

function isCacheable(url) {
  return (
    url.includes('google.com/vt') ||           // Google map tiles
    url.includes('unpkg.com/leaflet') ||       // Leaflet css/js
    url.startsWith(self.location.origin)       // same-origin app files
  );
}

// Pre-warm the tile cache for the Algeria area (zooms 5-7)
const ALGERIA_BOUNDS = [
  [18.968147, -8.6845],
  [37.2962, 11.9994]
];

function lng2tile(lng, z) {
  return Math.floor(((lng + 180) / 360) * Math.pow(2, z));
}

function lat2tile(lat, z) {
  const rad = (lat * Math.PI) / 180;
  return Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * Math.pow(2, z));
}

async function prewarmAlgeriaTiles(cache) {
  const jobs = [];
  for (let z = 5; z <= 7; z++) {
    const xMin = lng2tile(ALGERIA_BOUNDS[0][1], z);
    const xMax = lng2tile(ALGERIA_BOUNDS[1][1], z);
    const yMin = lat2tile(ALGERIA_BOUNDS[1][0], z);
    const yMax = lat2tile(ALGERIA_BOUNDS[0][0], z);
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        const sub = ['mt0', 'mt1', 'mt2', 'mt3'][(x + y) % 4];
        const url = `https://${sub}.google.com/vt/lyrs=p&x=${x}&y=${y}&z=${z}`;
        jobs.push(
          fetch(url, { mode: 'no-cors' })
            .then((response) => {
              if (response && (response.ok || response.type === 'opaque')) {
                return cache.put(url, response);
              }
            })
            .catch(() => {})
        );
      }
    }
  }
  await Promise.allSettled(jobs);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(PRECACHE_URLS).catch(() => {});
      await prewarmAlgeriaTiles(cache).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  if (event.request.method !== 'GET' || !isCacheable(url)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && (response.ok || response.type === 'opaque')) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
