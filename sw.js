// DEFLEARN HUB – service worker.
// Online: vždy nejdřív síť (aktuální verze hned po nasazení), odpověď se uloží do cache.
// Offline nebo pomalá síť (> 4 s): uložená kopie. Appka tak funguje v letadle a přitom
// po aktualizaci nikdy neukazuje starý obsah.
const VERZE = "deflearn-v14";
const SOUBORY = ["./", "./index.html", "./config.js", "./css/style.css", "./js/slouceni.js", "./js/jezek.js", "./js/hudba.js", "./js/api.js", "./js/app.js",
  "./obsah/kurz-defence.js", "./obsah/kurz-programy.js", "./obsah/kurz-slovnicek.js", "./obsah/kurz-anglictina.js", "./manifest.webmanifest", "./img/ikona-192.png", "./img/ikona-512.png", "./img/hubik-klid.png", "./img/hubik-salut.png", "./img/hubik-radost.png", "./img/hubik-salut.webp"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERZE).then(c => c.addAll(SOUBORY)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERZE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.pathname.includes("/api/")) return; // backend nikdy necachovat
  if (url.origin !== location.origin) return;
  e.respondWith(caches.open(VERZE).then(async c => {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 4000);
    try {
      const r = await fetch(e.request, { signal: ctrl.signal, cache: "no-cache" });
      clearTimeout(t);
      if (r && r.ok) c.put(e.request, r.clone());
      return r;
    } catch (err) {
      clearTimeout(t);
      const cached = await c.match(e.request, { ignoreSearch: true });
      if (cached) return cached;
      if (e.request.mode === "navigate") { const idx = await c.match("./index.html"); if (idx) return idx; }
      throw err;
    }
  }));
});
