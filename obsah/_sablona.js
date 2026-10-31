// =====================================================================
// DEFLEARN HUB – ŠABLONA KURZU
// ---------------------------------------------------------------------
// Každý kurz je jeden soubor v této složce. Zkopíruj tento soubor,
// přejmenuj (např. kurz-marketing.js), vyplň a přidej <script> do
// index.html (sekce "OBSAH"). Nebo kurz vlož jako JSON přímo
// v aplikaci (Kurzy → Přidat kurz) – pak se nic kódovat nemusí.
//
// TYPY KARET (pole "typ"):
//   fakt     – informační karta (titulek + text). Srdíčko = "umím".
//   kviz     – otázka s možnostmi; "spravne" je index správné (od 0).
//   anone    – tvrzení ano/ne; "spravne": true/false.
//   doplnit  – věta s mezerou "___"; "odpoved" je správné slovo
//              (lze více variant: "odpoved": ["slovo", "jiné slovo"]).
//   lekce    – delší výklad rozdělený do kroků (klikáš "Dál").
//
// Každá karta může mít "vysvetleni" – zobrazí ježek po kliknutí na 💬
// (u kvízů se ukáže automaticky po odpovědi). Karta může mít i "zdroj".
// ID karet musí být unikátní v rámci kurzu (aplikace je prefixuje ID kurzu).
// =====================================================================
window.JEZTOK_KURZY = window.JEZTOK_KURZY || [];
window.JEZTOK_KURZY.push({
  id: "sablona",            // krátké, bez diakritiky a mezer
  nazev: "Název kurzu",
  emoji: "📚",
  barva: "#0ea5e9",         // hlavní barva karet kurzu
  popis: "Jedna věta, o čem kurz je.",
  skryty: true,             // šablona se v aplikaci nezobrazuje – u svého kurzu smaž
  temata: [
    {
      id: "tema1",
      nazev: "První téma",
      karty: [
        { id: "f1", typ: "fakt", titulek: "Krátký úderný titulek",
          text: "Dvě až tři věty. Jedna myšlenka na kartu – jako TikTok, ne jako skripta.",
          vysvetleni: "Delší vysvětlení pro ty, kdo chtějí víc. Klidně příklad ze života." },
        { id: "k1", typ: "kviz", otazka: "Otázka k předchozí kartě?",
          moznosti: ["Možnost A", "Možnost B", "Možnost C"], spravne: 1,
          vysvetleni: "Proč je správně B." },
        { id: "a1", typ: "anone", tvrzeni: "Tvrzení, které je buď pravda, nebo lež.", spravne: true,
          vysvetleni: "Proč." },
        { id: "d1", typ: "doplnit", text: "Do věty doplň ___ slovo.", odpoved: ["chybějící", "správné"],
          vysvetleni: "Proč." },
        { id: "l1", typ: "lekce", titulek: "Výklad krok za krokem",
          kroky: ["První krok výkladu.", "Druhý krok.", "Shrnutí."] }
      ]
    }
  ]
});
