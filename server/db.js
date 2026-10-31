// =====================================================================
// DefLearn Hub – databázová vrstva. Dva adaptéry se stejným rozhraním:
//   - Postgres (pg)      když je nastavená DATABASE_URL  → trvalá data
//   - SQLite (node:sqlite) jinak                           → soubor na disku
// Dotazy se píší s "?" a pro Postgres se přepisují na $1, $2, …
// =====================================================================
"use strict";
const fs = require("fs");
const path = require("path");

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS uzivatele (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, jmeno TEXT, hash TEXT NOT NULL, vytvoreno BIGINT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, uzivatel TEXT NOT NULL, vytvoreno BIGINT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS postup (uzivatel TEXT PRIMARY KEY, stav TEXT NOT NULL, aktualizovano BIGINT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS testy (id TEXT PRIMARY KEY, uzivatel TEXT NOT NULL, data TEXT NOT NULL, kdy BIGINT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS kurzy (uzivatel TEXT NOT NULL, id TEXT NOT NULL, data TEXT NOT NULL, aktualizovano BIGINT NOT NULL, PRIMARY KEY (uzivatel, id))`,
  `CREATE INDEX IF NOT EXISTS testy_uzivatel ON testy (uzivatel, kdy)`
];

function sqliteAdapter(cesta) {
  const { DatabaseSync } = require("node:sqlite");
  if (cesta !== ":memory:") fs.mkdirSync(path.dirname(cesta), { recursive: true });
  const db = new DatabaseSync(cesta);
  db.exec("PRAGMA journal_mode = WAL");
  return {
    typ: "sqlite",
    async exec(sql) { db.exec(sql); },
    async all(sql, p) { return db.prepare(sql).all(...(p || [])); },
    async run(sql, p) { db.prepare(sql).run(...(p || [])); }
  };
}

function pgAdapter(url) {
  const { Pool } = require("pg");
  const pool = new Pool({ connectionString: url, ssl: /localhost|127\.0\.0\.1/.test(url) ? false : { rejectUnauthorized: false } });
  const preved = sql => { let i = 0; return sql.replace(/\?/g, () => "$" + (++i)); };
  return {
    typ: "postgres",
    async exec(sql) { await pool.query(sql); },
    async all(sql, p) { return (await pool.query(preved(sql), p || [])).rows; },
    async run(sql, p) { await pool.query(preved(sql), p || []); }
  };
}

async function otevri(cfg) {
  const a = cfg.databaseUrl ? pgAdapter(cfg.databaseUrl) : sqliteAdapter(cfg.dbPath);
  for (const s of SCHEMA) await a.exec(s);
  const now = () => Date.now();
  return {
    typ: a.typ,
    // uživatelé
    uzivatelPodleEmailu: async email => (await a.all("SELECT * FROM uzivatele WHERE email = ?", [email]))[0] || null,
    uzivatelPodleId: async id => (await a.all("SELECT id, email, jmeno, vytvoreno FROM uzivatele WHERE id = ?", [id]))[0] || null,
    vytvorUzivatele: async u => { await a.run("INSERT INTO uzivatele (id, email, jmeno, hash, vytvoreno) VALUES (?, ?, ?, ?, ?)", [u.id, u.email, u.jmeno, u.hash, now()]); },
    // sessions
    vytvorSession: async (hash, uzivatel) => { await a.run("INSERT INTO sessions (hash, uzivatel, vytvoreno) VALUES (?, ?, ?)", [hash, uzivatel, now()]); },
    session: async hash => (await a.all("SELECT * FROM sessions WHERE hash = ?", [hash]))[0] || null,
    smazSession: async hash => { await a.run("DELETE FROM sessions WHERE hash = ?", [hash]); },
    // postup
    nactiStav: async uzivatel => { const r = (await a.all("SELECT stav FROM postup WHERE uzivatel = ?", [uzivatel]))[0]; return r ? JSON.parse(r.stav) : null; },
    ulozStav: async (uzivatel, stav) => { await a.run("INSERT INTO postup (uzivatel, stav, aktualizovano) VALUES (?, ?, ?) ON CONFLICT (uzivatel) DO UPDATE SET stav = excluded.stav, aktualizovano = excluded.aktualizovano", [uzivatel, JSON.stringify(stav), now()]); },
    // testy
    pridejTest: async (uzivatel, t) => { await a.run("INSERT INTO testy (id, uzivatel, data, kdy) VALUES (?, ?, ?, ?) ON CONFLICT (id) DO NOTHING", [t.id, uzivatel, JSON.stringify(t), t.kdy || now()]); },
    testy: async uzivatel => (await a.all("SELECT data FROM testy WHERE uzivatel = ? ORDER BY kdy DESC LIMIT 200", [uzivatel])).map(r => JSON.parse(r.data)),
    // kurzy
    kurzy: async uzivatel => (await a.all("SELECT data FROM kurzy WHERE uzivatel = ? ORDER BY aktualizovano", [uzivatel])).map(r => JSON.parse(r.data)),
    ulozKurz: async (uzivatel, k) => { await a.run("INSERT INTO kurzy (uzivatel, id, data, aktualizovano) VALUES (?, ?, ?, ?) ON CONFLICT (uzivatel, id) DO UPDATE SET data = excluded.data, aktualizovano = excluded.aktualizovano", [uzivatel, k.id, JSON.stringify(k), now()]); },
    smazKurz: async (uzivatel, id) => { await a.run("DELETE FROM kurzy WHERE uzivatel = ? AND id = ?", [uzivatel, id]); }
  };
}

module.exports = { otevri };
