# DefLearn Hub – backend

Malý Node.js server (bez frameworku) pro aplikaci DefLearn Hub:

- **Účty** – registrace a přihlášení e-mailem + heslem (hesla hashovaná scryptem, session tokeny).
- **Postup učení** – `GET/PUT /api/postup`. Server postup **slučuje** (per karta vyhrává novější
  záznam, XP a aktivita po dnech jako maximum), takže funguje víc zařízení i offline.
- **Testy** – `GET/POST /api/testy`.
- **Vlastní kurzy** – `GET/PUT /api/kurzy`, `DELETE /api/kurzy/:id`.
- **AI (volitelné)** – `POST /api/vysvetli` (ježek dovysvětlí kartu přes Claude) a
  `POST /api/generuj-kurz` (z vložených poznámek vytvoří karty, kvízy a vysvětlení).
  Zapíná se prostým nastavením `ANTHROPIC_API_KEY`; bez něj funguje všechno ostatní.
- `GET /api/health` – stav (`ai`, `db`, `mock`).

## Spuštění lokálně

```bash
cd server
npm install
npm run mock          # bez Anthropic klíče, AI endpointy vrací ukázky
```

```bash
ANTHROPIC_API_KEY=sk-ant-... node server.js
```

Test (SQLite v paměti + mock AI): `npm test`. Proti Postgresu: `DATABASE_URL=postgres://... npm test`.

Vyžaduje **Node 22.13+** (kvůli vestavěnému `node:sqlite`).

## Databáze – DŮLEŽITÉ

- Bez `DATABASE_URL` se používá **SQLite** v souboru `DB_PATH` (výchozí `./data/jeztok.sqlite`).
- **Na Render free tieru je disk efemérní** – SQLite se při každém nasazení/restartu smaže
  a s ním účty i postup. Pro ostrý provoz nastavte `DATABASE_URL` na **Postgres**:
  zdarma např. [Neon](https://neon.tech) (connection string zkopírovat do Renderu →
  Environment → `DATABASE_URL`). Tabulky si server vytvoří sám.

## Nasazení na Render.com (≈10 minut)

**Nejrychlejší cesta:** [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/nadinensmark-bot/jeztok)
– tlačítko načte `render.yaml` a založí službu `jeztok-backend`. Při zakládání Render požádá o `DATABASE_URL`
(Postgres connection string, viz níže) a volitelně `ANTHROPIC_API_KEY`.

**Postgres zdarma (Neon, 3 minuty):** neon.tech → Sign up → New project (region Frankfurt) → zkopírovat
*Connection string* (začíná `postgresql://…`) → vložit do Renderu jako `DATABASE_URL`. Neon free tier data
nemaže; Render free Postgres se po 30 dnech smaže, proto Neon.

Po nasazení pošli adresu služby (např. `https://jeztok-backend.onrender.com`) – vyplní se do `config.js`
a `programy/config.js` a přihlášení se v obou appkách objeví v záložce **Já**.

### Ručně

1. Render → **New → Blueprint** → připojit tento repozitář. Render najde `render.yaml`
   a nabídne službu `jeztok-backend` (vedle `dh-kompas-backend`).
2. Vyplnit `DATABASE_URL` (Postgres, viz výše) a volitelně `ANTHROPIC_API_KEY`.
   `SESSION_SECRET` se vygeneruje sám. `ALLOWED_ORIGIN` = adresa webu s aplikací.
3. Po nasazení zkopírovat adresu služby (např. `https://jeztok-backend.onrender.com`)
   do `config.js` → `backendUrl` a commitnout.
4. Ověření: otevřít `https://…/api/health` → `{"ok":true,"ai":…,"db":"postgres"}`.

Free tier po ~15 minutách nečinnosti usne; první požadavek pak trvá ~30 s. Aplikace to
přežije (postup je vždy i v telefonu a doplní se, až server odpoví).

## AI a náklady

- Modely: `MODEL_VYSVETLI` a `MODEL_KURZ` (výchozí `claude-opus-5-5`; levnější volba je
  např. `claude-sonnet-5-5` nebo `claude-haiku-5-5`). Dovysvětlení běží s nízkým „effort“,
  generování kurzu se středním; oba endpointy mají zapnutý server-side fallback při
  bezpečnostním odmítnutí.
- Limity: `LIMIT_VYSVETLI_DEN` (na uživatele a den, výchozí 40), `LIMIT_KURZ_DEN` (5),
  `LIMIT_AI_CELKEM_DEN` (1000). Poznámky pro kurz max. 30 000 znaků.
- Tvrdý strop: v [Anthropic Console](https://console.anthropic.com) vytvořte samostatný
  workspace „DefLearn Hub“ s měsíčním spend limitem a klíč vygenerujte v něm.
- AI endpointy vyžadují přihlášení (limity se počítají na účet).

## Konfigurace

Viz `.env.example`. Nejdůležitější: `ALLOWED_ORIGIN`, `DATABASE_URL`, `SESSION_SECRET`,
`ANTHROPIC_API_KEY`.
