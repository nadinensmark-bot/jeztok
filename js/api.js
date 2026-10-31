// =====================================================================
// DEFLEARN HUB – klient backendu + lokální úložiště (localStorage).
// Aplikace funguje i bez backendu: pak se vše ukládá jen v telefonu.
// =====================================================================
(function () {
  "use strict";
  const cfg = window.JEZTOK_CONFIG || {};
  const PX = cfg.prefix || "jeztok_"; // oddělené úložiště pro různé varianty appky na stejné doméně
  const KLIC = { stav: PX + "stav", token: PX + "token", uzivatel: PX + "uzivatel", testy: PX + "testy", kurzy: PX + "vlastni_kurzy" };
  const base = (cfg.backendUrl || "").replace(/\/+$/, "");
  let zdravi = null; // výsledek /api/health

  function lsGet(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  function maBackend() { return !!base; }
  function token() { return lsGet(KLIC.token, null); }
  function uzivatel() { return lsGet(KLIC.uzivatel, null); }
  function prihlasen() { return !!(token() && uzivatel()); }

  async function volej(cesta, metoda, telo) {
    if (!base) throw new Error("Backend není nastavený.");
    const h = { "Content-Type": "application/json" };
    const t = token(); if (t) h.Authorization = "Bearer " + t;
    const r = await fetch(base + cesta, { method: metoda || "GET", headers: h, body: telo ? JSON.stringify(telo) : undefined });
    let d = null; try { d = await r.json(); } catch (e) {}
    if (r.status === 401) { lsDel(KLIC.token); lsDel(KLIC.uzivatel); }
    if (!r.ok || !d || d.ok === false) { const e = new Error((d && d.chyba) || ("Chyba serveru (" + r.status + ")")); e.status = r.status; throw e; }
    return d;
  }

  async function health() {
    if (!base) return (zdravi = { ok: false, bezBackendu: true });
    try { zdravi = await volej("/api/health"); } catch (e) { zdravi = { ok: false, chyba: e.message }; }
    return zdravi;
  }

  async function registrace(email, heslo, jmeno) {
    const d = await volej("/api/registrace", "POST", { email, heslo, jmeno });
    lsSet(KLIC.token, d.token); lsSet(KLIC.uzivatel, d.uzivatel); return d.uzivatel;
  }
  async function prihlaseni(email, heslo) {
    const d = await volej("/api/prihlaseni", "POST", { email, heslo });
    lsSet(KLIC.token, d.token); lsSet(KLIC.uzivatel, d.uzivatel); return d.uzivatel;
  }
  async function odhlaseni() {
    try { if (prihlasen()) await volej("/api/odhlaseni", "POST", {}); } catch (e) {}
    lsDel(KLIC.token); lsDel(KLIC.uzivatel);
  }

  // ---- postup: lokálně vždy, na server když jsme přihlášení ----
  function nactiStav() { return lsGet(KLIC.stav, null); }
  function ulozStavLokalne(stav) { lsSet(KLIC.stav, stav); }

  let syncTimer = null, syncCekajici = null;
  function naplanujSync(stav) {
    if (!prihlasen()) return;
    syncCekajici = stav;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => { const s = syncCekajici; syncCekajici = null; synchronizuj(s).catch(() => {}); }, 1500);
  }
  async function synchronizuj(stav) {
    if (!prihlasen()) return stav;
    const d = await volej("/api/postup", "PUT", { stav });
    return d.stav; // server vrací sloučený stav
  }
  async function stahniStav() { const d = await volej("/api/postup"); return d.stav; }

  // ---- testy ----
  function testyLokalne() { return lsGet(KLIC.testy, []); }
  function ulozTestyLokalne(t) { lsSet(KLIC.testy, t); }
  async function ulozTest(t) {
    const vsechny = testyLokalne(); vsechny.unshift(t); lsSet(KLIC.testy, vsechny.slice(0, 200));
    if (prihlasen()) { try { await volej("/api/testy", "POST", t); } catch (e) {} }
  }
  async function stahniTesty() { const d = await volej("/api/testy"); return d.testy; }

  // ---- vlastní kurzy ----
  function vlastniKurzyLokalne() { return lsGet(KLIC.kurzy, []); }
  function ulozVlastniKurzyLokalne(k) { lsSet(KLIC.kurzy, k); }
  async function ulozKurzNaServer(kurz) { if (prihlasen()) await volej("/api/kurzy", "PUT", { kurz }); }
  async function smazKurzNaServeru(id) { if (prihlasen()) await volej("/api/kurzy/" + encodeURIComponent(id), "DELETE"); }
  async function stahniKurzy() { const d = await volej("/api/kurzy"); return d.kurzy; }

  // ---- AI (volitelné) ----
  function maAI() { return !!(zdravi && zdravi.ok && zdravi.ai); }
  async function vysvetli(karta, dotaz, historie) { return volej("/api/vysvetli", "POST", { karta, dotaz, historie }); }
  async function generujKurz(nazev, poznamky) { return volej("/api/generuj-kurz", "POST", { nazev, poznamky }); }

  window.API = { maBackend, prihlasen, uzivatel, health, zdravi: () => zdravi, maAI, registrace, prihlaseni, odhlaseni,
    nactiStav, ulozStavLokalne, naplanujSync, synchronizuj, stahniStav,
    testyLokalne, ulozTestyLokalne, ulozTest, stahniTesty, vlastniKurzyLokalne, ulozVlastniKurzyLokalne, ulozKurzNaServer, smazKurzNaServeru, stahniKurzy,
    vysvetli, generujKurz, lsSet, lsGet };
})();
