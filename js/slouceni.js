// =====================================================================
// DEFLEARN HUB – slučování stavu postupu (sdílené prohlížečem i serverem).
// Pravidlo: u každé karty vyhrává novější záznam (kdy), XP a aktivita po
// dnech se berou jako maximum. Díky tomu funguje víc zařízení i offline.
// =====================================================================
(function (root) {
  "use strict";
  function prazdnyStav() {
    return { verze: 1, xp: 0, karty: {}, dny: {}, jezek: "Hubík", vybraneKurzy: null,
      hudba: { vibe: "lofi", volume: 0.7, zapnuto: true }, aktualizovano: 0 };
  }
  function sloucStavy(a, b) {
    a = a || prazdnyStav(); b = b || prazdnyStav();
    const v = prazdnyStav();
    v.xp = Math.max(a.xp || 0, b.xp || 0);
    const novejsi = (a.aktualizovano || 0) >= (b.aktualizovano || 0) ? a : b;
    v.jezek = novejsi.jezek || a.jezek || b.jezek || v.jezek;
    v.vybraneKurzy = novejsi.vybraneKurzy !== undefined ? novejsi.vybraneKurzy : null;
    v.hudba = Object.assign({}, v.hudba, a.hudba || {}, b.hudba || {}, novejsi.hudba || {});
    const ids = new Set([...Object.keys(a.karty || {}), ...Object.keys(b.karty || {})]);
    ids.forEach(id => {
      const ka = (a.karty || {})[id], kb = (b.karty || {})[id];
      if (!ka) v.karty[id] = kb; else if (!kb) v.karty[id] = ka;
      else v.karty[id] = (ka.kdy || 0) >= (kb.kdy || 0) ? ka : kb;
    });
    const dny = new Set([...Object.keys(a.dny || {}), ...Object.keys(b.dny || {})]);
    dny.forEach(d => {
      const da = (a.dny || {})[d] || { xp: 0, karet: 0 }, db = (b.dny || {})[d] || { xp: 0, karet: 0 };
      v.dny[d] = { xp: Math.max(da.xp || 0, db.xp || 0), karet: Math.max(da.karet || 0, db.karet || 0) };
    });
    v.aktualizovano = Math.max(a.aktualizovano || 0, b.aktualizovano || 0);
    return v;
  }
  const api = { prazdnyStav, sloucStavy };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.SLOUCENI = api;
})(typeof window !== "undefined" ? window : globalThis);
