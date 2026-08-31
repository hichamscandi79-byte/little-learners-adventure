/**
 * Minimal hand-written service worker (Phase 4: PWA installability).
 *
 * Goals: let the installed app open instantly and work offline after the
 * first visit, without a build-time asset manifest. Bump CACHE_VERSION on
 * any future deploy that should force-refresh previously cached files —
 * old-versioned caches are deleted on activate.
 */

const CACHE_VERSION = "lla-cache-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // App-shell navigations: try the network first (so a new deploy is picked
  // up immediately while online), fall back to the last cached page offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(new URL(".", request.url)))),
    );
    return;
  }

  // Static assets (JS/CSS/fonts/audio/icons): cache-first, since content at
  // a given URL never changes after it ships — fast repeat loads and full
  // offline playback once a world's audio has been visited once.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    }),
  );
});
