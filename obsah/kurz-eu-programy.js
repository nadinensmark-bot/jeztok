// DEFLEARN HUB – kurz: EU programy (verze pro firmy z databáze Defence Hubu)
// Základ převzat z interního kurzu „Programy Defence Hubu“ (vlastní obsah DH: katalog defencehub.gov.cz
// a onboarding konzultanta EU programů, 10/2026), zbaven interních formulací pro konzultanty.
// Téma „ramec“ nové, psáno z veřejných zdrojů Komise a EDA. Bez termínů a uzávěrek (mění se).
// Generováno skriptem build_eu.js z kurz-programy.js, 2. 11. 2026; ruční úpravy dělat zde i v programy.
window.JEZTOK_KURZY = window.JEZTOK_KURZY || [];
window.JEZTOK_KURZY.push({
  "id": "eu",
  "nazev": "EU programy",
  "emoji": "🇪🇺",
  "barva": "#0058A8",
  "popis": "Granty a nástroje EU pro obranné a dual-use firmy: EDF, EUDIS, EDIP, AGILE, EIC, plus české kofinancování. Co nabízejí, pro koho jsou a jak se v nich zorientovat.",
  stav: "11/2026",
  "temata": [
    {
      "id": "ramec",
      "nazev": "Jak se v EU programech orientovat",
      "karty": [
        {
          "id": "f1",
          "typ": "fakt",
          "titulek": "Kdo v EU o obraně rozhoduje a kdo platí",
          "text": "Obrana je v EU výjimka: společná politika (CSDP) se řídí jednomyslně, ale peníze na průmysl a výzkum tečou přes rozpočet EU a spravuje je Evropská komise, konkrétně DG DEFIS (Directorate-General for Defence Industry and Space). Mezivládní spolupráci států zastřešuje Evropská obranná agentura (EDA).",
          "zdroj": "defence-industry-space.ec.europa.eu; eda.europa.eu; SEU čl. 42 až 46",
          "vysvetleni": "Prakticky: granty pro firmy (EDF, EUDIS, EDIP, AGILE) vypisuje Komise, státní nákupy a plánování (PESCO, CARD, SAFE) řídí státy. Když hledáš peníze pro firmu, díváš se po Komisi; když hledáš, co státy nakoupí, díváš se po EDA a národních plánech."
        },
        {
          "id": "f2",
          "typ": "fakt",
          "titulek": "PESCO a CARD: plánování států, kontext pro firmy",
          "text": "PESCO (Permanent Structured Cooperation, od 2017) je rámec, ve kterém skupiny členských států společně vyvíjejí schopnosti v desítkách projektů; peníze dávají státy, ne EU. CARD (Coordinated Annual Review on Defence, od 2019) je roční přehled EDA o tom, co státy plánují, aby se plány sladily.",
          "zdroj": "pesco.europa.eu; eda.europa.eu (CARD)",
          "vysvetleni": "Firma se do PESCO přímo nehlásí, o zapojení rozhodují státy v projektu. Smysl pro startup: projekty PESCO ukazují, kam státy míří; vývojová akce v EDF, která PESCO projekt realizuje, může dostat o 10 procentních bodů vyšší míru financování (automaticky to ale neplatí)."
        },
        {
          "id": "f3",
          "typ": "fakt",
          "titulek": "EDIS a EDIP: strategie a její peníze",
          "text": "European Defence Industrial Strategy (EDIS, březen 2024) je strategie Komise s cíli do roku 2030: nakupovat víc společně a víc v Evropě. European Defence Industry Programme (EDIP) je nařízení, které ji financuje (1,5 mld. € na 2025 až 2027) a zavádí nástroje jako European Military Sales Mechanism a režim bezpečnosti dodávek.",
          "zdroj": "defence-industry-space.ec.europa.eu (EDIS, EDIP); nařízení (EU) 2025/2643",
          "vysvetleni": "Pozor na záměnu EDIP a EDIDP (starší program 2019 až 2020). Pro startup je v EDIP zajímavý FAST (equity přes VC fondy podpořené z Defence Equity Facility 2.0) a BraveTechEU; výroba komponent a společné nákupy jsou spíš pro větší výrobce."
        },
        {
          "id": "k1",
          "typ": "kviz",
          "otazka": "Která instituce vypisuje granty EDF a EUDIS pro firmy?",
          "moznosti": [
            "Evropská obranná agentura (EDA)",
            "Evropská komise (DG DEFIS)",
            "Rada EU"
          ],
          "spravne": 1,
          "vysvetleni": "Granty pro firmy spravuje Komise přes DG DEFIS. EDA zastřešuje spolupráci států (PESCO, CARD, CapTechs, HEDI)."
        },
        {
          "id": "f4",
          "typ": "fakt",
          "titulek": "EDIRPA a ASAP: rychlé nástroje po roce 2022",
          "text": "Po ruské invazi vznikly dva krátkodobé nástroje: EDIRPA (společné nákupy států, 310 mil. €, na munici, protivzdušnou obranu a náhradu starší techniky) a ASAP (Act in Support of Ammunition Production, 500 mil. € na navýšení výroby munice). Oba cílí na státy a velké výrobce, pro startup jsou spíš signál priorit.",
          "zdroj": "Nařízení (EU) 2023/2418 (EDIRPA); nařízení (EU) 2023/1525 (ASAP)",
          "vysvetleni": "Ukazují vzorec, který se opakuje i v SAFE a EDIP: EU tlačí na společné nákupy a evropskou výrobu. Dodavatel komponent se k těmto penězům dostane přes prime, ne přímo."
        },
        {
          "id": "f5",
          "typ": "fakt",
          "titulek": "Kde se hledají výzvy a jak se podává",
          "text": "Všechny grantové výzvy Komise jsou na EU Funding & Tenders Portal. Firma potřebuje registraci organizace a devítimístný kód PIC (Participant Identification Code). U EDF a EUDIS pomáhají národní kontaktní místa (National Focal Points); pro ČR je NFP pro EDF Asociace obranného a bezpečnostního průmyslu (AOBP). EDA provozuje bezplatný nástroj IdentiFunding pro orientaci v možnostech financování.",
          "zdroj": "ec.europa.eu/info/funding-tenders; defence-industry-space.ec.europa.eu (EDF NFPs); eda.europa.eu (IdentiFunding)",
          "vysvetleni": "Partnery do konsorcia hledej přes NFP, EDF Info Days, EDA B2B Platform a existující dodavatelské vztahy. Hodnotitelé Komise se vybírají z expertní databáze; registrovat se jako hodnotitel je legální způsob, jak pochopit, co se hodnotí."
        },
        {
          "id": "d1",
          "typ": "doplnit",
          "text": "Pro podání žádosti na EU Funding & Tenders Portal potřebuje firma devítimístný identifikátor ___.",
          "odpoved": [
            "PIC",
            "pic"
          ],
          "vysvetleni": "PIC = Participant Identification Code."
        },
        {
          "id": "f6",
          "typ": "fakt",
          "titulek": "Defence Readiness Omnibus: zjednodušení v přípravě",
          "text": "V červnu 2025 Komise navrhla balík Defence Readiness Omnibus: zjednodušit EDF (méně kritérií, víceleté pracovní programy), zrychlit povolování a transfery uvnitř EU a potvrdit, že obranný průmysl je slučitelný s pravidly udržitelného financování.",
          "zdroj": "Evropská komise, Defence Readiness Omnibus, 17. 6. 2025 (návrh)",
          "vysvetleni": "Jde o legislativní návrh; jeho konečná podoba a účinnost závisí na schválení Parlamentem a Radou. Pro firmu je důležitý směr: méně administrativy u EDF a jasnější postavení vůči bankám."
        },
        {
          "id": "a1",
          "typ": "anone",
          "tvrzeni": "Do projektu PESCO se startup hlásí přímo přes EU Funding & Tenders Portal.",
          "spravne": false,
          "vysvetleni": "Ne. PESCO projekty řídí státy, které si průmysl přizvou. Na F&T Portalu jsou granty Komise (EDF, EUDIS, Horizont)."
        }
      ]
    },
    {
      "id": "granty",
      "nazev": "Obranné granty EU: EDF, EUDIS, EDIP, AGILE",
      "karty": [
        {
          "id": "f1",
          "typ": "fakt",
          "titulek": "EDF – European Defence Fund",
          "text": "Hlavní grantový program EU pro obranný výzkum a vývoj: téměř 7,3 mld. € na 2021–27 (2,7 mld. výzkum, 5,3 mld. vývoj schopností; výzvy 2026 cca 1 mld. € v 10 výzvách a 31 tématech). České kontaktní místo (NCP) pro EDF je AOBP. Granty non-dilutive, u výzkumných akcí až 100 % způsobilých nákladů, bonusy pro SME, mid-caps a napojení na PESCO.",
          "vysvetleni": "Vypisuje Evropská komise (DG DEFIS) v ročních výzvách; výzkumné akce cílí na nižší TRL, vývojové na vyšší. Pro startup je EDF přímo těžko dosažitelný: vstupuje se přes konsorcium vedené integrátorem nebo výzkumnou organizací a přes EUDIS.",
          "zdroj": "defence-industry-space.ec.europa.eu (EDF, EUDIS, EDIP); eda.europa.eu (HEDI); katalog programů defencehub.gov.cz"
        },
        {
          "id": "f2",
          "typ": "fakt",
          "titulek": "EDF: kdo smí žádat",
          "text": "Konsorcia minimálně 3 nezávislých subjektů ze 3 členských států nebo zemí asociovaných k EDF; výjimka pro průlomové technologie: stačí 2 subjekty ze 2 zemí. Žadatelé musí sídlit v EU s exekutivním vedením v EU a nesmí být kontrolováni nepřidruženou třetí zemí.",
          "vysvetleni": "Čeští účastníci mohou získat národní kofinancování přes TAČR PRODEF PP1. Nevhodné, když potřebuješ peníze rychle (od výzvy k podpisu smlouvy zpravidla přes rok) nebo chceš žádat sama (pak EUDIS, EIC nebo AGILE od 2027). Co pro to umí udělat Defence Hub: matchmaking konsorcia, národní kontaktní bod (AOBP), PRODEF PP1.",
          "zdroj": "defence-industry-space.ec.europa.eu (EDF, EUDIS, EDIP); eda.europa.eu (HEDI); katalog programů defencehub.gov.cz"
        },
        {
          "id": "k1",
          "typ": "kviz",
          "otazka": "Kolik subjektů z kolika zemí potřebuje standardní konsorcium EDF?",
          "moznosti": [
            "2 subjekty ze 2 zemí",
            "3 subjekty ze 3 zemí",
            "5 subjektů z 5 zemí"
          ],
          "spravne": 1,
          "vysvetleni": "Minimálně 3 nezávislé subjekty ze 3 členských nebo asociovaných zemí. Výjimka pro průlomové technologie: 2 ze 2."
        },
        {
          "id": "a1",
          "typ": "anone",
          "tvrzeni": "Firma kontrolovaná z nepřidružené třetí země může být žadatelem v EDF, pokud má pobočku v EU.",
          "spravne": false,
          "vysvetleni": "Ne. Žadatel musí sídlit v EU s exekutivním vedením v EU a nesmí být kontrolován nepřidruženou třetí zemí."
        },
        {
          "id": "f3",
          "typ": "fakt",
          "titulek": "EUDIS – EU Defence Innovation Scheme",
          "text": "SME větev EDF (cca 120 mil. € v programu 2026) pro startupy a MSP z EU a Norska. Dvě části: EUDIS Business Accelerator, 8měsíční program s tréninkem, coachingem a matchmakingem pro jednotlivé firmy; a SME calls s granty do 6 mil. € na vývoj (konsorcium aspoň 3 firem ze 3 států) a do 5 mil. € na výzkum (konsorcium SME a výzkumných organizací, koordinátor SME).",
          "vysvetleni": "Jednodušší než plný EDF. Je to cesta k EDF: přes EUDIS získáš reference a partnery pro pozdější velká konsorcia. Nevhodné, když hledáš jednorázově velký objem financí.",
          "zdroj": "defence-industry-space.ec.europa.eu (EDF, EUDIS, EDIP); eda.europa.eu (HEDI); katalog programů defencehub.gov.cz"
        },
        {
          "id": "k2",
          "typ": "kviz",
          "otazka": "Jaký je strop grantu EUDIS SME call na vývoj?",
          "moznosti": [
            "2,5 mil. €",
            "4 mil. €",
            "6 mil. €"
          ],
          "spravne": 2,
          "vysvetleni": "Do 6 mil. € na vývoj, do 5 mil. € na výzkum. 2,5 mil. € je grantová část EIC Acceleratoru."
        },
        {
          "id": "d1",
          "typ": "doplnit",
          "text": "EUDIS Business Accelerator je program na ___ měsíců s tréninkem, coachingem a matchmakingem.",
          "odpoved": [
            "8",
            "osm"
          ],
          "vysvetleni": "8 měsíců, pro startupy a scale-upy z EU a Norska; firmy z Ukrajiny se mohou zapojit do matchmakingu. Zdroj: eudis.europa.eu, Business Accelerator (stav 11/2026)."
        },
        {
          "id": "f4",
          "typ": "fakt",
          "titulek": "EDIP – European Defence Industry Programme",
          "text": "Přemosťující nástroj EU do roku 2027 pro obranné výrobní kapacity, společné nákupy a standardizaci; od 2028 navazuje EDF. Pracovní program 1,5 mld. € (2026–27). Rozdělení: 700+ mil. € výroba klíčových komponent (counter-drony, rakety, munice), 325 mil. € projekty společného zájmu, 300 mil. € Ukraine Support Instrument (nástroj na podporu Ukrajiny), 240 mil. € společný nákup (grant až 20 mil. € na projekt), 100 mil. € FAST do Defence Equity Facility 2.0 (fond fondů EIF), z USI 35,3 mil. € na inovační akci BraveTechEU.",
          "vysvetleni": "Startup do FAST sám nežádá: 100 mil. € jde do Defence Equity Facility 2.0, o peníze žádají správci VC fondů a startup pak pitchuje těmto fondům. BraveTechEU (35,3 mil. € z nástroje pro Ukrajinu) míří na ukrajinské a evropské startupy a SME. Výrobní výzvy EDIP jsou pro firmy s hotovým produktem; ve vývojové fázi začni u EDF, EUDIS nebo DIANA.",
          "zdroj": "defence-industry-space.ec.europa.eu (EDF, EUDIS, EDIP); eda.europa.eu (HEDI); katalog programů defencehub.gov.cz"
        },
        {
          "id": "k3",
          "typ": "kviz",
          "otazka": "Jak se startup dostane k equity penězům z EDIP fondu FAST?",
          "moznosti": [
            "Pitchuje VC fondům, do kterých FAST investuje přes Defence Equity Facility 2.0",
            "Podá žádost přímo Komisi na Funding & Tenders Portal",
            "Přihlásí se do společného nákupu ministerstev"
          ],
          "spravne": 0,
          "vysvetleni": "FAST (100 mil. €) jde do Defence Equity Facility 2.0, fondu fondů, který spravuje EIF. Žádají správci fondů, startup jedná s fondy. Druhá cesta pro startupy je BraveTechEU."
        },
        {
          "id": "f5",
          "typ": "fakt",
          "titulek": "AGILE Initiative (spuštění 2027)",
          "text": "Připravovaný nástroj EU pro rychlou obrannou inovaci: rozpočet 115 mil. €, do 5 mil. € na projekt, sólo žadatel (hlavně SME a startupy), bez povinného konsorcia, cíl grant do 4 měsíců od podání. Podpora 1 až 5 mil. € na projekt formou grantu, ceny nebo zakázky.",
          "vysvetleni": "Politická dohoda Parlamentu a Rady z července 2026, schválen 12. 10. 2026; první výzva se čeká začátkem 2027. Žádá jedna firma, hlavně SME z EU, zemí EHP/ESVO a Ukrajiny. Až se rozjede, bude to nejrychlejší evropská cesta k obrannému grantu bez konsorcia. Kdo potřebuje peníze letos, má použít EUDIS, EIC nebo PRODEF.",
          "zdroj": "Nařízení o AGILE (politická dohoda 7/2026, schválení 12. 10. 2026); defence-industry-space.ec.europa.eu"
        },
        {
          "id": "a2",
          "typ": "anone",
          "tvrzeni": "AGILE vyžaduje mezinárodní konsorcium stejně jako EDF.",
          "spravne": false,
          "vysvetleni": "Ne. AGILE je pro jednotlivé firmy bez povinného konsorcia, s rychlým řízením."
        },
        {
          "id": "f6",
          "typ": "fakt",
          "titulek": "Horizont Evropa – Klastr 3 (Civilní bezpečnost)",
          "text": "Výzkum pro civilní bezpečnost: výzvy 2026 za 131 mil. € (boj proti kriminalitě a terorismu 40,7 / správa hranic 21,3 / odolná infrastruktura 22,7 / odolnost vůči katastrofám 32,5 / posílený výzkum 13,8 mil. €). Důraz na vysoké TRL (6–8) a polní demonstrace. Projekty musí být výhradně civilní.",
          "vysvetleni": "Konsorcia firem, výzkumných organizací a povinně i praktiků (bezpečnostní složky, provozovatelé kritické infrastruktury). Hodí se, když má technologie bezpečnostní (security), ne vojenské využití, nebo když chceš civilní větev dual-use financovat odděleně. Vojenský výstup patří do EDF. Národní kontaktní bod: TC Praha.",
          "zdroj": "defence-industry-space.ec.europa.eu (EDF, EUDIS, EDIP); eda.europa.eu (HEDI); katalog programů defencehub.gov.cz"
        },
        {
          "id": "f7",
          "typ": "fakt",
          "titulek": "EDF Cascade Funding",
          "text": "Malé granty do 60 000 € na firmu na projekty do 6 měsíců, které rozdělují konsorcia EDF projektů přes iniciativu EUDIS, ne přímo Komise. Pro SME a startupy z EU, přidružených zemí EDF nebo Ukrajiny.",
          "vysvetleni": "Cascade funding = FSTP (financial support to third parties): projekt EU dál rozděluje malé granty dalším firmám přes vlastní open calls (např. BattleVerse). Nejnižší vstupní práh do světa EDF.",
          "zdroj": "defence-industry-space.ec.europa.eu (EDF, EUDIS, EDIP); eda.europa.eu (HEDI); katalog programů defencehub.gov.cz"
        },
        {
          "id": "k5",
          "typ": "kviz",
          "otazka": "Kdo rozděluje peníze z EDF Cascade Funding?",
          "moznosti": [
            "Evropská komise přímo",
            "Konsorcia EDF projektů přes vlastní open calls",
            "Národní kontaktní body"
          ],
          "spravne": 1,
          "vysvetleni": "Konsorcia běžících EDF projektů, přes iniciativu EUDIS. Granty do 60 000 € na firmu, projekty do 6 měsíců."
        },
        {
          "id": "f8",
          "typ": "fakt",
          "titulek": "EDA HEDI – Hub for EU Defence Innovation",
          "text": "Evropská obranná agentura (EDA): ceny, innovation challenges, hackathony, Innovators Forge, OPEX kampaně (testování s vojáky v terénu) a Innovation Days. Pro startupy, SME i primes.",
          "vysvetleni": "OPEX = operational experimentation, zkoušení technologie s vojáky, často uvnitř cvičení. HEDI je pro firmy hlavně networkingová a matchmakingová platforma a cesta k end userovi.",
          "zdroj": "defence-industry-space.ec.europa.eu (EDF, EUDIS, EDIP); eda.europa.eu (HEDI); katalog programů defencehub.gov.cz"
        },
        {
          "id": "f9",
          "typ": "fakt",
          "titulek": "CASSINI – vesmírní podnikatelé",
          "text": "Iniciativa Evropské komise pro vesmírné podnikatele, startupy a SME (2021–2027): hackathony s mentoringem, CASSINI Challenges (ceny za řešení s daty Galileo a Copernicus), Business Accelerator, matchmaking s investory a investiční nástroj pro VC fondy.",
          "vysvetleni": "Relevantní pro dual-use firmy pracující s družicovými daty a navigací. Česká DIANA site má vesmír jako jedno ze zaměření.",
          "zdroj": "defence-industry-space.ec.europa.eu (EDF, EUDIS, EDIP); eda.europa.eu (HEDI); katalog programů defencehub.gov.cz"
        },
        {
          "id": "k6",
          "typ": "kviz",
          "otazka": "Která iniciativa EU cílí na startupy pracující s daty Galileo a Copernicus?",
          "moznosti": [
            "CASSINI",
            "EDA HEDI",
            "EDIRPA"
          ],
          "spravne": 0,
          "vysvetleni": "CASSINI: hackathony, Challenges, Business Accelerator a matchmaking pro vesmírné podnikatele."
        },
        {
          "id": "k4",
          "typ": "kviz",
          "otazka": "Co je v konsorciu pro Klastr 3 Horizontu Evropa povinné navíc oproti firmám a výzkumným organizacím?",
          "moznosti": [
            "Prime contractor",
            "Praktici – bezpečnostní složky nebo provozovatelé kritické infrastruktury",
            "Investor s pre-commitmentem"
          ],
          "spravne": 1,
          "vysvetleni": "Praktici (end useři) jsou povinnou součástí konsorcia a projekty musí být výhradně civilní."
        }
      ]
    },
    {
      "id": "eic",
      "nazev": "Nástroje EIC",
      "karty": [
        {
          "id": "f1",
          "typ": "fakt",
          "titulek": "EIC Accelerator (dual-use)",
          "text": "Vlajkový nástroj EU pro deep tech: blended finance, tedy grant do 2,5 mil. € (non-dilutive) plus equity investice do 10 mil. € přes EIC Fund. Od 17. 6. 2026 otevřen i dual-use projektům (obranné oblasti má samostatná výzva STEP Scale Up Defence). Pro jednotlivé startupy a MSP z EU s technologií TRL 6–8.",
          "vysvetleni": "Pozor na záměnu: Accelerator přijímá dual-use business cases. Výslovně obranné oblasti (protivzdušná a protiraketová obrana, drony a counter-drony) patří do EIC STEP Scale Up Defence, ne do Acceleratoru.",
          "zdroj": "eic.ec.europa.eu (Accelerator, STEP Scale Up, Pathfinder, Transition); katalog programů defencehub.gov.cz"
        },
        {
          "id": "l1",
          "typ": "lekce",
          "titulek": "EIC Accelerator ve třech krocích",
          "kroky": [
            "1. Krátká žádost (short proposal): pitch deck do 10 slidů a video. Podává se průběžně, kdykoli.",
            "2. Úplná žádost k pevné uzávěrce (cut-off).",
            "3. Pohovor před porotou. Úspěšní získají grant, investici, nebo obojí.",
            "EIC je soutěž byznys plánů, ne jen výzkumu: potřebuješ validovanou technologii (TRL 6+) a jasný komerční plán.",
            "Pozor na záměnu: equity 10–30 mil. € je samostatný nástroj EIC STEP Scale Up Defence, ne běžný Accelerator."
          ]
        },
        {
          "id": "k1",
          "typ": "kviz",
          "otazka": "Jaká je maximální grantová složka EIC Acceleratoru?",
          "moznosti": [
            "2,5 mil. €",
            "6 mil. €",
            "10 mil. €"
          ],
          "spravne": 0,
          "vysvetleni": "Grant do 2,5 mil. € + equity do 10 mil. €. (6 mil. € je EUDIS Open Call na vývoj.)"
        },
        {
          "id": "f2",
          "typ": "fakt",
          "titulek": "EIC STEP Scale Up Defence",
          "text": "Nový nástroj EIC pro velké obranné scale-upy: čistá equity 10–30 mil. €, bez grantu, rozpočet 100 mil. €. Pro scale-upy v kritických obranných technologiích z EU, zemí EHP asociovaných k Horizontu Evropa a Ukrajiny. Vyžaduje pre-commitment (předběžný závazek) jednoho investora aspoň na 20 % cílového kola.",
          "vysvetleni": "STEP = Strategic Technologies for Europe Platform. EIC investuje 10–30 mil. € jako součást většího investičního kola vedle soukromých investorů; očekává se celkové kolo min. 3–5× vyšší. Co pro to umí udělat Defence Hub: napojení na investory přes síť DH a DIANA.",
          "zdroj": "eic.ec.europa.eu (Accelerator, STEP Scale Up, Pathfinder, Transition); katalog programů defencehub.gov.cz"
        },
        {
          "id": "a1",
          "typ": "anone",
          "tvrzeni": "EIC STEP Scale Up Defence kombinuje grant a equity stejně jako EIC Accelerator.",
          "spravne": false,
          "vysvetleni": "Ne. STEP Scale Up Defence je čistá equity 10–30 mil. € bez grantové složky (dilutive). Kdo nechce ředit podíl, nemá tam co dělat."
        },
        {
          "id": "k2",
          "typ": "kviz",
          "otazka": "Co musí mít firma pro EIC STEP Scale Up Defence navíc oproti Acceleratoru?",
          "moznosti": [
            "Konsorcium ze 3 států",
            "Pre-commitment soukromého investora",
            "Národní kofinancování z PRODEF"
          ],
          "spravne": 1,
          "vysvetleni": "Předběžný závazek soukromého kapitálu (lead investor nebo pre-commitment). EIC pak vstupuje do většího kola."
        },
        {
          "id": "f3",
          "typ": "fakt",
          "titulek": "EIC Pathfinder / Transition",
          "text": "Financování raného výzkumu průlomových technologií: Pathfinder (TRL 1–4) s granty do 4 mil. € (Open i Challenges) a Transition (do cca 2,5 mil. €), který výsledky Pathfinderu nebo ERC posouvá k prototypu a prvnímu byznys plánu. Pro výzkumné týmy a spin-offy hluboko před trhem.",
          "vysvetleni": "Pathfinder Open typicky konsorcium; Challenges a Transition umožňují i jednotlivé žadatele. Firma, která projde výzkumem v Horizontu, může pokračovat do EIC Acceleratoru. Kdo už má produkt a zákazníky, patří do Acceleratoru nebo DIANA.",
          "zdroj": "eic.ec.europa.eu (Accelerator, STEP Scale Up, Pathfinder, Transition); katalog programů defencehub.gov.cz"
        },
        {
          "id": "d1",
          "typ": "doplnit",
          "text": "EIC ___ financuje vysoce rizikový raný výzkum (TRL 1–4), EIC Transition ho dotahuje k prototypu.",
          "odpoved": [
            "Pathfinder",
            "pathfinder"
          ],
          "vysvetleni": "Pathfinder = vize budoucí technologie; Transition = od výsledku k prototypu a byznys plánu; Accelerator = od validované technologie na trh."
        }
      ]
    },
    {
      "id": "cr",
      "nazev": "Česko: PRODEF a OP TAK (národní doplněk)",
      "karty": [
        {
          "id": "f1",
          "typ": "fakt",
          "titulek": "TAČR PRODEF",
          "text": "Český program aplikovaného obranného výzkumu: 6,12 mld. Kč na 2024–31, průměrná intenzita podpory 60 %. Administruje TAČR, financuje Ministerstvo obrany ČR (schváleno vládou 7. 5. 2024). Pro české firmy a výzkumné organizace, bez mezinárodního konsorcia.",
          "vysvetleni": "Dva podprogramy: PP1 kofinancuje české účastníky EDF konsorcií (národní kofinancování), PP2 financuje aplikovaný výzkum v nastupujících technologiích pro potřeby AČR: obranná elektronika, bezpilotní systémy, munice.",
          "zdroj": "tacr.cz (PRODEF); mpo.gov.cz / OP TAK (Aplikace); katalog programů defencehub.gov.cz"
        },
        {
          "id": "k1",
          "typ": "kviz",
          "otazka": "K čemu slouží PRODEF PP1?",
          "moznosti": [
            "Výzkum pro Armádu ČR",
            "Národní kofinancování českých účastníků EDF",
            "Dotace na scale-up výroby"
          ],
          "spravne": 1,
          "vysvetleni": "PP1 je nejdůležitější můstek mezi národní a evropskou úrovní: kdo jde do EDF, řeší PRODEF PP1 souběžně. PP2 je výzkum pro AČR."
        },
        {
          "id": "d1",
          "typ": "doplnit",
          "text": "PRODEF má celkový rozpočet ___ mld. Kč na roky 2024–31.",
          "odpoved": [
            "6,12",
            "6.12",
            "6,12 mld"
          ],
          "vysvetleni": "6,12 mld. Kč, průměrná intenzita podpory 60 %."
        },
        {
          "id": "a1",
          "typ": "anone",
          "tvrzeni": "PRODEF je vhodný zdroj růstového kapitálu na škálování výroby.",
          "spravne": false,
          "vysvetleni": "Národní grantová linka na scale-up chybí. Na škálování miř na EIC nebo NIF. PRODEF je výzkum (PP2) a kofinancování EDF (PP1)."
        },
        {
          "id": "f2",
          "typ": "fakt",
          "titulek": "OP TAK – Aplikace DEEP TECH",
          "text": "Dotace MPO na průmyslový výzkum a experimentální vývoj ve firmách: 2–100 mil. Kč na projekt. Operační program Technologie a aplikace pro konkurenceschopnost (2021–27), financovaný z fondů EU. Civilní program, který nově pokrývá i obranný průmysl, tedy vhodný pro dual-use vývoj v ČR.",
          "vysvetleni": "Podniky (zvýhodnění pro SME), i ve spolupráci s výzkumnými organizacemi. Čistě vojenský projekt s utajením patří do PRODEF nebo EDF. Doplňkové civilní programy TAČR: SIGMA a TREND. Konzultace dělají regionální kanceláře Agentury pro podnikání a inovace (API). Výzva DEEP TECH IV skončila 19. 2. 2026, novou API k 11/2026 nevypsala.",
          "zdroj": "tacr.cz (PRODEF); mpo.gov.cz / OP TAK (Aplikace); katalog programů defencehub.gov.cz"
        },
        {
          "id": "k2",
          "typ": "kviz",
          "otazka": "Jaké je rozpětí dotace v OP TAK Aplikace DEEP TECH?",
          "moznosti": [
            "0,5–5 mil. Kč",
            "2–100 mil. Kč",
            "100–500 mil. Kč"
          ],
          "spravne": 1,
          "vysvetleni": "2–100 mil. Kč na projekt, spravuje MPO."
        }
      ]
    },
    {
      "id": "staty",
      "nazev": "Nástroje pro státy: SAFE",
      "karty": [
        {
          "id": "f1",
          "typ": "fakt",
          "titulek": "SAFE – Security Action for Europe",
          "text": "Úvěrový nástroj EU do 150 mld. € pro pořizování vojenského materiálu, hlavně společné (dočasně i nákupy jednoho státu). Nástroj pro členské státy, ne pro firmy: firmy profitují nepřímo jako dodavatelé do zakázek financovaných ze SAFE. Max. 35 % nákladů komponent smí pocházet mimo EU/Ukrajinu/EHP.",
          "vysvetleni": "Nařízení v platnosti od 29. 5. 2025, financováno z výpůjční kapacity EU (EU-bonds). Ukrajina a země EHP/ESVO se mohou účastnit společných nákupů. Pro startup: sledovat, kam poteče poptávka států, a pozicovat se v dodavatelských řetězcích (přes primes nebo národní nákupy).",
          "zdroj": "Nařízení (EU) 2025/1106 (SAFE); defence-industry-space.ec.europa.eu"
        },
        {
          "id": "k1",
          "typ": "kviz",
          "otazka": "Kdo může ze SAFE přímo čerpat?",
          "moznosti": [
            "Startupy a SME",
            "Členské státy EU",
            "Konsorcia firem ze 3 zemí"
          ],
          "spravne": 1,
          "vysvetleni": "Přímo pouze členské státy. Firmy se účastní jako dodavatelé. Kdo hledá přímé financování vývoje, má jít na EIC, EUDIS, BraveTechEU nebo k VC fondům podpořeným z EDIP FAST."
        },
        {
          "id": "a1",
          "typ": "anone",
          "tvrzeni": "SAFE je grantový program, státy peníze nevracejí.",
          "spravne": false,
          "vysvetleni": "SAFE jsou půjčky s dlouhou splatností, ne granty."
        }
      ]
    },
    {
      "id": "vyber",
      "nazev": "Který program komu",
      "karty": [
        {
          "id": "l1",
          "typ": "lekce",
          "titulek": "Mapa programů podle fáze firmy",
          "kroky": [
            "Raný výzkum, před prototypem (TRL 1–4): EIC Pathfinder / Transition; v ČR PRODEF PP2 (výzkum pro AČR) nebo OP TAK.",
            "Prototyp, dual-use, jedna firma (TRL 4–7): NATO DIANA (grant až 400 000 €, non-dilutive), EUDIS Accelerator, od 2027 AGILE (do 5 mil. €, bez konsorcia).",
            "Menší konsorcium 3 firem ze 3 států: EUDIS SME calls (do 6 mil. € vývoj / 5 mil. € výzkum).",
            "Velký obranný R&D s partnery: EDF (konsorcium 3 subjektů ze 3 zemí) + v ČR souběžně PRODEF PP1.",
            "Validovaná technologie na trh (TRL 6–8), jedna firma: EIC Accelerator (grant do 2,5 mil. € + equity do 10 mil. €).",
            "Hotový produkt, škálování výroby (TRL 6–9): EDIP (výrobní výzvy, BraveTechEU; FAST přes VC fondy), EIC STEP Scale Up Defence (equity 10–30 mil. €).",
            "Investor místo grantu: NATO Innovation Fund (Seed až Series B, úvodní investice 3 až 15 mil. €).",
            "Civilní bezpečnost bez vojenského výstupu: Horizont Evropa Klastr 3. Dodávky do státních nákupů: SAFE nepřímo jako dodavatel."
          ]
        },
        {
          "id": "k1",
          "typ": "kviz",
          "otazka": "Startup má funkční prototyp dronového senzoru (TRL 5) s civilním i vojenským využitím, nechce odevzdat podíl a chce kontakty v NATO. Co zvolit jako první?",
          "moznosti": [
            "NATO Innovation Fund",
            "NATO DIANA",
            "EIC STEP Scale Up Defence"
          ],
          "spravne": 1,
          "vysvetleni": "DIANA: dual-use, TRL 4+, non-dilutive grant, mentoring a testovací centra. NIF bere podíl, STEP je čistá equity pro velké scale-upy."
        },
        {
          "id": "k2",
          "typ": "kviz",
          "otazka": "Česká firma vstupuje do EDF konsorcia a ptá se, jak doplnit národní kofinancování. Kam má jít?",
          "moznosti": [
            "OP TAK Aplikace",
            "TAČR PRODEF PP1",
            "EUDIS Accelerator"
          ],
          "spravne": 1,
          "vysvetleni": "PRODEF PP1 kofinancuje české účastníky EDF. Řeší se souběžně s výzvou EDF."
        },
        {
          "id": "k3",
          "typ": "kviz",
          "otazka": "Scale-up vyrábí counter-drone systém, skládá investiční kolo 60 mil. € a má lead investora. Který nástroj EIC sedí?",
          "moznosti": [
            "EIC Pathfinder",
            "EIC Accelerator",
            "EIC STEP Scale Up Defence"
          ],
          "spravne": 2,
          "vysvetleni": "STEP Scale Up Defence: čistá equity 10–30 mil. € jako součást většího kola s pre-commitmentem soukromého investora. Accelerator má equity jen do 10 mil. €."
        },
        {
          "id": "k4",
          "typ": "kviz",
          "otazka": "Univerzitní spin-off má průlomový nápad na nový materiál, zatím jen laboratorní ověření principu (TRL 2). Kam patří?",
          "moznosti": [
            "EIC Pathfinder",
            "EDIP FAST (přes VC fondy)",
            "NATO DIANA"
          ],
          "spravne": 0,
          "vysvetleni": "Pathfinder financuje raný vysoce rizikový výzkum TRL 1–4. DIANA chce prototyp (TRL 4+), FAST jde přes VC fondy do firem s produktem."
        },
        {
          "id": "k5",
          "typ": "kviz",
          "otazka": "Firma chce grant na vývoj do 6 mil. €, má dva partnery z jiných států EU a TRL 4, ale plný EDF je pro ni moc velký. Co zvolit?",
          "moznosti": [
            "EUDIS SME call",
            "SAFE",
            "Horizont Evropa Klastr 3"
          ],
          "spravne": 0,
          "vysvetleni": "EUDIS SME call na vývoj: konsorcium aspoň 3 firem ze 3 členských států, do 6 mil. €. Jednodušší než plný EDF a cesta k němu."
        },
        {
          "id": "k6",
          "typ": "kviz",
          "otazka": "Technologie detekuje výbušniny na hranicích a má zůstat čistě civilní. Který program?",
          "moznosti": [
            "EDF",
            "Horizont Evropa Klastr 3",
            "EDIP"
          ],
          "spravne": 1,
          "vysvetleni": "Klastr 3 (Civilní bezpečnost): správa hranic je jedna z destinací, projekty musí být výhradně civilní a v konsorciu musí být praktici."
        },
        {
          "id": "k7",
          "typ": "kviz",
          "otazka": "Firma má hotový produkt pro výrobu munice a potřebuje škálovat výrobní kapacitu. Kam primárně?",
          "moznosti": [
            "EDIP – výroba klíčových komponent",
            "EIC Pathfinder",
            "NATO DIANA"
          ],
          "spravne": 0,
          "vysvetleni": "EDIP má 700+ mil. € na výrobu klíčových komponent (counter-drony, rakety, munice). DIANA a Pathfinder jsou pro vývoj, ne výrobu."
        },
        {
          "id": "k8",
          "typ": "kviz",
          "otazka": "Zakladatelé hledají investora, který rozumí obrannému trhu, a nevadí jim ředění podílu. Trakci mají doloženou.",
          "moznosti": [
            "NATO Innovation Fund",
            "TAČR PRODEF",
            "EUDIS Accelerator"
          ],
          "spravne": 0,
          "vysvetleni": "NIF: equity Seed až Series B, rozumí obrannému trhu a otevírá dveře k vládním zákazníkům. Vyžaduje standardní investorské materiály (deck, data room, finance)."
        },
        {
          "id": "a1",
          "typ": "anone",
          "tvrzeni": "Pro startup, který potřebuje obranný grant bez konsorcia ještě letos, je nejlepší volbou AGILE.",
          "spravne": false,
          "vysvetleni": "AGILE se spouští až začátkem 2027. Kdo potřebuje peníze letos, má použít EUDIS, EIC nebo PRODEF."
        },
        {
          "id": "d1",
          "typ": "doplnit",
          "text": "Bez odevzdání podílu (non-dilutive) jsou DIANA, EDF, EUDIS a grantová část EIC; podíl bere NIF a EIC ___ Scale Up Defence.",
          "odpoved": [
            "STEP",
            "step"
          ],
          "vysvetleni": "Dilutive = investor dostane podíl: NIF, EIC STEP Scale Up Defence, equity část EIC Acceleratoru a VC fondy podpořené z EDIP FAST."
        }
      ]
    }
  ]
});
