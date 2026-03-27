self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("portfolio").then(cache => {
      return cache.addAll([
        "/portfolio_hub/",
        "/portfolio_hub/index.html"
      ]);
    })
  );
});
