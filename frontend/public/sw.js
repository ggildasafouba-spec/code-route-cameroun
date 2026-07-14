const CACHE_NAME = "code-route-cm-v1";
const OFFLINE_URL = "/offline";

// Assets à mettre en cache pour le mode hors-ligne
const PRECACHE_ASSETS = [
  "/",
  "/offline",
  "/revision",
  "/cours",
  "/manifest.json",
];

// Installation du service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation - nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Stratégie de fetch : Network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== "GET") return;

  // Ignorer les requêtes API (toujours réseau)
  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Mettre en cache la réponse réussie
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // En cas d'échec réseau, servir depuis le cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Si pas en cache, afficher la page offline
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
          return new Response("Offline", { status: 503 });
        });
      })
  );
});
