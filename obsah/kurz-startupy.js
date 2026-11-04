// DEFLEARN HUB – kurz: Obranné minimum pro startupy (verze pro firmy z databáze Defence Hubu)
// Pravidla obsahu: každá karta typu „fakt“ má uvedený primární zdroj (zákon, nařízení, web instituce).
// Text karet vzniká z těchto zdrojů, ne z materiálů třetích stran. Praktické rady = zkušenost Defence Hubu.
// Odborné termíny EU/NATO/USA zůstávají anglicky s českým vysvětlením.
// Stav: téma „export“ (exportní kontroly) · 2. 11. 2026. Další témata se doplňují postupně.
window.JEZTOK_KURZY = window.JEZTOK_KURZY || [];
window.JEZTOK_KURZY.push({
  id: "startupy",
  nazev: "Obranné minimum pro startupy",
  emoji: "🚀",
  barva: "#0f766e",
  popis: "Co musí vědět firma, která chce do obrany: jak trh funguje, co smí, kde jsou zákazníci a peníze. Krátce, ověřeně, se zdroji.",
  temata: [
    // =================================================================
    {
      id: "trh",
      nazev: "Jak funguje obranný trh",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Jeden zákazník, dlouhé cykly",
          text: "Na obranném trhu je zákazníkem stát: v ČR nakupuje Ministerstvo obrany pro Armádu ČR, vedle něj Ministerstvo vnitra pro policii a hasiče. Jeden kupující znamená, že o poptávce rozhodují politika a rozpočet, ne trh, a že nákupní cykly se počítají na roky.",
          zdroj: "mo.gov.cz (Sekce vyzbrojování a akvizic); zákon č. 177/2023 Sb., o financování obrany",
          vysvetleni: "Ekonomové tomu říkají monopson (jeden kupující, mnoho prodávajících). Pro startup z toho plyne: nelze „prodat jinému zákazníkovi“, když se MO rozhodne jinak, a cash flow musí vydržet roky mezi prvním kontaktem a objednávkou. Zákon 177/2023 Sb. zavazuje ČR dávat na obranu nejméně 2 % HDP ročně, což dělá z MO největšího investora do techniky v zemi." },
        { id: "f2", typ: "fakt", titulek: "Kdo v ČR o nákupu rozhoduje",
          text: "Potřebu definuje Armáda ČR (Generální štáb a odborné složky), nákup řídí Sekce vyzbrojování a akvizic MO, strategické akvizice schvaluje vláda, rozpočet Poslanecká sněmovna. Nezávisle kontroluje Nejvyšší kontrolní úřad. Rámec dává Koncepce výstavby Armády ČR 2035 (KVAČR) a obranná strategie.",
          zdroj: "mo.gov.cz; army.cz (KVAČR 2035); nku.cz",
          vysvetleni: "Praktický důsledek: „prodat armádě“ znamená mluvit s několika vrstvami naráz. Uživatel (útvar, který má problém) ti může říct, co potřebuje, ale nakoupit nemůže; akviziční sekce nakoupit může, ale potřebuje, aby potřeba byla v plánu. Kdo mluví jen s jednou vrstvou, dlouho neví, proč to nejde." },
        { id: "k1", typ: "kviz", otazka: "Kdo v ČR vede proces nákupu vojenského materiálu pro Armádu ČR?",
          moznosti: ["Generální štáb AČR", "Sekce vyzbrojování a akvizic Ministerstva obrany", "Ministerstvo průmyslu a obchodu"], spravne: 1,
          vysvetleni: "Generální štáb definuje požadavky, Sekce vyzbrojování a akvizic MO zakázku zadává a smlouvu spravuje. MPO řeší licence pro obchod s vojenským materiálem, ne nákupy pro armádu." },
        { id: "f3", typ: "fakt", titulek: "Obranné zakázky mají vlastní pravidla",
          text: "Nákupy pro obranu a bezpečnost se zadávají podle části sedmé zákona o zadávání veřejných zakázek (č. 134/2016 Sb., § 187 a násl.), která přebírá směrnici 2009/81/ES. Umožňuje užší řízení, požadavky na bezpečnost informací a dodávek a přísnější podmínky pro subdodavatele. Když jde o podstatné bezpečnostní zájmy státu, může stát zakázku ze soutěže vyjmout podle čl. 346 SFEU.",
          zdroj: "Zákon č. 134/2016 Sb., část sedmá; směrnice Evropského parlamentu a Rady 2009/81/ES; čl. 346 Smlouvy o fungování EU",
          vysvetleni: "Pro dodavatele: nečekej vždy otevřenou soutěž na TED. Část nákupů jde mezivládně (government-to-government), část přes rámcové smlouvy, část s odkazem na čl. 346 bez soutěže. Kdo chce vědět, co se chystá, sleduje KVAČR, rozpočtovou kapitolu MO a Věstník veřejných zakázek, ale hlavně mluví s lidmi, kteří požadavky píší." },
        { id: "a1", typ: "anone", tvrzeni: "Všechny nákupy Ministerstva obrany musí projít otevřenou veřejnou soutěží.", spravne: false,
          vysvetleni: "Ne. Obranné zakázky mají vlastní režim (část sedmá ZZVZ), část nákupů jde mezivládně a u podstatných bezpečnostních zájmů lze použít výjimku podle čl. 346 SFEU." },
        { id: "f4", typ: "fakt", titulek: "Co rozhoduje místo ceny",
          text: "Důvěra, reference, soulad se standardy (STANAG, bezpečnostní požadavky), bezpečnost dodávek a schopnost dodat a servisovat po celou dobu života systému, často 20 a více let. Cena je podmínka, ne hlavní argument.",
          zdroj: "Směrnice 2009/81/ES (bezpečnost informací a dodávek, čl. 22 a 23); zkušenost Defence Hubu",
          vysvetleni: "Zákazník kupuje schopnost a jistotu, že bude fungovat v nejhorší možný den. Startup, který vede prezentaci cenou, říká zákazníkovi, že nerozumí tomu, co kupuje. Prodávej řešení problému jednotky, doložené testem." },
        { id: "k2", typ: "kviz", otazka: "Startup má o 30 % levnější senzor než zavedený dodavatel. Proč to samo o sobě nestačí?",
          moznosti: ["Stát smí kupovat jen od tuzemských firem", "Rozhoduje důvěra, reference, standardy a schopnost dodávat a servisovat po léta", "Cena v obranných zakázkách nesmí být kritériem"], spravne: 1,
          vysvetleni: "Cena je jedna z podmínek. Zákazník potřebuje jistotu, že systém bude fungovat, bude kompatibilní a bude koho volat za deset let." },
        { id: "l1", typ: "lekce", titulek: "Cesta od nápadu k objednávce v ČR, realisticky",
          kroky: [
            "1. Zjisti, čí problém řešíš: který útvar nebo odbornost (ženijní, průzkum, logistika, kybernetika) a jak to dnes dělá. Bez konkrétního uživatele není co prodávat.",
            "2. Ověř, že řešení smíš vůbec nabízet: klasifikace (vojenský materiál / dual-use), případná licence a prověrka (viz další témata).",
            "3. Získej důkaz: test, cvičení, pilot. Armáda nekupuje slidy. V ČR pomůže Defence Hub (mapa testovacích kapacit, experimenty AČR, síť DIANA).",
            "4. Dostaň se do plánu: potřeba musí existovat v akvizičním plánu MO. To se děje přes uživatele a Sekci vyzbrojování, ne přes ministra.",
            "5. Počítej s roky: od prvního kontaktu k objednávce bývá cesta dlouhá a kapitál na ni musíš mít z jiných zdrojů (granty, DIANA, investor), ne z očekávané zakázky."
          ] }
      ]
    },
    // =================================================================
    {
      id: "produkt",
      nazev: "Military, dual-use, nebo civilní?",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Tři škatulky, které rozhodují o všem dalším",
          text: "Každý produkt, software nebo technologie spadá regulačně do jedné ze tří kategorií: vojenský materiál (podle seznamu vojenského materiálu), dual-use (podle přílohy I nařízení (EU) 2021/821), nebo civilní (nekontrolovaný). Od toho se odvíjí, jaké povolení potřebuješ, komu smíš prodat a jaké programy jsou pro tebe otevřené.",
          zdroj: "Vyhláška č. 210/2012 Sb. (seznam vojenského materiálu); nařízení (EU) 2021/821, příloha I",
          vysvetleni: "Rozhoduje, co produkt je a k čemu byl navržen, ne kdo ho kupuje. Civilní kamera prodaná armádě zůstává civilní; kamera upravená pro vojenské nasazení (např. odolnost, specifikace) může být vojenský materiál." },
        { id: "f2", typ: "fakt", titulek: "Seznam vojenského materiálu",
          text: "Co je v ČR vojenský materiál, určuje seznam ve vyhlášce MPO č. 210/2012 Sb., členěný do kategorií SVMe 1 až 22 podle společného vojenského seznamu EU (ML1 až ML22): od zbraní a munice přes vozidla, letadla a lodě až po elektroniku, software a technologii „speciálně určenou pro vojenské použití“.",
          zdroj: "Vyhláška č. 210/2012 Sb., příloha; Společný vojenský seznam EU (Common Military List)",
          vysvetleni: "Klíčové slovní spojení je „speciálně určený pro vojenské použití“. Software pro plánování misí je vojenský materiál (ML21), stejný algoritmus v logistické appce pro e-shop ne. Když si nejsi jistý, zeptej se Licenční správy MPO předem." },
        { id: "k1", typ: "kviz", otazka: "Podle čeho se v ČR pozná, že je produkt „vojenský materiál“?",
          moznosti: ["Podle toho, že ho koupila armáda", "Podle seznamu vojenského materiálu (vyhláška 210/2012 Sb., kategorie SVMe 1 až 22)", "Podle ceny nad 1 mil. Kč"], spravne: 1,
          vysvetleni: "Rozhoduje zařazení do seznamu a určení pro vojenské použití, ne zákazník ani cena." },
        { id: "f3", typ: "fakt", titulek: "Dual-use: deset kategorií a kód položky",
          text: "Příloha I nařízení 2021/821 dělí dual-use položky do kategorií 0 až 9 (0 jaderné, 1 materiály a chemie, 2 zpracování materiálů, 3 elektronika, 4 počítače, 5 telekomunikace a informační bezpečnost, 6 senzory a lasery, 7 navigace a avionika, 8 námořní, 9 letectví a pohony). Každá položka má kód, např. 5A002 = kategorie 5, A = systémy a zařízení, položka 002 (šifrování).",
          zdroj: "Nařízení (EU) 2021/821, příloha I (ve znění nařízení v přenesené pravomoci (EU) 2025/2003)",
          vysvetleni: "Písmeno v kódu: A zařízení, B zkušební a výrobní zařízení, C materiály, D software, E technologie. Firma, která zná kód své položky, umí odpovědět zákazníkovi, dodavateli i bance na první otázku due diligence. Firma, která ho nezná, vypadá jako riziko." },
        { id: "d1", typ: "doplnit", text: "V kódu dual-use položky 5A002 znamená číslo 5 kategorii ___ a informační bezpečnost.", odpoved: ["telekomunikace", "Telekomunikace"],
          vysvetleni: "Kategorie 5: telekomunikace a informační bezpečnost (část 1 telekomunikace, část 2 informační bezpečnost, kam patří šifrování)." },
        { id: "a1", typ: "anone", tvrzeni: "Když produkt není v příloze I nařízení 2021/821 ani v seznamu vojenského materiálu, je civilní a žádná exportní kontrola se na něj nevztahuje.", spravne: false,
          vysvetleni: "Většinou ano, ale ne vždy: catch-all podle čl. 4 nařízení 2021/821 může vyžadovat povolení i pro nelistovanou položku, když je určena pro zbraně hromadného ničení nebo vojenské užití v zemi pod embargem." },
        { id: "f4", typ: "fakt", titulek: "Co ti klasifikace otevře a zavře",
          text: "Vojenský materiál: nutné povolení MPO už k obchodování, licence na každý vývoz, část programů EU (Horizont Evropa) uzavřena, DIANA nebere čistě zbraňové (lethal) technologie. Dual-use: licence jen při vývozu mimo EU, otevřené DIANA, EUDIS, EIC i Horizont (civilní větev). Civilní: bez licencí, ale do obranných programů se dostaneš jen s doloženým vojenským užitím.",
          zdroj: "Zákon č. 38/1994 Sb.; nařízení (EU) 2021/821; pravidla programů (diana.nato.int, eic.ec.europa.eu, Horizont Evropa)",
          vysvetleni: "Řada startupů se zbytečně klasifikuje „vojensky“, protože to zní vážně. Pokud produkt má civilní základ, dual-use pozice je obchodně nejsilnější: nejvíc programů, nejméně licencí, nejširší trh." },
        { id: "k2", typ: "kviz", otazka: "Firma vyvíjí software pro analýzu dat ze senzorů, prodává ho průmyslu a chce i do obrany. Jaká pozice je pro ni obchodně nejvýhodnější?",
          moznosti: ["Nechat se zařadit jako vojenský materiál, zní to seriózně", "Dual-use: zachovat civilní základ a doložit vojenské užití", "Zůstat čistě civilní a obranu neřešit"], spravne: 1,
          vysvetleni: "Dual-use otevírá DIANA, EUDIS, EIC i civilní programy a nevyžaduje povolení k obchodování. Vojenská klasifikace přidává licence a zavírá civilní programy." },
        { id: "f5", typ: "fakt", titulek: "Tři zkratky, které uslyšíš u každého senzoru",
          text: "C4ISR (Command, Control, Communications, Computers, Intelligence, Surveillance, Reconnaissance): velení, řízení a získávání informací, od radarů po analytický software. EW (Electronic Warfare): boj v elektromagnetickém spektru, rušení a jeho detekce. Cyber: útok a obrana v digitálním prostoru. Většina českých dual-use startupů se potkává s těmito třemi oblastmi.",
          zdroj: "NATO Glossary of Terms and Definitions (AAP-06)",
          vysvetleni: "Když zákazník řekne „ISR senzor“ nebo „EW odolnost“, ptá se, jestli tvůj produkt funguje v rušeném prostředí a jak zapadá do jeho velitelského řetězce. Obojí si vyzkoušíš jen na cvičení, ne v laboratoři." }
      ]
    },
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
    },
    // =================================================================
    {
      id: "proverky",
      nazev: "Utajované informace a prověrky",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Čtyři stupně utajení",
          text: "Zákon č. 412/2005 Sb. zná čtyři stupně utajení: Vyhrazené, Důvěrné, Tajné, Přísně tajné. Odpovídají stupňům NATO RESTRICTED, CONFIDENTIAL, SECRET a COSMIC TOP SECRET. Dohled vykonává Národní bezpečnostní úřad (NBÚ).",
          zdroj: "Zákon č. 412/2005 Sb., o ochraně utajovaných informací a o bezpečnostní způsobilosti; nbu.gov.cz",
          vysvetleni: "Většina zakázek, které startup potká, je buď bez utajení, nebo na stupni Vyhrazené. Důvěrné a vyšší se objevuje u zbraňových systémů, C4ISR a práce v NATO (např. STO). Předem se zeptej zadavatele, jaký stupeň bude ve smlouvě." },
        { id: "f2", typ: "fakt", titulek: "Co potřebuje firma a co její lidé",
          text: "Pro přístup k informacím stupně Důvěrné a vyšším potřebuje firma osvědčení podnikatele od NBÚ (prověrka firmy: vlastnická struktura, finance, bezpečnost objektů a IT) a její lidé osvědčení fyzické osoby. Pro stupeň Vyhrazené stačí prohlášení podnikatele a poučení osob; osvědčení NBÚ se nevydává.",
          zdroj: "Zákon č. 412/2005 Sb., § 15a (prohlášení podnikatele), § 54 a násl. (osvědčení podnikatele); nbu.gov.cz, Průmyslová bezpečnost",
          vysvetleni: "Prověrka firmy trvá měsíce (zákon stanoví lhůty podle stupně) a předpokládá, že firma má jasné vlastníky a pořádek v IT. Startup s investorem ze třetí země nebo s daty v cizím cloudu bude odpovídat na nepříjemné otázky. Začít řešit prověrku „až bude zakázka“ znamená zakázku nestihnout." },
        { id: "k1", typ: "kviz", otazka: "Zakázka MO je na stupni Vyhrazené. Co firma potřebuje?",
          moznosti: ["Osvědčení podnikatele od NBÚ pro stupeň Vyhrazené", "Prohlášení podnikatele a poučené zaměstnance; osvědčení NBÚ se pro Vyhrazené nevydává", "Nic, Vyhrazené není utajení"], spravne: 1,
          vysvetleni: "Pro Vyhrazené platí zjednodušený režim: prohlášení podnikatele a poučení osob. Osvědčení NBÚ je od stupně Důvěrné." },
        { id: "a1", typ: "anone", tvrzeni: "Osvědčení podnikatele od NBÚ se dá vyřídit během několika týdnů, když je zakázka na spadnutí.", spravne: false,
          vysvetleni: "Ne. Jde o měsíce: NBÚ prověřuje vlastníky, finance, objekty i informační systémy. Kdo chce na utajované zakázky, začíná s prověrkou dřív, než je potřebuje." },
        { id: "f3", typ: "fakt", titulek: "Bezpečnost jako obchodní argument",
          text: "I bez utajení se zadavatel ptá, kde máš data, kdo má přístup ke zdrojovému kódu a jak máš zabezpečené vývojové prostředí. Pro informační systémy státu platí zákon o kybernetické bezpečnosti a dohled NÚKIB; dodavatelé armády musí doložit i bezpečnost dodávek.",
          zdroj: "Zákon č. 264/2025 Sb., o kybernetické bezpečnosti (transpozice NIS2); nukib.gov.cz; směrnice 2009/81/ES, čl. 22 a 23",
          vysvetleni: "Pořádek v přístupech, repozitářích a cloudu se vyplatí dvakrát: u prověrky i u exportních kontrol (kdo má přístup ke kontrolované technologii). Jednoduchá bezpečnostní politika napsaná na dvě strany je pro startup víc než certifikát, který nemá." }
      ]
    },
    // =================================================================
    {
      id: "data",
      nazev: "Jak si udělat obrázek o trhu",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Kde jsou veřejná data o obraně",
          text: "SIPRI (výdaje na obranu podle zemí, transfery zbraní), Světová banka (výdaje v % HDP), Global Firepower a IISS Military Balance (struktura sil a vybavení), TED (evropské veřejné zakázky včetně obranných), NSPA a UNGM (zakázky NATO a OSN), v ČR rozpočtová kapitola MO a Koncepce výstavby AČR 2035.",
          zdroj: "sipri.org (Military Expenditure Database, Arms Transfers Database); data.worldbank.org; ted.europa.eu; nspa.nato.int; ungm.org; mo.gov.cz",
          vysvetleni: "Otevřená data řeknou, kolik stát utrácí a jaké má síly, ale nikdy přesně, co a kdy koupí. Ty nejcennější informace (akviziční plány, specifikace) se dozvíš z rozhovorů s uživateli, na industry days a z dokumentů, které ministerstva zveřejňují až při soutěži." },
        { id: "k1", typ: "kviz", otazka: "Kde najdeš srovnání výdajů na obranu podle zemí za posledních 30 let?",
          moznosti: ["TED", "SIPRI Military Expenditure Database", "NSPA Source File"], spravne: 1,
          vysvetleni: "SIPRI vede dlouhé časové řady výdajů i transferů zbraní. TED jsou zakázky, NSPA databáze dodavatelů." },
        { id: "f2", typ: "fakt", titulek: "Co z dat vyčíst a co ne",
          text: "Z veřejných dat vyčteš trend (roste rozpočet? jaký podíl jde na investice?), priority (KVAČR, obranná strategie, NATO Demand Signal) a hráče (kdo vyhrál minulé tendry na TED). Nevyčteš konkrétní termín nákupu ani technické požadavky; ty vznikají u uživatele a v akviziční sekci.",
          zdroj: "army.cz (KVAČR 2035); nato.int (Demand Signal); ted.europa.eu (výsledky zakázek)",
          vysvetleni: "Pracovní postup, který funguje: (1) trend a priority z veřejných zdrojů, (2) jména vítězů minulých tendrů jako mapa, komu dodávat, (3) rozhovory s uživateli a návštěva akcí jako jediný zdroj „kdy a co přesně“." },
        { id: "a1", typ: "anone", tvrzeni: "Výsledky minulých obranných zakázek na TED jsou dobrá mapa toho, kdo jsou primes a potenciální partneři pro subdodávky.", spravne: true,
          vysvetleni: "Ano. Vítězové minulých tendrů jsou firmy, které už mají důvěru zadavatele a potřebují subdodavatele. Pro startup je často realističtější dodávat jim než soutěžit přímo." },
        { id: "d1", typ: "doplnit", text: "Evropské veřejné zakázky, včetně obranných, se zveřejňují na portálu ___ (Tenders Electronic Daily).", odpoved: ["TED", "ted"],
          vysvetleni: "TED = Tenders Electronic Daily, ted.europa.eu. České zakázky navíc ve Věstníku veřejných zakázek." }
      ]
    },
    // =================================================================
    {
      id: "offsety",
      nazev: "Offsety a průmyslová spolupráce",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Co je offset",
          text: "Offset (nebo průmyslová spolupráce, industrial participation) je závazek zahraničního dodavatele, že výměnou za velkou obrannou zakázku zapojí průmysl kupující země: přímo (výroba komponent, montáž, servis a údržba kupovaného systému) nebo nepřímo (investice, transfer technologií, spolupráce mimo kupovaný systém).",
          zdroj: "Evropská komise, Guidance Note on Offsets ke směrnici 2009/81/ES (2010); čl. 346 SFEU",
          vysvetleni: "Pro startup je offset příležitost dostat se do dodavatelského řetězce velkého výrobce (prime), který hledá lokální partnery, aby splnil závazek vůči státu. Nemusíš prodávat tank; stačí dodávat prvek, který prime potřebuje." },
        { id: "f2", typ: "fakt", titulek: "Proč je EU k offsetům kritická",
          text: "Komise považuje offsety za omezení jednotného trhu a dovoluje je jen tam, kde je stát odůvodní podstatnými bezpečnostními zájmy podle čl. 346 SFEU (např. bezpečnost dodávek, suverénní údržba). Proto se v EU mluví spíš o „průmyslové spolupráci“ a „bezpečnosti dodávek“ než o offsetech.",
          zdroj: "Evropská komise, Guidance Note on Offsets (2010); směrnice 2009/81/ES",
          vysvetleni: "V praxi státy zapojení domácího průmyslu u strategických nákupů vyjednávají dál, jen s jiným zdůvodněním. ČR tak postupuje u velkých akvizic (např. bojová vozidla pěchoty, letouny), konkrétní podmínky jsou v každé smlouvě jiné a bývají zveřejněné jen částečně." },
        { id: "k1", typ: "kviz", otazka: "Jaký je rozdíl mezi přímým a nepřímým offsetem?",
          moznosti: ["Přímý platí stát, nepřímý platí dodavatel", "Přímý se váže na kupovaný systém (výroba, servis), nepřímý je spolupráce mimo něj (investice, technologie)", "Přímý je povinný, nepřímý dobrovolný"], spravne: 1,
          vysvetleni: "Přímý offset = účast na kupovaném systému. Nepřímý = jiná hodnota pro ekonomiku kupující země." },
        { id: "f3", typ: "fakt", titulek: "Jak se k tomu dostat jako malá firma",
          text: "Sleduj, které strategické akvizice se v ČR chystají (KVAČR, vládní rozhodnutí) a kdo je pravděpodobný prime. Primes hledají lokální partnery dřív, než je smlouva podepsaná, protože závazky k průmyslové spolupráci se domlouvají v nabídce. Vstup zprostředkují Asociace obranného a bezpečnostního průmyslu (AOBP), Defence Hub a přímo supplier programy výrobců.",
          zdroj: "aobp.cz; defencehub.gov.cz; webové stránky výrobců (supplier / industrial cooperation)",
          vysvetleni: "Nabídka primovi musí být konkrétní: jaká schopnost nebo komponenta, s jakou certifikací, v jakém objemu. „Jsme česká firma“ není hodnota; „umíme dodat tento prvek podle této normy“ je." },
        { id: "a1", typ: "anone", tvrzeni: "Průmyslová spolupráce se domlouvá až po podpisu hlavní smlouvy, takže na oslovení prima je čas.", spravne: false,
          vysvetleni: "Ne. Závazky zapojení domácího průmyslu jsou součástí nabídky; prime si partnery mapuje v předstihu. Kdo přijde po podpisu, najde obsazená místa." }
      ]
    },
    // =================================================================
    {
      id: "finance",
      nazev: "Financování startupu v defence",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Proč banky a fondy váhaly",
          text: "Evropské banky a fondy roky obranné firmy vylučovaly: kvůli ESG politikám, reputačnímu riziku a výkladu pravidel udržitelného financování (EU taxonomie), která obranu neřešila. Právní zákaz financovat obranu neexistoval, ale finanční sektor jednal preventivně.",
          zdroj: "Nařízení (EU) 2020/852 (taxonomie); Evropská komise, Defence Readiness Omnibus (2025, část o přístupu k financím)",
          vysvetleni: "Dopadá to hlavně na malé firmy: velké mají přístup ke kapitálu jinak. Praktický projev: odmítnutý běžný účet, úvěr nebo platební brána jen proto, že v názvu je „defence“. Situace se od roku 2024 mění, ale firma s tím má počítat při výběru banky." },
        { id: "f2", typ: "fakt", titulek: "Obrat u EIB",
          text: "Evropská investiční banka v květnu 2024 rozšířila definici dual-use projektů (zrušila podmínku, že většina výnosů musí být civilní) a otevřela Security and Defence Office jako kontaktní místo. V březnu 2025 rozšířila způsobilost na obranné projekty obecně; vyloučeny zůstávají zbraně a munice.",
          zdroj: "eib.org, tiskové zprávy 8. 5. 2024 a 21. 3. 2025 (Security and Defence)",
          vysvetleni: "Většina startupů se k penězům EIB dostane přes banky s úvěrovou linkou EIB (pro SME až 12,5 mil. €) nebo přes VC fondy s penězi EIF; napřímo jen venture debt pro rychle rostoucí firmy, které už mají profesionální investory (typicky 10 až 50 mil. €). Pro firmu je to signál, že banky mají menší důvod říkat ne, a argument do jednání s vlastní bankou." },
        { id: "k1", typ: "kviz", otazka: "Co EIB i po změnách pravidel nefinancuje?",
          moznosti: ["Dual-use technologie", "Zbraně a munici", "Kybernetickou bezpečnost"], spravne: 1,
          vysvetleni: "Zbraně a munice zůstávají na seznamu vyloučených činností. Dual-use a od roku 2025 i další obranné projekty EIB financovat může." },
        { id: "f3", typ: "fakt", titulek: "Defence Equity Facility: EU peníze do VC fondů",
          text: "Defence Equity Facility (od ledna 2024) spravuje Evropský investiční fond za Komisi: 175 mil. € (100 mil. z EDF a 75 mil. od EIF) investuje do soukromých VC a PE fondů, které pak investují do firem s obrannými a dual-use technologiemi v EU a Norsku. Cíl je přitáhnout soukromý kapitál, celkem kolem 500 mil. €.",
          zdroj: "eif.org (Defence Equity Facility); defence-industry-space.ec.europa.eu",
          vysvetleni: "Firma se do DEF nehlásí; hledá fondy, které z ní čerpají. Účast EIF ve fondu je pro spoluinvestory signál, že obrana je investovatelná, a zmenšuje „valley of death“ mezi R&D a škálováním." },
        { id: "l1", typ: "lekce", titulek: "Capital stack obranného startupu",
          kroky: [
            "Fáze výzkum a prototyp: granty a smluvní financování bez podílu (non-dilutive): TA ČR PRODEF, OP TAK Aplikace, EIC Pathfinder/Transition, NATO DIANA (100 000 € + až 300 000 € v Mission Track), EUDIS, EDF Cascade Funding.",
            "Fáze produkt a první zákazník: kombinace grant + equity: EIC Accelerator (grant do 2,5 mil. € + equity do 10 mil. €), AGILE (od 2027, do 5 mil. €, bez konsorcia), EUDIS Open Call v konsorciu.",
            "Fáze růst: investor (dilutive): NATO Innovation Fund (Seed až Series B), fondy podpořené z Defence Equity Facility, VC fondy z EDIP FAST, EIC STEP Scale Up Defence (equity 10 až 30 mil. €), soukromé VC s obranným zaměřením.",
            "Fáze výroba a dodávky: zakázky (MO, NSPA, primes), úvěry přes banky s linkami EIB, SAFE nepřímo jako dodavatel státních nákupů.",
            "Zásada: peníze z programu nejsou cíl. Cílem je zákazník; program má zaplatit cestu k němu a nic víc. Detaily programů jsou v kurzech EU programy a NATO programy."
          ] },
        { id: "a1", typ: "anone", tvrzeni: "V ČR existuje národní grant na škálování výroby obranné technologie.", spravne: false,
          vysvetleni: "Národní grantová linka na scale-up chybí. PRODEF je výzkum a kofinancování EDF, OP TAK je vývoj. Na škálování míří EIC, EDIP, investoři." },
        { id: "k2", typ: "kviz", otazka: "Startup odmítla banka s odůvodněním ESG, protože dodává armádě dual-use senzory. Co je nejsilnější věcný argument?",
          moznosti: ["Obrana je v EU taxonomii výslovně označena jako udržitelná", "EIB od 2024/2025 dual-use i obranné projekty financuje a Komise v Omnibusu potvrzuje slučitelnost obrany s udržitelným financováním", "Banka porušuje zákon, obranu financovat musí"], spravne: 1,
          vysvetleni: "Taxonomie obranu nevylučuje ani neoznačuje; žádná povinnost banky financovat obranu neexistuje. Argumentem je změna postoje EIB a Komise, plus jasná klasifikace a compliance firmy." }
      ]
    },
    // =================================================================
    {
      id: "edt",
      nazev: "Emerging and Disruptive Technologies",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Devět oblastí, které NATO sleduje",
          text: "NATO označuje jako Emerging and Disruptive Technologies (EDT, nastupující a převratné technologie) devět oblastí: umělá inteligence, autonomie, kvantové technologie, biotechnologie a human enhancement, vesmír, hypersonické systémy, nové materiály a výroba, energie a pohony, sítě nové generace (komunikace a data).",
          zdroj: "nato.int, topic „Emerging and disruptive technologies“; NATO STO, Science & Technology Trends 2023 až 2043",
          vysvetleni: "Seznam není akademický: určuje, kam míří peníze (DIANA challenge oblasti, NIF, EDF témata) a jaké technologie budou státy přednostně chtít. Pokud umíš svou technologii zařadit do jedné z devíti oblastí jazykem NATO, zapadáš do výzev snáz." },
        { id: "k1", typ: "kviz", otazka: "Která z těchto oblastí NENÍ mezi devíti EDT podle NATO?",
          moznosti: ["Kvantové technologie", "Blockchain", "Hypersonické systémy"], spravne: 1,
          vysvetleni: "Devět EDT: AI, autonomie, kvantové technologie, biotech a human enhancement, vesmír, hypersonika, nové materiály a výroba, energie a pohony, sítě nové generace. Blockchain mezi nimi není." },
        { id: "f2", typ: "fakt", titulek: "Dual-use jako podstata EDT",
          text: "Většina EDT vzniká v civilním sektoru (AI, kvantové výpočty, biotech, aditivní výroba) a armády je přebírají. Proto NATO a EU staví programy pro dual-use firmy (DIANA, NIF, EUDIS, EIC dual-use) a proto má civilní startup v těchto oblastech reálnou šanci, kterou tradiční zbrojovka nemá.",
          zdroj: "NATO STO, Science & Technology Trends 2023 až 2043 (shrnutí); diana.nato.int (challenge oblasti)",
          vysvetleni: "Druhá strana mince: regulace EDT (autonomní zbraně, AI, kvantová kryptografie) se teprve tvoří a exportní seznamy se každý rok rozšiřují (viz aktualizace Annexu I 2025: kvantové technologie, polovodiče, aditivní výroba). Kdo pracuje v EDT, musí exportní kontroly sledovat průběžně." },
        { id: "a1", typ: "anone", tvrzeni: "Autonomní zbraňové systémy (LAWS) jsou mezinárodně zakázané závaznou smlouvou.", spravne: false,
          vysvetleni: "Ne. O regulaci LAWS se jedná v rámci Úmluvy o některých konvenčních zbraních (CCW) v Ženevě, závazná smlouva zatím neexistuje. Státy mají vlastní politiky; etické a právní otázky řeší i NATO ve svých zásadách pro AI a autonomii." },
        { id: "f3", typ: "fakt", titulek: "Co to znamená pro tvou roadmapu",
          text: "Technologie v EDT oblastech mají v obraně tři specifika: zákazník chce vidět odolnost v reálném prostředí (rušení, teplo, prach), nasazení trvá roky a musí projít testy a certifikací, a po nasazení se systém udržuje desítky let. Produkt navržený na roční cyklus spotřební elektroniky tomu neodpovídá.",
          zdroj: "NATO ALP-10 (Allied Logistics Publication, Integrated Life Cycle Support); STANAG 4586 jako příklad standardu rozhraní",
          vysvetleni: "Při plánování: počítej s verzí „defence“, která má delší podporu, dokumentaci, konfigurační management a jasné rozhraní podle standardů. Zákazník nekupuje jen funkci, kupuje schopnost ji udržet v provozu." }
      ]
    },
    // =================================================================
    {
      id: "tipy",
      nazev: "Tipy Defence Hubu",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Nejčastější první chyba",
          text: "Startup mluví o technologii, ne o problému vojáka, a neví, kdo je jeho zákazník: jestli ministerstvo, armáda, akviziční sekce, nebo prime, který dodává systém. Obojí vidí Defence Hub u nových firem nejčastěji.",
          zdroj: "Zkušenost Defence Hubu CzechInvest (2026)",
          vysvetleni: "Oprava je jednoduchá a nepříjemná: dřív než napíšeš pitch, pojmenuj útvar, situaci a problém, který řešíš, a vrstvu, která o nákupu rozhoduje. Když to neumíš, ještě nemáš obranný produkt, máš technologii." },
        { id: "f2", typ: "fakt", titulek: "Co z civilu v defence nefunguje",
          text: "Cold e-maily a LinkedIn zprávy na MO a AČR, demo jen online bez fyzické ukázky, a cena jako hlavní argument. Všechny tři Defence Hub viděl opakovaně selhat.",
          zdroj: "Zkušenost Defence Hubu CzechInvest (2026)",
          vysvetleni: "Co místo toho: osobní kontakt na akcích, kde armáda je (Future Forces Forum, IDET, Dny NATO), fyzický prototyp nebo demonstrace na cvičení, a argument postavený na schopnosti a odolnosti." },
        { id: "k1", typ: "kviz", otazka: "Který z postupů má podle zkušenosti Defence Hubu největší šanci u AČR?",
          moznosti: ["Série cold e-mailů na Generální štáb", "Fyzická ukázka na akci nebo cvičení, kde je armáda přítomná", "Nabídka s nejnižší cenou poslaná datovou schránkou"], spravne: 1,
          vysvetleni: "Armáda chce věc vidět a osahat, v reálných podmínkách. Cold e-maily a cena samy o sobě nefungují." },
        { id: "f3", typ: "fakt", titulek: "Co si nikdy nedovolit",
          text: "Obcházet hierarchii (psát rovnou ministrovi nebo náčelníkovi Generálního štábu), slibovat schopnosti, které nemáš otestované, tlačit na rychlé rozhodnutí a urgovat, a mluvit veřejně o konkurenci nebo o jiných zákaznících.",
          zdroj: "Zkušenost Defence Hubu CzechInvest (2026)",
          vysvetleni: "Obranná komunita je malá a má dlouhou paměť. Jedna urgence nebo jeden nesplněný slib se nese roky. Trpělivost tu není ctnost, je to podmínka." },
        { id: "a1", typ: "anone", tvrzeni: "Když se akviziční sekce neozývá, je dobrý tah napsat přímo ministrovi obrany.", spravne: false,
          vysvetleni: "Ne. Obcházení hierarchie zavírá dveře u lidí, kteří o nákupu reálně rozhodují. Správná cesta vede přes uživatele, akviziční sekci a prostředníky jako Defence Hub nebo AOBP." },
        { id: "f4", typ: "fakt", titulek: "Jak se dostat k testování",
          text: "Dvě cesty, které v ČR fungují: cvičení a experimenty Armády ČR (inovační akce, kde si útvary zkoušejí nové technologie) a testovací centra v síti NATO DIANA nebo v mapě testovacích kapacit Defence Hubu. Obojí zprostředkuje Defence Hub.",
          zdroj: "defencehub.gov.cz (mapa testovacích kapacit, DIANA); zkušenost Defence Hubu (2026)",
          vysvetleni: "Test je nejcennější věc, kterou můžeš mít: dává referenci, data a kontakt na uživatele zároveň. Nabídnout test za náklady je často lepší obchod než první objednávka." },
        { id: "f5", typ: "fakt", titulek: "Co si přinést na akci",
          text: "Fyzický produkt nebo prototyp k osahání, jednostránkový one-pager (co to umí, jaké TRL, kde bylo testováno, kontakt) a papírové vizitky. Lidé v uniformách si nic nestahují a na elektronické vizitky často nemohou.",
          zdroj: "Zkušenost Defence Hubu CzechInvest (2026)",
          vysvetleni: "Defence Hub chystá vlastní industry days s AČR (první v dubnu 2027): příležitost ukázat řešení přímo uživatelům. Sleduj defencehub.gov.cz a ozvi se, pokud chceš být mezi vystavujícími." }
      ]
    }
  ]
});
