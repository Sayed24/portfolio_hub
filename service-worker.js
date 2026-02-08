const CACHE = 'portfolio-v2';
const FILES = [
'./',
'./index.html',
'./projects.json',
'./assets/css/style.css',
'./assets/js/app.js'
];


self.addEventListener('install', e => {
e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});


self.addEventListener('fetch', e => {
e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
const CACHE_NAME = 'portfolio-cache-v1';
const ASSETS = [
'./',
'./index.html',
'./assets/css/style.css',
'./assets/js/app.js'
];


self.addEventListener('install', e => {
e.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
);
});


self.addEventListener('fetch', e => {
e.respondWith(
caches.match(e.request).then(res => res || fetch(e.request))
);
});
