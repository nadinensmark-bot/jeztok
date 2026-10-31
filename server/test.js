// Kouřový test backendu: spustí server na náhodném portu s SQLite v paměti
// a MOCK_AI, projde registraci, postup, testy, kurzy i AI endpointy.
"use strict";
process.env.PORT = "0"; if (!process.env.DATABASE_URL) process.env.DB_PATH = ":memory:"; process.env.MOCK_AI = "1"; process.env.ALLOWED_ORIGIN = "*";
const assert = require("assert");
const { start } = require("./server");
(async () => {
  const server = await start(); const base = "http://127.0.0.1:" + server.address().port;
  let token = "";
  const api = async (c, m, b) => { const r = await fetch(base + c, { method: m || "GET", headers: { "Content-Type": "application/json", Authorization: token ? "Bearer " + token : "" }, body: b ? JSON.stringify(b) : undefined }); return { status: r.status, d: await r.json() }; };
  let r = await api("/api/health"); assert.equal(r.d.ok, true); assert.equal(r.d.ai, true);
  r = await api("/api/registrace", "POST", { email: "a@b.cz", heslo: "kratke" }); assert.equal(r.status, 400);
  r = await api("/api/registrace", "POST", { email: "a@b.cz", heslo: "tajneheslo1", jmeno: "Nadine" }); assert.equal(r.status, 200); token = r.d.token;
  r = await api("/api/registrace", "POST", { email: "a@b.cz", heslo: "tajneheslo1" }); assert.equal(r.status, 409);
  r = await api("/api/ja"); assert.equal(r.d.uzivatel.jmeno, "Nadine");
  r = await api("/api/postup", "PUT", { stav: { xp: 10, karty: { "u:f1": { sila: 1, kdy: 5 } }, dny: { "2026-10-31": { xp: 10, karet: 1 } }, aktualizovano: 5 } }); assert.equal(r.d.stav.xp, 10);
  r = await api("/api/postup", "PUT", { stav: { xp: 8, karty: { "u:f1": { sila: 3, kdy: 9 }, "u:k1": { sila: 1, kdy: 1 } }, aktualizovano: 9 } });
  assert.equal(r.d.stav.xp, 10); assert.equal(r.d.stav.karty["u:f1"].sila, 3); assert.ok(r.d.stav.karty["u:k1"]); assert.equal(r.d.stav.dny["2026-10-31"].xp, 10);
  r = await api("/api/testy", "POST", { id: "t1", kurz: "uceni", skore: 7, celkem: 10, kdy: 1, odpovedi: [] }); assert.equal(r.status, 200);
  r = await api("/api/testy"); assert.equal(r.d.testy.length, 1);
  r = await api("/api/kurzy", "PUT", { kurz: { id: "muj", nazev: "Můj", temata: [{ id: "t", karty: [{ id: "f", typ: "fakt", titulek: "x", text: "y" }] }] } }); assert.equal(r.status, 200);
  r = await api("/api/kurzy", "PUT", { kurz: { id: "Špatné ID", nazev: "x", temata: [] } }); assert.equal(r.status, 400);
  r = await api("/api/kurzy"); assert.equal(r.d.kurzy[0].id, "muj");
  r = await api("/api/kurzy/muj", "DELETE"); r = await api("/api/kurzy"); assert.equal(r.d.kurzy.length, 0);
  r = await api("/api/vysvetli", "POST", { karta: { typ: "fakt", text: "Spacing effect…", vysvetleni: "Rozložené opakování." }, dotaz: "Jinak" }); assert.equal(r.status, 200); assert.ok(r.d.odpoved.length > 10);
  r = await api("/api/generuj-kurz", "POST", { nazev: "Makro", poznamky: "Inflace je růst cenové hladiny. Měří se indexem spotřebitelských cen.\n\nCentrální banka cílí inflaci pomocí úrokových sazeb. Vyšší sazby zdražují úvěry a tlumí poptávku, takže ceny rostou pomaleji než jindy." }); assert.equal(r.status, 200); assert.ok(r.d.kurz.temata[0].karty.length >= 1);
  r = await api("/api/odhlaseni", "POST"); r = await api("/api/ja"); assert.equal(r.status, 401);
  token = ""; r = await api("/api/prihlaseni", "POST", { email: "a@b.cz", heslo: "spatne-heslo" }); assert.equal(r.status, 401);
  r = await api("/api/prihlaseni", "POST", { email: "A@b.cz", heslo: "tajneheslo1" }); assert.equal(r.status, 200);
  server.close(); console.log("backend: všechny testy prošly ✓");
})().catch(e => { console.error("TEST SELHAL:", e); process.exit(1); });
