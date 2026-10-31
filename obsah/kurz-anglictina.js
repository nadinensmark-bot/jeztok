// DEFLEARN HUB – ukázkový kurz: Angličtina – falešní přátelé (pro Čechy)
window.JEZTOK_KURZY = window.JEZTOK_KURZY || [];
window.JEZTOK_KURZY.push({
  id: "anglictina",
  nazev: "Angličtina: slova, která tě nachytají",
  emoji: "🇬🇧",
  barva: "#db2777",
  popis: "False friends – slova, co vypadají česky, ale znamenají něco jiného.",
  temata: [
    {
      id: "falesni",
      nazev: "Falešní přátelé",
      karty: [
        { id: "f1", typ: "fakt", titulek: "actual ≠ aktuální",
          text: "„Actual“ znamená skutečný. „Aktuální“ je current. Věta „the actual price“ je skutečná cena, ne cena dnes.",
          vysvetleni: "Podobně „actually“ = vlastně / ve skutečnosti, ne „aktuálně“. „Aktuálně“ = currently, at the moment." },
        { id: "k1", typ: "kviz", otazka: "Jak řekneš anglicky „aktuální stav“?",
          moznosti: ["actual state", "current state", "topical state"], spravne: 1,
          vysvetleni: "Current = aktuální, nynější. Actual = skutečný. Topical se používá pro aktuální téma (v médiích), ne pro stav." },
        { id: "f2", typ: "fakt", titulek: "eventually ≠ eventuálně",
          text: "„Eventually“ znamená nakonec, časem. Ne „možná, případně“. „He eventually agreed“ = nakonec souhlasil.",
          vysvetleni: "České „eventuálně“ (případně) je anglicky possibly, alternatively nebo if need be." },
        { id: "a1", typ: "anone", tvrzeni: "„Sympathetic“ znamená sympatický.", spravne: false,
          vysvetleni: "Sympathetic = soucitný, chápavý. Sympatický = likeable, nice. „She was very sympathetic“ znamená, že projevila účast, ne že byla sympaťačka." },
        { id: "f3", typ: "fakt", titulek: "gymnasium ≠ gymnázium",
          text: "„Gymnasium“ (zkráceně gym) je tělocvična nebo posilovna. Gymnázium je grammar school (UK) nebo obecně secondary school.",
          vysvetleni: "Napsat do životopisu „I studied at a gymnasium“ znamená pro rodilého mluvčího, že ses učil/a v posilovně." },
        { id: "d1", typ: "doplnit", text: "„Chef“ není šéf, ale ___ (povolání v kuchyni).", odpoved: ["kuchař", "šéfkuchař", "kuchar", "sefkuchar"],
          vysvetleni: "Chef = (šéf)kuchař. Šéf = boss, manager. „My chef“ = můj kuchař." },
        { id: "k2", typ: "kviz", otazka: "Co znamená „preservative“?",
          moznosti: ["Prezervativ", "Konzervant", "Ochranka"], spravne: 1,
          vysvetleni: "Preservative = konzervační látka (v potravinách). Prezervativ = condom. Klasická past v restauraci i v drogerii." },
        { id: "f4", typ: "fakt", titulek: "pasta ≠ pasta",
          text: "„Pasta“ jsou těstoviny. Zubní pasta je toothpaste, pasta na mazání (pomazánka) je spread nebo paste.",
          vysvetleni: "Paste (bez „a“ na konci) je hmota, kaše, lepidlo; pasta (s „a“) jsou vždycky těstoviny." },
        { id: "a2", typ: "anone", tvrzeni: "„Fabric“ znamená fabrika (továrna).", spravne: false,
          vysvetleni: "Fabric = látka, tkanina. Továrna = factory." },
        { id: "k3", typ: "kviz", otazka: "„I'll eventually finish it.“ Co tím mluvčí říká?",
          moznosti: ["Případně to dodělám", "Nakonec to dodělám", "Možná to dodělám"], spravne: 1,
          vysvetleni: "Eventually = nakonec, časem – ale určitě. Není v tom žádné „možná“." },
        { id: "l1", typ: "lekce", titulek: "Jak falešné přátele porazit",
          kroky: [
            "Nepřekládej podle vzhledu slova. Když anglické slovo vypadá česky, zpozorni – je to podezřelé.",
            "Uč se slova ve větě, ne samostatně. „She was sympathetic to my problem“ si zapamatuješ i s významem.",
            "Udělej si vlastní seznam pastí, na které jsi naletěl/a. Vlastní chyby se pamatují nejlíp.",
            "Při čtení si pasti všímej aktivně: pokaždé, když potkáš actual, eventually nebo sympathetic, přelož si je nahlas správně."
          ] }
      ]
    }
  ]
});
