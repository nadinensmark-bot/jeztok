// DEFLEARN HUB – kurz: Defence pro startupy (verze pro firmy z databáze Defence Hubu)
// Pravidla obsahu: každá karta typu „fakt“ má uvedený primární zdroj (zákon, nařízení, web instituce).
// Text karet vzniká z těchto zdrojů, ne z materiálů třetích stran. Praktické rady = zkušenost Defence Hubu.
// Odborné termíny EU/NATO/USA zůstávají anglicky s českým vysvětlením.
// Stav: téma „export“ (exportní kontroly) · 2. 11. 2026. Další témata se doplňují postupně.
window.JEZTOK_KURZY = window.JEZTOK_KURZY || [];
window.JEZTOK_KURZY.push({
  id: "startupy",
  nazev: "Defence pro startupy",
  emoji: "🚀",
  barva: "#0f766e",
  popis: "Co musí vědět firma, která chce do obrany: trh, pravidla, programy, peníze. Krátce, ověřeně, se zdroji.",
  temata: [
    // =================================================================
    {
      id: "export",
      nazev: "Smím to vyvézt? Exportní kontroly",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Proč to řešit dřív, než máš zákazníka",
          text: "Vývoz vojenského materiálu i dual-use zboží podléhá povolení státu. Bez něj je dodávka do zahraničí (a často i poslání softwaru nebo výkresů e-mailem) porušením zákona, ne obchodní chybou.",
          zdroj: "Zákon č. 38/1994 Sb., o zahraničním obchodu s vojenským materiálem; nařízení (EU) 2021/821",
          vysvetleni: "Sankce jdou od pokut po trestní odpovědnost. Investor i prime se ptají na exportní režim už při due diligence, takže „zjistíme to, až bude objednávka“ je pozdě." },

        { id: "f2", typ: "fakt", titulek: "Dvě koleje: vojenský materiál a dual-use",
          text: "V ČR běží kontrola po dvou kolejích. Vojenský materiál (zbraně, munice, vojenská technika a jejich součásti) řeší zákon 38/1994 Sb. Dual-use zboží (civilní užití s možným vojenským zneužitím) řeší nařízení EU 2021/821 a zákon 594/2004 Sb.",
          zdroj: "Zákon č. 38/1994 Sb.; zákon č. 594/2004 Sb.; nařízení Evropského parlamentu a Rady (EU) 2021/821",
          vysvetleni: "První otázka startupu: na které koleji jsem? Odpověď určuje, jaké povolení potřebuju, kdo ho vydává a jak dlouho to trvá. Dual-use položky jsou v Annexu I nařízení 2021/821, vojenský materiál v seznamu podle vyhlášky MPO." },

        { id: "k1", typ: "kviz", otazka: "Senzor pro drony, který se prodává i stavebním firmám, ale armáda ho chce na průzkum. Kam nejspíš patří?",
          moznosti: ["Je civilní, exportní kontroly se netýkají", "Může být dual-use: nutno ověřit v Annexu I nařízení 2021/821", "Automaticky vojenský materiál podle zákona 38/1994 Sb."], spravne: 1,
          vysvetleni: "Dual-use = civilní produkt s možným vojenským užitím. Jestli podléhá kontrole, rozhoduje jeho zařazení (klasifikace) podle kontrolního seznamu, ne to, kdo ho kupuje. Když ho zákazník upraví speciálně pro vojenské účely, může spadnout do vojenského materiálu." },

        { id: "f3", typ: "fakt", titulek: "Kdo v ČR rozhoduje",
          text: "Obchod s vojenským materiálem povoluje Licenční správa Ministerstva průmyslu a obchodu ve dvou krocích: nejdřív povolení k provádění zahraničního obchodu (pro osoby usazené v ČR, nejvýše na 5 let), pak licence na každý jednotlivý obchod. K žádosti se vyjadřují MZV, MO a MV.",
          zdroj: "Zákon č. 38/1994 Sb., § 6 a násl.; MZV ČR: Kontrola zahraničního obchodu s vojenským materiálem (mzv.gov.cz)",
          vysvetleni: "MZV hodnotí zahraničněpolitická rizika (lidská práva, riziko odklonu, regionální stabilita), MV bezpečnost, MO dopad na obranyschopnost. Zahraniční startup potřebuje entitu usazenou v ČR; žádost se podává na formuláři Licenční správy, k žádosti se vyjadřují tři ministerstva, takže počítej s měsíci, ne týdny." },

        { id: "d1", typ: "doplnit", text: "Povolení k zahraničnímu obchodu s vojenským materiálem vydává Licenční správa ___ (zkratka ministerstva).", odpoved: ["MPO", "mpo"],
          vysvetleni: "Ministerstvo průmyslu a obchodu, Licenční správa. Ta vede i řízení o dual-use licencích podle zákona 594/2004 Sb." },

        { id: "f4", typ: "fakt", titulek: "Podle čeho stát říká ano, nebo ne",
          text: "Členské státy EU posuzují žádosti o vývoz vojenského materiálu podle osmi kritérií Společného postoje Rady 2008/944/SZBP: mezinárodní závazky, lidská práva, vnitřní situace v cílové zemi, regionální stabilita, bezpečnost členských států, chování země vůči mezinárodnímu společenství, riziko odklonu (diversion) a slučitelnost s ekonomickou kapacitou příjemce.",
          zdroj: "Společný postoj Rady 2008/944/SZBP, čl. 2 (ve znění rozhodnutí (SZBP) 2019/1560)",
          vysvetleni: "Prakticky: stejná technologie projde do Norska a neprojde do země pod embargem nebo s rizikem, že skončí jinde, než má. Při plánování trhů si projdi těch osm bodů dřív, než začneš jednat." },

        { id: "a1", typ: "anone", tvrzeni: "Když mám licenci na vývoz do jedné země, můžu stejný produkt poslat i do sousední země, pokud není pod embargem.", spravne: false,
          vysvetleni: "Licence platí na konkrétní obchod: položku, množství, kupujícího a zemi určení. Jiná země = nová žádost. U vojenského materiálu i dočasný vývoz (výstava, testování, oprava v zahraničí) vyžaduje licenci." },

        { id: "f5", typ: "fakt", titulek: "Odkud se berou kontrolní seznamy",
          text: "Seznamy kontrolovaného zboží v EU i v ČR vycházejí ze čtyř mezinárodních režimů: Wassenaar Arrangement (konvenční zbraně a dual-use, 42 států), Missile Technology Control Regime (raketové a UAV technologie, 35 partnerů), Nuclear Suppliers Group (jaderné položky, 48 vlád) a Australia Group (chemické a biologické položky, 43 účastníků včetně EU). ČR je členem všech čtyř.",
          zdroj: "wassenaar.org (Participating States); mtcr.info (Partners); nuclearsuppliersgroup.org (Participants); dfat.gov.au/theaustraliagroup (Participants); stav 11/2026",
          vysvetleni: "Režimy jsou politické dohody, ne mezinárodní smlouvy, a jejich seznamy se aktualizují zhruba jednou ročně. Proto se Annex I nařízení 2021/821 mění každý rok: naposledy nařízením Komise v přenesené pravomoci (EU) 2025/2003 (kvantové technologie, polovodiče, aditivní výroba)." },

        { id: "k2", typ: "kviz", otazka: "Startup vyvíjí autonomní dron s doletem přes 300 km a užitečným zatížením přes 500 kg. Který režim ho bude zajímat nejvíc?",
          moznosti: ["Australia Group", "Missile Technology Control Regime (MTCR)", "Nuclear Suppliers Group"], spravne: 1,
          vysvetleni: "MTCR se zaměřuje na nosiče schopné dopravit náklad 500 kg na 300 km a víc (kategorie I) a na související technologie včetně UAV. Takový dron spadne do nejpřísnější kategorie kontrol." },

        { id: "f6", typ: "fakt", titulek: "Arms Trade Treaty: smlouva, kterou USA a Rusko nemají",
          text: "Smlouva o obchodu se zbraněmi (ATT) platí od 24. prosince 2014 a upravuje mezinárodní obchod s konvenčními zbraněmi. Má přes 110 smluvních stran včetně ČR a všech členů EU. USA smlouvu podepsaly, ale oznámily, že se stranou stát nehodlají; Rusko nepodepsalo.",
          zdroj: "thearmstradetreaty.org, Treaty Status (stav 11/2026)",
          vysvetleni: "Pro českou firmu je ATT důležitá nepřímo: její zásady (hodnocení rizika, zákaz vývozu při riziku vážného porušení lidských práv) jsou promítnuté do EU kritérií, podle kterých MZV posuzuje žádosti." },

        { id: "f7", typ: "fakt", titulek: "Export není jen bedna na kamionu",
          text: "Podle nařízení 2021/821 je vývozem i přenos softwaru nebo technologie elektronickými prostředky (e-mail, cloud, vzdálený přístup) mimo EU, a také ústní předání technologie. Výkres poslaný partnerovi do Asie je stejný export jako krabice s produktem.",
          zdroj: "Nařízení (EU) 2021/821, čl. 2 odst. 2 (definice vývozu) a odst. 10 (technická pomoc); definice technologie a softwaru v příloze I",
          vysvetleni: "Co z toho plyne pro startup: kde máš servery a kdo má přístup k repozitáři. Vývojář ve třetí zemi s přístupem ke kontrolované technologii = potenciální nelicencovaný export. Nekontrolované jsou informace veřejně dostupné a základní vědecký výzkum." },

        { id: "a2", typ: "anone", tvrzeni: "Sdílení zdrojového kódu kontrolovaného softwaru s vývojářem mimo EU přes cloudové úložiště může vyžadovat vývozní povolení.", spravne: true,
          vysvetleni: "Ano. Nařízení 2021/821 definuje vývoz včetně přenosu softwaru a technologie elektronickými prostředky do místa určení mimo celní území EU." },

        { id: "f8", typ: "fakt", titulek: "Americká součástka cestuje i s tvým produktem",
          text: "USA kontrolují svůj vojenský materiál a technická data podle ITAR (International Traffic in Arms Regulations, 22 CFR 120 až 130, správce DDTC při State Departmentu, seznam USML) a dual-use položky podle EAR (Export Administration Regulations, 15 CFR 730 až 774, správce BIS při Department of Commerce, seznam CCL). Oba režimy platí pro americkou položku i poté, co opustí USA: re-export z ČR dál vyžaduje americké povolení.",
          zdroj: "22 CFR Parts 120–130 (ITAR); 15 CFR Parts 730–774 (EAR); pmddtc.state.gov; bis.gov",
          vysvetleni: "Pro startup: u každé americké komponenty si vyžádej od dodavatele klasifikaci (ITAR, nebo ECCN podle CCL, nebo EAR99). Položka pod ITAR může zúžit okruh zemí a zákazníků, kterým smíš prodat celý produkt. Prime se na to ptají jako na první věc." },

        { id: "k3", typ: "kviz", otazka: "Co znamená „deemed export“ v americkém právu (EAR)?",
          moznosti: ["Vývoz zboží přes třetí zemi", "Zpřístupnění kontrolované technologie cizímu státnímu příslušníkovi, i když k němu dojde na území USA", "Dočasný vývoz na výstavu"], spravne: 1,
          vysvetleni: "EAR § 734.13: předání technologie nebo zdrojového kódu cizinci se považuje za vývoz do jeho země. Dopadá na americké partnery se zahraničními zaměstnanci, ale i na české firmy, které od nich chtějí technická data." },

        { id: "f9", typ: "fakt", titulek: "Všeobecné licence EU: cesta, která může ušetřit měsíce",
          text: "Pro část dual-use vývozů existují všeobecná vývozní povolení Unie (EU General Export Authorisations, EU001 až EU008), například pro vývoz do USA, Kanady, Japonska a dalších spřátelených zemí (EU001), pro přenosy technologie uvnitř skupiny (EU007) nebo pro šifrování (EU008). Vývozce se k nim registruje, nežádá o individuální licenci.",
          zdroj: "Nařízení (EU) 2021/821, čl. 12 a příloha II (oddíly A až H)",
          vysvetleni: "Ověř si podmínky: každé všeobecné povolení má seznam položek a zemí, které pokrývá, a oznamovací povinnosti vůči Licenční správě. ČR vydává i národní všeobecné licence podle zákona 594/2004 Sb." },

        { id: "f10", typ: "fakt", titulek: "Catch-all: kontrola i bez seznamu",
          text: "Položka, která v Annexu I není, může přesto podléhat povolení, pokud vývozce ví (nebo ho úřad informuje), že je určena pro zbraně hromadného ničení, pro vojenské konečné užití v zemi pod zbrojním embargem, nebo jako součást nelegálně vyvezeného vojenského materiálu. Zvláštní pravidla platí pro kybernetické sledovací technologie.",
          zdroj: "Nařízení (EU) 2021/821, čl. 4 (catch-all) a čl. 5 (cyber-surveillance items)",
          vysvetleni: "Tvoje odpovědnost nekončí ověřením seznamu. Když kupující nedává smysl (fiktivní firma, podivná země, odmítá říct konečné užití), je to signál pro due diligence a konzultaci s Licenční správou předem." },

        { id: "l1", typ: "lekce", titulek: "Jak to mít pod kontrolou: Internal Compliance Programme",
          kroky: [
            "Evropská komise doporučuje firmám obchodujícím s dual-use zbožím zavést Internal Compliance Programme (ICP). Doporučení (EU) 2019/1318 popisuje sedm základních prvků. U některých všeobecných licencí a u souhrnných licencí je ICP podmínkou.",
            "1. Závazek vedení: někdo z vedení za compliance odpovídá a dává mu zdroje. 2. Organizace a zdroje: určená osoba, popsané postupy, kdo co schvaluje.",
            "3. Školení a povědomí: lidé v obchodu, vývoji a logistice vědí, co je kontrolovaná položka a kdy se zeptat. 4. Prověřování transakcí: klasifikace položky, prověření zákazníka a konečného užití, kontrola sankčních seznamů, posouzení rizika odklonu.",
            "5. Hodnocení výkonu a audity: pravidelná kontrola, že postupy fungují, a náprava chyb. 6. Vedení záznamů: dokumentace k vývozům a licencím se uchovává (nařízení 2021/821 požaduje nejméně 5 let). 7. Fyzická a informační bezpečnost: kdo má přístup ke kontrolované technologii a datům.",
            "Pro startup s pěti lidmi to neznamená oddělení compliance. Znamená to: jedna odpovědná osoba, jednoduchý postup „než pošleme nabídku do zahraničí, ověříme položku, zákazníka a zemi“, a záznam o tom, co jsme ověřili. Zdroj: Commission Recommendation (EU) 2019/1318; nařízení 2021/821 čl. 27 (záznamy)."
          ] },

        { id: "k4", typ: "kviz", otazka: "Kolik základních prvků má Internal Compliance Programme podle doporučení Komise (EU) 2019/1318?",
          moznosti: ["Pět", "Sedm", "Devět"], spravne: 1,
          vysvetleni: "Sedm: závazek vedení, organizace a zdroje, školení, prověřování transakcí, hodnocení a audity, vedení záznamů, fyzická a informační bezpečnost." },

        { id: "f11", typ: "fakt", titulek: "Kde si to ověřit, než se rozhodneš",
          text: "Klasifikaci položky můžeš konzultovat s Licenční správou MPO předem, včetně dotazu, zda produkt vůbec podléhá kontrole. Aktuální Annex I nařízení 2021/821 a seznam vojenského materiálu jsou veřejné. Americkou klasifikaci komponenty (ITAR / ECCN / EAR99) si vyžádej písemně od dodavatele.",
          zdroj: "mpo.gov.cz, Licenční správa; EUR-Lex, nařízení (EU) 2021/821 v konsolidovaném znění; bis.gov (CCL), pmddtc.state.gov (USML)",
          vysvetleni: "Pořadí, které šetří čas: (1) klasifikuj produkt, (2) zjisti původ komponent, (3) teprve pak plánuj cílové trhy. Firmy to často dělají obráceně a pak zjistí, že jejich hlavní trh je mimo hru." }
      ]
    }
  ]
});
