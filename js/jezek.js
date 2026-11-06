// =====================================================================
// DEFLEARN HUB – ježek Hubík (maskot): obrázky z videa + hlášky + úrovně.
// jezekSVG({nalada, uroven}) vrací HTML s obrázkem Hubíka.
//   nalada: "klid" | "radost" | "smutek" | "premysli" | "party" | "spi"
//   uroven: 0 až 9 (doplňky podle úrovně hráče)
// =====================================================================
(function () {
  "use strict";

  const UROVNE = [
    { xp: 0,    nazev: "Ježčí mimino",       popis: "Teprve se rozkoukává." },
    { xp: 100,  nazev: "Bodlinka",           popis: "Už má pár bodlin a sluchátka." },
    { xp: 300,  nazev: "Ježek v tenisce",    popis: "Běhá za feedem jako o život." },
    { xp: 600,  nazev: "Ježek průzkumník",   popis: "Má kompas a čte i zdroje pod kartou." },
    { xp: 1000, nazev: "Punk ježek",         popis: "Číro, brýle, nula respektu k biflování." },
    { xp: 1500, nazev: "Ježek stratég",      popis: "Myslí tři tahy dopředu. Aspoň u kvízů." },
    { xp: 2200, nazev: "Ježek ve smokingu",  popis: "Chodí na veletrhy a ví, s kým mluvit." },
    { xp: 3000, nazev: "Ježek velitel",      popis: "Hvězda na límci, přehled o všech programech." },
    { xp: 4000, nazev: "Profesor Ježek",     popis: "Ví všechno. Nebo to tak aspoň vypadá." },
    { xp: 5500, nazev: "Legenda bodlin",     popis: "Víc už se naučit nedá. Nebo ano?" }
  ];

  function urovenPodleXp(xp) {
    let u = 0;
    for (let i = 0; i < UROVNE.length; i++) if (xp >= UROVNE[i].xp) u = i;
    return u;
  }

  // Hubík – obrázky vyrobené z videa (img/hubik-*). Nálada určuje snímek a animaci,
  // úroveň přidá odznak. Funkce se jmenuje svg() kvůli zpětné kompatibilitě volání.
  const ODZNAKY = ["", "🎧", "👟", "🧭", "🕶️", "♟️", "🎩", "⭐", "🎓", "🏆"];
  const ZAKLAD = (window.JEZTOK_CONFIG && window.JEZTOK_CONFIG.zakladCesty) || "";
  const OBRAZKY = { klid: ZAKLAD + "img/hubik-klid.png", radost: ZAKLAD + "img/hubik-radost.png", party: ZAKLAD + "img/hubik-salut.webp",
    smutek: ZAKLAD + "img/hubik-klid.png", premysli: ZAKLAD + "img/hubik-salut.png", spi: ZAKLAD + "img/hubik-klid.png" };
  function jezekSVG(o) {
    o = o || {};
    const nalada = OBRAZKY[o.nalada] ? o.nalada : "klid";
    const uroven = Math.max(0, Math.min(UROVNE.length - 1, o.uroven || 0));
    const extra = nalada === "spi" ? '<span class="hubik-fx hubik-zzz">💤</span>' : nalada === "smutek" ? '<span class="hubik-fx hubik-slza">💧</span>' : nalada === "party" ? '<span class="hubik-fx hubik-konf">🎉</span>' : "";
    const odznak = ODZNAKY[uroven] ? `<span class="hubik-odznak">${ODZNAKY[uroven]}</span>` : "";
    return `<span class="jezek hubik hubik-${nalada}"><img src="${OBRAZKY[nalada]}" alt="Hubík" draggable="false">${odznak}${extra}</span>`;
  }

  // Hlášky ježka – náhodný výběr podle situace
  const HLASKY = {
    vitej: ["Ahoj! Já jsem {j}. Projeď prstem nahoru a jedem.", "Čau, tady {j}. Dneska se něco naučíme.", "{j} na příjmu. Karty čekají."],
    spravne: ["Jo! Přesně tak.", "Bum. Správně.", "To je ono! Bodlinky se ježí radostí.", "Správně. Já věděl, že to dáš.", "Čistá práce."],
    spatne: ["Au. To nevadí, teď si to budeš pamatovat líp.", "Vedle. Chyba plus vysvětlení je učení.", "Hmm, ne. Vrátím ti to později.", "Nic se neděje. Tahle karta se za chvíli vrátí."],
    umim: ["Naučeno. Vrátím to, až bys to mohl/a zapomínat. Druhým ťuknutím zrušíš.", "Beru jako naučené. Ukážu to zas, až bude čas.", "Naučeno. Vrátí se, až to budeš skoro zapomínat."],
    pozdeji: ["Ok, odložím to. Ale neuteče ti to.", "Vrátí se to. Všechno se vrátí."],
    streak: ["{n} dní v kuse! Tohle je přesně to, co paměť potřebuje.", "Streak {n}. Ježčí srdce plesá."],
    testStart: ["Test! Žádný stres, žádný strach.", "Tak ukaž, co v tobě je."],
    testSkvely: ["Tohle bylo brutální. V dobrém.", "Profesorský výkon. Smekám čepici."],
    testDobry: ["Solidní. Pár věcí ti vrátím do feedu.", "Dobrý! Chyby máš dole vysvětlené."],
    testSlaby: ["To byl trénink, ne rozsudek. Projeď chyby a za den to zkus znovu.", "Hele, každá chyba s vysvětlením je plus. Jedem dál."],
    vysvetleni: ["Jasně, vysvětlím to jinak.", "Dobře, pojďme na to pomalu.", "Tak tady je dovysvětlení."],
    prazdno: ["Nic nového. Přidej si kurz v záložce Kurzy, nebo si dej test.", "Všechno jsi viděl/a. Vrať se za chvíli, až budou karty k opakování."],
    nocni: ["Je pozdě. Ještě jednu kartu a pak spát, spánek je součást učení.", "Hodně pozdě. Spánek ti látku uloží líp než další hodina."]
  };

  function hlaska(klic, data) {
    const pole = HLASKY[klic] || ["…"];
    let t = pole[Math.floor(Math.random() * pole.length)];
    data = Object.assign({ j: "Hubík" }, data || {});
    return t.replace(/\{(\w+)\}/g, (m, k) => (data[k] !== undefined ? data[k] : m));
  }

  window.JEZEK = { svg: jezekSVG, hlaska, UROVNE, urovenPodleXp };
})();
