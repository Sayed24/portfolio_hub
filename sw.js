self.addEventListener("install",event=>{

event.waitUntil(

caches.open("portfolio").then(cache=>{
return cache.add("/")
})

)

})
