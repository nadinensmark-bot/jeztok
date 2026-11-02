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
  let zdraviCeka = null; // probíhající health(): server se může teprve probouzet

  function lsGet(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  function maBackend() { return !!base; }
  function token() { return lsGet(KLIC.token, null); }
  function uzivatel() { return lsGet(KLIC.uzivatel, null); }
  function prihlasen() { return !!(token() && uzivatel()); }

  // Server (Render) se po nečinnosti může probouzet až minutu: fetch má proto časový limit
  // a když hosting mezitím vrátí HTML stránku nebo 5xx bez JSONu, zkusí to po chvíli znovu.
  async function volej(cesta, metoda, telo, volby) {
    if (!base) throw new Error("Backend není nastavený.");
    const h = { "Content-Type": "application/json" };
    const t = token(); if (t) h.Authorization = "Bearer " + t;
    const konec = Date.now() + ((volby && volby.timeoutMs) || 75000);
    let r, d = null;
    for (let pokus = 0; ; pokus++) {
      const ctrl = new AbortController(); const tm = setTimeout(() => ctrl.abort(), Math.max(1000, konec - Date.now()));
      try { r = await fetch(base + cesta, { method: metoda || "GET", headers: h, body: telo ? JSON.stringify(telo) : undefined, signal: ctrl.signal }); }
      catch (e) {
        clearTimeout(tm);
        const err = new Error(ctrl.signal.aborted ? "Server se nestihl probudit, zkus to prosím znovu." : "Nepodařilo se spojit se serverem.");
        err.timeout = ctrl.signal.aborted; err.sit = true; throw err;
      }
      clearTimeout(tm);
      d = null; try { d = await r.json(); } catch (e) {}
      if (!d && (r.status >= 500 || r.ok) && pokus < 30 && Date.now() + 3000 < konec) { await new Promise(res => setTimeout(res, 3000)); continue; }
      break;
    }
    if (r.status === 401) { lsDel(KLIC.token); lsDel(KLIC.uzivatel); }
    if (!r.ok || !d || d.ok === false) { const e = new Error((d && d.chyba) || ("Chyba serveru (" + r.status + ")")); e.status = r.status; throw e; }
    return d;
  }

  function probouzi() { return !!zdraviCeka; }
  async function health() {
    if (!base) return (zdravi = { ok: false, bezBackendu: true });
    if (zdraviCeka) return zdraviCeka;
    zdraviCeka = (async () => {
      try { zdravi = await volej("/api/health", "GET", null, { timeoutMs: 90000 }); } catch (e) { zdravi = { ok: false, chyba: e.message }; }
      zdraviCeka = null; return zdravi;
    })();
    return zdraviCeka;
  }

  async function registrace(email, heslo, jmeno) {
    const d = await volej("/api/registrace", "POST", { email, heslo, jmeno });
    lsSet(KLIC.token, d.token); lsSet(KLIC.uzivatel, d.uzivatel); return d.uzivatel;
  }
  async function prihlaseni(email, heslo) {
    const d = await volej("/api/prihlaseni", "POST", { email, heslo });
    lsSet(KLIC.token, d.token); lsSet(KLIC.uzivatel, d.uzivatel); return d.uzivatel;
  }
  async function zmenHeslo(stare, nove) { return volej("/api/zmena-hesla", "POST", { stare, nove }); }
  // znovu načíst profil ze serveru (např. když se změnil seznam povolených kurzů)
  async function obnovUzivatele() { if (!prihlasen()) return null; const d = await volej("/api/ja"); lsSet(KLIC.uzivatel, d.uzivatel); return d.uzivatel; }
  // vestavěné kurzy, které přihlášený uživatel smí vidět: pole id, nebo null = všechny
  function povoleneKurzy() { const u = uzivatel(); return u && Array.isArray(u.kurzy) ? u.kurzy : null; }
  function jeSpravce() { const u = uzivatel(); return !!(u && u.spravce); }
  async function nactiTym() { const d = await volej("/api/tym"); return d.tym; }
  // s backendem je obsah jen pro přihlášené: bez účtu appka neukazuje žádné kurzy
  function zamceno() { return maBackend() && !prihlasen(); }
  async function odhlaseni() {
    try { if (prihlasen()) await volej("/api/odhlaseni", "POST", {}); } catch (e) {}
    lsDel(KLIC.token); lsDel(KLIC.uzivatel);
  }

  // ---- postup: lokálně vždy, na server když jsme přihlášení ----
  function nactiStav() { return lsGet(KLIC.stav, null); }
  function ulozStavLokalne(stav) { lsSet(KLIC.stav, stav); }

  let syncTimer = null, syncCekajici = null, syncOpakovani = null, posledniStav = null;
  function naplanujSync(stav) {
    if (!prihlasen()) return;
    syncCekajici = stav; posledniStav = stav;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      const s = syncCekajici; syncCekajici = null;
      synchronizuj(s).catch(() => {
        // server nejspíš spal nebo vypadla síť: jeden opakovaný pokus za minutu s nejnovějším stavem
        clearTimeout(syncOpakovani);
        syncOpakovani = setTimeout(() => { if (prihlasen() && !syncCekajici && posledniStav) synchronizuj(posledniStav).catch(() => {}); }, 60000);
      });
    }, 1500);
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

  window.API = { maBackend, prihlasen, uzivatel, health, probouzi, zdravi: () => zdravi, maAI, registrace, prihlaseni, odhlaseni, zmenHeslo, obnovUzivatele, povoleneKurzy, zamceno, jeSpravce, nactiTym,
    nactiStav, ulozStavLokalne, naplanujSync, synchronizuj, stahniStav,
    testyLokalne, ulozTestyLokalne, ulozTest, stahniTesty, vlastniKurzyLokalne, ulozVlastniKurzyLokalne, ulozKurzNaServer, smazKurzNaServeru, stahniKurzy,
    vysvetli, generujKurz, lsSet, lsGet };
})();
