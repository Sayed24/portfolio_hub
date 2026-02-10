const CACHE = 'portfolio-v3';
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
