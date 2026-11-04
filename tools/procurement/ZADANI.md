# Zadání: profily obranného procurementu po zemích (Defence Hub CzechInvest)

Cíl: pro české obranné a dual-use startupy a malé firmy popsat, jak se v dané zemi dostat k obranné zakázce. Z profilů vznikne kurz v appce DefLearn Hub, one-pager PDF za každou zemi, e-book a checklisty. Vydává Defence Hub CzechInvest, autorka Naďa Sokolová.

## Tvrdá pravidla (nejdůležitější)
1. **Nic si nevymýšlet.** Každý údaj musí stát na zdroji, který jsi v této práci skutečně otevřel/a (WebFetch nebo WebSearch s jasným výsledkem). Když údaj nejde ověřit, NEPIŠ ho a dej ho do `nejiste`.
2. **Jen primární a oficiální zdroje**: weby ministerstev obrany a jejich akvizičních agentur, národní portály veřejných zakázek, sbírky zákonů, EUR-Lex, weby NATO/EDA/Komise, vládní příručky pro dodavatele. Sekundární zdroje (advokátní kanceláře, konzultanti, média) jen pro nalezení primárního zdroje, ne jako zdroj tvrzení. Nikdy ne kurzy, e-learningy ani placené materiály třetích stran (např. Helm, Understanding Defence).
3. **Vlastní formulace.** Fakta parafrázuj česky vlastními slovy, žádné kopírování vět ze zdrojů (max. oficiální názvy institucí, zákonů a portálů v originále).
4. Stav ke dni 4. 11. 2026. Když se něco mění (reforma agentury, nový zákon, nový portál), uveď aktuální stav a datum.
5. Česky, věcně, krátce. Žádné dlouhé pomlčky (— ani –), místo nich čárka, dvojtečka nebo závorka. Odborné termíny NATO/EU nech anglicky s krátkým českým vysvětlením v závorce.

## Výstup
Za každou zemi jeden soubor `/tmp/claude-0/-home-claude/855939f8-aecf-58d9-ab74-7e92bd7e90e9/scratchpad/procurement/<kód>.json` (kód ISO 3166-1 alpha-2 malými písmeny, např. `de.json`; EU úroveň `eu.json`). Struktura (rámec „DH 7 otázek pro vstup na trh“):

```json
{
  "kod": "de",
  "zeme": "Německo",
  "stav": "2026-11-04",
  "clenstvi": "EU, NATO",
  "kdo_nakupuje": { "text": "1 až 3 věty: kdo nakupuje vojenský materiál a služby (agentura, pod jakým ministerstvem, co spadá jinam)", "instituce": [{"nazev": "originální název", "zkratka": "", "url": "https://..."}] },
  "pravni_ramec": { "text": "zákon/předpis pro obranné zakázky, u EU zemí transpozice směrnice 2009/81/ES, limity (prahy) jen pokud ověřeny", "predpisy": [{"nazev": "", "url": ""}] },
  "kde_tendry": { "text": "kde se zveřejňují obranné zakázky (národní portál, TED, profil agentury), jestli je potřeba registrace", "portaly": [{"nazev": "", "url": ""}] },
  "registrace": { "text": "jak se firma registruje jako dodavatel (registr dodavatelů, NCAGE kód, kvalifikace, místní zastoupení, jazyk nabídek)", "kroky": ["krok 1", "krok 2"] },
  "prumyslova_spoluprace": { "text": "offsety / industrial participation / priorita domácího průmyslu, oficiální politika a kdo ji spravuje; pokud země offsety nevyžaduje, napiš to se zdrojem" },
  "bezpecnost": { "text": "národní bezpečnostní úřad (NSA/DSA), Facility Security Clearance pro zahraniční firmy; bilaterální dohoda o ochraně utajovaných informací s ČR jen pokud ověřena (uveď zdroj)" },
  "inovace": { "text": "vstupní body pro inovativní firmy a startupy (inovační agentury, challenge programy, akcelerátory ministerstva, DIANA test centra/akcelerátory v zemi), podmínky pro zahraniční firmy", "programy": [{"nazev": "", "url": "", "pro_zahranicni": "ano/ne/nejasné + zdroj"}] },
  "tipy_pro_cz_firmy": ["2 až 4 praktické body vyplývající z ověřených faktů (např. jazyk nabídek, nutnost místního partnera), žádné obecné rady bez opory"],
  "prirucky": [{"nazev": "oficiální příručka/průvodce pro dodavatele ke stažení nebo online", "vydavatel": "", "url": "", "jazyk": "en/de/…", "typ": "pdf/web"}],
  "zdroje": [{"nazev": "", "url": "", "otevreno": "2026-11-04"}],
  "nejiste": ["co se nepodařilo ověřit nebo je rozporné, s odkazem"]
}
```

Prázdné pole nech prázdné (`""` / `[]`), nevyplňuj odhadem. URL v `url` polích musí být ty, které jsi otevřel/a a odpovídají obsahu.

Po dokončení odpověz krátce: které země jsou hotové, kde jsou velké mezery, a cokoli překvapivého (např. agentura právě reformovaná).
