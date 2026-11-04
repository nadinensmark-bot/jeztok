// Společné pro PDF materiály DH (one-pagery, e-book, checklisty): styl, písma, pomocné funkce.
const path = require("path"), fs = require("fs");
const A = path.join(__dirname, "assets");
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// jednopísmenné předložky a spojky drží s dalším slovem; čísla s jednotkami taky
const txt = s => esc(s).replace(/(^|[\s(„])([kKsSvVzZoOuUaAiI]) (?=\S)/g, "$1$2 ").replace(/(\d) (€|Kč|%|mil\.|mld\.|tis\.)/g, "$1 $2").replace(/ (–|—) /g, ", ");
const font = (rodina, soubor, vaha) => `@font-face{font-family:"${rodina}";src:url("file://${A}/${soubor}") format("woff2");font-weight:${vaha};font-display:block;}`;
const CSS_ZAKLAD = [
  font("IBM Plex Sans", "ibm-plex-sans-latin-400-normal.woff2", 400), font("IBM Plex Sans", "ibm-plex-sans-latin-ext-400-normal.woff2", 400),
  font("IBM Plex Sans", "ibm-plex-sans-latin-600-normal.woff2", 600), font("IBM Plex Sans", "ibm-plex-sans-latin-ext-600-normal.woff2", 600),
  font("IBM Plex Sans", "ibm-plex-sans-latin-700-normal.woff2", 700), font("IBM Plex Sans", "ibm-plex-sans-latin-ext-700-normal.woff2", 700),
  font("Space Grotesk", "space-grotesk-latin-500-normal.woff2", 500), font("Space Grotesk", "space-grotesk-latin-ext-500-normal.woff2", 500),
  font("Space Grotesk", "space-grotesk-latin-700-normal.woff2", 700), font("Space Grotesk", "space-grotesk-latin-ext-700-normal.woff2", 700),
  `:root{--navy:#002860;--blue:#0058A8;--blue2:#2E8BE6;--green:#709870;--ink:#14233f;--muted:#55627a;--tint:#eef3fa;--tint2:#f1f6ef;}
  *{box-sizing:border-box} html,body{margin:0;padding:0;background:#fff;color:var(--ink);font-family:"IBM Plex Sans","Noto Color Emoji",sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  h1,h2,h3{font-family:"Space Grotesk","IBM Plex Sans",sans-serif;color:var(--navy);margin:0;letter-spacing:-.01em}
  a{color:var(--blue);text-decoration:none;border-bottom:1px solid rgba(0,88,168,.3)}
  .logo-cb{height:11mm} .logo-di{height:8.5mm}`
].join("\n");
const LOGA = (bila) => ({ cb: `file://${A}/logo-cobrand${bila ? "-white" : ""}.png`, di: `file://${A}/part-of-diana${bila ? "-white" : ""}.png` });
module.exports = { esc, txt, CSS_ZAKLAD, LOGA, A };
