# Blinkin website

Promo page (`/{lang}`) and privacy policy (`/{lang}/privacy`) for the Blinkin Android app.

## Languages

The site uses the same 15 languages as the app: en, ru, uk, pl, de, fr, es, pt, it, tr, hi, id, zh, ja, ko.

- Texts live in `src/i18n/dictionaries/<lang>.ts`; the shape is defined in `src/i18n/types.ts`.
- `/` and `/privacy` redirect to the visitor's browser language (English if it isn't supported) — see `src/proxy.ts`.
- When the privacy policy changes, update every dictionary and `privacyUpdatedAt` in `src/lib/site.ts`.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before publishing

Fill in `src/lib/site.ts`:

- `url` — the final site address (used for link previews)
- `contactEmail` — the address shown in the privacy policy and footer

Then deploy, for example to Vercel (`npx vercel`), and put the `/en/privacy` URL into Google Play Console.
