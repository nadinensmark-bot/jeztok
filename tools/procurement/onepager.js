// One-pager „Obranné zakázky: <země>“ pro každou zemi z procurement/_cista.json → out/onepager-<kod>.pdf (+ náhled PNG)
// node onepager.js [kod ...]
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const { esc, txt, CSS_ZAKLAD, LOGA } = require("./spolecne");
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "../procurement/_cista.json"), "utf8"));
const OUT = path.join(__dirname, "out"); fs.mkdirSync(OUT, { recursive: true });
const PORADI = ["kdo_nakupuje", "pravni_ramec", "kde_tendry", "registrace", "prumyslova_spoluprace", "bezpecnost", "inovace"];

function html(z) {
  const L = LOGA(false);
  const sekce = PORADI.map((k, i) => {
    const s = z.sekce[k] || {}; const prazdna = !s.text;
    const odk = (s.odkazy || []).slice(0, 3).map(o => `<a href="${esc(o.url)}">${esc(o.nazev)}</a>`).join(" · ");
    return `<section class="box${prazdna ? " prazdna" : ""}"><h3><span class="cislo">${i + 1}</span>${esc(s.nazev || k)}</h3>
      <p>${prazdna ? "Nemáme ověřený údaj z oficiálního zdroje (stav 11/2026)." : txt(s.text)}</p>${odk ? `<p class="odk">${odk}</p>` : ""}</section>`;
  }).join("");
  const tipy = (z.tipy || []).length ? `<section class="tipy"><h3>Na co si dát pozor jako česká firma</h3><ul>${z.tipy.map(t => `<li>${txt(t)}</li>`).join("")}</ul></section>` : "";
  return `<!doctype html><html lang="cs"><head><meta charset="utf-8"><style>${CSS_ZAKLAD}
  @page{size:A4;margin:0} body{width:210mm;height:297mm;overflow:hidden}
  .str{position:relative;width:210mm;height:297mm;padding:12mm 13mm 0;display:flex;flex-direction:column;font-size:var(--fs,8.6pt);line-height:1.38}
  header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6mm}
  .titul{background:var(--navy);color:#fff;border-radius:4mm;padding:6mm 7mm;margin-bottom:5mm;display:flex;justify-content:space-between;align-items:flex-end;gap:6mm}
  .titul h1{color:#fff;font-size:22pt;line-height:1.05} .titul .pod{color:#C9D8F2;font-size:9pt;margin-top:2mm}
  .titul .vlajka{font-size:30pt;line-height:1}
  .mrizka{columns:2;column-gap:5mm;flex:0 0 auto}
  .box{break-inside:avoid;background:var(--tint);border-radius:3mm;padding:3.2mm 4mm;margin:0 0 4mm}
  .box.prazdna{background:#f6f7f9} .box.prazdna p{color:var(--muted);font-style:italic}
  .box h3{font-size:10.5pt;display:flex;align-items:center;gap:2.2mm;margin-bottom:1.4mm}
  .cislo{display:inline-grid;place-items:center;width:5.2mm;height:5.2mm;border-radius:50%;background:var(--blue);color:#fff;font-size:8pt;flex:0 0 auto}
  .box p{margin:0} .box p.odk{margin-top:1.6mm;font-size:.92em}
  .tipy{break-inside:avoid;background:var(--tint2);border-radius:3mm;padding:3.4mm 4.5mm;margin-top:.5mm}
  .tipy h3{font-size:10.5pt;color:#3f6b3f;margin-bottom:1.2mm} .tipy ul{margin:0;padding-left:4.5mm} .tipy li{margin:0 0 1mm}
  .str.vice{padding-bottom:6mm} .str.vice footer{margin-top:6mm}
  footer{margin-top:auto;padding:4mm 0 7mm;display:flex;justify-content:space-between;align-items:flex-end;gap:6mm;color:var(--muted);font-size:7.2pt;line-height:1.35}
  footer b{color:var(--navy)} .hash{color:var(--blue);font-weight:700;white-space:nowrap}
  </style></head><body><div class="str" id="s">
  <header><img class="logo-cb" src="${L.cb}" alt="Defence Hub CzechInvest"><img class="logo-di" src="${L.di}" alt="Part of NATO DIANA network"></header>
  <div class="titul"><div><h1>Obranné zakázky: ${esc(z.zeme)}</h1><div class="pod">Jak se česká firma dostane k obranné zakázce · rámec DH „7 otázek pro vstup na trh“ · stav 11/2026${z.clenstvi ? " · " + esc(z.clenstvi) : ""}</div></div><div class="vlajka">${esc(z.vlajka || "")}</div></div>
  <div class="mrizka">${sekce}</div>${tipy}
  <footer><div><b>Defence Hub CzechInvest</b> · defencehub.gov.cz · zpracovala Naďa Sokolová<br>Údaje ověřené z oficiálních zdrojů (ministerstva, akviziční agentury, sbírky předpisů) k 4. 11. 2026; odkaz u každé sekce, plný seznam zdrojů v e-booku „Obranné zakázky v Evropě a USA“. Nejde o právní poradenství, před podáním nabídky ověřte aktuální podmínky u zadavatele.</div><div class="hash">#BiggerTogether</div></footer>
  </div></body></html>`;
}

(async () => {
  const kody = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(DATA.zeme).filter(k => k !== "eu");
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 794, height: 1123 } });
  const vysledky = [];
  for (const kod of kody) {
    const z = DATA.zeme[kod]; if (!z) continue;
    const f = path.join(OUT, `onepager-${kod}.html`); fs.writeFileSync(f, html(z));
    await pg.goto("file://" + f); await pg.evaluate(() => document.fonts.ready);
    // zmenšovat písmo, dokud se stránka nevejde na A4
    const fs_ = await pg.evaluate(() => { const s = document.getElementById("s"); let v = 9.2; const vejde = () => s.scrollHeight <= s.clientHeight + 1; s.style.setProperty("--fs", v + "pt"); while (!vejde() && v > 7.2) { v = Math.round((v - 0.1) * 10) / 10; s.style.setProperty("--fs", v + "pt"); }
      if (!vejde()) { v = 8.4; s.style.setProperty("--fs", v + "pt"); s.style.height = "auto"; document.body.style.height = "auto"; document.body.style.overflow = "visible"; s.classList.add("vice"); return { v, vejde: true, stran: Math.ceil(s.scrollHeight / 1123) }; }
      return { v, vejde: true, stran: 1 }; });
    await pg.pdf({ path: path.join(OUT, `DH-obranne-zakazky-${kod}.pdf`), format: "A4", printBackground: true, preferCSSPageSize: true });
    if (process.env.NAHLED) await pg.screenshot({ path: path.join(OUT, `nahled-${kod}.png`), fullPage: false });
    vysledky.push(`${kod}:${fs_.v}${fs_.stran > 1 ? "(" + fs_.stran + "str)" : ""}`);
  }
  console.log(vysledky.join(" "));
  await b.close();
})();
