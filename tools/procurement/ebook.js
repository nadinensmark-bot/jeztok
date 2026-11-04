// E-book „Obranné zakázky v Evropě a USA“ z procurement/_cista.json → out/DH-obranne-zakazky-Evropa-USA.pdf
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const { esc, txt, CSS_ZAKLAD, LOGA } = require("./spolecne");
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "../procurement/_cista.json"), "utf8"));
const OUT = path.join(__dirname, "out"); fs.mkdirSync(OUT, { recursive: true });
const PORADI = ["kdo_nakupuje", "pravni_ramec", "kde_tendry", "registrace", "prumyslova_spoluprace", "bezpecnost", "inovace"];
const OTAZKY = {
  kdo_nakupuje: "Kdo v zemi rozhoduje o nákupu a kdo podepisuje smlouvu.",
  pravni_ramec: "Podle jakých pravidel se soutěží: zákon, provedení směrnice 2009/81/ES, výjimky.",
  kde_tendry: "Kde se zakázky zveřejňují a kde se podávají nabídky.",
  registrace: "Co musí firma udělat, než může podat nabídku.",
  prumyslova_spoluprace: "Zda stát chce offsety nebo podíl domácího průmyslu.",
  bezpecnost: "Kdo vydává prověrky firem a jak se uznává české osvědčení.",
  inovace: "Kudy vede cesta pro startup bez historie dodávek.",
};
const L = LOGA(false), LB = LOGA(true);
const odk = o => (o || []).map(x => `<a href="${esc(x.url)}">${esc(x.nazev)}</a>`).join(" · ");

function zeme(z) {
  const sek = PORADI.map((k, i) => { const s = z.sekce[k] || {};
    return `<div class="sek"><h3><span class="cislo">${i + 1}</span>${esc(s.nazev || k)}</h3>${s.text ? `<p>${txt(s.text)}</p>` : `<p class="nic">Nemáme ověřený údaj z oficiálního zdroje (stav 11/2026).</p>`}
      ${(s.kroky || []).length > 1 ? `<ol>${s.kroky.map(x => `<li>${txt(x)}</li>`).join("")}</ol>` : ""}${(s.odkazy || []).length ? `<p class="odk">${odk(s.odkazy)}</p>` : ""}</div>`; }).join("");
  const us = z.kod === "us" ? `${z.kontext ? `<div class="sek siroka"><h3>Jak americký trh funguje</h3><p>${txt(z.kontext)}</p></div>` : ""}${(z.cesty || []).length ? `<div class="sek siroka"><h3>Reálné cesty pro českou firmu</h3>${z.cesty.filter(c => c.text).map(c => `<p><b>${esc(c.nazev)}.</b> ${txt(c.text)} ${c.url ? `<a href="${esc(c.url)}">odkaz</a>` : ""}</p>`).join("")}</div>` : ""}` : "";
  const tipy = (z.tipy || []).length ? `<div class="tipy"><h3>Na co si dát pozor jako česká firma</h3><ul>${z.tipy.map(t => `<li>${txt(t)}</li>`).join("")}</ul></div>` : "";
  const prir = (z.prirucky || []).length ? `<div class="prir"><h3>Oficiální příručky a průvodci</h3><ul>${z.prirucky.map(p => `<li><a href="${esc(p.url)}">${esc(p.nazev)}</a>${p.vydavatel ? ` (${esc(p.vydavatel)}${p.jazyk ? ", " + esc(p.jazyk) : ""})` : ""}</li>`).join("")}</ul></div>` : "";
  const zdr = (z.zdroje || []).length ? `<div class="zdr"><h4>Zdroje (otevřeno ${esc((z.zdroje[0] || {}).otevreno || "2026-11-04")})</h4><ol>${z.zdroje.map(x => `<li>${esc(x.nazev || "")} <a href="${esc(x.url)}">${esc(x.url.replace(/^https?:\/\//, "").slice(0, 90))}</a></li>`).join("")}</ol></div>` : "";
  return `<section class="zeme" id="z-${z.kod}"><div class="zhlava"><span class="vl">${esc(z.vlajka)}</span><div><h2>${esc(z.zeme)}</h2>${z.clenstvi ? `<div class="clen">${esc(z.clenstvi)}</div>` : ""}</div></div>
    ${us}<div class="mrizka">${sek}</div>${tipy}${prir}${zdr}</section>`;
}
function eu(z) {
  const spol = (z.spolecne || []).filter(x => x.text).map(x => `<div class="sek"><h3>${esc(x.tema)}</h3><p>${txt(x.text)}</p>${x.odkazy && x.odkazy.length ? `<p class="odk">${odk(x.odkazy)}</p>` : ""}</div>`).join("");
  const nas = Object.entries(z.nastroje || {}).filter(([, v]) => v).map(([k, v]) => `<div class="sek"><h3>${esc(k.replace(/_/g, " "))}</h3><p>${txt(v)}</p></div>`).join("");
  return zeme(Object.assign({}, z, { zeme: "Evropská unie: společný rámec", vlajka: "🇪🇺" })).replace('<div class="tipy">', `<h2 class="podkap">Základní výbava české firmy pro zakázky kdekoli v EU a NATO</h2><div class="mrizka">${spol}</div><h2 class="podkap">Společné nástroje EU pro nákupy</h2><div class="mrizka">${nas}</div><div class="tipy">`);
}

const regiony = DATA.regiony.filter(([, k]) => k.length);
const obsah = regiony.map(([r, k]) => `<li><b>${esc(r)}</b><br>${k.map(x => `<a href="#z-${x}">${esc(DATA.zeme[x].vlajka)} ${esc(DATA.zeme[x].zeme)}</a>`).join(" · ")}</li>`).join("");
const vsechnyPrir = Object.values(DATA.zeme).flatMap(z => (z.prirucky || []).map(p => ({ z, p })));

const html = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><style>${CSS_ZAKLAD}
@page{size:A4;margin:15mm 15mm 17mm} body{font-size:9.4pt;line-height:1.45}
.obalka{height:265mm;margin:-15mm -15mm 0;padding:22mm 20mm;background:var(--navy);color:#fff;display:flex;flex-direction:column;break-after:page}
.obalka .loga{display:flex;justify-content:space-between;align-items:center} .obalka .loga img.logo-cb{height:14mm} .obalka .loga img.logo-di{height:11mm}
.obalka h1{color:#fff;font-size:40pt;line-height:1.02;margin-top:52mm} .obalka .pod{font-size:15pt;color:#C9D8F2;margin-top:6mm;max-width:150mm}
.obalka .kdo{margin-top:auto;font-size:10.5pt;color:#C9D8F2;line-height:1.6} .obalka .kdo b{color:#fff} .obalka .hash{color:#9CCBFF;font-weight:700}
.kap{break-before:page} .kap>h1{font-size:24pt;margin-bottom:5mm}
.uvod p{margin:0 0 3mm} .ramec{display:grid;grid-template-columns:1fr 1fr;gap:3mm;margin:4mm 0}
.ramec div{background:var(--tint);border-radius:3mm;padding:3mm 4mm} .ramec b{color:var(--navy)}
.obsah{columns:2;column-gap:8mm;padding-left:4mm} .obsah li{break-inside:avoid;margin-bottom:3mm}
.zeme{break-before:page} .zhlava{display:flex;align-items:center;gap:5mm;background:var(--navy);color:#fff;border-radius:4mm;padding:5mm 6mm;margin-bottom:5mm}
.zhlava h2{color:#fff;font-size:20pt} .zhlava .vl{font-size:28pt} .zhlava .clen{color:#C9D8F2;font-size:9pt;margin-top:1mm}
.mrizka{columns:2;column-gap:5mm}
.sek{break-inside:avoid;background:var(--tint);border-radius:3mm;padding:3.4mm 4mm;margin:0 0 4mm} .sek.siroka{column-span:all;margin-bottom:4mm}
.sek h3{font-size:11pt;display:flex;align-items:center;gap:2.2mm;margin-bottom:1.5mm} .sek p{margin:0 0 1.5mm} .sek ol{margin:1mm 0 1.5mm;padding-left:5mm}
.cislo{display:inline-grid;place-items:center;width:5.6mm;height:5.6mm;border-radius:50%;background:var(--blue);color:#fff;font-size:8.4pt;flex:0 0 auto}
.nic{color:var(--muted);font-style:italic} .odk{font-size:.9em}
.podkap{font-size:14pt;margin:6mm 0 3mm;break-after:avoid}
.tipy{break-inside:avoid;background:var(--tint2);border-radius:3mm;padding:3.6mm 5mm;margin:1mm 0 4mm} .tipy h3{font-size:11pt;color:#3f6b3f;margin-bottom:1.5mm} .tipy ul{margin:0;padding-left:5mm}
.prir{break-inside:avoid;margin:0 0 4mm} .prir h3{font-size:11pt;margin-bottom:1.5mm} .prir ul{margin:0;padding-left:5mm}
.zdr{font-size:7.6pt;color:var(--muted);line-height:1.35} .zdr h4{font-family:"Space Grotesk";color:var(--navy);font-size:9pt;margin:2mm 0 1mm} .zdr ol{margin:0;padding-left:5mm} .zdr a{border:0;word-break:break-all}
.prirvse li{margin-bottom:1.2mm}
</style></head><body>
<div class="obalka"><div class="loga"><img class="logo-cb" src="${LB.cb}" alt="Defence Hub CzechInvest"><img class="logo-di" src="${LB.di}" alt="Part of NATO DIANA network"></div>
<h1>Obranné zakázky v Evropě a USA</h1><div class="pod">Průvodce pro české obranné a dual-use firmy: kdo nakupuje, kde jsou tendry, jak se registrovat a na co si dát pozor. 37 zemí a EU.</div>
<div class="kdo"><b>Defence Hub CzechInvest</b> · defencehub.gov.cz<br>Zpracovala Naďa Sokolová · stav k 4. 11. 2026<br><span class="hash">#BiggerTogether</span></div></div>

<section class="kap uvod"><h1>Jak průvodce číst</h1>
<p>${txt("Každá země je popsaná stejně, podle rámce Defence Hubu „7 otázek pro vstup na trh“. Odpovědi na těchto sedm otázek rozhodují, jestli a jak se česká firma k obranné zakázce v dané zemi dostane.")}</p>
<div class="ramec">${PORADI.map((k, i) => `<div><b>${i + 1}. ${esc((DATA.zeme.de || Object.values(DATA.zeme)[0]).sekce[k].nazev)}</b><br>${txt(OTAZKY[k])}</div>`).join("")}<div><b>+ Na co si dát pozor</b><br>${txt("Praktické důsledky pro českou firmu, které z ověřených faktů vyplývají.")}</div></div>
<h2 class="podkap">Odkud jsou údaje</h2>
<p>${txt("Všechny údaje pocházejí z primárních a oficiálních zdrojů: weby ministerstev obrany a akvizičních agentur, národní portály veřejných zakázek, sbírky předpisů, EUR-Lex, weby NATO, EDA a Evropské komise. U každé země je seznam zdrojů s datem, kdy byly otevřeny. Texty jsou vlastní shrnutí, ne převzaté pasáže.")}</p>
<p>${txt("Kde oficiální zdroj údaj neuvádí nebo nebyl k datu vydání dostupný, je to v textu přiznané („Nemáme ověřený údaj“). Raději prázdné místo než odhad. Pravidla se rychle mění (reformy agentur v Německu, Portugalsku nebo na Ukrajině, nové offsetové politiky ve Spojeném království), proto před podáním nabídky vždy ověřte aktuální stav u zadavatele.")}</p>
<p>${txt("Průvodce není právní poradenství. S konkrétní zakázkou, programem nebo kontaktem v zemi pomůže Defence Hub: konzultace jsou zdarma na defencehub.gov.cz/konzultace.")}</p>
<h2 class="podkap">Obsah</h2><ol class="obsah">${obsah}<li><b>Přílohy</b><br><a href="#prirucky">Oficiální příručky ke stažení</a></li></ol></section>

${DATA.zeme.eu ? eu(DATA.zeme.eu) : ""}
${regiony.filter(([, k]) => !k.includes("eu")).map(([r, k]) => k.map(x => zeme(DATA.zeme[x])).join("")).join("")}

<section class="kap" id="prirucky"><h1>Oficiální příručky ke stažení</h1><p>${txt("Průvodci a příručky, které pro dodavatele vydávají samy ministerstva, agentury a úřady. Jsou to dokumenty vydavatelů, odkazujeme na ně v originále.")}</p>
<ul class="prirvse">${vsechnyPrir.map(({ z, p }) => `<li>${esc(z.vlajka)} <b>${esc(z.zeme)}:</b> <a href="${esc(p.url)}">${esc(p.nazev)}</a>${p.vydavatel ? ` (${esc(p.vydavatel)}${p.jazyk ? ", " + esc(p.jazyk) : ""})` : ""}</li>`).join("")}</ul></section>
</body></html>`;

(async () => {
  const f = path.join(OUT, "ebook.html"); fs.writeFileSync(f, html);
  const b = await chromium.launch(); const pg = await b.newPage();
  await pg.goto("file://" + f); await pg.evaluate(() => document.fonts.ready);
  await pg.pdf({ path: path.join(OUT, "DH-obranne-zakazky-Evropa-USA.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true,
    headerTemplate: "<span></span>", footerTemplate: `<div style="width:100%;font-family:sans-serif;font-size:7px;color:#55627a;padding:0 15mm;display:flex;justify-content:space-between"><span>Defence Hub CzechInvest · Obranné zakázky v Evropě a USA · stav 11/2026</span><span class="pageNumber"></span></div>` });
  await b.close(); console.log("ok");
})();
