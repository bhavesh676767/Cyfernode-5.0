const CACHE_NAME = 'cyfernode-v1';
const IMAGE_CACHE_NAME = 'cyfernode-team-images-v1';

// Assets to pre-cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/team',
  '/styles.css',
  '/nav.js',
  '/invite-widget.js'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline shell');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Handle intercepting and caching strategies
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Strategy 1: Cache-First for local team images (they are immutable)
  if (requestUrl.pathname.startsWith('/images/team/')) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Strategy 2: Stale-While-Revalidate for other local assets (HTML, CSS, JS)
  // Only intercept same-origin requests (avoid breaking external CDN fonts or API calls)
  if (event.request.mode === 'navigate' || 
      requestUrl.origin === self.location.origin) {
    
    // Ignore internal dev paths or specific actions if any
    if (requestUrl.pathname.startsWith('/socket.io') || requestUrl.pathname.includes('webpack')) {
      return;
    }

    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch((err) => {
            console.warn('[Service Worker] Fetch failed, serving cached fallback if available:', err);
            // If network fails and no cache, let it fail naturally
          });

          // Return cached response instantly if available, otherwise wait for network
          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});
