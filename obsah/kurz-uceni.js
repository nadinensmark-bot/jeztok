// DEFLEARN HUB – ukázkový kurz: Jak se učit, aby to v hlavě drželo
// (učební věda – zároveň vysvětluje, proč DefLearn Hub funguje tak, jak funguje)
window.JEZTOK_KURZY = window.JEZTOK_KURZY || [];
window.JEZTOK_KURZY.push({
  id: "uceni",
  nazev: "Jak se učit, aby to drželo",
  emoji: "🧠",
  barva: "#7c3aed",
  popis: "Co říká věda o paměti – a proč biflování nefunguje.",
  temata: [
    {
      id: "pamet",
      nazev: "Jak funguje zapomínání",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Zapomínáš rychleji, než myslíš",
          text: "Bez opakování ti během jednoho až dvou dnů vypadne většina nové látky. Tomu se říká křivka zapomínání – popsal ji Hermann Ebbinghaus už v roce 1885.",
          vysvetleni: "Ebbinghaus se učil nesmyslné slabiky a měřil, kolik si pamatuje po hodinách a dnech. Zjistil, že úbytek je nejprudší hned na začátku a pak se zpomaluje. Každé opakování křivku „zploští“ – zapomínáš pomaleji. Proto DefLearn Hub vrací karty v rostoucích rozestupech." },
        { id: "k1", typ: "kviz", otazka: "Kdy zapomínáš nejrychleji?",
          moznosti: ["Hned po naučení", "Po týdnu", "Zapomínání je rovnoměrné"], spravne: 0,
          vysvetleni: "Křivka zapomínání padá nejstrměji během prvních hodin a dnů. Pak se zplošťuje – co přežije první dny, drží déle." },
        { id: "f2", typ: "fakt", titulek: "Rozložené opakování (spacing)",
          text: "Stejný čas učení rozdělený do několika kratších bloků s přestávkami funguje výrazně líp než jeden dlouhý blok. Tomu se říká spacing effect.",
          vysvetleni: "Když se k látce vrátíš až ve chvíli, kdy ji skoro zapomínáš, mozek si ji musí znovu „vylovit“ – a právě tahle námaha paměť posiluje. Jedno dlouhé biflování těsně před testem vypadá efektivně, ale za týden je pryč." },
        { id: "a1", typ: "anone", tvrzeni: "Tři hodiny učení v kuse jsou účinnější než tři hodiny rozložené do tří dnů.", spravne: false,
          vysvetleni: "Opak je pravdou. Rozložení do více dnů vede k výrazně lepšímu dlouhodobému zapamatování – i když to během učení působí „těžší“." },
        { id: "d1", typ: "doplnit", text: "Učení rozložené do více kratších bloků s přestávkami se nazývá ___ effect.", odpoved: ["spacing", "spacing effect"],
          vysvetleni: "Spacing effect = efekt rozloženého opakování. Jeden z nejlépe doložených jevů v psychologii učení." }
      ]
    },
    {
      id: "vybaveni",
      nazev: "Vybavování místo čtení",
      karty: [
        { id: "f3", typ: "fakt", titulek: "Čtení pořád dokola je past",
          text: "Opakované čtení a zvýrazňování působí, že látku „znáš“, protože ti připadá povědomá. Ale povědomost není znalost. Při testu to pozná každý.",
          vysvetleni: "Přehled Dunloskyho a kol. (2013) zařadil podtrhávání a opakované čtení mezi techniky s nízkou užitečností. Problém je iluze znalosti: text poznáš, ale neumíš ho reprodukovat bez nápovědy." },
        { id: "f4", typ: "fakt", titulek: "Testování = učení",
          text: "Když si látku zkoušíš vybavit z hlavy (bez koukání), pamatuješ si ji potom lépe, než když ji znovu čteš. Říká se tomu testing effect neboli retrieval practice.",
          vysvetleni: "Roediger a Karpicke (2006): studenti, kteří si text jednou přečetli a pak se z něj zkoušeli, si po týdnu pamatovali výrazně víc než ti, kdo ho četli opakovaně. Každý kvíz v DefLearn Hubu je proto učení, ne jen kontrola." },
        { id: "k2", typ: "kviz", otazka: "Co po přečtení kapitoly nejvíc pomůže, aby sis ji pamatoval/a za týden?",
          moznosti: ["Přečíst ji ještě dvakrát", "Zvýraznit klíčové věty", "Zavřít knihu a zkusit ji převyprávět z hlavy"], spravne: 2,
          vysvetleni: "Vybavování z paměti (retrieval practice) je nejsilnější z nabízených možností. Opakované čtení a zvýrazňování vytváří hlavně pocit, že to umíš." },
        { id: "a2", typ: "anone", tvrzeni: "Když si při kvízu odpovíš špatně a hned se dozvíš správnou odpověď, pamatuješ si ji pak lépe, než kdybys otázku vůbec nedostal/a.", spravne: true,
          vysvetleni: "Ano – i neúspěšný pokus o vybavení s následnou zpětnou vazbou zlepšuje zapamatování. Chyba při kvízu není selhání, je to součást učení." },
        { id: "l1", typ: "lekce", titulek: "Feynmanova technika ve 4 krocích",
          kroky: [
            "1. Vyber si pojem, který se chceš naučit, a napiš ho nahoru na papír.",
            "2. Vysvětli ho vlastními slovy tak, jako bys ho vysvětloval/a dvanáctiletému dítěti. Bez odborných výrazů.",
            "3. Kde se zasekneš nebo začneš mlžit, tam je díra ve znalosti. Vrať se ke zdroji jen pro tu díru.",
            "4. Zjednoduš a najdi přirovnání. Když to umíš vysvětlit jednoduše, umíš to doopravdy."
          ] }
      ]
    },
    {
      id: "triky",
      nazev: "Triky, které fungují",
      karty: [
        { id: "f5", typ: "fakt", titulek: "Míchej témata (interleaving)",
          text: "Místo „hodina jen zlomky, hodina jen procenta“ je lepší je prostřídat. Mozek se učí rozpoznat, jaký typ problému má před sebou – přesně to potřebuješ u testu.",
          vysvetleni: "Blokové procvičování (vše stejné za sebou) jde rychleji a cítíš se jistě, ale při míchání se naučíš vybrat správný postup. Proto DefLearn Hub v jednom feedu střídá kurzy i typy karet." },
        { id: "f6", typ: "fakt", titulek: "Spánek je součást učení",
          text: "Během spánku se mozek vrací k tomu, co ses přes den učil/a, a ukládá to do dlouhodobé paměti. Noc bez spánku před zkouškou ti část naučeného zahodí.",
          vysvetleni: "Konsolidace paměti probíhá hlavně v hlubokém spánku a REM fázi. Učit se do 3 ráno a jít na test v 8 je proto dvojnásob špatný nápad: méně spánku a méně uložené látky." },
        { id: "k3", typ: "kviz", otazka: "Co je interleaving?",
          moznosti: ["Učení s hudbou v pozadí", "Střídání různých typů úloh v jednom bloku", "Učení ve dvojici"], spravne: 1,
          vysvetleni: "Interleaving = prokládání. Střídáš témata nebo typy úloh, místo abys dělal/a dlouhé bloky stejného." },
        { id: "f7", typ: "fakt", titulek: "Obraz + slovo = dvojí kódování",
          text: "Když si k pojmu přidáš obrázek, schéma nebo i hloupý vtípek, uloží se dvěma cestami. Čím absurdnější představa, tím líp se vybaví.",
          vysvetleni: "Teorie dvojího kódování (Allan Paivio): verbální a obrazová informace se ukládají zvlášť a navzájem si pomáhají při vybavování. Proto má každý kurz v DefLearn Hubu barvu a emoji – a proto tu je ježek." },
        { id: "d2", typ: "doplnit", text: "Techniku, při které si pojem vysvětluješ jako dítěti a hledáš díry ve znalosti, pojmenovali po fyzikovi Richardu ___.", odpoved: ["Feynmanovi", "Feynman", "Feynmanovi."],
          vysvetleni: "Richard Feynman, nositel Nobelovy ceny za fyziku, byl známý tím, že uměl složité věci vysvětlit jednoduše. Technika nese jeho jméno." },
        { id: "a3", typ: "anone", tvrzeni: "Když se učení zdá snadné a plynulé, znamená to, že si látku dobře zapamatuješ.", spravne: false,
          vysvetleni: "Pocit plynulosti klame. Robert Bjork mluví o „žádoucích obtížích“: učení, které tě trochu nutí přemýšlet a vybavovat, drží déle než to, co šlo hladce." },
        { id: "f8", typ: "fakt", titulek: "Malé porce, každý den",
          text: "Deset minut denně po dobu dvou týdnů porazí dvě hodiny jednou za čtrnáct dní. Ne proto, že je to víc času – je to stejný čas. Ale je rozložený.",
          vysvetleni: "Spojuje se tu spacing, spánek mezi bloky a pravidelné vybavování. Přesně na to je stavěný denní streak v DefLearn Hubu: nejde o disciplínu, jde o to dát paměti víc nocí." }
      ]
    }
  ]
});
