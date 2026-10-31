# DefLearn Hub 🦔 – učení, co se scrolluje

Feed jako TikTok, ale místo kravin **učivo z kurzů a do školy**. Hraje k tomu hudba,
komentuje to ježek Hubík, a každá karta se vrací ve chvíli, kdy ji skoro zapomínáš.
Optimalizováno čistě pro telefon (na počítači běží v „rámečku telefonu“).

Běží na **https://nadinensmark-bot.github.io/jeztok/** (GitHub Pages z větve `main`). Na telefonu: **Sdílet → Přidat na plochu**
(iPhone) nebo **⋮ → Přidat na plochu** (Android) – pak funguje jako appka, i offline.

## Co umí

| Věc | Jak |
|---|---|
| **Feed** | Svislé scrollování kartu po kartě. Typy karet: fakt, kvíz, pravda/lež, doplň slovo, lekce krok za krokem. Dvojklik = ❤️ „umím“. |
| **Opakování v rozestupech** | Každá karta má „sílu“ 0–6. Správná odpověď ji zvedne a karta se vrátí za 10 min → 1 h → 1 den → 3 → 7 → 14 → 30 dní. Chyba ji sníží a vrátí za 5 minut. Kurzy se ve feedu míchají (interleaving) – záměr, ne chyba. |
| **Hudba** | Lo-fi generovaná živě ve Web Audio (žádné soubory, žádná autorská práva, hraje offline). Tři vibes: Lo-fi klid, Soustředění, Nakopnout. Spustí se prvním ťuknutím; vypíná se tlačítkem v liště. |
| **Hubík** | Ježek z videa (`img/hubik-*`), komentuje odpovědi, slaví streak, vysvětluje. Roste s XP: Ježčí mimino → Bodlinka → Ježek v tenisce → Punk ježek → Profesor Ježek (odznak u obrázku). V záložce **Já** se dá přejmenovat. |
| **Vysvětli 💬** | U každé karty: delší vysvětlení od autora + správná odpověď + odkaz na lekci tématu. S backendem a AI klíčem navíc „Vysvětli jinak ✨“ – ježek odpoví přes Claude na tvůj dotaz. |
| **Testy** | 10 náhodných otázek z kurzu (nebo mix ze všech). Výsledek, chyby s vysvětlením, historie. Špatně zodpovězené karty se vrátí do feedu. |
| **Kurzy** | Zapínání kurzů do feedu, postup po kurzech, **přidání vlastního kurzu** jako JSON (soubor nebo vložený text), a s AI **„Vytvořit kurz z poznámek“** – vložíš skripta, dostaneš karty + kvízy + vysvětlení. |
| **Já** | XP, úroveň, streak (🔥 dny v kuse), kalendář aktivity, postup po kurzech, hudba, export postupu, přihlášení. |
| **Účty a postup** | Bez backendu se vše ukládá do telefonu. S backendem (`server/`) je přihlášení e-mailem a postup se slučuje napříč zařízeními. |

## Jak přidat vlastní obsah (bez kódování)

1. Otevři v aplikaci **Kurzy → Přidat kurz**.
2. Vlož JSON ve formátu níže (nebo nahraj soubor). Kurz se hned zamíchá do feedu.
3. Když je nasazený backend s AI: **Vytvořit kurz z poznámek ✨** – vlož text (do ~30 000 znaků)
   a ježek z něj udělá karty. Výsledek si před uložením zkontroluj – AI může něco zjednodušit.

Formát (celý popis s komentáři je v [`obsah/_sablona.js`](obsah/_sablona.js)):

```json
{ "id": "muj-kurz", "nazev": "Můj kurz", "emoji": "📚", "barva": "#0ea5e9", "popis": "O čem to je",
  "temata": [ { "id": "t1", "nazev": "Téma", "karty": [
    { "id": "f1", "typ": "fakt", "titulek": "Úderný titulek", "text": "Jedna myšlenka.", "vysvetleni": "Delší vysvětlení." },
    { "id": "k1", "typ": "kviz", "otazka": "Otázka?", "moznosti": ["A", "B", "C"], "spravne": 1, "vysvetleni": "Proč B." },
    { "id": "a1", "typ": "anone", "tvrzeni": "Tvrzení.", "spravne": true, "vysvetleni": "Proč." },
    { "id": "d1", "typ": "doplnit", "text": "Doplň ___ slovo.", "odpoved": ["chybějící"], "vysvetleni": "Proč." },
    { "id": "l1", "typ": "lekce", "titulek": "Výklad", "kroky": ["Krok 1", "Krok 2", "Shrnutí"] }
  ] } ] }
```

**Kurz jako součást aplikace (pro všechny uživatele):** zkopíruj `obsah/_sablona.js`, vyplň,
smaž `skryty: true`, přidej `<script src="obsah/kurz-xxx.js">` do `index.html` a do seznamu
v `sw.js` (aby fungoval offline).

Kurzy v `obsah/`:

- **`kurz-defence.js` – Understanding Defence: a Business Perspective (VŠE, 2DEBU)** – učivo
  z videí 1–4 (bez organizačních informací o kurzu, termínů a přehledu veletrhů). Texty jsou vlastní
  české parafráze pro osobní studium; materiály kurzu jsou © Dr. Kristýna Helm – pokud je repozitář
  veřejný, zvaž, zda soubor nechat v repu.
- `kurz-anglictina.js` – Angličtina: falešní přátelé (krátký doplňkový kurz).
- Další kurzy (politologie apod.) se přidávají stejně: jeden soubor v `obsah/`, `<script>` v `index.html`
  a řádek v `sw.js`.

## Rady, jak psát karty, aby to drželo

- Jedna myšlenka na kartu. Dvě až tři věty. Jako TikTok, ne jako skripta.
- Za každou jednu až dvě „fakt“ karty dej kvíz nebo pravda/lež na tutéž myšlenku –
  vybavování je učení (testing effect), čtení ne.
- `vysvetleni` piš s příkladem nebo přirovnáním. To je to, co čteš po chybě.
- Lekce (4–6 kroků) na konec tématu jako shrnutí.

## Soubory

```
  index.html            aplikace (seznam kurzů je v sekci OBSAH)
  config.js             JEDINÉ, co se po nasazení upravuje: adresa backendu
  css/style.css
  js/app.js             feed, karty, opakování, testy, kurzy, profil, synchronizace
  js/jezek.js           Hubík (obrázky + hlášky + úrovně)
  js/hudba.js           lo-fi generátor (Web Audio)
  js/api.js             klient backendu + localStorage
  js/slouceni.js        slučování postupu (sdílené s backendem)
  obsah/                kurzy (každý = jeden soubor) + _sablona.js
  img/                  ikony a Hubík (snímky z videa, animace salut.webp)
  manifest.webmanifest, sw.js   PWA (ikona na ploše, offline)
  server/               backend – viz server/README.md
```

## Nasazení

1. **Frontend:** nic – GitHub Pages ho nasadí po každém pushi na `main`
   (`.github/workflows/pages.yml`). Adresa: `https://nadinensmark-bot.github.io/jeztok/`.
2. **Backend (volitelný, pro účty a AI):** návod v [`server/README.md`](server/README.md).
   Po nasazení vyplň jeho adresu do `config.js`:
   ```js
   window.JEZTOK_CONFIG = { backendUrl: "https://jeztok-backend.onrender.com" };
   ```
