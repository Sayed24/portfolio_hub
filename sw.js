self.addEventListener("install",e=>{

e.waitUntil(

caches.open("portfolio")
.then(cache=>cache.add("/"))

)

})
