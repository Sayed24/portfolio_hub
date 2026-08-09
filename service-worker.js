/* ==========================================================================
   PORTFOLIO HUB
   Service Worker
   File: service-worker.js

   IMPORTANT:
   This service worker is written ONLY for the locked simplified structure.

   Current application files:
   - index.html
   - assets/css/style.css
   - assets/js/app.js
   - data/projects.json
   - manifest.json
   ========================================================================== */

"use strict";


/* ==========================================================================
   CACHE VERSION

   IMPORTANT:
   The version is intentionally changed to v2.

   This forces browsers that previously cached an older Portfolio Hub version
   to create a completely new cache instead of continuing to use old files.
   ========================================================================== */

const CACHE_VERSION =
  "v2";

const STATIC_CACHE =
  `portfolio-hub-static-${CACHE_VERSION}`;

const RUNTIME_CACHE =
  `portfolio-hub-runtime-${CACHE_VERSION}`;

const CACHE_PREFIX =
  "portfolio-hub-";


/* ==========================================================================
   CORE APPLICATION FILES
   ========================================================================== */

const CORE_FILES = [
  "./",
  "./index.html",
  "./assets/css/style.css",
  "./assets/js/app.js",
  "./data/projects.json",
  "./manifest.json"
];


/* ==========================================================================
   FILE TYPE HELPERS
   ========================================================================== */

const IMAGE_PATTERN =
  /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i;

const FONT_PATTERN =
  /\.(woff|woff2|ttf|otf)$/i;


/* ==========================================================================
   INSTALL
   ========================================================================== */

self.addEventListener(
  "install",
  (event) => {
    event.waitUntil(
      installServiceWorker()
    );
  }
);


async function installServiceWorker() {
  try {
    const cache =
      await caches.open(
        STATIC_CACHE
      );

    /*
     * Cache each core file independently.
     *
     * One missing optional resource must never prevent
     * the entire service worker from installing.
     */

    await Promise.allSettled(
      CORE_FILES.map(
        async (file) => {
          try {
            const request =
              new Request(
                file,
                {
                  cache: "reload"
                }
              );

            const response =
              await fetch(
                request
              );

            if (
              !response.ok
            ) {
              throw new Error(
                `HTTP ${response.status}`
              );
            }

            await cache.put(
              file,
              response
            );
          } catch (error) {
            console.warn(
              "[Portfolio SW] Precache failed:",
              file,
              error
            );
          }
        }
      )
    );
  } catch (error) {
    console.warn(
      "[Portfolio SW] Installation cache failed:",
      error
    );
  }

  /*
   * Do not leave the new worker waiting behind
   * an older Portfolio Hub worker.
   */

  await self.skipWaiting();
}


/* ==========================================================================
   ACTIVATE
   ========================================================================== */

self.addEventListener(
  "activate",
  (event) => {
    event.waitUntil(
      activateServiceWorker()
    );
  }
);


async function activateServiceWorker() {
  const cacheNames =
    await caches.keys();

  await Promise.all(
    cacheNames.map(
      (cacheName) => {
        const isPortfolioCache =
          cacheName.startsWith(
            CACHE_PREFIX
          );

        const isCurrentCache =
          cacheName === STATIC_CACHE ||
          cacheName === RUNTIME_CACHE;

        if (
          isPortfolioCache &&
          !isCurrentCache
        ) {
          return caches.delete(
            cacheName
          );
        }

        return Promise.resolve(
          false
        );
      }
    )
  );

  /*
   * Immediately control open Portfolio Hub tabs.
   */

  await self.clients.claim();
}


/* ==========================================================================
   REQUEST HELPERS
   ========================================================================== */

function isGetRequest(request) {
  return request.method === "GET";
}


function isHttpRequest(request) {
  return (
    request.url.startsWith(
      "http://"
    ) ||
    request.url.startsWith(
      "https://"
    )
  );
}


function isSameOrigin(request) {
  try {
    const url =
      new URL(
        request.url
      );

    return (
      url.origin ===
      self.location.origin
    );
  } catch {
    return false;
  }
}


function isNavigationRequest(request) {
  return (
    request.mode ===
    "navigate"
  );
}


function getPathname(request) {
  try {
    return new URL(
      request.url
    ).pathname;
  } catch {
    return "";
  }
}


function isProjectDataRequest(request) {
  return getPathname(
    request
  ).endsWith(
    "/data/projects.json"
  );
}


function isMainCSSRequest(request) {
  return getPathname(
    request
  ).endsWith(
    "/assets/css/style.css"
  );
}


function isMainJavaScriptRequest(
  request
) {
  return getPathname(
    request
  ).endsWith(
    "/assets/js/app.js"
  );
}


function isManifestRequest(request) {
  return getPathname(
    request
  ).endsWith(
    "/manifest.json"
  );
}


function isImageRequest(request) {
  const pathname =
    getPathname(
      request
    );

  return (
    request.destination ===
      "image" ||
    IMAGE_PATTERN.test(
      pathname
    )
  );
}


function isFontRequest(request) {
  const pathname =
    getPathname(
      request
    );

  return (
    request.destination ===
      "font" ||
    FONT_PATTERN.test(
      pathname
    )
  );
}


/* ==========================================================================
   CACHE WRITE
   ========================================================================== */

async function putInCache(
  cacheName,
  request,
  response
) {
  if (
    !response ||
    !response.ok
  ) {
    return;
  }

  /*
   * Avoid trying to cache unsupported opaque responses.
   * Cross-origin requests are ignored earlier anyway.
   */

  if (
    response.type === "opaque"
  ) {
    return;
  }

  try {
    const cache =
      await caches.open(
        cacheName
      );

    await cache.put(
      request,
      response.clone()
    );
  } catch (error) {
    console.warn(
      "[Portfolio SW] Cache write failed:",
      error
    );
  }
}


/* ==========================================================================
   NETWORK FIRST

   Used for files that should remain fresh:
   - index.html/navigation
   - app.js
   - style.css
   - projects.json
   - manifest.json

   This is intentionally different from the previous stale-first behavior.
   ========================================================================== */

async function networkFirst(
  request,
  cacheName = RUNTIME_CACHE
) {
  try {
    const networkResponse =
      await fetch(
        request,
        {
          cache: "no-cache"
        }
      );

    if (
      networkResponse &&
      networkResponse.ok
    ) {
      await putInCache(
        cacheName,
        request,
        networkResponse
      );
    }

    return networkResponse;
  } catch (networkError) {
    const cachedResponse =
      await caches.match(
        request
      );

    if (cachedResponse) {
      return cachedResponse;
    }

    throw networkError;
  }
}


/* ==========================================================================
   CACHE FIRST

   Used only for heavier assets such as project screenshots and fonts.
   ========================================================================== */

async function cacheFirst(
  request
) {
  const cachedResponse =
    await caches.match(
      request
    );

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse =
    await fetch(
      request
    );

  if (
    networkResponse &&
    networkResponse.ok
  ) {
    await putInCache(
      RUNTIME_CACHE,
      request,
      networkResponse
    );
  }

  return networkResponse;
}


/* ==========================================================================
   NAVIGATION
   ========================================================================== */

async function handleNavigation(
  request
) {
  try {
    /*
     * Always try the network first for HTML.
     *
     * This greatly reduces the possibility that an old
     * index.html remains visible after deployment.
     */

    const response =
      await fetch(
        request,
        {
          cache: "no-cache"
        }
      );

    if (
      response &&
      response.ok
    ) {
      const cache =
        await caches.open(
          STATIC_CACHE
        );

      await cache.put(
        "./index.html",
        response.clone()
      );

      return response;
    }

    throw new Error(
      `Navigation returned HTTP ${response.status}`
    );

  } catch (error) {

    /*
     * Offline fallback:
     * use the current cached index.html.
     */

    const cachedIndex =
      await caches.match(
        "./index.html"
      );

    if (cachedIndex) {
      return cachedIndex;
    }


    const cachedRoot =
      await caches.match(
        "./"
      );

    if (cachedRoot) {
      return cachedRoot;
    }


    return createOfflineResponse();
  }
}


/* ==========================================================================
   OFFLINE PAGE
   ========================================================================== */

function createOfflineResponse() {
  const html = `
    <!DOCTYPE html>

    <html lang="en">

    <head>

      <meta charset="UTF-8">

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      >

      <meta
        name="theme-color"
        content="#f8fafc"
      >

      <title>
        Portfolio Offline
      </title>

      <style>
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;

          min-height: 100vh;

          display: grid;
          place-items: center;

          padding: 24px;

          background: #f8fafc;
          color: #0f172a;

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        main {
          width: 100%;
          max-width: 520px;

          text-align: center;
        }

        .logo {
          width: 64px;
          height: 64px;

          display: grid;
          place-items: center;

          margin:
            0
            auto
            20px;

          border-radius: 18px;

          background:
            linear-gradient(
              135deg,
              #2563eb,
              #7c3aed
            );

          color: #ffffff;

          font-weight: 800;

          box-shadow:
            0 16px 35px
            rgba(
              37,
              99,
              235,
              0.2
            );
        }

        h1 {
          margin:
            0
            0
            8px;

          font-size: 30px;
        }

        p {
          margin:
            0
            auto;

          max-width: 430px;

          color: #64748b;

          line-height: 1.65;
        }

        button {
          min-height: 44px;

          margin-top: 20px;

          padding:
            10px
            18px;

          border: 0;

          border-radius: 10px;

          background: #2563eb;
          color: #ffffff;

          font: inherit;
          font-weight: 700;

          cursor: pointer;
        }

        button:hover {
          background: #1d4ed8;
        }
      </style>

    </head>


    <body>

      <main>

        <div class="logo">
          SR
        </div>

        <h1>
          You're offline
        </h1>

        <p>
          The portfolio is currently unable to connect to the
          internet. Reconnect and try loading the page again.
        </p>

        <button
          type="button"
          onclick="window.location.reload()"
        >
          Try Again
        </button>

      </main>

    </body>

    </html>
  `;

  return new Response(
    html,
    {
      status: 503,

      statusText:
        "Offline",

      headers: {
        "Content-Type":
          "text/html; charset=UTF-8",

        "Cache-Control":
          "no-store"
      }
    }
  );
}


/* ==========================================================================
   FETCH
   ========================================================================== */

self.addEventListener(
  "fetch",
  (event) => {
    const request =
      event.request;


    /* ----------------------------------------------------------------------
       GET REQUESTS ONLY
       ---------------------------------------------------------------------- */

    if (
      !isGetRequest(
        request
      )
    ) {
      return;
    }


    /* ----------------------------------------------------------------------
       HTTP / HTTPS ONLY
       ---------------------------------------------------------------------- */

    if (
      !isHttpRequest(
        request
      )
    ) {
      return;
    }


    /* ----------------------------------------------------------------------
       SAME ORIGIN ONLY
       ---------------------------------------------------------------------- */

    if (
      !isSameOrigin(
        request
      )
    ) {
      return;
    }


    /* ----------------------------------------------------------------------
       NAVIGATION
       ---------------------------------------------------------------------- */

    if (
      isNavigationRequest(
        request
      )
    ) {
      event.respondWith(
        handleNavigation(
          request
        )
      );

      return;
    }


    /* ----------------------------------------------------------------------
       MAIN JAVASCRIPT

       Network-first prevents an old app.js from remaining active.
       ---------------------------------------------------------------------- */

    if (
      isMainJavaScriptRequest(
        request
      )
    ) {
      event.respondWith(
        networkFirst(
          request,
          STATIC_CACHE
        )
      );

      return;
    }


    /* ----------------------------------------------------------------------
       MAIN CSS

       Network-first prevents an old stylesheet from remaining active.
       ---------------------------------------------------------------------- */

    if (
      isMainCSSRequest(
        request
      )
    ) {
      event.respondWith(
        networkFirst(
          request,
          STATIC_CACHE
        )
      );

      return;
    }


    /* ----------------------------------------------------------------------
       PROJECT DATA
       ---------------------------------------------------------------------- */

    if (
      isProjectDataRequest(
        request
      )
    ) {
      event.respondWith(
        networkFirst(
          request,
          STATIC_CACHE
        )
      );

      return;
    }


    /* ----------------------------------------------------------------------
       MANIFEST
       ---------------------------------------------------------------------- */

    if (
      isManifestRequest(
        request
      )
    ) {
      event.respondWith(
        networkFirst(
          request,
          STATIC_CACHE
        )
      );

      return;
    }


    /* ----------------------------------------------------------------------
       IMAGES
       ---------------------------------------------------------------------- */

    if (
      isImageRequest(
        request
      )
    ) {
      event.respondWith(
        cacheFirst(
          request
        )
      );

      return;
    }


    /* ----------------------------------------------------------------------
       FONTS
       ---------------------------------------------------------------------- */

    if (
      isFontRequest(
        request
      )
    ) {
      event.respondWith(
        cacheFirst(
          request
        )
      );

      return;
    }


    /* ----------------------------------------------------------------------
       EVERYTHING ELSE

       Let the browser handle requests that do not need Portfolio Hub caching.
       ---------------------------------------------------------------------- */
  }
);


/* ==========================================================================
   SERVICE WORKER MESSAGES
   ========================================================================== */

self.addEventListener(
  "message",
  (event) => {
    const type =
      event.data?.type;


    /* ----------------------------------------------------------------------
       SKIP WAITING
       ---------------------------------------------------------------------- */

    if (
      type ===
      "SKIP_WAITING"
    ) {
      self.skipWaiting();

      return;
    }


    /* ----------------------------------------------------------------------
       CLEAR PORTFOLIO CACHES
       ---------------------------------------------------------------------- */

    if (
      type ===
      "CLEAR_CACHE"
    ) {
      event.waitUntil(
        clearPortfolioCaches()
      );
    }
  }
);


/* ==========================================================================
   CLEAR PORTFOLIO CACHES
   ========================================================================== */

async function clearPortfolioCaches() {
  const cacheNames =
    await caches.keys();

  await Promise.all(
    cacheNames.map(
      (cacheName) => {
        if (
          cacheName.startsWith(
            CACHE_PREFIX
          )
        ) {
          return caches.delete(
            cacheName
          );
        }

        return Promise.resolve(
          false
        );
      }
    )
  );
}