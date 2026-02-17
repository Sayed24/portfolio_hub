self.addEventListener("install",e=>{
 e.waitUntil(
  caches.open("portfolio-cache")
  .then(c=>c.addAll([
   "./",
   "index.html",
   "styles.css",
   "app.js",
   "projects.json"
  ]))
 );
});

self.addEventListener("fetch",e=>{
 e.respondWith(
  caches.match(e.request).then(r=>r||fetch(e.request))
 );
});
