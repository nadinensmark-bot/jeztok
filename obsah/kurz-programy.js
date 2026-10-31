// DEFLEARN HUB – kurz: Programy pro defence a dual-use firmy (katalog Defence Hub CzechInvest)
// Zdroj: znalostní báze DH Kompas (navigator/kb.js v repozitáři hub, verze 0.2 / KB Ultimate, stav 2026-09-05),
// která vychází z katalogu programů na defencehub.gov.cz. Bez termínů a uzávěrek (mění se, nejsou učivo).
// Údaje označené v KB jako [OVĚŘIT] nejsou v kartách použity jako fakta.
window.JEZTOK_KURZY = window.JEZTOK_KURZY || [];
window.JEZTOK_KURZY.push({
  id: "programy",
  nazev: "Programy Defence Hubu",
  emoji: "🧭",
  barva: "#0f766e",
  popis: "13 programů NATO, EU a ČR: co nabízejí, pro koho jsou a kdy je doporučit.",
  temata: [
    // =================================================================
    {
      id: "nato",
      nazev: "NATO: DIANA a NIF",
      karty: [
        { id: "f1", typ: "fakt", titulek: "NATO DIANA Accelerator",
          text: "Akcelerátor NATO pro dual-use deep tech. Defence Hub CzechInvest je česká akcelerační site, tedy hlavní vstupní brána českých startupů do DIANA. Žádá jedna firma (startup nebo SME) na konkrétní challenge.",
          vysvetleni: "NATO vyhlašuje challenges v definovaných oblastech, např. pokročilé komunikace a rušené elektromagnetické prostředí, autonomie a bezpilotní systémy, energie a napájení, biotech a lidská odolnost, kritická infrastruktura a logistika. Kohorta 2026 byla největší dosud: 150 firem z 24 zemí v 10 challenge oblastech." },
        { id: "f2", typ: "fakt", titulek: "DIANA: peníze a program",
          text: "Grant fáze 1: 100 000 €, ve fázi 2 až dalších 300 000 € (celkem až 400 000 €). Non-dilutive: NATO nebere podíl ani IP. Vybrané firmy projdou zhruba 6měsíčním akceleračním programem s mentoringem a přístupem k síti 200+ testovacích center ve 32 zemích a 16 akceleračních sites.",
          vysvetleni: "Česká site (Defence Hub CzechInvest) se zaměřuje na vesmír, pokročilé materiály, AI a ecotech; má síť 230+ obranných dodavatelů (AOBP) a 600+ evropských subjektů (EEN). Absolventi získávají viditelnost u NATO Innovation Fund a spojeneckých zákazníků, ale není to automatické." },
        { id: "k1", typ: "kviz", otazka: "Kolik může firma v DIANA získat celkem (fáze 1 + fáze 2)?",
          moznosti: ["100 000 €", "400 000 €", "15 mil. €"], spravne: 1,
          vysvetleni: "Fáze 1: 100 000 €, fáze 2 až dalších 300 000 €, celkem až 400 000 €. 15 mil. € je typická úvodní investice NIF." },
        { id: "f3", typ: "fakt", titulek: "DIANA: kdy ano, kdy ne",
          text: "Ano: funkční prototyp nebo technologie blízko nasazení (zhruba TRL 4+), civilní i obranné využití odpovídající vypsané challenge, zájem o non-dilutive peníze, obrannou validaci a kontakty. Ne: čistě zbraňová (lethal) technologie, nebo fáze čistého výzkumu bez prototypu.",
          vysvetleni: "Cílové TRL podle katalogu: 4–7. Pomoc DH: Defence Hub je akcelerační site, ozvat se před podáním přihlášky." },
        { id: "a1", typ: "anone", tvrzeni: "DIANA si za grant bere podíl ve firmě.", spravne: false,
          vysvetleni: "Ne. DIANA je non-dilutive: NATO nebere podíl ani duševní vlastnictví. Podíl bere až NATO Innovation Fund, což je venture fond." },
        { id: "f4", typ: "fakt", titulek: "NATO Innovation Fund (NIF)",
          text: "Venture fond zemí NATO s objemem přes 1 mld. €. Česko je jedním z 24 investorských států. Equity investice Seed až Series B do deep tech a dual-use firem; úvodní investice do cca 15 mil. € na firmu, s rezervami na navazující kola. Žádné výzvy, uzávěrky ani hodnoticí kritéria.",
          vysvetleni: "Oblasti: energetika, materiálové vědy, AI, data a výpočty, autonomie, kvantové technologie, biotechnologie, vesmír. Standardní VC proces: pitch deck → jednání → due diligence → investice za podíl. Fond často vede kolo (lead investor) a angažuje se v boardu. Úzce navázán na DIANA, ale investice není automatická." },
        { id: "k2", typ: "kviz", otazka: "Jak se žádá o investici z NATO Innovation Fund?",
          moznosti: ["Přihláškou do výzvy s pevnou uzávěrkou", "Standardním investorským procesem: pitch deck, jednání, due diligence", "Přes národní kontaktní bod EDF"], spravne: 1,
          vysvetleni: "NIF je fond, ne program s výzvami. Rozhoduje investiční tým podle zaměření fondu a kvality firmy. Studený e-mail skoro nikdy nefunguje; DH umí přes síť DIANA zprostředkovat warm intro." },
        { id: "d1", typ: "doplnit", text: "Česko je jedním z ___ investorských států NATO Innovation Fund.", odpoved: ["24", "dvaceti čtyř", "dvacet čtyři"],
          vysvetleni: "24 investorských zemí, objem fondu přes 1 mld. €." },
        { id: "a2", typ: "anone", tvrzeni: "NIF je vhodný pro tým, který hledá peníze na výzkum, ale ještě nemá firmu ani produkt.", spravne: false,
          vysvetleni: "VC investuje do firem, ne do projektů. Kdo nechce ředit podíl zakladatelů, má zůstat u grantů (DIANA, EUDIS, EIC grant)." }
      ]
    },
    // =================================================================
    {
      id: "eic",
      nazev: "EU: nástroje EIC",
      karty: [
        { id: "f1", typ: "fakt", titulek: "EIC Accelerator (dual-use)",
          text: "Vlajkový nástroj EU pro deep tech: blended finance, tedy grant do 2,5 mil. € (non-dilutive) plus equity investice do 10 mil. € přes EIC Fund. Od 17. 6. 2026 poprvé otevřen obranným a dual-use technologiím. Pro jednotlivé startupy a MSP z EU s technologií TRL 6–8.",
          vysvetleni: "Cílové oblasti otevření obraně: protivzdušná a protiraketová obrana, drony a counter-drony, další kritické obranné technologie; plus AI, kvantové technologie, pokročilé materiály a robotika s dual-use využitím." },
        { id: "l1", typ: "lekce", titulek: "EIC Accelerator ve třech krocích",
          kroky: [
            "1. Krátká žádost (short proposal): pitch deck do 10 slidů a video. Podává se průběžně, kdykoli.",
            "2. Úplná žádost k pevné uzávěrce (cut-off).",
            "3. Pohovor před porotou. Úspěšní získají grant, investici, nebo obojí.",
            "EIC je soutěž byznys plánů, ne jen výzkumu: potřebuješ validovanou technologii (TRL 6+) a jasný komerční plán.",
            "Pozor na záměnu: equity 10–30 mil. € je samostatný nástroj EIC STEP Scale Up Defence, ne běžný Accelerator."
          ] },
        { id: "k1", typ: "kviz", otazka: "Jaká je maximální grantová složka EIC Acceleratoru?",
          moznosti: ["2,5 mil. €", "6 mil. €", "10 mil. €"], spravne: 0,
          vysvetleni: "Grant do 2,5 mil. € + equity do 10 mil. €. (6 mil. € je EUDIS Open Call na vývoj.)" },
        { id: "f2", typ: "fakt", titulek: "EIC STEP Scale Up Defence",
          text: "Nový nástroj EIC pro velké obranné scale-upy: čistá equity 10–30 mil. €, bez grantu, rozpočet 100 mil. €. Pro scale-upy v kritických obranných technologiích z EU, zemí EHP asociovaných k Horizontu Evropa a Ukrajiny, TRL 7–9. Vyžaduje pre-commitment (předběžný závazek) soukromého investora.",
          vysvetleni: "STEP = Strategic Technologies for Europe Platform. EIC investuje 10–30 mil. € jako součást většího investičního kola vedle soukromých investorů; očekává se celkové kolo min. 3–5× vyšší. Pomoc DH: napojení na investory přes síť DH a DIANA." },
        { id: "a1", typ: "anone", tvrzeni: "EIC STEP Scale Up Defence kombinuje grant a equity stejně jako EIC Accelerator.", spravne: false,
          vysvetleni: "Ne. STEP Scale Up Defence je čistá equity 10–30 mil. € bez grantové složky (dilutive). Kdo nechce ředit podíl, nemá tam co dělat." },
        { id: "k2", typ: "kviz", otazka: "Co musí mít firma pro EIC STEP Scale Up Defence navíc oproti Acceleratoru?",
          moznosti: ["Konsorcium ze 3 států", "Pre-commitment soukromého investora", "Národní kofinancování z PRODEF"], spravne: 1,
          vysvetleni: "Předběžný závazek soukromého kapitálu (lead investor nebo pre-commitment). EIC pak vstupuje do většího kola." },
        { id: "f3", typ: "fakt", titulek: "EIC Pathfinder / Transition",
          text: "Financování raného výzkumu průlomových technologií: Pathfinder (TRL 1–4) s granty do 4 mil. € (Open i Challenges) a Transition (do cca 2,5 mil. €), který výsledky Pathfinderu nebo ERC posouvá k prototypu a prvnímu byznys plánu. Pro výzkumné týmy a spin-offy hluboko před trhem.",
          vysvetleni: "Pathfinder Open typicky konsorcium; Challenges a Transition umožňují i jednotlivé žadatele. Firma, která projde výzkumem v Horizontu, může pokračovat do EIC Acceleratoru. Kdo už má produkt a zákazníky, patří do Acceleratoru nebo DIANA." },
        { id: "d1", typ: "doplnit", text: "EIC ___ financuje vysoce rizikový raný výzkum (TRL 1–4), EIC Transition ho dotahuje k prototypu.", odpoved: ["Pathfinder", "pathfinder"],
          vysvetleni: "Pathfinder = vize budoucí technologie; Transition = od výsledku k prototypu a byznys plánu; Accelerator = od validované technologie na trh." }
      ]
    },
    // =================================================================
    {
      id: "granty",
      nazev: "EU: obranné granty a programy",
      karty: [
        { id: "f1", typ: "fakt", titulek: "EDF – European Defence Fund",
          text: "Hlavní grantový program EU pro obranný výzkum a vývoj: 7,3 mld. € na 2021–27 (výzvy 2026 cca 1 mld. € v 10 výzvách a 31 tématech). Granty non-dilutive, u výzkumných akcí až 100 % způsobilých nákladů, bonusy pro SME, mid-caps a napojení na PESCO.",
          vysvetleni: "Vypisuje Evropská komise (DG DEFIS) v ročních výzvách; výzkumné akce cílí na nižší TRL, vývojové na vyšší. Pro startup je EDF přímo těžko dosažitelný: vstupuje se přes konsorcium vedené integrátorem nebo výzkumnou organizací a přes EUDIS." },
        { id: "f2", typ: "fakt", titulek: "EDF: kdo smí žádat",
          text: "Konsorcia minimálně 3 nezávislých subjektů ze 3 členských států nebo zemí asociovaných k EDF; výjimka pro průlomové technologie: stačí 2 subjekty ze 2 zemí. Žadatelé musí sídlit v EU s exekutivním vedením v EU a nesmí být kontrolováni nepřidruženou třetí zemí.",
          vysvetleni: "Čeští účastníci mohou získat národní kofinancování přes TAČR PRODEF PP1. Nevhodné, když potřebuješ peníze rychle (od výzvy k podpisu smlouvy zpravidla přes rok) nebo chceš žádat sama (pak EUDIS, EIC nebo AGILE od 2027). Pomoc DH: matchmaking konsorcia, národní kontaktní bod (AOBP), PRODEF PP1." },
        { id: "k1", typ: "kviz", otazka: "Kolik subjektů z kolika zemí potřebuje standardní konsorcium EDF?",
          moznosti: ["2 subjekty ze 2 zemí", "3 subjekty ze 3 zemí", "5 subjektů z 5 zemí"], spravne: 1,
          vysvetleni: "Minimálně 3 nezávislé subjekty ze 3 členských nebo asociovaných zemí. Výjimka pro průlomové technologie: 2 ze 2." },
        { id: "a1", typ: "anone", tvrzeni: "Firma kontrolovaná z nepřidružené třetí země může být žadatelem v EDF, pokud má pobočku v EU.", spravne: false,
          vysvetleni: "Ne. Žadatel musí sídlit v EU s exekutivním vedením v EU a nesmí být kontrolován nepřidruženou třetí zemí." },
        { id: "f3", typ: "fakt", titulek: "EUDIS – EU Defence Innovation Scheme",
          text: "SME větev EDF (cca 120 mil. € v programu 2026) pro startupy a MSP z EU a Norska. Dvě části: EUDIS Accelerator, 6měsíční program s business coachingem, matchmakingem s primes a možností Test in Ukraine, pro jednotlivé firmy; a EUDIS Open Call s granty do 6 mil. € na vývoj a do 4 mil. € na výzkum pro menší konsorcia (3 firmy ze 3 států, od TRL 4).",
          vysvetleni: "Jednodušší než plný EDF. Je to cesta k EDF: přes EUDIS získáš reference a partnery pro pozdější velká konsorcia. Nevhodné, když hledáš jednorázově velký objem financí." },
        { id: "k2", typ: "kviz", otazka: "Jaký je strop grantu EUDIS Open Call na vývoj?",
          moznosti: ["2,5 mil. €", "4 mil. €", "6 mil. €"], spravne: 2,
          vysvetleni: "Do 6 mil. € na vývoj, do 4 mil. € na výzkum. 2,5 mil. € je grantová část EIC Acceleratoru." },
        { id: "d1", typ: "doplnit", text: "EUDIS Accelerator nabízí kromě coachingu a matchmakingu i možnost Test in ___.", odpoved: ["Ukraine", "Ukrajině", "Ukrajina", "ukraine"],
          vysvetleni: "Test in Ukraine: testování technologie v reálných podmínkách." },
        { id: "f4", typ: "fakt", titulek: "EDIP – European Defence Industry Programme",
          text: "Schválený program EU pro posílení obranné výroby, pracovní program 1,5 mld. € (2026–27). Rozdělení: 700+ mil. € výroba klíčových komponent (counter-drony, rakety, munice), 325 mil. € projekty společného zájmu, 260 mil. € podpora Ukrajiny, 240 mil. € společný nákup (grant až 20 mil. € na projekt), 100 mil. € equity pro startupy/SME (fond FAST), 35,3 mil. € BraveTech EU.",
          vysvetleni: "Pro startupy jsou hlavní fond FAST (equity, 100 mil. €) a inovační program BraveTech EU (50 mil. € EU + 50 mil. € Ukrajina, fáze Seed a Scale Up). Vhodné pro hotový produkt a škálování výroby (TRL 6–9); ve vývojové fázi začni u EDF, EUDIS nebo DIANA." },
        { id: "k3", typ: "kviz", otazka: "Která část EDIP je určena startupům jako equity podpora?",
          moznosti: ["Fond FAST", "Projekty společného zájmu", "Společný nákup"], spravne: 0,
          vysvetleni: "FAST = 100 mil. € equity pro startupy a SME. Druhá cesta pro startupy je BraveTech EU." },
        { id: "f5", typ: "fakt", titulek: "AGILE Initiative (spuštění 2027)",
          text: "Připravovaný nástroj EU pro rychlou obrannou inovaci: rozpočet 115 mil. €, do 5 mil. € na projekt, sólo žadatel (hlavně SME a startupy), bez povinného konsorcia, cíl grant do 4 měsíců od podání. Má podpořit 20–30 projektů se 100% financováním způsobilých nákladů.",
          vysvetleni: "Politická dohoda Parlamentu a Rady z července 2026; spuštění začátkem 2027. Až se rozjede, bude to nejrychlejší evropská cesta k obrannému grantu bez konsorcia. Kdo potřebuje peníze letos, má použít EUDIS, EIC nebo PRODEF." },
        { id: "a2", typ: "anone", tvrzeni: "AGILE vyžaduje mezinárodní konsorcium stejně jako EDF.", spravne: false,
          vysvetleni: "Ne. AGILE je pro jednotlivé firmy bez povinného konsorcia, s rychlým řízením." },
        { id: "f6", typ: "fakt", titulek: "Horizont Evropa – Klastr 3 (Civilní bezpečnost)",
          text: "Výzkum pro civilní bezpečnost: výzvy 2026 za 131 mil. € (boj proti kriminalitě a terorismu 40,7 / správa hranic 21,3 / odolná infrastruktura 22,7 / odolnost vůči katastrofám 32,5 / posílený výzkum 13,8 mil. €). Důraz na vysoké TRL (6–8) a polní demonstrace. Projekty musí být výhradně civilní.",
          vysvetleni: "Konsorcia firem, výzkumných organizací a povinně i praktiků (bezpečnostní složky, provozovatelé kritické infrastruktury). Hodí se, když má technologie bezpečnostní (security), ne vojenské využití, nebo když chceš civilní větev dual-use financovat odděleně. Vojenský výstup patří do EDF. Národní kontaktní bod: TC Praha." },
        { id: "k4", typ: "kviz", otazka: "Co je v konsorciu pro Klastr 3 Horizontu Evropa povinné navíc oproti firmám a výzkumným organizacím?",
          moznosti: ["Prime contractor", "Praktici – bezpečnostní složky nebo provozovatelé kritické infrastruktury", "Investor s pre-commitmentem"], spravne: 1,
          vysvetleni: "Praktici (end useři) jsou povinnou součástí konsorcia a projekty musí být výhradně civilní." }
      ]
    },
    // =================================================================
    {
      id: "cr",
      nazev: "Česko: PRODEF a OP TAK",
      karty: [
        { id: "f1", typ: "fakt", titulek: "TAČR PRODEF",
          text: "Český program aplikovaného obranného výzkumu: 6,12 mld. Kč na 2024–31, průměrná intenzita podpory 60 %. Administruje TAČR, financuje Ministerstvo obrany ČR (schváleno vládou 7. 5. 2024). Pro české firmy a výzkumné organizace, bez mezinárodního konsorcia.",
          vysvetleni: "Dva podprogramy: PP1 kofinancuje české účastníky EDF konsorcií (národní kofinancování), PP2 financuje aplikovaný výzkum v nastupujících technologiích pro potřeby AČR: obranná elektronika, bezpilotní systémy, munice." },
        { id: "k1", typ: "kviz", otazka: "K čemu slouží PRODEF PP1?",
          moznosti: ["Výzkum pro Armádu ČR", "Národní kofinancování českých účastníků EDF", "Dotace na scale-up výroby"], spravne: 1,
          vysvetleni: "PP1 je nejdůležitější můstek mezi národní a evropskou úrovní: kdo jde do EDF, řeší PRODEF PP1 souběžně. PP2 je výzkum pro AČR." },
        { id: "d1", typ: "doplnit", text: "PRODEF má celkový rozpočet ___ mld. Kč na roky 2024–31.", odpoved: ["6,12", "6.12", "6,12 mld"],
          vysvetleni: "6,12 mld. Kč, průměrná intenzita podpory 60 %." },
        { id: "a1", typ: "anone", tvrzeni: "PRODEF je vhodný zdroj růstového kapitálu na škálování výroby.", spravne: false,
          vysvetleni: "Národní grantová linka na scale-up chybí. Na škálování miř na EIC nebo NIF. PRODEF je výzkum (PP2) a kofinancování EDF (PP1)." },
        { id: "f2", typ: "fakt", titulek: "OP TAK – Aplikace DEEP TECH",
          text: "Dotace MPO na průmyslový výzkum a experimentální vývoj ve firmách: 2–100 mil. Kč na projekt. Operační program Technologie a aplikace pro konkurenceschopnost (2021–27), financovaný z fondů EU. Civilní program, který nově pokrývá i obranný průmysl, tedy vhodný pro dual-use vývoj v ČR.",
          vysvetleni: "Podniky (zvýhodnění pro SME), i ve spolupráci s výzkumnými organizacemi. Čistě vojenský projekt s utajením patří do PRODEF nebo EDF. Doplňkové civilní programy TAČR: SIGMA a TREND. Pomoc DH: regionální kancelář CzechInvest." },
        { id: "k2", typ: "kviz", otazka: "Jaké je rozpětí dotace v OP TAK Aplikace DEEP TECH?",
          moznosti: ["0,5–5 mil. Kč", "2–100 mil. Kč", "100–500 mil. Kč"], spravne: 1,
          vysvetleni: "2–100 mil. Kč na projekt, spravuje MPO." }
      ]
    },
    // =================================================================
    {
      id: "staty",
      nazev: "Nástroj pro státy: SAFE",
      karty: [
        { id: "f1", typ: "fakt", titulek: "SAFE – Security Action for Europe",
          text: "Úvěrový nástroj EU do 150 mld. € pro společné pořizování vojenského materiálu. Nástroj pro členské státy, ne pro firmy: firmy profitují nepřímo jako dodavatelé do zakázek financovaných ze SAFE. Max. 35 % nákladů komponent smí pocházet mimo EU/Ukrajinu/EHP.",
          vysvetleni: "Nařízení v platnosti od 29. 5. 2025, financováno z výpůjční kapacity EU (EU-bonds). Ukrajina a země EHP/ESVO se mohou účastnit společných nákupů. Pro startup: sledovat, kam poteče poptávka států, a pozicovat se v dodavatelských řetězcích (přes primes nebo národní nákupy)." },
        { id: "k1", typ: "kviz", otazka: "Kdo může ze SAFE přímo čerpat?",
          moznosti: ["Startupy a SME", "Členské státy EU", "Konsorcia firem ze 3 zemí"], spravne: 1,
          vysvetleni: "Přímo pouze členské státy. Firmy se účastní jako dodavatelé. Kdo hledá přímé financování vývoje, má jít na EIC, EUDIS, EDIP FAST nebo BraveTech." },
        { id: "a1", typ: "anone", tvrzeni: "SAFE je grantový program, státy peníze nevracejí.", spravne: false,
          vysvetleni: "SAFE jsou půjčky s dlouhou splatností, ne granty." }
      ]
    },
    // =================================================================
    {
      id: "vyber",
      nazev: "Který program komu",
      karty: [
        { id: "l1", typ: "lekce", titulek: "Mapa programů podle fáze firmy",
          kroky: [
            "Raný výzkum, před prototypem (TRL 1–4): EIC Pathfinder / Transition; v ČR PRODEF PP2 (výzkum pro AČR) nebo OP TAK.",
            "Prototyp, dual-use, jedna firma (TRL 4–7): NATO DIANA (grant až 400 000 €, non-dilutive), EUDIS Accelerator, od 2027 AGILE (do 5 mil. €, bez konsorcia).",
            "Menší konsorcium 3 firem ze 3 států: EUDIS Open Call (do 6 mil. € vývoj / 4 mil. € výzkum).",
            "Velký obranný R&D s partnery: EDF (konsorcium 3 subjektů ze 3 zemí) + v ČR souběžně PRODEF PP1.",
            "Validovaná technologie na trh (TRL 6–8), jedna firma: EIC Accelerator (grant do 2,5 mil. € + equity do 10 mil. €).",
            "Hotový produkt, škálování výroby (TRL 6–9): EDIP (výroba komponent, FAST, BraveTech EU), EIC STEP Scale Up Defence (equity 10–30 mil. €).",
            "Investor místo grantu: NATO Innovation Fund (Seed až Series B, do cca 15 mil. €).",
            "Civilní bezpečnost bez vojenského výstupu: Horizont Evropa Klastr 3. Dodávky do státních nákupů: SAFE nepřímo jako dodavatel."
          ] },
        { id: "k1", typ: "kviz", otazka: "Startup má funkční prototyp dronového senzoru (TRL 5) s civilním i vojenským využitím, nechce odevzdat podíl a chce kontakty v NATO. Co doporučíš jako první?",
          moznosti: ["NATO Innovation Fund", "NATO DIANA", "EIC STEP Scale Up Defence"], spravne: 1,
          vysvetleni: "DIANA: dual-use, TRL 4+, non-dilutive grant, mentoring a testovací centra. NIF bere podíl, STEP je čistá equity pro scale-upy TRL 7–9." },
        { id: "k2", typ: "kviz", otazka: "Česká firma vstupuje do EDF konsorcia a ptá se, jak doplnit národní kofinancování. Kam ji pošleš?",
          moznosti: ["OP TAK Aplikace", "TAČR PRODEF PP1", "EUDIS Accelerator"], spravne: 1,
          vysvetleni: "PRODEF PP1 kofinancuje české účastníky EDF. Řeší se souběžně s výzvou EDF." },
        { id: "k3", typ: "kviz", otazka: "Scale-up vyrábí counter-drone systém, skládá investiční kolo 60 mil. € a má lead investora. Který nástroj EIC sedí?",
          moznosti: ["EIC Pathfinder", "EIC Accelerator", "EIC STEP Scale Up Defence"], spravne: 2,
          vysvetleni: "STEP Scale Up Defence: čistá equity 10–30 mil. € jako součást většího kola s pre-commitmentem soukromého investora. Accelerator má equity jen do 10 mil. €." },
        { id: "k4", typ: "kviz", otazka: "Univerzitní spin-off má průlomový nápad na nový materiál, zatím jen laboratorní ověření principu (TRL 2). Kam patří?",
          moznosti: ["EIC Pathfinder", "EDIP fond FAST", "NATO DIANA"], spravne: 0,
          vysvetleni: "Pathfinder financuje raný vysoce rizikový výzkum TRL 1–4. DIANA chce prototyp (TRL 4+), FAST je equity pro firmy s produktem." },
        { id: "k5", typ: "kviz", otazka: "Firma chce grant na vývoj do 6 mil. €, má dva partnery z jiných států EU a TRL 4, ale plný EDF je pro ni moc velký. Co zvolit?",
          moznosti: ["EUDIS Open Call", "SAFE", "Horizont Evropa Klastr 3"], spravne: 0,
          vysvetleni: "EUDIS Open Call: menší konsorcium 3 firem ze 3 států, od TRL 4, do 6 mil. € na vývoj. Jednodušší než EDF a cesta k němu." },
        { id: "k6", typ: "kviz", otazka: "Technologie detekuje výbušniny na hranicích a má zůstat čistě civilní. Který program?",
          moznosti: ["EDF", "Horizont Evropa Klastr 3", "EDIP"], spravne: 1,
          vysvetleni: "Klastr 3 (Civilní bezpečnost): správa hranic je jedna z destinací, projekty musí být výhradně civilní a v konsorciu musí být praktici." },
        { id: "k7", typ: "kviz", otazka: "Firma má hotový produkt pro výrobu munice a potřebuje škálovat výrobní kapacitu. Kam primárně?",
          moznosti: ["EDIP – výroba klíčových komponent", "EIC Pathfinder", "NATO DIANA"], spravne: 0,
          vysvetleni: "EDIP má 700+ mil. € na výrobu klíčových komponent (counter-drony, rakety, munice). DIANA a Pathfinder jsou pro vývoj, ne výrobu." },
        { id: "k8", typ: "kviz", otazka: "Zakladatelé hledají investora, který rozumí obrannému trhu, a nevadí jim ředění podílu. Trakci mají doloženou.",
          moznosti: ["NATO Innovation Fund", "TAČR PRODEF", "EUDIS Accelerator"], spravne: 0,
          vysvetleni: "NIF: equity Seed až Series B, rozumí obrannému trhu a otevírá dveře k vládním zákazníkům. Vyžaduje standardní investorské materiály (deck, data room, finance)." },
        { id: "a1", typ: "anone", tvrzeni: "Pro startup, který potřebuje obranný grant bez konsorcia ještě letos, je nejlepší volbou AGILE.", spravne: false,
          vysvetleni: "AGILE se spouští až začátkem 2027. Kdo potřebuje peníze letos, má použít EUDIS, EIC nebo PRODEF." },
        { id: "d1", typ: "doplnit", text: "Bez odevzdání podílu (non-dilutive) jsou DIANA, EDF, EUDIS a grantová část EIC; podíl bere NIF a EIC ___ Scale Up Defence.", odpoved: ["STEP", "step"],
          vysvetleni: "Dilutive = investor dostane podíl: NIF, EIC STEP Scale Up Defence, equity část EIC Acceleratoru a EDIP fond FAST." }
      ]
    }
  ]
});
