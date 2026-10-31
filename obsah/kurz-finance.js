// DEFLEARN HUB – ukázkový kurz: Finanční gramotnost (základy)
window.JEZTOK_KURZY = window.JEZTOK_KURZY || [];
window.JEZTOK_KURZY.push({
  id: "finance",
  nazev: "Peníze: základy, co se v škole neučí",
  emoji: "💸",
  barva: "#059669",
  popis: "Úrok, inflace, dluh a investování – bez žargonu.",
  temata: [
    {
      id: "urok",
      nazev: "Složený úrok",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Úrok z úroku",
          text: "Složený úrok znamená, že se úročí i dříve připsané úroky. Peníze proto nerostou po přímce, ale po křivce, která se časem zrychluje.",
          vysvetleni: "Příklad: 10 000 Kč při 5 % ročně. Po roce máš 10 500, po dvou 11 025 (úrok se počítá i z těch 500), po deseti letech 16 289 Kč. Jednoduchý úrok by dal jen 15 000." },
        { id: "k1", typ: "kviz", otazka: "Máš 10 000 Kč, úrok 5 % ročně, složené úročení. Kolik máš po 2 letech?",
          moznosti: ["11 000 Kč", "11 025 Kč", "10 500 Kč"], spravne: 1,
          vysvetleni: "První rok: 10 000 × 1,05 = 10 500. Druhý rok: 10 500 × 1,05 = 11 025. Těch 25 Kč navíc je úrok z úroku." },
        { id: "f2", typ: "fakt", titulek: "Pravidlo 72",
          text: "Chceš vědět, za kolik let se ti peníze zdvojnásobí? Vyděl 72 ročním úrokem v procentech. Při 6 % je to zhruba 12 let, při 8 % 9 let.",
          vysvetleni: "Je to přibližný odhad, který funguje dobře pro běžné sazby (cca 2–15 %). Funguje i obráceně: při 3% inflaci ztratí peníze pod matrací polovinu hodnoty za zhruba 24 let." },
        { id: "d1", typ: "doplnit", text: "Podle pravidla 72 se peníze při 9 % ročně zdvojnásobí přibližně za ___ let.", odpoved: ["8", "osm"],
          vysvetleni: "72 ÷ 9 = 8. Čím vyšší výnos, tím kratší doba zdvojnásobení." },
        { id: "a1", typ: "anone", tvrzeni: "Složený úrok funguje stejně silně i proti tobě, když dlužíš.", spravne: true,
          vysvetleni: "Ano. U kreditní karty nebo spotřebitelského úvěru s 20 % ročně dluh bez splácení za necelé 4 roky zdvojnásobí (72 ÷ 20 ≈ 3,6). Proto je drahý dluh potřeba řešit jako první." }
      ]
    },
    {
      id: "inflace",
      nazev: "Inflace a hodnota peněz",
      karty: [
        { id: "f3", typ: "fakt", titulek: "Inflace = tiché zdražení",
          text: "Inflace je růst cenové hladiny. Při 5 % inflaci koupíš za stejnou stovku o 5 % méně než před rokem. Peníze, které jen leží, reálně chudnou.",
          vysvetleni: "Rozlišuj nominální a reálný výnos. Spořicí účet s 4 % při inflaci 5 % má reálný výnos zhruba −1 %: máš víc korun, ale koupíš za ně méně." },
        { id: "k2", typ: "kviz", otazka: "Spořicí účet dává 3 %, inflace je 6 %. Co se děje s kupní silou tvých úspor?",
          moznosti: ["Roste o 3 %", "Klesá zhruba o 3 %", "Nemění se"], spravne: 1,
          vysvetleni: "Reálný výnos ≈ nominální výnos − inflace = 3 − 6 = −3 %. Koruny přibývají, ale ceny rostou rychleji." },
        { id: "l1", typ: "lekce", titulek: "Pořadí kroků, než začneš investovat",
          kroky: [
            "1. Splať drahé dluhy (kreditky, spotřebitelské úvěry). Jejich úrok je skoro vždy vyšší než výnos, který bys investováním získal/a.",
            "2. Vytvoř rezervu na 3–6 měsíců výdajů na spořicím účtu. Je to polštář, abys při výpadku příjmu nemusel/a prodávat investice v nejhorší chvíli.",
            "3. Teprve pak investuj dlouhodobě, pravidelně a široce rozložené. Čas na trhu je důležitější než načasování trhu.",
            "4. Nikdy neinvestuj do toho, čemu nerozumíš, a do ničeho, co slibuje „jistý“ vysoký výnos."
          ] }
      ]
    },
    {
      id: "investice",
      nazev: "Riziko a diverzifikace",
      karty: [
        { id: "f4", typ: "fakt", titulek: "Nedávej vejce do jednoho košíku",
          text: "Diverzifikace = rozložení peněz mezi mnoho různých aktiv. Když jedno spadne, ostatní to vyrovnají. Neodstraní riziko, ale zmírní ho.",
          vysvetleni: "Jedna akcie může klesnout o 100 %. Index stovek firem historicky kolísá, ale neklesl na nulu. Proto se začátečníkům doporučují široké indexové fondy (ETF), ne tipování jednotlivých akcií." },
        { id: "a2", typ: "anone", tvrzeni: "Vyšší očekávaný výnos jde obvykle ruku v ruce s vyšším rizikem kolísání.", spravne: true,
          vysvetleni: "Základní vztah výnos–riziko. Kdo slibuje vysoký výnos bez rizika, buď nerozumí tomu, co prodává, nebo tě chce podvést." },
        { id: "k3", typ: "kviz", otazka: "Co z toho nejvíc snižuje riziko, že přijdeš o všechno?",
          moznosti: ["Investovat vše do jedné firmy, které věřím", "Rozložit peníze do mnoha různých aktiv", "Čekat na nejlepší okamžik ke vstupu"], spravne: 1,
          vysvetleni: "Diverzifikace. Sázka na jednu firmu může dopadnout skvěle i katastrofálně; načasování trhu se dlouhodobě nedaří ani profesionálům." },
        { id: "f5", typ: "fakt", titulek: "Poplatky žerou výnos",
          text: "Rozdíl mezi poplatkem 0,2 % a 2 % ročně vypadá malý. Za 30 let to je rozdíl v desítkách procent konečné částky – protože poplatek se také „skládá“.",
          vysvetleni: "Příklad: 1 000 000 Kč, hrubý výnos 7 % ročně, 30 let. Při poplatku 0,2 % skončíš zhruba na 7,2 mil. Kč, při 2 % zhruba na 4,3 mil. Kč. Vždy se ptej na celkovou roční nákladovost (TER)." }
      ]
    }
  ]
});
