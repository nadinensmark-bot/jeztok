// DEFLEARN HUB – kurz: NATO programy (verze pro firmy z databáze Defence Hubu)
// Základ převzat z interního kurzu „Programy Defence Hubu“ (téma nato; vlastní obsah DH z katalogu
// defencehub.gov.cz a onboardingu konzultanta, 10/2026), zbaven interních poznámek pro konzultanty.
// Čísla DIANA ověřena 2. 11. 2026 na diana.nato.int (accelerator-programme, 2026 cohort, výzva 2027).
// Nová témata (agentury, standardy, STO/NIAG) psána z veřejných zdrojů NATO; u karet „fakt“ je zdroj.
window.JEZTOK_KURZY = window.JEZTOK_KURZY || [];
window.JEZTOK_KURZY.push({
  id: "nato",
  nazev: "NATO programy",
  emoji: "🛡️",
  barva: "#1d4ed8",
  popis: "DIANA, NATO Innovation Fund, zakázky přes NSPA a NCIA, standardy a vědecká síť: kudy vede cesta firmy do Aliance.",
  temata: [
    // =================================================================
    {
      id: "diana",
      nazev: "NATO DIANA: akcelerátor",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Co je DIANA",
          text: "Defence Innovation Accelerator for the North Atlantic: akcelerátor NATO pro dual-use deep tech. Firma (startup nebo SME) se hlásí sama na konkrétní challenge, kterou NATO vypíše podle potřeb spojenců. Defence Hub CzechInvest je české akcelerační místo (accelerator site), tedy vstupní brána českých firem do DIANA.",
          zdroj: "diana.nato.int (About, Accelerator programme); Defence Hub CzechInvest, NATO DIANA Accelerators Prague Summit 10/2026; defencehub.gov.cz/nato-diana",
          vysvetleni: "Síť DIANA k listopadu 2026: 19 akceleračních míst (v říjnu 2026 se sešla v Praze na summitu pořádaném Defence Hubem) a víc než 200 testovacích center napříč Aliancí, přístup k ekosystémům všech 32 členských zemí. Česká site se zaměřuje na vesmír, pokročilé materiály, AI a ecotech." },
        { id: "f2", typ: "fakt", titulek: "Co vybraná firma dostane",
          text: "100 000 € jako contractual funding (smluvní financování, ne grant; vyplaceno před startem programu), šestiměsíční akcelerační program s mentory, přístup k testovacím centrům (testování, evaluace, validace, verifikace) a kontakty na end-usery, průmysl a investory. Firmy vybrané do Mission Track mohou získat až 300 000 € navíc, tedy celkem až 400 000 €.",
          zdroj: "diana.nato.int/accelerator-programme.html (stav 11/2026)",
          vysvetleni: "Non-dilutive: NATO si nebere podíl ani duševní vlastnictví. Podíl ve firmě bere až NATO Innovation Fund, což je samostatný venture fond. Mission Track je druhá fáze pro užší výběr firem z kohorty." },
        { id: "k1", typ: "kviz", otazka: "Kolik může firma v DIANA získat celkem (program + Mission Track)?",
          moznosti: ["100 000 €", "400 000 €", "15 mil. €"], spravne: 1,
          vysvetleni: "100 000 € v programu, až 300 000 € navíc v Mission Track, celkem až 400 000 €. 15 mil. € je typická úvodní investice NATO Innovation Fund." },
        { id: "k2", typ: "kviz", otazka: "Jak DIANA oficiálně označuje 100 000 € pro vybrané firmy?",
          moznosti: ["Grant", "Contractual funding", "Seed equity"], spravne: 1,
          vysvetleni: "Contractual funding, smluvní financování. Formálně to není grant, podíl ve firmě ale nebere." },
        { id: "f3", typ: "fakt", titulek: "Kohorta 2026 v číslech",
          text: "Do kohorty 2026 vybrala DIANA 150 firem (15 v každé z 10 challenge oblastí), zatím nejvíc v historii, z 24 spojeneckých zemí. Program začal v lednu 2026. Z Česka jsou v kohortě InfraHex (Operations in Extreme Environments, multispektrální maskování) a InovecTech (Data Assisted Decision Making, virtuální senzory pro surveillance).",
          zdroj: "diana.nato.int/about-diana/2026-cohort-of-companies.html; tisková zpráva NATO DIANA 10. 12. 2025",
          vysvetleni: "Oblasti 2026: Advanced Communication Technologies, Autonomy & Unmanned Systems, Contested Electromagnetic Environments, Critical Infrastructure & Logistics, Data Assisted Decision Making, Energy & Power, Human Resilience & Biotechnology, Maritime Operations, Operations in Extreme Environments, Resilient Space Operations. Dřívější české firmy v DIANA: Dronetag (2024), Atomiver (2025)." },
        { id: "f4", typ: "fakt", titulek: "Výzva 2027: šest oblastí",
          text: "Pro kohortu 2027 vypsala DIANA 1. 6. 2026 šest challenge oblastí: Human Survivability; Multidomain Autonomy of Uncrewed Systems; Multidomain Sensing and Advanced Data Processing for Intelligence and Surveillance; Operational Resilience in Contested Environments; Responsive Logistics; Scalable and Adaptable Countermeasures for Air Defence. Uzávěrka byla 3. 7. 2026, program startuje v lednu 2027.",
          zdroj: "diana.nato.int, „NATO DIANA unveils six new challenges“, 1. 6. 2026",
          vysvetleni: "Vzorec se opakuje každý rok: výzva na jaře, uzávěrka v létě, výběr na podzim, start v lednu. Kdo chce do kohorty 2028, má začít připravovat řešení a důkazy o testování teď, ne až vyjde výzva." },
        { id: "a1", typ: "anone", tvrzeni: "DIANA si za financování bere podíl ve firmě.", spravne: false,
          vysvetleni: "Ne. DIANA je non-dilutive: NATO nebere podíl ani duševní vlastnictví. Podíl bere až NATO Innovation Fund." },
        { id: "f5", typ: "fakt", titulek: "Kdy do DIANA ano a kdy ne",
          text: "Ano: funkční prototyp nebo technologie blízko nasazení (zhruba TRL 4 a výš), civilní i obranné využití, které odpovídá vypsané challenge, zájem o non-dilutive peníze, obrannou validaci a kontakty. Ne: čistě zbraňová (lethal) technologie, nebo fáze čistého výzkumu bez prototypu.",
          zdroj: "diana.nato.int/challenges.html; katalog programů defencehub.gov.cz",
          vysvetleni: "Přihláška musí odpovídat zadání konkrétní challenge, ne jen „být obranná“. Před podáním se ozvi Defence Hubu jako české accelerator site: pomůže s napasováním na challenge a s tím, co hodnotitelé čtou jako důkaz." },
        { id: "d1", typ: "doplnit", text: "Česká akcelerační site NATO DIANA je ___ Hub CzechInvest.", odpoved: ["Defence", "defence"],
          vysvetleni: "Defence Hub CzechInvest vede NATO DIANA Accelerator Czechia v Praze." }
      ]
    },
    // =================================================================
    {
      id: "nif",
      nazev: "NATO Innovation Fund",
      karty: [
        { id: "f1", typ: "fakt", titulek: "NIF: venture fond zemí NATO",
          text: "NATO Innovation Fund je venture kapitálový fond s objemem přes 1 mld. €, do kterého investuje 24 spojeneckých států včetně Česka. Investuje equity od Seed po Series B do deep tech a dual-use firem, úvodní investice 3 až 15 mil. € s rezervou na další kola. Žádné výzvy ani uzávěrky.",
          zdroj: "nif.fund/about (stav 11/2026); nif.fund (Portfolio)",
          vysvetleni: "Oblasti: energetika, materiálové vědy, AI, data a výpočty, autonomie, kvantové technologie, biotechnologie, vesmír. Fond často vede investiční kolo a sedí v boardu. S DIANA je propojený, ale absolvování DIANA investici nezaručuje." },
        { id: "k1", typ: "kviz", otazka: "Jak se žádá o investici z NATO Innovation Fund?",
          moznosti: ["Přihláškou do výzvy s pevnou uzávěrkou", "Standardním investorským procesem: pitch deck, jednání, due diligence", "Přes národní kontaktní bod EDF"], spravne: 1,
          vysvetleni: "NIF je fond, ne program s výzvami. Studený e-mail skoro nikdy nefunguje; cesta vede přes warm intro, například přes síť DIANA a Defence Hub." },
        { id: "d1", typ: "doplnit", text: "NATO Innovation Fund má ___ investorských států (Česko je jedním z nich).", odpoved: ["24", "dvacet čtyři", "dvacetčtyři"],
          vysvetleni: "24 investorských zemí, objem fondu přes 1 mld. €." },
        { id: "a1", typ: "anone", tvrzeni: "NIF je vhodný pro tým, který hledá peníze na výzkum, ale ještě nemá firmu ani produkt.", spravne: false,
          vysvetleni: "VC investuje do firem s produktem a trakcí, ne do výzkumných projektů. Kdo nechce ředit podíl zakladatelů, zůstává u grantů (DIANA, EUDIS, grantová část EIC)." }
      ]
    },
    // =================================================================
    {
      id: "zakazky",
      nazev: "Zakázky NATO: NSPA, NCIA, Front Door",
      karty: [
        { id: "f1", typ: "fakt", titulek: "NATO nenakupuje jen přes granty",
          text: "Většinu vojenského materiálu kupují národní státy, ale NATO má dvě agentury, které nakupují pro Alianci a pro členské státy: NSPA (NATO Support and Procurement Agency, Capellen, Lucembursko) pro materiál, logistiku a služby, a NCIA (NATO Communications and Information Agency) pro IT a komunikace.",
          zdroj: "nspa.nato.int; ncia.nato.int",
          vysvetleni: "Pro firmu to znamená dvě paralelní cesty: inovační programy (DIANA, NIF) a klasické zakázky (tendry agentur). Obě začínají registrací, která je zdarma." },
        { id: "f2", typ: "fakt", titulek: "NSPA: registrace dodavatele",
          text: "Do tendrů NSPA se firma dostane zápisem do databáze dodavatelů (NSPA Source File) přes portál agentury. Registrace je zdarma, firma uvede své produktové kategorie a kontakty. NSPA pak na jejich základě zve dodavatele k nabídkám; řada soutěží je přístupná jen firmám ze zemí NATO.",
          zdroj: "nspa.nato.int, Business Opportunities / Supplier registration",
          vysvetleni: "Registrace sama zakázku nepřinese. Databáze pracuje s aktivitou: odpovídat na pozvánky (i zápornou odpovědí), aktualizovat profil, hlídat zveřejněné Future Business Opportunities. NSPA pořádá i industry days pro dodavatele." },
        { id: "k1", typ: "kviz", otazka: "Co je první krok firmy, která chce dodávat přes NSPA?",
          moznosti: ["Získat bezpečnostní prověrku NATO SECRET", "Zaregistrovat se zdarma do databáze dodavatelů NSPA", "Podat přihlášku do DIANA"], spravne: 1,
          vysvetleni: "Registrace v NSPA Source File. Prověrka je potřeba jen u utajovaných zakázek a DIANA je jiná cesta (inovace, ne nákup)." },
        { id: "f3", typ: "fakt", titulek: "NCIA: BOA pro IT a komunikace",
          text: "NCIA používá Basic Ordering Agreement (BOA): rámcovou dohodu s dodavatelem, která umožňuje zrychlené objednávky komerčně dostupných (COTS) produktů a služeb. Firma se registruje v systému Neo eProcurement NCIA a žádost o BOA podává sama; národní autority jí vydávají Declaration of Eligibility (potvrzení způsobilosti). Po uzavření BOA firma dostává pozvánky do soutěží.",
          zdroj: "ncia.nato.int, Business / Basic Ordering Agreements",
          vysvetleni: "BOA je vhodná pro softwarové a IT firmy s hotovým produktem a krátkou dodací dobou. Je to cesta pro produkty, které už existují, ne na financování vývoje." },
        { id: "a1", typ: "anone", tvrzeni: "Basic Ordering Agreement s NCIA je garantovaná zakázka s pevným objemem.", spravne: false,
          vysvetleni: "Ne. BOA je rámcová dohoda, která firmě otevírá dveře k objednávkám a soutěžím. Objem záleží na tom, co NCIA skutečně poptá." },
        { id: "f4", typ: "fakt", titulek: "NATO Front Door for Industry",
          text: "Platforma, kterou NATO spustilo 7. 7. 2026 na summitu v Ankaře: jedno vstupní místo k zakázkám NATO, inovačním mechanismům (např. DIANA), akcím a dalším kanálům spolupráce. Má zveřejňovat i neutajovaný Demand Signal, přehled inovačních priorit a požadavků na schopnosti od obranných plánovačů NATO.",
          zdroj: "nato.int/en/work-with-us/business-and-project-opportunities; nato.int, zpráva 7. 7. 2026",
          vysvetleni: "Smysl pro startup: místo hádání, kam se obrátit, začít tady a nechat se nasměrovat. Demand Signal je zároveň market intelligence: sladit vývoj s tím, co NATO říká, že bude potřebovat." },
        { id: "f5", typ: "fakt", titulek: "ACT: RFI a RFP",
          text: "Allied Command Transformation (ACT, Norfolk, USA) je velitelství NATO odpovědné za transformaci a inovace. Vypisuje RFI (Request for Information, průzkum trhu) a RFP (Request for Proposal, výzvu k podání nabídky) na experimenty a pilotní projekty, například v oblasti post-kvantové kryptografie.",
          zdroj: "act.nato.int, Business opportunities",
          vysvetleni: "RFI je bez závazku a často první příležitost, jak se dostat NATO na radar: odpověď na RFI znamená, že vás znají, až přijde RFP." },
        { id: "k2", typ: "kviz", otazka: "Který dokument NATO je průzkum trhu bez závazku k nákupu?",
          moznosti: ["RFP (Request for Proposal)", "RFI (Request for Information)", "BOA (Basic Ordering Agreement)"], spravne: 1,
          vysvetleni: "RFI = průzkum trhu. RFP = výzva k podání nabídky. BOA = rámcová dohoda s NCIA." }
      ]
    },
    // =================================================================
    {
      id: "standardy",
      nazev: "Standardy, plánování, věda",
      karty: [
        { id: "f1", typ: "fakt", titulek: "STANAG: proč se ptají na interoperabilitu",
          text: "STANAG (Standardization Agreement) je dohoda členských států NATO o společném standardu: technickém (rozhraní, munice, protokoly) nebo procedurálním. Spravuje je NATO Standardization Office. Státy je zavádějí do národních předpisů a požadují je v akvizicích.",
          zdroj: "nso.nato.int (NATO Standardization Office), NATO Standardization Document Database",
          vysvetleni: "Pro dodavatele: soulad s relevantním STANAGem je často podmínka, aby produkt vůbec mohl do tendru nebo do mnohonárodní operace. Zjisti si včas, který STANAG se tvé oblasti týká (například 4586 pro řídicí systémy UAV, 4569 pro balistickou ochranu vozidel)." },
        { id: "k1", typ: "kviz", otazka: "Co znamená, když zákazník požaduje „soulad se STANAG 4586“?",
          moznosti: ["Firma musí mít certifikaci ISO 9001", "Řídicí systém dronu musí odpovídat společnému standardu NATO pro rozhraní UAV", "Firma musí být registrovaná v NSPA"], spravne: 1,
          vysvetleni: "STANAG 4586 definuje standardní rozhraní řídicího systému bezpilotních prostředků, aby spolu systémy spojenců uměly pracovat." },
        { id: "f2", typ: "fakt", titulek: "NDPP: odkud se berou potřeby",
          text: "NATO Defence Planning Process je čtyřletý cyklus, ve kterém NATO stanoví cíle schopností (capability targets) pro jednotlivé státy a sleduje jejich plnění. Z něj vyplývá, co státy budou muset pořídit, a tím i budoucí poptávka pro průmysl.",
          zdroj: "nato.int, topic „NATO Defence Planning Process“",
          vysvetleni: "Veřejně jsou dostupné jen obecné priority (například protivzdušná obrana, munice, vojenská mobilita); konkrétní cíle jsou utajené. Pro startup je NDPP důvod, proč se vyplatí sledovat Demand Signal a národní plány (v ČR Koncepci výstavby AČR)." },
        { id: "f3", typ: "fakt", titulek: "STO: vědecká síť NATO",
          text: "NATO Science and Technology Organization je největší obranná výzkumná síť na světě: tisíce vědců ze členských i partnerských zemí v panelech (např. systémy, senzory, lidský faktor, modelování a simulace). Firmy a výzkumníci se zapojují přes národního koordinátora NATO STO; kontakt na něj zveřejňuje AOBP.",
          zdroj: "sto.nato.int (About STO, Panels and Groups)",
          vysvetleni: "Práce v STO panelech není placená z NATO, přínos je jinde: kontakty, znalost trendů a budoucích požadavků, partneři pro EDF a jiné projekty. Část aktivit probíhá na utajované úrovni, pak je nutná prověrka." },
        { id: "f4", typ: "fakt", titulek: "NIAG: hlas průmyslu v NATO",
          text: "NATO Industrial Advisory Group je poradní orgán průmyslu při Konferenci národních ředitelů pro vyzbrojování (CNAD). Zpracovává studie (NIAG studies) zadané orgány NATO; postup pro firmy oficiální stránka NIAG nepopisuje, v ČR se ptej Asociace obranného a bezpečnostního průmyslu (AOBP).",
          zdroj: "nato.int, topic „NATO Industrial Advisory Group“; aobp.cz",
          vysvetleni: "Pro malou firmu je NIAG cesta, jak se dostat ke konkrétnímu problému NATO dřív, než se z něj stane tendr, a jak se potkat s primy, kteří na studii pracují." },
        { id: "a1", typ: "anone", tvrzeni: "Do panelů NATO STO se firma hlásí přímo na webu STO bez účasti svého státu.", spravne: false,
          vysvetleni: "Ne. Zapojení jde přes národního koordinátora NATO STO (kontakt zveřejňuje AOBP), státy do aktivit vysílají vlastní experty." },
        { id: "l1", typ: "lekce", titulek: "Cesty do NATO podle toho, co firma má",
          kroky: [
            "Mám prototyp dual-use technologie (TRL 4+) a chci peníze, testování a kontakty bez odevzdání podílu: NATO DIANA, přihláška na konkrétní challenge přes českou site (Defence Hub).",
            "Mám firmu s produktem a trakcí a investor mi nevadí: NATO Innovation Fund, standardní VC proces, ideálně přes warm intro.",
            "Mám hotový produkt nebo službu a chci dodávat: registrace dodavatele u NSPA (materiál, logistika, služby) nebo BOA u NCIA (IT, komunikace, COTS). Sledovat RFI/RFP agentur a ACT.",
            "Chci rozumět tomu, co NATO bude potřebovat: Demand Signal, Front Door for Industry, veřejné priority NDPP; odborně pak STO panely (přes národního koordinátora) a NIAG studie (zeptat se AOBP).",
            "Všude platí: soulad s relevantními STANAGy, připravenost na prověrku u utajovaných zakázek, a trpělivost. NATO cykly se měří na roky."
          ] }
      ]
    }
  ]
});
