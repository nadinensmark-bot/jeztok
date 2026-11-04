// One-pager „Kde se zaregistrovat“: registrace a identifikátory pro obranné a dual-use startupy, s cenou a důvodem.
// Texty napsané z ověřených údajů v procurement/registrace.json (oficiální zdroje, 4. 11. 2026).
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const { esc, txt, CSS_ZAKLAD, LOGA } = require("./spolecne");
const OUT = path.join(__dirname, "out"); fs.mkdirSync(OUT, { recursive: true });

const SKUPINY = [
  { nazev: "Vyřiď hned", pod: "Zdarma nebo skoro zdarma, a otevírá to dveře všude dál.", barva: "#0058A8", polozky: [
    { n: "NCAGE kód", co: "Identifikátor dodavatele v kodifikačním systému NATO, navázaný na IČO.", proc: "NATO „občanka“ firmy: chce ho SAM.gov i NSPA a používá se při katalogizaci výrobků pro armády NATO.", kdo: "Oddělení katalogizace Úřadu pro obrannou standardizaci, katalogizaci a státní ověřování jakosti (MO), žádost přes portál NSPA", cena: "zdarma", lhuta: "do 10 pracovních dnů", url: "https://okm.mo.gov.cz/subjekty-kodifikace/vyrobcidodavatele/ncage-katalogizacni-kod-vyrobcedodavatele", pozor: "Nejdřív ověř podle IČO v databázi H4, jestli kód už nemáš." },
    { n: "PIC na EU Funding & Tenders Portal", co: "Devítimístný kód organizace v registru Evropské komise.", proc: "Bez něj nepodáš projekt do EDF, Horizontu Evropa ani plnou žádost do EIC Acceleratoru.", kdo: "Evropská komise", cena: "poplatek oficiální manuál neuvádí", lhuta: "PIC hned po registraci, validace až po výsledku hodnocení", url: "https://webgate.ec.europa.eu/funding-tenders-opportunities/display/OM/Registration+and+validation+of+your+organisation", pozor: "Validace je podmínkou pro jmenování LEAR (oprávněného zástupce)." },
    { n: "NEN (Národní elektronický nástroj)", co: "Státní nástroj pro zadávání veřejných zakázek, přes který soutěží i MO ČR.", proc: "Bez registrace dodavatele v NEN nepodáš nabídku do zakázek, které tam zadavatel vypíše.", kdo: "NIPEZ, Ministerstvo pro místní rozvoj", cena: "oficiální stránka cenu neuvádí", lhuta: "oficiální stránka neuvádí", url: "https://nen.nipez.cz/registrace" },
    { n: "Datová schránka", co: "Státní schránka pro úřední komunikaci; firmám v rejstřících se zřizuje automaticky.", proc: "Chodí přes ni úřední komunikace, mimo jiné přístupové údaje do katalogizačního portálu MO (WEB-KAT).", kdo: "Digitální a informační agentura", cena: "komunikace s úřady zdarma", lhuta: "", url: "https://datovka.gov.cz/info/cs/66.html" },
    { n: "Databáze řešení Defence Hubu", co: "Katalog českých firem a technologií pro obranu a bezpečnost.", proc: "Uvidí tě armáda, primes, investoři a partneři z ekosystému DH a DIANA.", kdo: "Defence Hub CzechInvest", cena: "zdarma", lhuta: "", url: "https://defencehub.gov.cz/databaze-reseni/" },
  ] },
  { nazev: "Když míříš do NATO", pod: "Zakázky agentur NATO a akcelerace.", barva: "#2E8BE6", polozky: [
    { n: "NSPA Source File", co: "Databáze dodavatelů NATO Support and Procurement Agency, ze které NSPA zve firmy do soutěží.", proc: "NSPA nakupuje pro NATO a spojence (logistika, munice, díly, služby); bez registrace tě nepozve.", kdo: "NSPA, způsobilost potvrzuje MO ČR", cena: "zdarma (podle manuálu MO ČR „Jak obchodovat s NSPA“)", lhuta: "registrace platí až po potvrzení způsobilosti", url: "https://eportal.nspa.nato.int/Registration/default_4G.aspx" },
    { n: "Soutěže NCIA a NSIP přes MO ČR", co: "Do soutěží NATO Communications and Information Agency a NSIP se firma dostane přes národní autoritu.", proc: "Bez Declaration of Eligibility (prohlášení o způsobilosti) od MO ČR se k tendrům NCIA nedostaneš.", kdo: "Oddělení NSIP, Sekce vyzbrojování a akvizic MO ČR", cena: "", lhuta: "prohlášení o zájmu ke každé soutěži do termínu výzvy", url: "https://oinsip.mo.gov.cz/jak-se-ucastnit", pozor: "Řada tendrů NCIA je utajovaná: bez osvědčení podnikatele NBÚ se nezúčastníš." },
    { n: "NATO DIANA (Challenge Portal)", co: "Akcelerační program NATO, kam se startupy hlásí s řešením konkrétních challenges.", proc: "Contractual funding bez podílu ve firmě, akcelerátor, testovací centra a investoři; IP zůstává tobě.", kdo: "NATO DIANA, v ČR pomáhá Defence Hub CzechInvest", cena: "poplatek FAQ DIANA neuvádí", lhuta: "podle výzvy", url: "https://www.diana.nato.int/faq.html" },
  ] },
  { nazev: "Když míříš do USA", pod: "Federální zakázky včetně Department of Defense.", barva: "#5b7fb8", polozky: [
    { n: "SAM.gov + UEI", co: "Oficiální registr dodavatelů vlády USA; při registraci dostaneš Unique Entity ID.", proc: "Bez aktivní registrace nedostaneš kontrakt od federální vlády USA včetně DoD.", kdo: "U.S. General Services Administration", cena: "zdarma", lhuta: "aspoň 10 pracovních dnů, obnova každých 365 dní", url: "https://sam.gov/content/entity-registration", pozor: "Placené „registrační služby“ nepotřebuješ, registrace na sam.gov je zdarma. Předem si zajisti NCAGE." },
    { n: "D-U-N-S Number", co: "Identifikátor firmy v databázi Dun & Bradstreet.", proc: "Pro SAM.gov už ho nepotřebuješ (od 4. 4. 2022 ho nahradil UEI). Řeš ho, až ho konkrétní partner chce.", kdo: "Dun & Bradstreet", cena: "zdarma, expres za příplatek", lhuta: "do 30 pracovních dnů, expres do 8", url: "https://www.dnb.com/cs-cz/smb/duns.html" },
  ] },
  { nazev: "Když míříš do Spojeného království", pod: "", barva: "#7a8fb0", polozky: [
    { n: "Defence Sourcing Portal", co: "Portál britského MOD se všemi inzerovanými požadavky a upozorněními podle kategorií.", proc: "Celá poptávka britského MOD na jednom místě.", kdo: "UK Ministry of Defence", cena: "zdarma", lhuta: "", url: "https://contracts.mod.uk/" },
    { n: "Central Digital Platform + Find a Tender", co: "Registrace dodavatele u britské vlády před použitím Find a Tender.", proc: "Přes Find a Tender se hledají a podávají velké britské zakázky.", kdo: "Vláda UK", cena: "zdarma", lhuta: "", url: "https://www.find-tender.service.gov.uk/" },
  ] },
  { nazev: "Až přijde zakázka nebo export", pod: "Neřeš dopředu, ale počítej s tím v plánu.", barva: "#709870", polozky: [
    { n: "Osvědčení podnikatele NBÚ", co: "Potvrzení, že firma smí pracovat s utajovanými informacemi (zákon č. 412/2005 Sb.).", proc: "Bez něj nedostaneš zakázky ani soutěže NATO s utajovanými informacemi.", kdo: "Národní bezpečnostní úřad", cena: "správní poplatek 5 000 Kč nebo 10 000 Kč (sazebník zákona č. 634/2004 Sb., položka 3 písm. h)", lhuta: "", url: "https://www.nbu.gov.cz/" },
    { n: "Povolení k obchodu s vojenským materiálem", co: "Povolení MPO podle zákona č. 38/1994 Sb. k vývozu, dovozu a zprostředkování vojenského materiálu.", proc: "Když produkt spadá pod vojenský materiál, bez povolení ho legálně neprodáš do zahraničí.", kdo: "MPO, Licenční správa", cena: "licence 1 000 Kč (portal.gov.cz); poplatek za samotné povolení nemáme ověřený", lhuta: "rozhodnutí do 60 dnů (§ 12 zákona č. 38/1994 Sb.)", url: "https://www.mpo.gov.cz/" },
    { n: "Seznam kvalifikovaných dodavatelů", co: "Seznam MMR, kam se zapíše dodavatel s prokázanou základní a profesní způsobilostí.", proc: "Výpis nahrazuje doklady o způsobilosti v každém tendru a zadavatel ho musí uznat.", kdo: "Ministerstvo pro místní rozvoj", cena: "zápis 3 000 Kč, změna 1 000 Kč", lhuta: "", url: "https://portal-vz.cz/nipez/seznam-kvalifikovanych-dodavatelu/" },
    { n: "WEB-KAT a státní ověřování jakosti", co: "Katalogizace výrobků pro MO ČR a ověřování jakosti podle smlouvy (AQAP).", proc: "Když dodáváš MO výrobek, který se katalogizuje, pracuješ přes WEB-KAT; systémové audity jakosti jsou pro dodavatele zdarma.", kdo: "Úřad pro obrannou standardizaci, katalogizaci a státní ověřování jakosti (MO)", cena: "registrace i audity zdarma", lhuta: "", url: "https://okm.mo.gov.cz/web-kat" },
  ] },
  { nazev: "Peníze a sítě", pod: "", barva: "#4e7a4e", polozky: [
    { n: "EIC Accelerator", co: "Grant pod 2,5 mil. € a investice 1 až 10 mil. € pro startupy a SME.", proc: "Největší evropská kombinace grantu a equity pro deep tech včetně dual-use.", kdo: "European Innovation Council", cena: "poplatek EIC neuvádí", lhuta: "krátký návrh kdykoli, hodnotí se první úterý v měsíci", url: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en" },
    { n: "NATO Innovation Fund", co: "Venture fond 24 spojeneckých zemí pro deep tech a dual-use firmy.", proc: "Investice za podíl od fondu, jehož účast je silný signál pro další investory.", kdo: "NATO Innovation Fund, formulář na webu", cena: "bez poplatku", lhuta: "", url: "https://www.nif.fund/contact-us/" },
    { n: "EDA CapTechs", co: "Expertní sítě European Defence Agency pro jednotlivé technologické oblasti.", proc: "Tady vznikají obranné R&T priority EU a konsorcia pro EDF a projekty EDA.", kdo: "EDA, členství schvaluje národní koordinátor za ČR", cena: "poplatek EDA neuvádí", lhuta: "", url: "https://eda.europa.eu/what-we-do/research-technology/capability-technology-areas-(captechs)" },
  ] },
];

const L = LOGA(false);
const karta = (p, c) => `<div class="pol" style="--c:${c}"><h3>${txt(p.n)}</h3><p>${txt(p.co)} <b>Proč:</b> ${txt(p.proc)}</p>
  <dl>${p.kdo ? `<dt>Kdo</dt><dd>${txt(p.kdo)}</dd>` : ""}<dt>Cena</dt><dd>${p.cena ? txt(p.cena) : "nemáme ověřený údaj"}</dd>${p.lhuta ? `<dt>Lhůta</dt><dd>${txt(p.lhuta)}</dd>` : ""}</dl>
  ${p.pozor ? `<p class="poz">⚠️ ${txt(p.pozor)}</p>` : ""}<p class="url"><a href="${esc(p.url)}">${esc(p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "").slice(0, 64))}</a></p></div>`;
const html = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><style>${CSS_ZAKLAD}
@page{size:A4;margin:11mm 12mm 12mm} body{font-size:7.5pt;line-height:1.32}
header{display:flex;justify-content:space-between;align-items:center;margin-bottom:5mm}
.titul{background:var(--navy);color:#fff;border-radius:4mm;padding:5.5mm 7mm;margin-bottom:5mm}
.titul h1{color:#fff;font-size:21pt;line-height:1.05} .titul p{color:#C9D8F2;margin:2mm 0 0;font-size:9pt}
.sloupce{columns:3;column-gap:3.2mm}
.skh{font-size:11pt;display:flex;align-items:center;gap:2mm;margin:1mm 0 1.4mm;break-after:avoid;break-inside:avoid}
.skh .tecka{display:inline-block;width:3mm;height:3mm;border-radius:1mm;flex:0 0 auto}
.skp{margin:-.6mm 0 1.6mm;color:var(--muted);break-after:avoid}
.mr{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2.4mm}
.pol{break-inside:avoid;background:var(--tint);border-radius:2.5mm;padding:2.4mm 3mm;margin:0 0 2.6mm;box-shadow:inset 1.2mm 0 0 var(--c)}
.pol h3{font-size:9pt;margin-bottom:.8mm} .pol p{margin:0 0 1.2mm}
dl{display:grid;grid-template-columns:auto 1fr;gap:.6mm 2.5mm;margin:0 0 1.2mm} dt{font-weight:700;color:var(--navy)} dd{margin:0}
.poz{color:#7a4b00} .url{font-size:.92em;margin:0}
.past{break-inside:avoid;background:#fff6e5;border-radius:3mm;padding:3.4mm 4.5mm;margin-top:1mm}
.past h2{font-size:11pt;color:#7a4b00;margin-bottom:1.5mm} .past ul{margin:0;padding-left:4.5mm} .past li{margin:0 0 1mm}
footer{margin-top:4mm;color:var(--muted);font-size:7.2pt;display:flex;justify-content:space-between;gap:6mm} footer b{color:var(--navy)} .hash{color:var(--blue);font-weight:700}
</style></head><body>
<header><img class="logo-cb" src="${L.cb}" alt="Defence Hub CzechInvest"><img class="logo-di" src="${L.di}" alt="Part of NATO DIANA network"></header>
<div class="titul"><h1>Kde se zaregistrovat</h1><p>Registrace a identifikátory, které obranné a dual-use firmě otevírají zakázky, granty a partnery. Co to je, proč to mít, kolik to stojí. Stav 11/2026.</p></div>
<div class="sloupce">${SKUPINY.map(s => `<h2 class="skh" style="--c:${s.barva}"><span class="tecka" style="background:${s.barva}"></span>${esc(s.nazev)}</h2>${s.pod ? `<p class="skp">${txt(s.pod)}</p>` : ""}${s.polozky.map(p => karta(p, s.barva)).join("")}`).join("")}</div>
<div class="past"><h2>Pasti, na které si dát pozor</h2><ul>
<li>${txt("Za registraci na SAM.gov nikomu neplať. Je zdarma a placené „registrační služby“ nepotřebuješ.")}</li>
<li>${txt("D-U-N-S kvůli SAM.gov nepotřebuješ. Dun & Bradstreet prodává kolem něj placené produkty a expresní vyřízení, vždy si řekni o bezplatnou cestu.")}</li>
<li>${txt("Než požádáš o NCAGE nebo PIC, ověř, jestli je firma už nemá. Duplicitní kódy se pak složitě ruší.")}</li>
<li>${txt("Declaration of Eligibility k soutěžím NATO nestačí, když je zakázka utajovaná. Na osvědčení podnikatele NBÚ potřebuješ odpovědnou osobu s osvědčením fyzické osoby, a to chce čas.")}</li>
</ul></div>
<footer><div><b>Defence Hub CzechInvest</b> · defencehub.gov.cz · zpracovala Naďa Sokolová<br>Ceny, lhůty a podmínky ověřené na oficiálních stránkách vydavatelů a v textu zákonů k 4. 11. 2026. „Nemáme ověřený údaj“ znamená, že ho oficiální zdroj neuvádí. Nejde o právní poradenství.</div><div class="hash">#BiggerTogether</div></footer>
</body></html>`;

(async () => {
  const f = path.join(OUT, "kde-se-zaregistrovat.html"); fs.writeFileSync(f, html);
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 794, height: 1123 } });
  await pg.goto("file://" + f); await pg.evaluate(() => document.fonts.ready);
  await pg.pdf({ path: path.join(OUT, "DH-kde-se-zaregistrovat.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
  if (process.env.NAHLED) { await pg.setViewportSize({ width: 794, height: 1123 }); await pg.screenshot({ path: path.join(OUT, "nahled-registrace.png"), fullPage: true }); }
  await b.close(); console.log("ok");
})();
