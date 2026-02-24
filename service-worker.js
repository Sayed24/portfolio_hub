
const CACHE="portfolio-v3";

self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>
      c.addAll([
        "/",
        "/index.html",
        "/project.html",
        "/css/base.css",
        "/css/layout.css",
        "/js/app.js"
      ])
    )
  );
});

self.addEventListener("fetch",e=>{
  e.respondWith(
    fetch(e.request)
      .then(res=>{
        const clone=res.clone();
        caches.open(CACHE).then(c=>c.put(e.request,clone));
        return res;
      })
      .catch(()=>caches.match(e.request))
  );
});
