// Checklisty DH pro firmy (A4, k zaškrtnutí). Fakta z ověřených profilů zemí a karet Obranného minima (stav 11/2026).
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const { esc, txt, CSS_ZAKLAD, LOGA } = require("./spolecne");
const OUT = path.join(__dirname, "out"); fs.mkdirSync(OUT, { recursive: true });
const L = LOGA(false);

const CHECKLISTY = [
  { id: "tendr", sloupce: true, nazev: "Než podáš nabídku do obranného tendru", pod: "Projdi před každou zakázkou. Co nevíš, zjisti v zadávací dokumentaci nebo se zeptej zadavatele písemně v termínu pro dotazy.", bloky: [
    ["Smíš vůbec soutěžit?", [
      "Zakázka se zadává podle pravidel pro obranu a bezpečnost (v EU provedení směrnice 2009/81/ES, v ČR část devátá zákona č. 134/2016 Sb.), nebo je vyjmutá podle čl. 346 SFEU?",
      "Neomezuje zadavatel účast podle sídla? Například Německo může podle zákona BwBBG omezit soutěž na firmy z EU, Spojené království může podle Procurement Act 2023 vyloučit dodavatele mimo UK u většiny obranných zakázek.",
      "Nejsou požadavky na původ v dodavatelském řetězci? Nákupy ze SAFE vyžadují aspoň 65 % nákladů komponent z EU, Ukrajiny nebo EHP/ESVO; BwBBG umožňuje vyloučit subdodavatele mimo EU.",
    ]],
    ["Registrace a identifikátory", [
      "Máš registraci na portálu, přes který se nabídka podává (například NEN, e-Vergabe, TenderNed, Defence Sourcing Portal, SAM.gov)?",
      "Máš NCAGE kód (zdarma, vydává Oddělení katalogizace MO), pokud ho zadavatel nebo portál chce?",
      "Víš, jaký elektronický podpis portál přijímá? Například Lucembursko přijímá kvalifikovaný certifikát z EU Trusted List.",
    ]],
    ["Jazyk, doklady, způsobilost", [
      "V jakém jazyce musí být nabídka? Často jen v národním (oznámení Agencja Uzbrojenia jsou polsky, italské nabídky italsky se soudním překladem, e-Vergabe je jen německy).",
      "Doložíš způsobilost? V EU se v nabídce obvykle používá ESPD (čestné prohlášení) a doklady předkládá až vítěz; v ČR nahrazuje doklady o základní a profesní způsobilosti výpis ze Seznamu kvalifikovaných dodavatelů.",
      "Splníš požadavky na jakost, pokud jsou ve smlouvě (například AQAP a státní ověřování jakosti)?",
    ]],
    ["Bezpečnost a export", [
      "Je zakázka utajovaná? Pak potřebuješ osvědčení podnikatele NBÚ a jeho uznání v zemi zadavatele jde přes národní bezpečnostní úřady (pro českou firmu přes NBÚ).",
      "Je tvůj produkt vojenský materiál nebo dual-use? Pak počítej s povolením a licencemi MPO, a to i pro předání technické dokumentace nebo softwaru.",
      "Obsahuje produkt americké komponenty? ITAR a EAR mohou platit i pro jejich další vývoz.",
    ]],
    ["Obchod a partneři", [
      "Chce země offsety nebo průmyslovou spolupráci? Například Švýcarsko od CHF 20 mil. obvykle 100 % ceny, Turecko u zahraničního hlavního dodavatele aspoň 70 %, Lotyšsko u zakázek nad 50 mil. € až 30 % domácího podílu.",
      "Není pro tebe reálnější role subdodavatele hlavního dodavatele (prime) nebo partnerství s místní firmou?",
      "Máš plán lhůt: dotazy k zadávacím podmínkám, prohlídky, vzorky, podání, a rezervu na podpis a nahrání?",
    ]],
  ] },
  { id: "trh", nazev: "Vstup na zahraniční obranný trh", pod: "Rámec Defence Hubu „7 otázek pro vstup na trh“. Odpovědi pro 37 zemí a EU najdeš v e-booku Obranné zakázky v Evropě a USA a v appce DefLearn Hub.", bloky: [
    ["Vyber trh", [
      "Vyber 1 až 3 trhy podle toho, kde je poptávka po tvém řešení, ne podle toho, kde je to nejbližší.",
      "Projdi zveřejněné plány nákupů, pokud je země má (například dánský Anskaffelsesplan, španělský PACDEF, norský přehled budoucích akvizic).",
    ]],
    ["7 otázek pro každý trh", [
      "1. Kdo nakupuje: která agentura podepisuje smlouvy a kdo rozhoduje o potřebě?",
      "2. Pravidla hry: podle jakého zákona se soutěží a jaké jsou výjimky?",
      "3. Kde jsou tendry: národní portál, TED, profil zadavatele? Nastav si upozornění.",
      "4. Registrace: co musíš mít, než podáš nabídku (portál, NCAGE, podpis, místní zastoupení)?",
      "5. Průmyslová spolupráce: chce země offsety nebo domácí podíl?",
      "6. Bezpečnost: kdo vydává prověrky firem a jak se uzná osvědčení NBÚ?",
      "7. Inovace: je tam inovační agentura, challenge program nebo místo sítě NATO DIANA, kudy může jít startup bez historie dodávek?",
    ]],
    ["Než vyrazíš", [
      "Vyřiď identifikátory, které platí všude: NCAGE, PIC na EU Funding & Tenders Portal, záznam v Databázi řešení Defence Hubu.",
      "Ověř klasifikaci produktu a exportní režim dřív, než ho nabídneš (vojenský materiál, dual-use, americké komponenty).",
      "Najdi partnera: hlavního dodavatele, místní firmu nebo uživatele, který tvé řešení otestuje.",
      "Domluv si konzultaci s Defence Hubem (zdarma) a využij akce a veletrhy v cílové zemi.",
    ]],
  ] },
  { id: "export", nazev: "Export před první zakázkou", pod: "Exportní kontrola rozhoduje, komu a kam smíš prodávat. Řeš ji dřív než první obchodní schůzku v zahraničí.", bloky: [
    ["Klasifikace produktu", [
      "Je produkt na seznamu vojenského materiálu (vyhláška č. 210/2012 Sb., podle Společného vojenského seznamu EU)?",
      "Je to dual-use položka podle přílohy I nařízení (EU) 2021/821? Najdi kód položky (například 5A002).",
      "Pokud si nejsi jistý, požádej o konzultaci klasifikace Licenční správu MPO.",
    ]],
    ["Povolení a licence", [
      "Vojenský materiál: firma potřebuje povolení k obchodu podle zákona č. 38/1994 Sb. (MPO rozhoduje do 60 dnů) a licenci na konkrétní obchod.",
      "Dual-use: zjisti, jestli nestačí všeobecná licence EU (nařízení 2021/821, čl. 12 a příloha II), jinak individuální nebo globální licence.",
      "Pozor na catch-all (čl. 4 nařízení 2021/821): i položka mimo seznam může vyžadovat licenci podle konečného užití.",
    ]],
    ["Co je taky export", [
      "Předání softwaru nebo technologie mimo EU, i elektronicky nebo sdílením zdrojového kódu.",
      "Technická pomoc (nařízení 2021/821, čl. 2).",
      "Americké komponenty: ITAR a EAR cestují s produktem, ověř reexportní podmínky.",
    ]],
    ["Mít to pod kontrolou", [
      "Zaveď Internal Compliance Programme podle doporučení Komise (EU) 2019/1318 (sedm základních prvků).",
      "Prověřuj konečné uživatele a veď evidenci obchodů.",
      "Ověřuj aktuální znění: EUR-Lex (konsolidované nařízení 2021/821), MPO Licenční správa.",
    ]],
  ] },
];

const html = c => `<!doctype html><html lang="cs"><head><meta charset="utf-8"><style>${CSS_ZAKLAD}
@page{size:A4;margin:0} body{width:210mm;height:297mm;overflow:hidden}
.str{width:210mm;height:297mm;padding:12mm 14mm 0;display:flex;flex-direction:column;font-size:var(--fs,9.6pt);line-height:1.4}
header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6mm}
.titul{background:var(--navy);color:#fff;border-radius:4mm;padding:6mm 7mm;margin-bottom:6mm}
.titul .typ{color:#9CCBFF;font-size:8.5pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.titul h1{color:#fff;font-size:22pt;line-height:1.05;margin-top:1.5mm} .titul p{color:#C9D8F2;margin:2.5mm 0 0;font-size:9.2pt}
.blok{background:var(--tint);border-radius:3mm;padding:3.6mm 4.5mm;margin-bottom:4mm;break-inside:avoid}
.blok h2{font-size:11.5pt;margin-bottom:2mm} .bloky.dva{columns:2;column-gap:4mm}
.blok ul{list-style:none;margin:0;padding:0} .blok li{display:flex;gap:3mm;margin:0 0 1.8mm}
.box{flex:0 0 auto;width:4.2mm;height:4.2mm;border:1.4px solid var(--blue);border-radius:1mm;margin-top:.5mm;background:#fff}
footer{margin-top:auto;padding:4mm 0 7mm;display:flex;justify-content:space-between;gap:6mm;color:var(--muted);font-size:7.2pt} footer b{color:var(--navy)} .hash{color:var(--blue);font-weight:700}
</style></head><body><div class="str" id="s">
<header><img class="logo-cb" src="${L.cb}" alt="Defence Hub CzechInvest"><img class="logo-di" src="${L.di}" alt="Part of NATO DIANA network"></header>
<div class="titul"><div class="typ">Checklist</div><h1>${txt(c.nazev)}</h1><p>${txt(c.pod)}</p></div>
<div class="bloky${c.sloupce ? " dva" : ""}">${c.bloky.map(([h, pol]) => `<div class="blok"><h2>${txt(h)}</h2><ul>${pol.map(x => `<li><span class="box"></span><span>${txt(x)}</span></li>`).join("")}</ul></div>`).join("")}</div>
<footer><div><b>Defence Hub CzechInvest</b> · defencehub.gov.cz · zpracovala Naďa Sokolová · stav 11/2026<br>Příklady vycházejí z oficiálních zdrojů uvedených v e-booku „Obranné zakázky v Evropě a USA“. Nejde o právní poradenství.</div><div class="hash">#BiggerTogether</div></footer>
</div></body></html>`;

(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 794, height: 1123 } }); const out = [];
  for (const c of CHECKLISTY) {
    const f = path.join(OUT, `checklist-${c.id}.html`); fs.writeFileSync(f, html(c));
    await pg.goto("file://" + f); await pg.evaluate(() => document.fonts.ready);
    const v = await pg.evaluate(() => { const s = document.getElementById("s"); let v = 9.8; s.style.setProperty("--fs", v + "pt"); while (s.scrollHeight > s.clientHeight + 1 && v > 7.4) { v = Math.round((v - 0.1) * 10) / 10; s.style.setProperty("--fs", v + "pt"); } return v + (s.scrollHeight > s.clientHeight + 1 ? "!" : ""); });
    await pg.pdf({ path: path.join(OUT, `DH-checklist-${c.id}.pdf`), format: "A4", printBackground: true, preferCSSPageSize: true });
    if (process.env.NAHLED) await pg.screenshot({ path: path.join(OUT, `nahled-checklist-${c.id}.png`) });
    out.push(c.id + ":" + v);
  }
  await b.close(); console.log(out.join(" "));
})();
