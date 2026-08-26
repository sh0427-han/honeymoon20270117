const CACHE_VERSION = "honeymoon-v13";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./enhancements.css",
  "./booking-apps.css",
  "./personalization.css",
  "./schedule-route.css",
  "./travel-now.css",
  "./pwa.css",
  "./itinerary.js",
  "./app.js",
  "./time-context.js",
  "./schedule-fixes.js",
  "./booking-data.js",
  "./enhancements.js",
  "./booking-apps.js",
  "./travel-now.js",
  "./pwa.js",
  "./manifest.webmanifest",
  "./app-icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("honeymoon-") && key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

const cachedAppResponse = async (request) => {
  const cache = await caches.open(CACHE_VERSION);
  return cache.match(request, { ignoreSearch: true });
};

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  // Navigation: prefer fresh HTML when online, fall back to the cached app shell.
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_VERSION);
        cache.put("./index.html", response.clone());
        return response;
      } catch (error) {
        return (await caches.match("./index.html")) || (await caches.match("./"));
      }
    })());
    return;
  }

  // App files: use stale-while-revalidate so offline loads are immediate while
  // still refreshing cached resources whenever the network is available.
  if (sameOrigin) {
    event.respondWith((async () => {
      const cached = await cachedAppResponse(request);
      const networkPromise = fetch(request)
        .then(async (response) => {
          if (response && response.ok) {
            const cache = await caches.open(CACHE_VERSION);
            await cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => null);

      if (cached) {
        event.waitUntil(networkPromise);
        return cached;
      }

      return (await networkPromise) || new Response("Offline", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    })());
    return;
  }

  // Cross-origin resources such as Leaflet/CDN tiles are not required for the
  // offline itinerary. Cache successful responses opportunistically only.
  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response && (response.ok || response.type === "opaque")) {
        const cache = await caches.open(`${CACHE_VERSION}-runtime`);
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    } catch (error) {
      const runtime = await caches.open(`${CACHE_VERSION}-runtime`);
      return (await runtime.match(request)) || new Response("", { status: 503 });
    }
  })());
});
