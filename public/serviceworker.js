var CACHE_NAME = "gold-1.0.1";
var urlsToCache = [
  "/registration/login",
  "/registration/signup",
  "/registration/changePassword",
  "/registration/changePassword/:id",
  "/users/list",
  "/users/edit/:id",
  "/trade",
  "/balanceReport",
  "/manualDocument",
  "/settings",
  "/terms",
  "/price/list",
  "/price/add",
  "/price/edit",
  "/price/sort",
  "/requests/customer/list",
  "/requests/customer/list/:id",
  "/docs/list",
  "/docs/list/:reportType",
  "/balance/accountBalance",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});
