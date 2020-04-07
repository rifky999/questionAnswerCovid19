importScripts("https://cdn.moengage.com/webpush/releases/serviceworker_cdn.min.latest.js");

const CACHE_NAME = "covid19-v11";

var urlsToCache = [
    "css/style.css"
    , "css/bt.css"
    , "js/bt.js"
    , "js/jquery-3.3.1.min.js"
    , "js/main.js"
    , "js/jquery.steps.js"
    , "js/ajx.js"
];



self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME && cacheName.startsWith("covid19")) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

