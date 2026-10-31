// DEFLEARN HUB – service worker: appka funguje offline, obsah se aktualizuje na pozadí.
const VERZE = "deflearn-v6";
const SOUBORY = ["./", "./index.html", "./config.js", "./css/style.css", "./js/slouceni.js", "./js/jezek.js", "./js/hudba.js", "./js/api.js", "./js/app.js",
  "./obsah/kurz-defence.js", "./obsah/kurz-anglictina.js", "./manifest.webmanifest", "./img/ikona-192.png", "./img/ikona-512.png", "./img/hubik-klid.png", "./img/hubik-salut.png", "./img/hubik-radost.png", "./img/hubik-salut.webp"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERZE).then(c => c.addAll(SOUBORY)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERZE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.pathname.includes("/api/")) return; // backend nikdy necachovat
  if (url.origin !== location.origin) return;
  // stale-while-revalidate: hned z cache, na pozadí stáhnout novou verzi
  e.respondWith(caches.open(VERZE).then(async c => {
    const cached = await c.match(e.request);
    const sit = fetch(e.request).then(r => { if (r && r.ok) c.put(e.request, r.clone()); return r; }).catch(() => cached);
    return cached || sit;
  }));
});
