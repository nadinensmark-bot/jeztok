// =====================================================================
// DefLearn Hub – backend. Malý Node.js server bez frameworku.
//   POST /api/registrace, /api/prihlaseni, /api/odhlaseni   účty (e-mail + heslo)
//   POST /api/zmena-hesla                                  změna hesla (staré + nové); odhlásí ostatní zařízení
//   GET  /api/ja                                           kdo jsem (vč. povolených kurzů)
//   KURZY_UZIVATELU (env, JSON {"email": ["programy","slovnicek"]}): které vestavěné kurzy uživatel vidí.
//   Klíč může být e-mail, "@domena.cz" (všichni z domény) nebo "*" (všichni ostatní); hodnota null = všechny kurzy.
//   Priorita: e-mail > doména > "*". Kdo nespadá nikam, vidí všechny.
//   REGISTRACE_POVOLENE (env, CSV e-mailů a "@domen", nebo "*" = kdokoli): registrace projde jen jim, ostatní 403.
//   REGISTRACE_KODY (env, CSV pozvánkových kódů): registrace projde i komukoli, kdo pošle platný kód (pole "kod").
//   Bez obou = registrace uzavřená (bezpečný výchozí stav). Přihlášení existujících účtů to neomezuje.
//   GET  /api/tym                                          přehled postupu týmu (jen správci; ADMINI = e-maily oddělené čárkou)
//   GET/PUT /api/postup                                    postup učení (slučuje se, viz ../js/slouceni.js)
//   GET/POST /api/testy                                    výsledky testů
//   GET/PUT /api/kurzy, DELETE /api/kurzy/:id              vlastní kurzy uživatele
//   POST /api/vysvetli                                     AI dovysvětlení karty (volitelné)
//   POST /api/generuj-kurz                                 AI: z poznámek udělá karty (volitelné)
//   GET  /api/health                                       stav
// Spuštění: node server.js   (konfigurace: .env.example, README.md)
// =====================================================================
"use strict";
const http = require("http");
const crypto = require("crypto");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");
const { otevri } = require("./db");
const SLOUCENI = require(path.join(__dirname, "..", "js", "slouceni.js"));

const CFG = {
  port: Number(process.env.PORT || 8790),
  allowedOrigin: (process.env.ALLOWED_ORIGIN || "*").split(",").map(s => s.trim()).filter(Boolean),
  databaseUrl: process.env.DATABASE_URL || "",
  dbPath: process.env.DB_PATH || path.join(__dirname, "data", "jeztok.sqlite"),
  secret: process.env.SESSION_SECRET || "",
  mock: process.env.MOCK_AI === "1",
  modelVysvetli: process.env.MODEL_VYSVETLI || "claude-opus-5-5",
  modelKurz: process.env.MODEL_KURZ || "claude-opus-5-5",
  limitVysvetliDen: Number(process.env.LIMIT_VYSVETLI_DEN || 40),
  limitKurzDen: Number(process.env.LIMIT_KURZ_DEN || 5),
  limitAiCelkemDen: Number(process.env.LIMIT_AI_CELKEM_DEN || 1000),
  admini: (process.env.ADMINI || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean),
  kurzyUzivatelu: (() => { try { const m = JSON.parse(process.env.KURZY_UZIVATELU || "{}"); const out = {}; for (const [e, k] of Object.entries(m)) { if (Array.isArray(k)) out[String(e).trim().toLowerCase()] = k.map(String); else if (k === null) out[String(e).trim().toLowerCase()] = null; } return out; } catch (e) { console.warn("[jeztok] KURZY_UZIVATELU není platný JSON, ignoruji."); return {}; } })(),
  registracePovolene: (process.env.REGISTRACE_POVOLENE || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean),
  registraceKody: (process.env.REGISTRACE_KODY || "").split(",").map(s => s.trim()).filter(Boolean),
  maxTelo: 2 * 1024 * 1024,
  maxPoznamky: 30000
};
if (!CFG.secret) { CFG.secret = crypto.randomBytes(32).toString("hex"); console.warn("[jeztok] SESSION_SECRET není nastavený – po restartu serveru se všichni odhlásí."); }
const maAI = () => CFG.mock || !!process.env.ANTHROPIC_API_KEY;
let _client = null;
const klient = () => (_client = _client || new Anthropic());

// ---------------- pomocné ----------------
class ChybaApi extends Error { constructor(status, zprava) { super(zprava); this.status = status; } }
const hashHesla = (heslo, salt) => { salt = salt || crypto.randomBytes(16).toString("hex"); return salt + ":" + crypto.scryptSync(heslo, salt, 64).toString("hex"); };
const overHeslo = (heslo, ulozeny) => { const [salt, h] = String(ulozeny).split(":"); const k = crypto.scryptSync(heslo, salt, 64); const u = Buffer.from(h, "hex"); return k.length === u.length && crypto.timingSafeEqual(k, u); };
const hashTokenu = t => crypto.createHmac("sha256", CFG.secret).update(t).digest("hex");
const emailOk = e => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 200;
const domenaZ = email => { const e = String(email || "").toLowerCase(); const i = e.indexOf("@"); return i >= 0 ? e.slice(i) : ""; };
// povolené vestavěné kurzy: pole id, nebo null = všechny; hledá se e-mail, pak "@domena", pak "*"
const povoleneKurzy = email => {
  const e = String(email || "").toLowerCase(), m = CFG.kurzyUzivatelu;
  for (const k of [e, domenaZ(e), "*"]) if (k && Object.prototype.hasOwnProperty.call(m, k)) return m[k];
  return null;
};
const registraceDovolena = email => { const p = CFG.registracePovolene; if (!p.length) return false; if (p.includes("*")) return true; const e = String(email || "").toLowerCase(); return p.includes(e) || p.includes(domenaZ(e)); };
const kodPlatny = kod => { const k = String(kod || "").trim(); if (!k) return false; return CFG.registraceKody.some(x => x.length === k.length && crypto.timingSafeEqual(Buffer.from(x), Buffer.from(k))); };
const jeSpravce = email => CFG.admini.includes(String(email || "").toLowerCase());
const verejnyUzivatel = u => ({ id: u.id, email: u.email, jmeno: u.jmeno || "", kurzy: povoleneKurzy(u.email), spravce: jeSpravce(u.email) });

// Souhrn postupu pro přehled týmu: žádné konkrétní karty, jen počty po kurzech (gid karty = kurz:tema:karta).
function souhrnPostupu(stav) {
  const s = stav || {}; const kurzy = {};
  for (const [gid, p] of Object.entries(s.karty || {})) {
    const kurz = String(gid).split(":")[0]; if (!kurz) continue;
    const k = kurzy[kurz] || (kurzy[kurz] = { videno: 0, umim: 0 });
    if (p && p.videno) k.videno++;
    if (p && p.sila >= 3) k.umim++;
  }
  return { xp: Number(s.xp) || 0, dny: Object.keys(s.dny || {}).sort(), aktualizovano: Number(s.aktualizovano) || 0, kurzy };
}

// jednoduché denní limity v paměti (na klíč)
const pocitadla = new Map(); let pocitadlaDen = "";
function limit(klic, max) {
  const d = new Date().toISOString().slice(0, 10);
  if (d !== pocitadlaDen) { pocitadla.clear(); pocitadlaDen = d; }
  const n = (pocitadla.get(klic) || 0) + 1; pocitadla.set(klic, n);
  if (n > max) throw new ChybaApi(429, "Denní limit vyčerpán. Zkus to zítra.");
}
const pokusyPrihlaseni = new Map();
function brzdaPrihlaseni(ip) {
  const z = pokusyPrihlaseni.get(ip) || { n: 0, od: Date.now() };
  if (Date.now() - z.od > 15 * 60 * 1000) { z.n = 0; z.od = Date.now(); }
  z.n++; pokusyPrihlaseni.set(ip, z);
  if (z.n > 30) throw new ChybaApi(429, "Příliš mnoho pokusů, zkus to za 15 minut.");
}

function overKurz(k) {
  if (!k || typeof k !== "object") throw new ChybaApi(400, "Kurz musí být objekt.");
  if (typeof k.id !== "string" || !/^[a-z0-9_-]{1,40}$/.test(k.id)) throw new ChybaApi(400, "Neplatné id kurzu.");
  if (typeof k.nazev !== "string" || !k.nazev.trim()) throw new ChybaApi(400, "Kurz nemá název.");
  if (!Array.isArray(k.temata) || !k.temata.length) throw new ChybaApi(400, "Kurz nemá témata.");
  let n = 0; k.temata.forEach(t => { if (!Array.isArray(t.karty)) throw new ChybaApi(400, "Téma nemá karty."); n += t.karty.length; });
  if (!n) throw new ChybaApi(400, "Kurz nemá karty.");
  if (JSON.stringify(k).length > 1024 * 1024) throw new ChybaApi(400, "Kurz je příliš velký.");
  return k;
}

// ---------------- AI ----------------
const SYSTEM_VYSVETLI = `Jsi Hubík, ježek-učitel v mobilní aplikaci DefLearn Hub (feed jako TikTok, ale s učivem). Uživatel se dívá na jednu kartu učiva a chce ji dovysvětlit.
Pravidla: odpovídej česky, kamarádsky, max. asi 120 slov. Drž se tématu karty. Vysvětluj jednoduše, ideálně s jedním konkrétním příkladem nebo přirovnáním. Žádné nadpisy, žádné odrážky – jen souvislý krátký text, nanejvýš jedno emoji. Pokud si něčím nejsi jistý nebo to z karty nevyplývá, řekni to; nevymýšlej si fakta.`;

const SYSTEM_KURZ = `Z poznámek, které dostaneš, vytvoř učební kurz pro aplikaci DefLearn Hub (mobilní feed s krátkými kartami, jako TikTok). Vrať POUZE platný JSON, bez komentáře a bez markdownu, v tomto formátu:
{"id":"kratke-id","nazev":"Název kurzu","emoji":"📚","barva":"#hex","popis":"jedna věta","temata":[{"id":"t1","nazev":"Téma","karty":[
 {"id":"f1","typ":"fakt","titulek":"úderný titulek","text":"2–3 věty, jedna myšlenka","vysvetleni":"delší vysvětlení s příkladem"},
 {"id":"k1","typ":"kviz","otazka":"…","moznosti":["A","B","C"],"spravne":1,"vysvetleni":"proč"},
 {"id":"a1","typ":"anone","tvrzeni":"…","spravne":true,"vysvetleni":"proč"},
 {"id":"d1","typ":"doplnit","text":"věta s mezerou ___","odpoved":["slovo","varianta"],"vysvetleni":"proč"},
 {"id":"l1","typ":"lekce","titulek":"…","kroky":["krok 1","krok 2","krok 3"]}]}]}
Zásady: česky; vycházej POUZE z poznámek, nic nedomýšlej; po každé 1–2 kartách "fakt" dej kvíz nebo ano/ne k téže myšlence; "spravne" je index od 0; ke každému tématu max. jedna "lekce" (4–6 kroků) shrnující výklad; celkem 15–40 karet podle délky poznámek; id karet unikátní v kurzu, bez diakritiky; barva kontrastní tmavá (např. #7c3aed, #059669, #db2777, #d97706, #0ea5e9, #dc2626).`;

async function aiVysvetli(karta, dotaz, historie) {
  if (CFG.mock) return "(Ukázkový režim bez AI) Představ si to takhle: " + String(karta.text || "").slice(0, 160) + " … Jinými slovy: " + (karta.vysvetleni ? String(karta.vysvetleni).slice(0, 200) : "na tuhle kartu autor delší vysvětlení nenapsal, ale princip je přesně to, co je na kartě.");
  const kontext = `Kurz: ${karta.kurz || ""}\nTéma: ${karta.tema || ""}\nKarta (${karta.typ || ""}):\n${karta.text || ""}\n${karta.spravne ? "Správná odpověď: " + karta.spravne + "\n" : ""}${karta.vysvetleni ? "Vysvětlení od autora: " + karta.vysvetleni + "\n" : ""}`;
  const messages = [{ role: "user", content: kontext + "\nDotaz: " + (historie && historie.length ? "(viz historie níže)" : dotaz) }];
  (historie || []).slice(-6).forEach(h => { if (h && (h.role === "user" || h.role === "assistant") && typeof h.text === "string") messages.push({ role: h.role, content: h.text.slice(0, 2000) }); });
  if (historie && historie.length) messages.push({ role: "user", content: dotaz });
  // sloučit sousední stejné role (API vyžaduje střídání)
  const m2 = []; messages.forEach(m => { const p = m2[m2.length - 1]; if (p && p.role === m.role) p.content += "\n\n" + m.content; else m2.push(Object.assign({}, m)); });
  const r = await klient().beta.messages.create({
    model: CFG.modelVysvetli, max_tokens: 1024, system: SYSTEM_VYSVETLI, messages: m2,
    output_config: { effort: "low" }, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default"
  });
  if (r.stop_reason === "refusal") throw new ChybaApi(502, "Model na tenhle dotaz neodpověděl.");
  return r.content.filter(b => b.type === "text").map(b => b.text).join("").trim();
}

function mockKurz(nazev, poznamky) {
  const odst = poznamky.split(/\n\s*\n|\. (?=[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])/).map(s => s.trim()).filter(s => s.length > 40).slice(0, 12);
  const karty = [];
  odst.forEach((o, i) => {
    const titulek = o.split(/[.!?]/)[0].slice(0, 60);
    karty.push({ id: "f" + i, typ: "fakt", titulek, text: o.slice(0, 280), vysvetleni: "(Ukázkový režim bez AI – karta je vytvořená mechanicky z poznámek.)" });
    if (i % 2 === 1) karty.push({ id: "a" + i, typ: "anone", tvrzeni: o.slice(0, 160), spravne: true, vysvetleni: "Tvrzení je převzaté přímo z poznámek." });
  });
  if (!karty.length) karty.push({ id: "f0", typ: "fakt", titulek: nazev, text: poznamky.slice(0, 280) });
  return { id: nazev.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "kurz", nazev, emoji: "📚", barva: "#0ea5e9", popis: "Vytvořeno z poznámek (ukázkový režim).", temata: [{ id: "t1", nazev: "Z poznámek", karty }] };
}
async function aiGenerujKurz(nazev, poznamky) {
  if (CFG.mock) return mockKurz(nazev, poznamky);
  const r = await klient().beta.messages.stream({
    model: CFG.modelKurz, max_tokens: 16000, system: SYSTEM_KURZ,
    messages: [{ role: "user", content: `Název kurzu: ${nazev}\n\nPOZNÁMKY:\n${poznamky}` }],
    output_config: { effort: "medium" }, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default"
  }).finalMessage();
  if (r.stop_reason === "refusal") throw new ChybaApi(502, "Model tyhle poznámky odmítl zpracovat.");
  if (r.stop_reason === "max_tokens") throw new ChybaApi(502, "Poznámky jsou příliš dlouhé, zkrať je a zkus znovu.");
  let text = r.content.filter(b => b.type === "text").map(b => b.text).join("").trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
  const i = text.indexOf("{"), j = text.lastIndexOf("}"); if (i >= 0 && j > i) text = text.slice(i, j + 1);
  let k; try { k = JSON.parse(text); } catch (e) { throw new ChybaApi(502, "Model vrátil nečitelný JSON, zkus to znovu."); }
  k.id = String(k.id || nazev).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "kurz";
  k.nazev = k.nazev || nazev;
  return overKurz(k);
}

// ---------------- HTTP ----------------
function json(res, status, data, origin) {
  const h = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
  Object.assign(h, cors(origin));
  res.writeHead(status, h); res.end(JSON.stringify(data));
}
function cors(origin) {
  const povolen = CFG.allowedOrigin.includes("*") ? (origin || "*") : (CFG.allowedOrigin.includes(origin) ? origin : CFG.allowedOrigin[0]);
  return { "Access-Control-Allow-Origin": povolen, "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization", "Access-Control-Max-Age": "86400", "Vary": "Origin" };
}
function nactiTelo(req) {
  return new Promise((resolve, reject) => {
    let d = "", n = 0;
    req.on("data", c => { n += c.length; if (n > CFG.maxTelo) { reject(new ChybaApi(413, "Tělo požadavku je příliš velké.")); req.destroy(); } else d += c; });
    req.on("end", () => { if (!d) return resolve({}); try { resolve(JSON.parse(d)); } catch (e) { reject(new ChybaApi(400, "Neplatný JSON.")); } });
    req.on("error", reject);
  });
}

let db = null;
async function uzivatelZTokenu(req) {
  const a = req.headers.authorization || ""; const t = a.startsWith("Bearer ") ? a.slice(7) : "";
  if (!t) return null;
  const s = await db.session(hashTokenu(t)); if (!s) return null;
  return db.uzivatelPodleId(s.uzivatel);
}
async function vyzadujUzivatele(req) { const u = await uzivatelZTokenu(req); if (!u) throw new ChybaApi(401, "Nejsi přihlášen/a."); return u; }
async function novySession(u) { const t = crypto.randomBytes(32).toString("hex"); await db.vytvorSession(hashTokenu(t), u.id); return t; }

async function obsluz(req, res) {
  const origin = req.headers.origin || "";
  const url = new URL(req.url, "http://x");
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
  if (req.method === "OPTIONS") { res.writeHead(204, cors(origin)); return res.end(); }
  try {
    const c = url.pathname, m = req.method;
    if (c === "/api/health" && m === "GET") return json(res, 200, { ok: true, ai: maAI(), mock: CFG.mock, db: db.typ, model: maAI() ? CFG.modelVysvetli : null }, origin);

    if (c === "/api/registrace" && m === "POST") {
      brzdaPrihlaseni(ip); const b = await nactiTelo(req);
      const email = String(b.email || "").trim().toLowerCase();
      if (!emailOk(email)) throw new ChybaApi(400, "Zadej platný e-mail.");
      if (typeof b.heslo !== "string" || b.heslo.length < 8) throw new ChybaApi(400, "Heslo musí mít aspoň 8 znaků.");
      if (!CFG.registracePovolene.length && !CFG.registraceKody.length) throw new ChybaApi(403, "Registrace je momentálně uzavřená. Účty zakládá Defence Hub.");
      if (!registraceDovolena(email) && !kodPlatny(b.kod)) throw new ChybaApi(403, b.kod ? "Pozvánkový kód neplatí. Zkontroluj ho, nebo se ozvi Defence Hubu." : (CFG.registraceKody.length ? "Tenhle e-mail není na seznamu pozvaných. Zadej pozvánkový kód od Defence Hubu, nebo se nám ozvi." : "Tenhle e-mail není na seznamu pozvaných. Registrace je pro firmy z databáze Defence Hubu; pokud mezi ně patříš, ozvi se nám a e-mail doplníme."));
      if (await db.uzivatelPodleEmailu(email)) throw new ChybaApi(409, "Tenhle e-mail už je zaregistrovaný – zkus se přihlásit.");
      const u = { id: crypto.randomUUID(), email, jmeno: String(b.jmeno || "").trim().slice(0, 60), hash: hashHesla(b.heslo) };
      await db.vytvorUzivatele(u);
      return json(res, 200, { ok: true, token: await novySession(u), uzivatel: verejnyUzivatel(u) }, origin);
    }
    if (c === "/api/prihlaseni" && m === "POST") {
      brzdaPrihlaseni(ip); const b = await nactiTelo(req);
      const u = await db.uzivatelPodleEmailu(String(b.email || "").trim().toLowerCase());
      if (!u || typeof b.heslo !== "string" || !overHeslo(b.heslo, u.hash)) throw new ChybaApi(401, "Špatný e-mail nebo heslo.");
      return json(res, 200, { ok: true, token: await novySession(u), uzivatel: verejnyUzivatel(u) }, origin);
    }
    if (c === "/api/odhlaseni" && m === "POST") {
      const a = req.headers.authorization || ""; if (a.startsWith("Bearer ")) await db.smazSession(hashTokenu(a.slice(7)));
      return json(res, 200, { ok: true }, origin);
    }
    if (c === "/api/ja" && m === "GET") { const u = await vyzadujUzivatele(req); return json(res, 200, { ok: true, uzivatel: verejnyUzivatel(u) }, origin); }
    if (c === "/api/tym" && m === "GET") {
      const u = await vyzadujUzivatele(req);
      if (!jeSpravce(u.email)) throw new ChybaApi(403, "Přehled týmu je jen pro správce.");
      const lide = await db.vsichniUzivatele(); const tym = [];
      for (const l of lide) {
        const testy = await db.testy(l.id);
        const posledni = testy[0] ? { kurz: testy[0].kurz, skore: testy[0].skore, celkem: testy[0].celkem, kdy: testy[0].kdy } : null;
        tym.push({ email: l.email, jmeno: l.jmeno || "", vytvoreno: Number(l.vytvoreno) || 0, kurzy: povoleneKurzy(l.email), spravce: jeSpravce(l.email), postup: souhrnPostupu(await db.nactiStav(l.id)), testy: { pocet: testy.length, posledni } });
      }
      return json(res, 200, { ok: true, tym }, origin);
    }
    if (c === "/api/zmena-hesla" && m === "POST") {
      const u = await vyzadujUzivatele(req); const b = await nactiTelo(req);
      const plny = await db.uzivatelSHashem(u.id);
      if (typeof b.stare !== "string" || !plny || !overHeslo(b.stare, plny.hash)) throw new ChybaApi(400, "Staré heslo nesedí."); // 400, ne 401: klient při 401 odhlašuje
      if (typeof b.nove !== "string" || b.nove.length < 8) throw new ChybaApi(400, "Nové heslo musí mít aspoň 8 znaků.");
      if (b.nove === b.stare) throw new ChybaApi(400, "Nové heslo je stejné jako staré.");
      await db.zmenHeslo(u.id, hashHesla(b.nove));
      const a = req.headers.authorization || ""; await db.smazSessionsUzivatele(u.id, a.startsWith("Bearer ") ? hashTokenu(a.slice(7)) : "");
      return json(res, 200, { ok: true }, origin);
    }

    if (c === "/api/postup" && m === "GET") { const u = await vyzadujUzivatele(req); return json(res, 200, { ok: true, stav: (await db.nactiStav(u.id)) || SLOUCENI.prazdnyStav() }, origin); }
    if (c === "/api/postup" && m === "PUT") {
      const u = await vyzadujUzivatele(req); const b = await nactiTelo(req);
      if (!b.stav || typeof b.stav !== "object") throw new ChybaApi(400, "Chybí stav.");
      const slouceny = SLOUCENI.sloucStavy(await db.nactiStav(u.id), b.stav);
      await db.ulozStav(u.id, slouceny);
      return json(res, 200, { ok: true, stav: slouceny }, origin);
    }
    if (c === "/api/testy" && m === "GET") { const u = await vyzadujUzivatele(req); return json(res, 200, { ok: true, testy: await db.testy(u.id) }, origin); }
    if (c === "/api/testy" && m === "POST") {
      const u = await vyzadujUzivatele(req); const t = await nactiTelo(req);
      if (typeof t.id !== "string" || typeof t.skore !== "number" || typeof t.celkem !== "number") throw new ChybaApi(400, "Neplatný test.");
      await db.pridejTest(u.id, { id: t.id.slice(0, 60), kurz: String(t.kurz || "").slice(0, 60), skore: t.skore, celkem: t.celkem, kdy: Number(t.kdy) || Date.now(), trvani: Number(t.trvani) || 0, odpovedi: Array.isArray(t.odpovedi) ? t.odpovedi.slice(0, 100) : [] });
      return json(res, 200, { ok: true }, origin);
    }
    if (c === "/api/kurzy" && m === "GET") { const u = await vyzadujUzivatele(req); return json(res, 200, { ok: true, kurzy: await db.kurzy(u.id) }, origin); }
    if (c === "/api/kurzy" && m === "PUT") { const u = await vyzadujUzivatele(req); const b = await nactiTelo(req); await db.ulozKurz(u.id, overKurz(b.kurz)); return json(res, 200, { ok: true }, origin); }
    if (c.startsWith("/api/kurzy/") && m === "DELETE") { const u = await vyzadujUzivatele(req); await db.smazKurz(u.id, decodeURIComponent(c.slice(11))); return json(res, 200, { ok: true }, origin); }

    if (c === "/api/vysvetli" && m === "POST") {
      const u = await vyzadujUzivatele(req);
      if (!maAI()) throw new ChybaApi(503, "AI není na serveru zapnutá (chybí ANTHROPIC_API_KEY).");
      const b = await nactiTelo(req);
      if (!b.karta || typeof b.karta !== "object") throw new ChybaApi(400, "Chybí karta.");
      limit("vysvetli:" + u.id, CFG.limitVysvetliDen); limit("ai:celkem", CFG.limitAiCelkemDen);
      const odpoved = await aiVysvetli(b.karta, String(b.dotaz || "Vysvětli to jinak.").slice(0, 1000), b.historie);
      return json(res, 200, { ok: true, odpoved }, origin);
    }
    if (c === "/api/generuj-kurz" && m === "POST") {
      const u = await vyzadujUzivatele(req);
      if (!maAI()) throw new ChybaApi(503, "AI není na serveru zapnutá (chybí ANTHROPIC_API_KEY).");
      const b = await nactiTelo(req);
      const nazev = String(b.nazev || "").trim().slice(0, 80), poznamky = String(b.poznamky || "").trim();
      if (!nazev) throw new ChybaApi(400, "Chybí název kurzu.");
      if (poznamky.length < 100) throw new ChybaApi(400, "Poznámky jsou moc krátké (aspoň 100 znaků).");
      if (poznamky.length > CFG.maxPoznamky) throw new ChybaApi(400, "Poznámky jsou moc dlouhé (max. " + CFG.maxPoznamky + " znaků) – rozděl je na víc kurzů.");
      limit("kurz:" + u.id, CFG.limitKurzDen); limit("ai:celkem", CFG.limitAiCelkemDen);
      return json(res, 200, { ok: true, kurz: await aiGenerujKurz(nazev, poznamky) }, origin);
    }
    throw new ChybaApi(404, "Neznámá cesta.");
  } catch (e) {
    if (e instanceof ChybaApi) return json(res, e.status, { ok: false, chyba: e.message }, origin);
    if (e instanceof Anthropic.APIError) { console.error("[jeztok] Anthropic", e.status, e.message); return json(res, 502, { ok: false, chyba: "AI služba teď neodpovídá (" + e.status + ")." }, origin); }
    console.error("[jeztok] chyba", e); return json(res, 500, { ok: false, chyba: "Chyba serveru." }, origin);
  }
}

async function start() {
  db = await otevri(CFG);
  const server = http.createServer(obsluz);
  await new Promise(r => server.listen(CFG.port, r));
  console.log(`[jeztok] backend běží na :${CFG.port} | db: ${db.typ} | AI: ${maAI() ? (CFG.mock ? "mock" : CFG.modelVysvetli) : "vypnuto"} | origin: ${CFG.allowedOrigin.join(",")}`);
  return server;
}
if (require.main === module) start().catch(e => { console.error(e); process.exit(1); });
module.exports = { start, CFG };
