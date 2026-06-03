# WK 2026 Pronostieken — Deploy gids

## Structuur

```
wk2026/
├── public/           → Cloudflare Pages (front-end)
│   ├── index.html
│   ├── manifest.json
│   ├── sw.js
│   └── _redirects
├── src/
│   └── worker.js     → Cloudflare Worker (API)
├── schema.sql        → D1 database schema
└── wrangler.toml
```

---

## Stap 1 — Zet de repo op GitHub

```bash
git init
git add .
git commit -m "WK 2026 pronostieken"
git remote add origin https://github.com/JOUW_NAAM/wk2026.git
git push -u origin main
```

---

## Stap 2 — Maak een D1 database aan

```bash
npm install -g wrangler
wrangler login

# Database aanmaken
wrangler d1 create wk2026
# → Kopieer de database_id die je krijgt!
```

Pas `wrangler.toml` aan:
```toml
database_id = "PLAK_HIER_JE_DATABASE_ID"
```

Schema uitvoeren:
```bash
# Lokaal testen
wrangler d1 execute wk2026 --local --file=schema.sql

# Op productie
wrangler d1 execute wk2026 --remote --file=schema.sql
```

---

## Stap 3 — Deploy de Worker

```bash
wrangler deploy
```

Je krijgt een URL zoals: `https://wk2026-api.JOUW_NAAM.workers.dev`

---

## Stap 4 — Pas `_redirects` aan

Open `public/_redirects` en vervang de placeholder:
```
/api/*  https://wk2026-api.JOUW_NAAM.workers.dev/api/:splat  200
```

Commit en push:
```bash
git add public/_redirects
git commit -m "fix api redirect"
git push
```

---

## Stap 5 — Cloudflare Pages

1. Ga naar **Cloudflare Dashboard → Pages → Create a project**
2. Koppel je GitHub repo
3. Instellingen:
   - **Build command:** *(leeg laten)*
   - **Build output directory:** `public`
4. Klik **Save and Deploy**

Je krijgt een URL zoals `https://wk2026.pages.dev` — deel die met je vrienden!

---

## Optioneel: eigen domeinnaam

In Cloudflare Pages → Custom domains → voeg je domein toe.

---

## PWA installeren op telefoon

- **Android:** Chrome → menu → "Toevoegen aan startscherm"
- **iPhone:** Safari → Delen → "Zet op beginscherm"

---

## Tips

- De **Scores** tab is voor de admin (jij) — vul daar officiële uitslagen in
- Punten worden live herberekend zodra je een uitslag invult
- De ↻ knop rechtsboven herlaadt alle data
