// =====================================================================
// DEFLEARN HUB – hlavní logika aplikace
// Feed (TikTok styl), karty, opakování v rozestupech, testy, kurzy,
// profil, přihlášení, synchronizace, ježek.
// =====================================================================
(function () {
  "use strict";
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MIN = 60 * 1000, HOD = 60 * MIN, DEN = 24 * HOD;
  const INTERVALY = [10 * MIN, 1 * HOD, 1 * DEN, 3 * DEN, 7 * DEN, 14 * DEN, 30 * DEN];
  const XP = { videno: 3, spravne: 10, spatne: 2, umim: 5, lekce: 8, test: 20 };

  const S = {
    stav: null, kurzy: [], karty: {}, feed: [], aktivni: null, obrazovka: "feed",
    test: null, vysvetlovana: null, videnoTimer: null, online: navigator.onLine
  };

  // ------------------------------------------------------------------
  // Obsah
  // ------------------------------------------------------------------
  function nactiKurzy() {
    const filtr = (window.JEZTOK_CONFIG && window.JEZTOK_CONFIG.filtrKurzu) || null;
    const vest = (window.JEZTOK_KURZY || []).filter(k => !k.skryty && (!filtr || filtr[k.id] !== false)).map(k => {
      k = Object.assign({}, k, { vestaveny: true });
      const f = filtr && filtr[k.id];
      if (f && typeof f === "object") {
        k.temata = (k.temata || []).filter(t => !f.temata || f.temata.includes(t.id)).map(t => Object.assign({}, t, { karty: (t.karty || []).filter(c => !(f.bez || []).includes(t.id + ":" + c.id)) }));
      }
      return k;
    });
    const vlastni = API.vlastniKurzyLokalne().map(k => Object.assign({}, k, { vlastni: true }));
    S.kurzy = [...vest, ...vlastni];
    S.karty = {};
    S.kurzy.forEach(k => {
      k.pocet = 0;
      (k.temata || []).forEach(t => (t.karty || []).forEach(c => {
        c.gid = k.id + ":" + t.id + ":" + c.id; c.kurz = k; c.tema = t;
        if (S.karty[c.gid]) console.warn("[DefLearn] duplicitní id karty", c.gid);
        S.karty[c.gid] = c; k.pocet++;
      }));
    });
  }
  function aktivniKurzy() {
    const v = S.stav.vybraneKurzy;
    return S.kurzy.filter(k => !v || v.includes(k.id));
  }
  function jeOtazka(c) { return c.typ === "kviz" || c.typ === "anone" || c.typ === "doplnit"; }

  // ------------------------------------------------------------------
  // Stav, XP, streak
  // ------------------------------------------------------------------
  function dnes(off) { const d = new Date(Date.now() - (off || 0) * DEN); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function ulozStav() { S.stav.aktualizovano = Date.now(); API.ulozStavLokalne(S.stav); API.naplanujSync(S.stav); aktualizujChipy(); }
  function pridejXp(n, karet) {
    const pred = JEZEK.urovenPodleXp(S.stav.xp);
    S.stav.xp += n;
    const d = dnes(); S.stav.dny[d] = S.stav.dny[d] || { xp: 0, karet: 0 };
    S.stav.dny[d].xp += n; S.stav.dny[d].karet += karet || 0;
    const po = JEZEK.urovenPodleXp(S.stav.xp);
    if (po > pred) { konfety(); HUDBA.sting("levelup"); jezekRekni("Level up! Teď jsem " + JEZEK.UROVNE[po].nazev + ". " + JEZEK.UROVNE[po].popis, "party", 5000); vibrace([30, 50, 30, 50, 60]); }
    xpBublina(n);
  }
  function streak() {
    let n = 0, off = 0;
    if (!S.stav.dny[dnes(0)]) off = 1; // dnes ještě nic → počítej od včerejška
    while (S.stav.dny[dnes(off)]) { n++; off++; }
    return n;
  }
  function postupKarty(gid) { return S.stav.karty[gid] || { sila: 0, dalsi: 0, videno: false, spravne: 0, spatne: 0, ulozeno: false, kdy: 0 }; }
  function zaznamenej(c, vysledek) {
    const p = postupKarty(c.gid), now = Date.now();
    let xp = 0, karet = 0;
    switch (vysledek) {
      case "videno":
        if (!p.videno) { xp = XP.videno; karet = 1; p.videno = true; p.dalsi = now + INTERVALY[0]; }
        else if (p.dalsi <= now) { p.sila = Math.min(INTERVALY.length - 1, p.sila + 1); p.dalsi = now + INTERVALY[p.sila]; xp = 1; karet = 1; } // opakované přečtení = lehké opakování, karta se posune dál
        break;
      case "lekce": if (!p.videno) { xp = XP.lekce; karet = 1; } p.videno = true; p.sila = Math.max(Math.min(INTERVALY.length - 1, p.sila + 1), 2); p.dalsi = now + INTERVALY[p.sila]; break;
      case "spravne": p.videno = true; p.spravne++; p.sila = Math.min(INTERVALY.length - 1, p.sila + 1); p.dalsi = now + INTERVALY[p.sila]; xp = XP.spravne; karet = 1; break;
      case "spatne": p.videno = true; p.spatne++; p.sila = Math.max(0, p.sila - 1); p.dalsi = now + 5 * MIN; xp = XP.spatne; karet = 1; break;
      case "umim": if (!p.ulozeno) { xp = XP.umim; } p.ulozeno = true; p.videno = true; p.sila = Math.min(INTERVALY.length - 1, p.sila + 1); p.dalsi = now + INTERVALY[p.sila]; break;
      case "pozdeji": p.videno = true; p.dalsi = now + 10 * MIN; p.pozdeji = true; break;
    }
    p.kdy = now; S.stav.karty[c.gid] = p;
    if (xp) pridejXp(xp, karet);
    ulozStav();
  }
  function statistikaKurzu(k) {
    let videno = 0, umim = 0;
    (k.temata || []).forEach(t => (t.karty || []).forEach(c => { const p = S.stav.karty[c.gid]; if (p && p.videno) videno++; if (p && p.sila >= 3) umim++; }));
    return { videno, umim, pocet: k.pocet, procent: k.pocet ? Math.round(100 * umim / k.pocet) : 0 };
  }

  // ------------------------------------------------------------------
  // Feed – algoritmus
  // ------------------------------------------------------------------
  function sestavFeed(n, vyloucit) {
    const now = Date.now(), kurzy = aktivniKurzy(), vyl = new Set(vyloucit || []);
    const vse = []; kurzy.forEach(k => (k.temata || []).forEach(t => (t.karty || []).forEach(c => vse.push(c))));
    const due = vse.filter(c => { const p = S.stav.karty[c.gid]; return p && p.dalsi && p.dalsi <= now && !vyl.has(c.gid); })
      .sort((a, b) => S.stav.karty[a.gid].dalsi - S.stav.karty[b.gid].dalsi);
    // nové karty po kurzech, v autorském pořadí (fakt → kvíz), po trojicích střídáme kurzy
    const fronty = kurzy.map(k => { const f = []; (k.temata || []).forEach(t => (t.karty || []).forEach(c => { const p = S.stav.karty[c.gid]; if (!(p && p.videno) && !vyl.has(c.gid)) f.push(c); })); return f; }).filter(f => f.length);
    const nove = [];
    let ki = 0;
    while (fronty.some(f => f.length) && nove.length < n * 2) {
      const f = fronty[ki % fronty.length]; ki++;
      for (let i = 0; i < 3 && f.length; i++) nove.push(f.shift());
    }
    const out = [];
    while (out.length < n && (due.length || nove.length)) {
      const chceDue = due.length && (out.length % 3 === 2 || !nove.length);
      out.push(chceDue ? due.shift() : nove.shift());
    }
    // zamíchat pořadí opakování (ať nejstarší karty nejsou vždy první) – nové karty zůstávají v autorském pořadí
    for (let i = out.length - 1; i > 0; i--) { if (!S.stav.karty[out[i].gid] || !S.stav.karty[out[i].gid].videno) continue; const j = Math.floor(Math.random() * (i + 1)); if (S.stav.karty[out[j].gid] && S.stav.karty[out[j].gid].videno) [out[i], out[j]] = [out[j], out[i]]; }
    if (out.length < n) { // doplnit osvěžením už naučených
      const nauc = vse.filter(c => { const p = S.stav.karty[c.gid]; return p && p.videno && !vyl.has(c.gid) && !out.includes(c); });
      for (let i = nauc.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [nauc[i], nauc[j]] = [nauc[j], nauc[i]]; }
      while (out.length < n && nauc.length) out.push(Object.assign(Object.create(nauc.shift()), { osvezeni: true }));
    }
    return out;
  }
  let io = null;
  function vykresliFeed(reset) {
    const el = $("#feed");
    if (reset) { el.innerHTML = ""; S.feed = []; }
    const dalsi = sestavFeed(12, S.feed.map(c => c.gid));
    if (!dalsi.length && !S.feed.length) {
      el.innerHTML = `<section class="karta karta-prazdna"><div class="prazdno">${JEZEK.svg({ nalada: "spi", uroven: uroven() })}<h2>Nic nového</h2><p>${esc(JEZEK.hlaska("prazdno"))}</p><button class="btn" data-akce="kurzy">Přidat kurz</button><button class="btn btn-sek" data-akce="obnovit">Obnovit feed</button></div></section>`;
      return;
    }
    dalsi.forEach(c => { S.feed.push(c); el.insertAdjacentHTML("beforeend", htmlKarty(c, false)); });
    if (!io) {
      io = new IntersectionObserver(ents => ents.forEach(e => { if (e.isIntersecting && e.intersectionRatio >= 0.6) naAktivni(e.target); }), { root: el, threshold: [0.6] });
    }
    $$(".karta:not([data-io])", el).forEach(k => { k.dataset.io = "1"; io.observe(k); });
  }
  function naAktivni(el) {
    const gid = el.dataset.gid; if (!gid) return;
    const idx = S.feed.findIndex(c => c.gid === gid); const c = S.feed[idx];
    S.aktivni = c; clearTimeout(S.videnoTimer);
    if (c && S.stav.hudba.auto !== false) { const nid = HUDBA.proKartu(c.typ); if (nid) S.stav.hudba.vibe = nid; }
    if (c && (c.typ === "fakt")) S.videnoTimer = setTimeout(() => { zaznamenej(c, "videno"); }, 1800);
    if (idx >= S.feed.length - 4) vykresliFeed(false);
    if (new Date().getHours() >= 23 && Math.random() < 0.08) jezekRekni(JEZEK.hlaska("nocni"), "spi", 4000);
  }

  // ------------------------------------------------------------------
  // Karty – HTML
  // ------------------------------------------------------------------
  function htmlKarty(c, test) {
    const k = c.kurz, p = postupKarty(c.gid);
    const stitky = `<div class="stitky"><span class="stitek" style="background:${esc(k.barva)}">${esc(k.emoji)} ${esc(k.nazev)}</span><span class="stitek stitek-tema">${esc(c.tema.nazev)}</span>${p.dalsi && p.videno && !test ? '<span class="stitek stitek-opak">🔁 opakování</span>' : ""}</div>`;
    let telo = "";
    switch (c.typ) {
      case "fakt": telo = `<h2>${esc(c.titulek)}</h2><p class="text">${esc(c.text)}</p>${c.zdroj ? `<p class="zdroj">${esc(c.zdroj)}</p>` : ""}`; break;
      case "kviz": telo = `<h2>${esc(c.otazka)}</h2><div class="moznosti">${c.moznosti.map((m, i) => `<button class="moznost" data-i="${i}">${esc(m)}</button>`).join("")}</div><div class="vysledek"></div>`; break;
      case "anone": telo = `<p class="pre">Pravda, nebo lež?</p><h2>${esc(c.tvrzeni)}</h2><div class="moznosti anone"><button class="moznost" data-i="1">✅ Pravda</button><button class="moznost" data-i="0">❌ Lež</button></div><div class="vysledek"></div>`; break;
      case "doplnit": telo = `<p class="pre">Doplň slovo</p><h2>${esc(c.text).replace(/_{2,}/g, '<span class="mezera">?</span>')}</h2><form class="doplnit"><input type="text" autocomplete="off" autocapitalize="off" placeholder="Doplň slovo nebo číslo…" aria-label="odpověď"><button class="btn" type="submit">Ověřit</button></form><div class="vysledek"></div>`; break;
      case "lekce": telo = `<p class="pre">Lekce · ${c.kroky.length} kroků</p><h2>${esc(c.titulek)}</h2><div class="kroky">${c.kroky.map((kr, i) => `<p class="krok${i ? "" : " videt"}" data-i="${i}">${esc(kr)}</p>`).join("")}</div><button class="btn krok-dal" data-i="1">${c.kroky.length > 1 ? "Dál →" : "Hotovo ✓"}</button>`; break;
      default: telo = `<p>Neznámý typ karty (${esc(c.typ)})</p>`;
    }
    const rail = test ? "" : `<div class="rail">
        <button class="rail-btn ${p.ulozeno ? "akt" : ""}" data-akce="umim" title="Umím to"><span>${p.ulozeno ? "❤️" : "🤍"}</span><small>Umím</small></button>
        <button class="rail-btn" data-akce="vysvetli" title="Vysvětli"><span>💬</span><small>Vysvětli</small></button>
        <button class="rail-btn" data-akce="pozdeji" title="Později"><span>🔁</span><small>Později</small></button>
        <button class="rail-btn" data-akce="sdilet" title="Sdílet"><span>↗️</span><small>Sdílet</small></button>
      </div>`;
    return `<section class="karta typ-${esc(c.typ)}" data-gid="${esc(c.gid)}" style="--b:${esc(k.barva)}"><div class="pozadi"><span class="pozadi-emoji">${esc(k.emoji)}</span></div><div class="obsah">${stitky}${telo}</div>${rail}</section>`;
  }

  function normalizuj(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }

  function odpovedKviz(el, c, i) {
    if (el.dataset.hotovo) return; el.dataset.hotovo = "1";
    let ok;
    if (c.typ === "kviz") ok = i === c.spravne; else ok = (i === 1) === !!c.spravne;
    $$(".moznost", el).forEach(b => {
      const bi = Number(b.dataset.i);
      const spr = c.typ === "kviz" ? bi === c.spravne : (bi === 1) === !!c.spravne;
      b.disabled = true; if (spr) b.classList.add("spravne"); else if (bi === i) b.classList.add("spatne");
    });
    ukazVysledek(el, c, ok);
  }
  function odpovedDoplnit(el, c, text) {
    if (el.dataset.hotovo) return;
    const varianty = Array.isArray(c.odpoved) ? c.odpoved : [c.odpoved];
    const ok = varianty.some(v => normalizuj(v) === normalizuj(text));
    el.dataset.hotovo = "1";
    const inp = $("input", el); inp.disabled = true; inp.classList.add(ok ? "spravne" : "spatne"); $("form button", el).disabled = true;
    ukazVysledek(el, c, ok, ok ? "" : "Správně: " + varianty[0]);
  }
  function ukazVysledek(el, c, ok, extra) {
    const v = $(".vysledek", el);
    v.innerHTML = `<div class="vysl ${ok ? "ok" : "ne"}"><strong>${ok ? "Správně!" : "Vedle."}</strong> ${esc(extra || "")} ${c.vysvetleni ? `<span class="vysl-text">${esc(c.vysvetleni)}</span>` : ""}</div>`;
    vibrace(ok ? [20] : [60, 40, 60]); HUDBA.sting(ok ? "ok" : "ne");
    if (S.test) { testOdpoved(c, ok); return; }
    zaznamenej(c, ok ? "spravne" : "spatne");
    jezekRekni(JEZEK.hlaska(ok ? "spravne" : "spatne"), ok ? "radost" : "smutek", 2600);
    if (ok) hvezdicky(el);
  }
  function lekceDal(el, c, i) {
    const kroky = $$(".krok", el);
    if (i < kroky.length) { kroky[i].classList.add("videt"); kroky[i].scrollIntoView({ behavior: "smooth", block: "nearest" }); const b = $(".krok-dal", el); b.dataset.i = i + 1; if (i + 1 >= kroky.length) b.textContent = "Hotovo ✓"; }
    else { const b = $(".krok-dal", el); b.disabled = true; b.textContent = "Hotovo ✓"; if (!S.test) { zaznamenej(c, "lekce"); jezekRekni("Lekce hotová. Za chvíli tě z ní vyzkouším.", "radost", 2500); hvezdicky(el); } }
  }

  // Klikání v kartách (feed i test)
  document.addEventListener("click", e => {
    const karta = e.target.closest(".karta"); if (!karta) return;
    const c = S.karty[karta.dataset.gid]; if (!c) return;
    const m = e.target.closest(".moznost"); if (m) { odpovedKviz(karta, c, Number(m.dataset.i)); return; }
    const kd = e.target.closest(".krok-dal"); if (kd) { lekceDal(karta, c, Number(kd.dataset.i)); return; }
    const r = e.target.closest(".rail-btn"); if (r) { railAkce(r.dataset.akce, c, karta, r); return; }
  });
  document.addEventListener("submit", e => {
    const f = e.target.closest("form.doplnit"); if (!f) return; e.preventDefault();
    const karta = f.closest(".karta"); const c = S.karty[karta.dataset.gid];
    const t = $("input", f).value; if (!t.trim()) return; odpovedDoplnit(karta, c, t);
  });
  // dvojklik na kartu = umím (jako like na TikToku)
  let posledniTap = 0;
  document.addEventListener("pointerup", e => {
    const karta = e.target.closest("#feed .karta .obsah"); if (!karta) return;
    if (e.target.closest("button, input, form")) return;
    const t = Date.now(); if (t - posledniTap < 320) { const k = karta.closest(".karta"); railAkce("umim", S.karty[k.dataset.gid], k, $('.rail-btn[data-akce="umim"]', k)); srdce(e.clientX, e.clientY); } posledniTap = t;
  });
  function railAkce(akce, c, karta, btn) {
    switch (akce) {
      case "umim": { const p = postupKarty(c.gid); if (p.ulozeno) return; zaznamenej(c, "umim"); btn.classList.add("akt"); $("span", btn).textContent = "❤️"; btn.classList.add("pulz"); setTimeout(() => btn.classList.remove("pulz"), 500); vibrace([20]); jezekRekni(JEZEK.hlaska("umim"), "radost", 2200); break; }
      case "vysvetli": otevriVysvetleni(c); break;
      case "pozdeji": zaznamenej(c, "pozdeji"); jezekRekni(JEZEK.hlaska("pozdeji"), "klid", 2000); karta.nextElementSibling && karta.nextElementSibling.scrollIntoView({ behavior: "smooth" }); break;
      case "sdilet": sdilet(c); break;
    }
  }
  function textKarty(c) {
    switch (c.typ) {
      case "fakt": return c.titulek + "\n" + c.text;
      case "kviz": return c.otazka + "\n" + c.moznosti.map((m, i) => (i + 1) + ") " + m).join("\n");
      case "anone": return "Pravda, nebo lež? " + c.tvrzeni;
      case "doplnit": return c.text;
      case "lekce": return c.titulek + "\n" + c.kroky.join("\n");
    }
    return "";
  }
  async function sdilet(c) {
    const text = textKarty(c) + "\n\n— z aplikace DefLearn Hub";
    if (navigator.share) { try { await navigator.share({ title: c.kurz.nazev, text }); } catch (e) {} }
    else { try { await navigator.clipboard.writeText(text); toast("Zkopírováno do schránky"); } catch (e) { toast("Sdílení tu nejde"); } }
  }

  // ------------------------------------------------------------------
  // Vysvětlení (bottom sheet s ježkem, volitelně AI)
  // ------------------------------------------------------------------
  function otevriVysvetleni(c) {
    S.vysvetlovana = c;
    const lekce = (c.tema.karty || []).find(x => x.typ === "lekce" && x !== c);
    const sheet = $("#sheet");
    sheet.innerHTML = `<div class="sheet-obsah"><div class="sheet-hlava"><div class="jezek-mini">${JEZEK.svg({ nalada: "premysli", uroven: uroven() })}</div><div><strong>${esc(S.stav.jezek)}</strong><div class="sheet-pod">${esc(JEZEK.hlaska("vysvetleni"))}</div></div><button class="zavrit" data-akce="zavrit-sheet" aria-label="zavřít">✕</button></div>
      <div class="sheet-telo">
        <p class="sheet-karta">${esc(textKarty(c).split("\n")[0])}</p>
        ${c.vysvetleni ? `<div class="bublina">${esc(c.vysvetleni)}</div>` : `<div class="bublina tlum">K této kartě autor nenapsal delší vysvětlení.</div>`}
        ${c.typ === "kviz" ? `<div class="bublina tlum">Správná odpověď: <b>${esc(c.moznosti[c.spravne])}</b></div>` : c.typ === "anone" ? `<div class="bublina tlum">Správně: <b>${c.spravne ? "pravda" : "lež"}</b></div>` : c.typ === "doplnit" ? `<div class="bublina tlum">Správně: <b>${esc(Array.isArray(c.odpoved) ? c.odpoved[0] : c.odpoved)}</b></div>` : ""}
        ${lekce ? `<button class="btn btn-sek" data-akce="skoc-lekce" data-gid="${esc(lekce.gid)}">📖 Otevřít lekci: ${esc(lekce.titulek)}</button>` : ""}
        <div id="ai-chat"></div>
        ${API.maAI() && API.prihlasen() ? `<form id="ai-form" class="ai-form"><input type="text" placeholder="Zeptej se ježka (např. „vysvětli to na příkladu“)" aria-label="dotaz"><button class="btn" type="submit">Vysvětli jinak ✨</button></form>` : API.maAI() ? `<p class="tlum maly">Pro AI dovysvětlení se přihlas v záložce <b>Já</b>.</p>` : API.maBackend() ? `<p class="tlum maly">AI dovysvětlení se zapne, až bude na serveru nastavený ANTHROPIC_API_KEY.</p>` : `<p class="tlum maly">AI dovysvětlení vyžaduje backend (viz server/README.md).</p>`}
      </div></div>`;
    sheet.classList.add("otevreno"); document.body.classList.add("sheet-open");
  }
  function zavriSheet() { $("#sheet").classList.remove("otevreno"); document.body.classList.remove("sheet-open"); }
  async function aiDotaz(dotaz) {
    const c = S.vysvetlovana; if (!c) return;
    const box = $("#ai-chat"); const form = $("#ai-form"); const btn = $("button", form); btn.disabled = true; btn.textContent = "Přemýšlím…";
    const historie = $$(".ai-zprava", box).map(z => ({ role: z.dataset.role, text: z.textContent }));
    if (dotaz) box.insertAdjacentHTML("beforeend", `<div class="ai-zprava ja" data-role="user">${esc(dotaz)}</div>`);
    try {
      const d = await API.vysvetli({ typ: c.typ, kurz: c.kurz.nazev, tema: c.tema.nazev, text: textKarty(c), vysvetleni: c.vysvetleni || "", spravne: c.typ === "kviz" ? c.moznosti[c.spravne] : c.typ === "anone" ? (c.spravne ? "pravda" : "lež") : c.typ === "doplnit" ? (Array.isArray(c.odpoved) ? c.odpoved[0] : c.odpoved) : "" }, dotaz || "Vysvětli to jinak a jednodušeji, s příkladem.", historie.slice(-6));
      box.insertAdjacentHTML("beforeend", `<div class="ai-zprava jezek bublina" data-role="assistant">${esc(d.odpoved)}</div>`);
    } catch (e) { box.insertAdjacentHTML("beforeend", `<div class="ai-zprava bublina tlum">Nepovedlo se: ${esc(e.message)}</div>`); }
    btn.disabled = false; btn.textContent = "Vysvětli jinak ✨"; $("input", form).value = ""; box.lastElementChild.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  document.addEventListener("submit", e => { if (e.target.id === "ai-form") { e.preventDefault(); aiDotaz($("input", e.target).value.trim()); } });
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-akce]"); if (!a) return;
    switch (a.dataset.akce) {
      case "zavrit-sheet": zavriSheet(); break;
      case "skoc-lekce": { zavriSheet(); const c = S.karty[a.dataset.gid]; if (!c) return; if (S.test) return; vlozDoFeedu(c); break; }
      case "kurzy": prepni("kurzy"); break;
      case "obnovit": vykresliFeed(true); break;
    }
  });
  $("#sheet").addEventListener("click", e => { if (e.target.id === "sheet") zavriSheet(); });
  function vlozDoFeedu(c) {
    const akt = S.aktivni ? $(`#feed .karta[data-gid="${CSS.escape(S.aktivni.gid)}"]`) : null;
    const existuje = $(`#feed .karta[data-gid="${CSS.escape(c.gid)}"]`); if (existuje) { existuje.scrollIntoView({ behavior: "smooth" }); return; }
    const idx = S.aktivni ? S.feed.indexOf(S.aktivni) : -1; S.feed.splice(idx + 1, 0, c);
    const html = htmlKarty(c, false);
    if (akt) akt.insertAdjacentHTML("afterend", html); else $("#feed").insertAdjacentHTML("afterbegin", html);
    const el = $(`#feed .karta[data-gid="${CSS.escape(c.gid)}"]`); el.dataset.io = "1"; io.observe(el); el.scrollIntoView({ behavior: "smooth" });
  }

  // ------------------------------------------------------------------
  // Testy
  // ------------------------------------------------------------------
  function vykresliTesty() {
    const el = $("#testy");
    const testy = API.testyLokalne();
    el.innerHTML = `<div class="stranka"><h1>Testy</h1><p class="tlum">10 otázek z kurzu. Výsledek se uloží do postupu${API.prihlasen() ? " i na server" : ""}.</p>
      <div class="seznam">${S.kurzy.map(k => { const ot = pocetOtazek(k); const st = statistikaKurzu(k); const posl = testy.find(t => t.kurz === k.id);
        return `<div class="radek" style="--b:${esc(k.barva)}"><div class="radek-ikona">${esc(k.emoji)}</div><div class="radek-text"><strong>${esc(k.nazev)}</strong><div class="tlum maly">${ot} otázek · naučeno ${st.procent} %${posl ? ` · poslední test ${posl.skore}/${posl.celkem}` : ""}</div></div><button class="btn" data-test="${esc(k.id)}" ${ot < 3 ? "disabled" : ""}>Spustit</button></div>`; }).join("")}
        ${S.kurzy.length > 1 ? `<div class="radek" style="--b:#f59e0b"><div class="radek-ikona">🎲</div><div class="radek-text"><strong>Mix ze všech kurzů</strong><div class="tlum maly">Interleaving v praxi</div></div><button class="btn" data-test="*">Spustit</button></div>` : ""}
      </div>
      ${testy.length ? `<h2>Historie</h2><div class="seznam">${testy.slice(0, 15).map(t => { const k = S.kurzy.find(x => x.id === t.kurz); return `<div class="radek maly-radek"><div class="radek-ikona">${k ? esc(k.emoji) : "🎲"}</div><div class="radek-text"><strong>${k ? esc(k.nazev) : "Mix"}</strong><div class="tlum maly">${new Date(t.kdy).toLocaleString("cs-CZ")}</div></div><div class="skore ${t.skore / t.celkem >= 0.8 ? "ok" : t.skore / t.celkem >= 0.5 ? "stred" : "ne"}">${t.skore}/${t.celkem}</div></div>`; }).join("")}</div>` : ""}
    </div>`;
  }
  function pocetOtazek(k) { let n = 0; (k.temata || []).forEach(t => (t.karty || []).forEach(c => { if (jeOtazka(c)) n++; })); return n; }
  function spustTest(kurzId) {
    const kurzy = kurzId === "*" ? S.kurzy : S.kurzy.filter(k => k.id === kurzId);
    let ot = []; kurzy.forEach(k => (k.temata || []).forEach(t => (t.karty || []).forEach(c => { if (jeOtazka(c)) ot.push(c); })));
    for (let i = ot.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ot[i], ot[j]] = [ot[j], ot[i]]; }
    ot = ot.slice(0, 10);
    S.test = { kurz: kurzId, otazky: ot, i: 0, odpovedi: [], zacatek: Date.now() };
    jezekRekni(JEZEK.hlaska("testStart"), "premysli", 2500);
    vykresliTestOtazku();
  }
  function vykresliTestOtazku() {
    const t = S.test, c = t.otazky[t.i];
    $("#testy").innerHTML = `<div class="test"><div class="test-hlava"><button class="zavrit" data-test-akce="konec" aria-label="ukončit">✕</button><div class="progress"><div style="width:${(t.i / t.otazky.length) * 100}%"></div></div><span class="tlum maly">${t.i + 1}/${t.otazky.length}</span></div>${htmlKarty(c, true)}<div class="test-pata"><button class="btn test-dal" disabled>Další →</button></div></div>`;
  }
  function testOdpoved(c, ok) {
    const t = S.test; t.odpovedi.push({ karta: c.gid, spravne: ok });
    zaznamenej(c, ok ? "spravne" : "spatne");
    const b = $(".test-dal"); b.disabled = false; if (t.i + 1 >= t.otazky.length) b.textContent = "Vyhodnotit ✓";
  }
  async function testDalsi() {
    const t = S.test; t.i++;
    if (t.i < t.otazky.length) { vykresliTestOtazku(); return; }
    const skore = t.odpovedi.filter(o => o.spravne).length, celkem = t.otazky.length, pomer = skore / celkem;
    pridejXp(XP.test + skore * 2, 0);
    const vysl = { id: "t" + Date.now(), kurz: t.kurz, skore, celkem, kdy: Date.now(), trvani: Date.now() - t.zacatek, odpovedi: t.odpovedi };
    await API.ulozTest(vysl); ulozStav();
    const nal = pomer >= 0.8 ? "party" : pomer >= 0.5 ? "radost" : "smutek";
    if (pomer >= 0.8) konfety();
    jezekRekni(JEZEK.hlaska(pomer >= 0.8 ? "testSkvely" : pomer >= 0.5 ? "testDobry" : "testSlaby"), nal, 4000);
    const spatne = t.odpovedi.filter(o => !o.spravne).map(o => S.karty[o.karta]);
    $("#testy").innerHTML = `<div class="stranka test-vysledek"><div class="jezek-velky">${JEZEK.svg({ nalada: nal, uroven: uroven() })}</div><h1>${skore} / ${celkem}</h1><p class="tlum">${pomer >= 0.8 ? "Výborně." : pomer >= 0.5 ? "Dobrý základ." : "Trénink. Chyby máš níž."} +${XP.test + skore * 2} XP</p>
      ${spatne.length ? `<h2>Co se vrátí do feedu</h2><div class="seznam">${spatne.map(c => `<div class="radek" style="--b:${esc(c.kurz.barva)}"><div class="radek-ikona">${esc(c.kurz.emoji)}</div><div class="radek-text"><strong>${esc(textKarty(c).split("\n")[0])}</strong>${c.vysvetleni ? `<div class="tlum maly">${esc(c.vysvetleni)}</div>` : ""}</div></div>`).join("")}</div>` : `<p>Bez chyby. ${esc(S.stav.jezek)} nemá co dodat.</p>`}
      <div class="tlacitka"><button class="btn" data-test-akce="znovu" data-kurz="${esc(t.kurz)}">Ještě jednou</button><button class="btn btn-sek" data-test-akce="konec">Zpět na testy</button></div></div>`;
    S.test = null;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-test]"); if (b) { spustTest(b.dataset.test); return; }
    const d = e.target.closest(".test-dal"); if (d && !d.disabled) { testDalsi(); return; }
    const a = e.target.closest("[data-test-akce]"); if (!a) return;
    if (a.dataset.testAkce === "konec") { S.test = null; vykresliTesty(); }
    if (a.dataset.testAkce === "znovu") spustTest(a.dataset.kurz);
  });

  // ------------------------------------------------------------------
  // Kurzy (výběr, import, generování z poznámek)
  // ------------------------------------------------------------------
  function vykresliKurzy() {
    const v = S.stav.vybraneKurzy;
    $("#kurzy").innerHTML = `<div class="stranka"><h1>Kurzy</h1><p class="tlum">Zapni, co chceš mít ve feedu. Všechno se míchá dohromady – to je záměr.</p>
      <div class="seznam">${S.kurzy.map(k => { const st = statistikaKurzu(k); const on = !v || v.includes(k.id);
        return `<div class="radek" style="--b:${esc(k.barva)}"><div class="radek-ikona">${esc(k.emoji)}</div><div class="radek-text"><strong>${esc(k.nazev)}</strong><div class="tlum maly">${esc(k.popis || "")}</div><div class="bar"><div style="width:${st.procent}%;background:${esc(k.barva)}"></div></div><div class="tlum maly">${k.pocet} karet · viděno ${st.videno} · naučeno ${st.umim}${k.vlastni ? ' · <a href="#" data-kurz-akce="smazat" data-id="' + esc(k.id) + '">smazat</a>' : ""}</div></div><label class="prepinac"><input type="checkbox" data-kurz-prepni="${esc(k.id)}" ${on ? "checked" : ""}><span></span></label></div>`; }).join("")}</div>
      <h2>Přidat kurz</h2>
      <div class="box">
        <p class="maly">Vlož JSON ve formátu DefLearn Hubu (viz <code>obsah/_sablona.js</code>) – nebo nahraj soubor.</p>
        <textarea id="import-json" rows="5" placeholder='{"id":"muj","nazev":"Můj kurz","emoji":"📚","barva":"#0ea5e9","temata":[…]}'></textarea>
        <div class="tlacitka"><button class="btn" data-kurz-akce="import">Přidat z JSON</button><label class="btn btn-sek">Nahrát soubor<input type="file" id="import-soubor" accept=".json,.js,.txt" hidden></label></div>
      </div>
      <div class="box">
        <p class="maly"><b>Vytvořit kurz z poznámek ✨</b> – vlož text ze skript, prezentace nebo vlastní poznámky a ježek z nich udělá karty, kvízy a vysvětlení.</p>
        ${API.maAI() && !API.prihlasen() ? `<p class="tlum maly">Pro generování kurzů se přihlas v záložce <b>Já</b>.</p>` : API.maAI() ? `<input type="text" id="gen-nazev" placeholder="Název kurzu (např. Makroekonomie – 3. přednáška)"><textarea id="gen-text" rows="7" placeholder="Sem vlož poznámky (až ~30 000 znaků)…"></textarea><div class="tlacitka"><button class="btn" data-kurz-akce="generuj">Vygenerovat karty ✨</button></div><div id="gen-vysledek"></div>` : `<p class="tlum maly">${API.maBackend() ? "Zapne se, až bude na serveru nastavený ANTHROPIC_API_KEY." : "Vyžaduje nasazený backend s AI (server/README.md). Do té doby jde kurz přidat ručně jako JSON výše."}</p>`}
      </div></div>`;
  }
  function pridejVlastniKurz(k, nahradit) {
    if (!k || typeof k !== "object" || !k.id || !k.nazev || !Array.isArray(k.temata)) throw new Error("Chybí id, nazev nebo temata.");
    k.id = String(k.id).toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    if (S.kurzy.some(x => x.id === k.id && x.vestaveny)) throw new Error("ID kurzu „" + k.id + "“ už používá vestavěný kurz.");
    let n = 0; k.temata.forEach((t, ti) => { t.id = t.id || "t" + ti; (t.karty || []).forEach((c, ci) => { c.id = c.id || t.id + "-" + ci; n++; }); });
    if (!n) throw new Error("Kurz nemá žádné karty.");
    k.emoji = k.emoji || "📚"; k.barva = k.barva || "#0ea5e9";
    const vl = API.vlastniKurzyLokalne().filter(x => x.id !== k.id); vl.push(k); API.ulozVlastniKurzyLokalne(vl);
    API.ulozKurzNaServer(k).catch(() => {});
    nactiKurzy(); vykresliKurzy(); vykresliFeed(true);
    toast("Kurz „" + k.nazev + "“ přidán (" + n + " karet)"); jezekRekni("Nový kurz! Hned ho zamíchám do feedu.", "party", 3000);
  }
  function parsujKurz(text) {
    text = text.trim();
    // dovolíme i obsah souboru kurz-*.js (window.JEZTOK_KURZY.push({...}))
    const m = text.match(/push\s*\(\s*(\{[\s\S]*\})\s*\)\s*;?\s*$/); if (m) text = m[1];
    try { return JSON.parse(text); } catch (e) { /* zkusíme volnější JS zápis */ }
    try { return Function('"use strict"; return (' + text + ")")(); } catch (e) { throw new Error("Nerozumím formátu. Zkontroluj JSON (uvozovky, čárky)."); }
  }
  async function generujKurz() {
    const nazev = $("#gen-nazev").value.trim(), text = $("#gen-text").value.trim(), out = $("#gen-vysledek");
    if (!nazev || text.length < 100) { toast("Dej kurzu název a vlož aspoň pár odstavců poznámek."); return; }
    out.innerHTML = `<div class="bublina"><span class="spinner"></span> Ježek čte poznámky a vymýšlí karty… (20–60 s)</div>`;
    try {
      const d = await API.generujKurz(nazev, text);
      const k = d.kurz; let n = 0; k.temata.forEach(t => n += (t.karty || []).length);
      out.innerHTML = `<div class="bublina">Hotovo: ${k.temata.length} témat, ${n} karet.</div><div class="tlacitka"><button class="btn" id="gen-ulozit">Přidat do kurzů</button></div>`;
      $("#gen-ulozit").onclick = () => { try { pridejVlastniKurz(k); } catch (e) { toast(e.message); } };
    } catch (e) { out.innerHTML = `<div class="bublina tlum">Nepovedlo se: ${esc(e.message)}</div>`; }
  }
  document.addEventListener("change", e => {
    const p = e.target.closest("[data-kurz-prepni]");
    if (p) { const id = p.dataset.kurzPrepni; let v = S.stav.vybraneKurzy ? S.stav.vybraneKurzy.slice() : S.kurzy.map(k => k.id); v = p.checked ? [...new Set([...v, id])] : v.filter(x => x !== id); S.stav.vybraneKurzy = v.length === S.kurzy.length ? null : v; ulozStav(); vykresliFeed(true); return; }
    if (e.target.id === "import-soubor") { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { pridejVlastniKurz(parsujKurz(r.result)); } catch (err) { toast(err.message); } }; r.readAsText(f); }
  });
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-kurz-akce]"); if (!a) return; e.preventDefault();
    switch (a.dataset.kurzAkce) {
      case "import": try { pridejVlastniKurz(parsujKurz($("#import-json").value)); } catch (err) { toast(err.message); } break;
      case "smazat": if (confirm("Smazat tento kurz? Postup u jeho karet zůstane uložený.")) { API.ulozVlastniKurzyLokalne(API.vlastniKurzyLokalne().filter(k => k.id !== a.dataset.id)); API.smazKurzNaServeru(a.dataset.id).catch(() => {}); nactiKurzy(); vykresliKurzy(); vykresliFeed(true); } break;
      case "generuj": generujKurz(); break;
    }
  });

  // ------------------------------------------------------------------
  // Já (profil, přihlášení, nastavení)
  // ------------------------------------------------------------------
  function uroven() { return JEZEK.urovenPodleXp(S.stav.xp); }
  function vykresliJa() {
    const u = uroven(), U = JEZEK.UROVNE[u], dalsi = JEZEK.UROVNE[u + 1];
    const nauceno = Object.values(S.stav.karty).filter(p => p.sila >= 3).length, videno = Object.values(S.stav.karty).filter(p => p.videno).length;
    const dny = []; for (let i = 13; i >= 0; i--) { const d = dnes(i); dny.push({ d, akt: !!S.stav.dny[d] }); }
    const uz = API.uzivatel(), z = API.zdravi() || {};
    $("#ja").innerHTML = `<div class="stranka">
      <div class="profil"><div class="jezek-velky klik" data-ja-akce="jezek-klik">${JEZEK.svg({ nalada: "klid", uroven: u })}</div>
        <h1><span id="jezek-jmeno" contenteditable="true" spellcheck="false">${esc(S.stav.jezek)}</span> <small class="tlum">✎</small></h1>
        <p><b>${esc(U.nazev)}</b> · ${esc(U.popis)}</p>
        <div class="bar"><div style="width:${dalsi ? Math.round(100 * (S.stav.xp - U.xp) / (dalsi.xp - U.xp)) : 100}%"></div></div>
        <p class="tlum maly">${S.stav.xp} XP${dalsi ? " · do další úrovně " + (dalsi.xp - S.stav.xp) + " XP" : " · maximální úroveň"}</p></div>
      <div class="statistiky"><div><b>${streak()}</b><span>🔥 dní v kuse</span></div><div><b>${nauceno}</b><span>naučeno</span></div><div><b>${videno}</b><span>viděno</span></div><div><b>${API.testyLokalne().length}</b><span>testů</span></div></div>
      <div class="dny">${dny.map(x => `<span class="den ${x.akt ? "akt" : ""}" title="${x.d}"></span>`).join("")}</div>
      <h2>Kurzy</h2><div class="seznam">${S.kurzy.map(k => { const st = statistikaKurzu(k); return `<div class="radek maly-radek" style="--b:${esc(k.barva)}"><div class="radek-ikona">${esc(k.emoji)}</div><div class="radek-text"><strong>${esc(k.nazev)}</strong><div class="bar"><div style="width:${st.procent}%;background:${esc(k.barva)}"></div></div></div><div class="skore">${st.procent} %</div></div>`; }).join("")}</div>
      <h2>Účet</h2>
      <div class="box">${!API.maBackend() ? `<p class="maly">Běžíš <b>bez účtu</b>: postup se ukládá jen do tohoto telefonu. Pro přihlášení a sledování postupu napříč zařízeními je potřeba nasadit backend (návod v <code>server/README.md</code>) a vyplnit adresu v <code>config.js</code>.</p>`
        : uz ? `<p>Přihlášen/a jako <b>${esc(uz.jmeno || uz.email)}</b> <span class="tlum maly">(${esc(uz.email)})</span></p><p class="tlum maly">Postup se synchronizuje automaticky. ${z.ai ? "AI dovysvětlení je zapnuté ✨" : "AI dovysvětlení není na serveru zapnuté."}</p><div class="tlacitka"><button class="btn btn-sek" data-ja-akce="sync">Synchronizovat teď</button><button class="btn btn-sek" data-ja-akce="odhlasit">Odhlásit</button></div>`
        : `<p class="maly">Přihlas se, aby se postup ukládal na server a šel sledovat na více zařízeních. ${z.ok ? "" : '<span class="tlum">Server teď neodpovídá – zkus to později.</span>'}</p>
          <form id="auth-form" class="auth"><input type="text" name="jmeno" placeholder="Jméno (jen při registraci)" autocomplete="name"><input type="email" name="email" placeholder="E-mail" required autocomplete="email"><input type="password" name="heslo" placeholder="Heslo (min. 8 znaků)" required minlength="8" autocomplete="current-password"><div class="tlacitka"><button class="btn" type="submit" data-rezim="prihlasit">Přihlásit</button><button class="btn btn-sek" type="submit" data-rezim="registrovat">Registrovat</button></div><div id="auth-chyba" class="chyba"></div></form>`}</div>
      <h2>Hudba</h2>
      <div class="box"><label class="radek-prepinac"><span><b>Měnit styl s každou kartou</b><br><span class="tlum maly">Klidnější styly u faktů, nakopnutí u kvízů. Vypni, když chceš jeden styl napořád.</span></span><span class="prepinac"><input type="checkbox" id="hudba-auto" ${S.stav.hudba.auto !== false ? "checked" : ""}><span></span></span></label>
        <div class="viby">${HUDBA.VIBY.map(v => `<button class="vibe ${S.stav.hudba.vibe === v.id ? "akt" : ""}" data-vibe="${v.id}"><span>${v.emoji}</span>${esc(v.nazev)}<small>${esc(v.popis)}</small></button>`).join("")}</div>
        <label class="maly">Hlasitost <input type="range" id="hlasitost" min="0" max="1" step="0.05" value="${S.stav.hudba.volume}"></label></div>
      <h2>Aplikace</h2>
      <div class="box"><p class="maly">Na telefonu si DefLearn Hub přidej na plochu: v prohlížeči <b>Sdílet → Přidat na plochu</b> (iPhone) nebo <b>⋮ → Přidat na plochu</b> (Android). Pak běží jako appka, i offline.</p>
        <div class="tlacitka"><button class="btn btn-sek" data-ja-akce="export">Exportovat postup</button><button class="btn btn-nebezpeci" data-ja-akce="reset">Smazat postup</button></div></div>
      <p class="tlum maly stred">DefLearn Hub · verze ${esc(window.JEZTOK_VERZE || "dev")}</p>
    </div>`;
  }
  document.addEventListener("click", async e => {
    const v = e.target.closest("[data-vibe]"); if (v) { S.stav.hudba.vibe = v.dataset.vibe; S.stav.hudba.auto = false; HUDBA.setAuto(false); const ch = $("#hudba-auto"); if (ch) ch.checked = false; HUDBA.setVibe(v.dataset.vibe); if (!HUDBA.hraje()) { S.stav.hudba.zapnuto = true; HUDBA.setVolume(S.stav.hudba.volume); HUDBA.start(v.dataset.vibe); } ulozStav(); $$("[data-vibe]").forEach(b => b.classList.toggle("akt", b === v)); return; }
    const a = e.target.closest("[data-ja-akce]"); if (!a) return;
    switch (a.dataset.jaAkce) {
      case "jezek-klik": { const n = ["radost", "party", "premysli", "spi", "smutek"][Math.floor(Math.random() * 5)]; a.innerHTML = JEZEK.svg({ nalada: n, uroven: uroven() }); a.classList.add("skok"); setTimeout(() => a.classList.remove("skok"), 600); vibrace([15]); break; }
      case "odhlasit": await API.odhlaseni(); toast("Odhlášeno"); vykresliJa(); break;
      case "sync": try { const s = await API.synchronizuj(S.stav); S.stav = SLOUCENI.sloucStavy(S.stav, s); API.ulozStavLokalne(S.stav); toast("Synchronizováno"); vykresliJa(); } catch (err) { toast("Synchronizace selhala: " + err.message); } break;
      case "export": { const blob = new Blob([JSON.stringify({ stav: S.stav, testy: API.testyLokalne(), kurzy: API.vlastniKurzyLokalne() }, null, 2)], { type: "application/json" }); const u = URL.createObjectURL(blob); const l = document.createElement("a"); l.href = u; l.download = "jeztok-postup.json"; l.click(); setTimeout(() => URL.revokeObjectURL(u), 5000); break; }
      case "reset": if (confirm("Opravdu smazat veškerý postup v tomto zařízení? (Na serveru zůstane, pokud jsi přihlášen/a.)")) { S.stav = SLOUCENI.prazdnyStav(); API.ulozStavLokalne(S.stav); API.ulozTestyLokalne([]); nactiKurzy(); vykresliJa(); vykresliFeed(true); toast("Postup smazán"); } break;
    }
  });
  document.addEventListener("change", e => { if (e.target.id === "hudba-auto") { S.stav.hudba.auto = e.target.checked; HUDBA.setAuto(e.target.checked); if (e.target.checked && HUDBA.hraje()) HUDBA.proKartu(S.aktivni && S.aktivni.typ, true); ulozStav(); hudbaBar(); } });
  document.addEventListener("input", e => { if (e.target.id === "hlasitost") { S.stav.hudba.volume = Number(e.target.value); HUDBA.setVolume(S.stav.hudba.volume); ulozStav(); } });
  document.addEventListener("focusout", e => { if (e.target.id === "jezek-jmeno") { const n = e.target.textContent.trim().slice(0, 24) || "Hubík"; e.target.textContent = n; if (n !== S.stav.jezek) { S.stav.jezek = n; ulozStav(); jezekRekni("Takže " + n + ". Líbí se mi to.", "radost", 2500); } } });
  document.addEventListener("keydown", e => { if (e.target.id === "jezek-jmeno" && e.key === "Enter") { e.preventDefault(); e.target.blur(); } });
  document.addEventListener("submit", async e => {
    if (e.target.id !== "auth-form") return; e.preventDefault();
    const f = e.target, rezim = (e.submitter && e.submitter.dataset.rezim) || "prihlasit", ch = $("#auth-chyba"); ch.textContent = "";
    const email = f.email.value.trim(), heslo = f.heslo.value, jmeno = f.jmeno.value.trim();
    $$("button", f).forEach(b => b.disabled = true);
    try {
      if (rezim === "registrovat") await API.registrace(email, heslo, jmeno); else await API.prihlaseni(email, heslo);
      await poPrihlaseni(); toast("Přihlášeno"); jezekRekni("Vítej zpátky. Postup je v bezpečí na serveru.", "radost", 3000); vykresliJa();
    } catch (err) { ch.textContent = err.message; $$("button", f).forEach(b => b.disabled = false); }
  });
  async function poPrihlaseni() {
    try { const s = await API.stahniStav(); S.stav = SLOUCENI.sloucStavy(S.stav, s); API.ulozStavLokalne(S.stav); await API.synchronizuj(S.stav); } catch (e) {}
    try { const kurzy = await API.stahniKurzy(); const lok = API.vlastniKurzyLokalne(); const mapa = {}; [...kurzy, ...lok].forEach(k => mapa[k.id] = k); API.ulozVlastniKurzyLokalne(Object.values(mapa)); for (const k of lok) if (!kurzy.some(x => x.id === k.id)) API.ulozKurzNaServer(k).catch(() => {}); } catch (e) {}
    try { const testy = await API.stahniTesty(); const lok = API.testyLokalne(); const mapa = {}; [...testy, ...lok].forEach(t => mapa[t.id] = t); API.ulozTestyLokalne(Object.values(mapa).sort((a, b) => b.kdy - a.kdy)); } catch (e) {}
    nactiKurzy(); vykresliFeed(true); aktualizujChipy();
  }

  // ------------------------------------------------------------------
  // Navigace, chipy, hudba bar, ježek bublina, efekty
  // ------------------------------------------------------------------
  function prepni(o) {
    S.obrazovka = o;
    $$(".obrazovka").forEach(el => el.classList.toggle("akt", el.id === o));
    $$(".nav button").forEach(b => b.classList.toggle("akt", b.dataset.o === o));
    if (o === "testy" && !S.test) vykresliTesty();
    if (o === "kurzy") vykresliKurzy();
    if (o === "ja") vykresliJa();
    document.body.classList.toggle("ve-feedu", o === "feed");
  }
  $$(".nav button").forEach(b => b.addEventListener("click", () => prepni(b.dataset.o)));
  function aktualizujChipy() { const s = streak(); $("#chip-streak").textContent = "🔥 " + s; $("#chip-xp").textContent = "⚡ " + S.stav.xp; $("#chip-streak").classList.toggle("zhasnuto", !S.stav.dny[dnes()]); }
  function xpBublina(n) { const el = document.createElement("div"); el.className = "xp-bublina"; el.textContent = "+" + n + " XP"; document.body.appendChild(el); setTimeout(() => el.remove(), 1200); }

  let jezekTimer = null;
  function jezekRekni(text, nalada, ms) {
    const el = $("#jezek-bublina"); el.innerHTML = `<div class="jezek-mini">${JEZEK.svg({ nalada: nalada || "klid", uroven: uroven() })}</div><div class="bublina">${esc(text)}</div>`;
    el.classList.add("videt"); clearTimeout(jezekTimer); jezekTimer = setTimeout(() => el.classList.remove("videt"), ms || 3000);
  }
  $("#jezek-bublina").addEventListener("click", () => $("#jezek-bublina").classList.remove("videt"));
  function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("videt"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("videt"), 2600); }
  function vibrace(v) { try { if (navigator.vibrate) navigator.vibrate(v); } catch (e) {} }
  function srdce(x, y) { const el = document.createElement("div"); el.className = "srdce-let"; el.textContent = "❤️"; el.style.left = x + "px"; el.style.top = y + "px"; document.body.appendChild(el); setTimeout(() => el.remove(), 900); }
  function hvezdicky(karta) { const r = karta.getBoundingClientRect(); for (let i = 0; i < 8; i++) { const el = document.createElement("div"); el.className = "hvezda"; el.textContent = ["✨", "⭐", "💫"][i % 3]; el.style.left = (r.left + r.width * (0.2 + Math.random() * 0.6)) + "px"; el.style.top = (r.top + r.height * (0.3 + Math.random() * 0.4)) + "px"; el.style.setProperty("--dx", (Math.random() * 160 - 80) + "px"); el.style.setProperty("--dy", (-60 - Math.random() * 120) + "px"); document.body.appendChild(el); setTimeout(() => el.remove(), 1000); } }
  function konfety() {
    const c = $("#konfety"), ctx = c.getContext("2d"); c.width = innerWidth; c.height = innerHeight; c.style.display = "block";
    const barvy = ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#fde047"];
    const ps = Array.from({ length: 140 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5, vx: Math.random() * 4 - 2, vy: 2 + Math.random() * 4, r: 4 + Math.random() * 5, b: barvy[Math.floor(Math.random() * barvy.length)], a: Math.random() * Math.PI, va: Math.random() * 0.2 - 0.1 }));
    const t0 = performance.now();
    (function kresli(t) { ctx.clearRect(0, 0, c.width, c.height); ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.b; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6); ctx.restore(); }); if (t - t0 < 2800) requestAnimationFrame(kresli); else { ctx.clearRect(0, 0, c.width, c.height); c.style.display = "none"; } })(t0);
  }

  // Hudba bar
  function hudbaBar() {
    const st = HUDBA.stav(); const v = st.vibe;
    $("#hudba-nazev").textContent = (st.hraje ? "♪ " : "") + (st.auto ? "🔀 " : "") + v.emoji + " " + v.nazev + (st.hraje ? (st.auto ? " · mění se s kartou" : " · ťukni pro další styl") : " · ťukni pro hudbu");
    $("#hudba-disk").classList.toggle("toci", st.hraje); $("#hudba-btn").textContent = st.hraje ? "⏸" : "▶";
  }
  HUDBA.onZmena(hudbaBar);
  $("#hudba-btn").addEventListener("click", () => { if (HUDBA.hraje()) { HUDBA.stop(); S.stav.hudba.zapnuto = false; } else { HUDBA.setVolume(S.stav.hudba.volume); HUDBA.setAuto(S.stav.hudba.auto !== false); HUDBA.start(S.stav.hudba.auto !== false ? HUDBA.proKartu(S.aktivni && S.aktivni.typ, true) : S.stav.hudba.vibe); S.stav.hudba.zapnuto = true; } ulozStav(); });
  $("#hudba-nazev").addEventListener("click", () => {
    let id;
    if (S.stav.hudba.auto !== false) id = HUDBA.proKartu(S.aktivni && S.aktivni.typ, true);
    else { const i = HUDBA.VIBY.findIndex(x => x.id === S.stav.hudba.vibe); id = HUDBA.VIBY[(i + 1) % HUDBA.VIBY.length].id; HUDBA.setVibe(id); }
    S.stav.hudba.vibe = id;
    if (!HUDBA.hraje()) { HUDBA.setVolume(S.stav.hudba.volume); HUDBA.start(id); S.stav.hudba.zapnuto = true; }
    ulozStav(); hudbaBar();
  });
  // první dotyk kdekoli → spustit hudbu, pokud byla naposledy zapnutá
  let prvniDotyk = false;
  function naPrvniDotyk() { if (prvniDotyk) return; prvniDotyk = true; if (S.stav.hudba.zapnuto !== false) { HUDBA.setVolume(S.stav.hudba.volume); HUDBA.setAuto(S.stav.hudba.auto !== false); HUDBA.start(S.stav.hudba.auto !== false ? HUDBA.proKartu(S.aktivni && S.aktivni.typ, true) : S.stav.hudba.vibe); } }
  document.addEventListener("pointerdown", naPrvniDotyk, { once: true });
  document.addEventListener("keydown", naPrvniDotyk, { once: true });

  // ------------------------------------------------------------------
  // Start
  // ------------------------------------------------------------------
  // Starší verze ukládala postup pod klíčem kurz:idKarty (bez tématu). Přenést, kde je to jednoznačné.
  function migrujKlice() {
    const stare = Object.keys(S.stav.karty).filter(g => g.split(":").length === 2);
    if (!stare.length) return;
    const vest = window.JEZTOK_KURZY || [];
    stare.forEach(g => {
      const [kid, cid] = g.split(":"); const k = vest.find(x => x.id === kid); let shody = [];
      if (k) (k.temata || []).forEach(t => (t.karty || []).forEach(c => { if (c.id === cid) shody.push(kid + ":" + t.id + ":" + cid); }));
      if (shody.length === 1 && !S.stav.karty[shody[0]]) S.stav.karty[shody[0]] = S.stav.karty[g];
      delete S.stav.karty[g];
    });
    S.stav.aktualizovano = Date.now(); API.ulozStavLokalne(S.stav);
  }
  async function init() {
    S.stav = SLOUCENI.sloucStavy(SLOUCENI.prazdnyStav(), API.nactiStav());
    migrujKlice();
    if (!S.stav.hudba) S.stav.hudba = { vibe: "lofi", volume: 0.7, zapnuto: true, auto: true };
    HUDBA.setAuto(S.stav.hudba.auto !== false); HUDBA.onZmena(st => { if (st.vibe && st.vibe.id) S.stav.hudba.vibe = st.vibe.id; });
    nactiKurzy();
    $("#jezek-hlava").innerHTML = JEZEK.svg({ nalada: "klid", uroven: uroven() });
    aktualizujChipy(); hudbaBar(); vykresliFeed(true); prepni("feed");
    const prvni = !API.nactiStav();
    setTimeout(() => jezekRekni(JEZEK.hlaska("vitej", { j: S.stav.jezek }), "radost", prvni ? 6000 : 3500), 600);
    const s = streak(); if (s >= 3 && S.stav.dny[dnes()] === undefined) setTimeout(() => jezekRekni(JEZEK.hlaska("streak", { n: s }), "party", 4000), 7000);
    API.health().then(() => { if (API.prihlasen()) poPrihlaseni(); });
    if ("serviceWorker" in navigator) {
      try {
        navigator.serviceWorker.register("sw.js").then(reg => {
          // po návratu do appky zkontrolovat novou verzi; když se nainstaluje, nabídnout obnovení
          document.addEventListener("visibilitychange", () => { if (!document.hidden) reg.update().catch(() => {}); });
          reg.addEventListener("updatefound", () => { const nw = reg.installing; if (!nw) return; nw.addEventListener("statechange", () => { if (nw.state === "activated" && navigator.serviceWorker.controller) { const el = $("#toast"); el.innerHTML = "Nová verze je připravená · <b>ťukni pro obnovení</b>"; el.classList.add("videt"); clearTimeout(el._t); el.onclick = () => location.reload(); } }); });
        }).catch(() => {});
      } catch (e) {}
    }
    window.addEventListener("online", () => { if (API.prihlasen()) API.naplanujSync(S.stav); });
  }
  init();
  window.JEZTOK = { S, vykresliFeed, prepni };
})();
