# Glisk website

Promo page (`/{lang}`) and privacy policy (`/{lang}/privacy`) for the Glisk Android app.

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

- Set `contactEmail` in `src/lib/site.ts` — the address shown in the privacy policy and footer.
- The site address is detected automatically on Vercel. On other hosts set the `SITE_URL` environment variable (for example `https://glisk.app`) — sitemap, canonical links and previews use it.

Then deploy, for example to Vercel (`npx vercel`), and put the `/en/privacy` URL into Google Play Console.

## After publishing (SEO)

1. Add the site to Google Search Console, verify it with the HTML tag method and paste the code into `googleSiteVerification` in `src/lib/site.ts` (same for Yandex Webmaster → `yandexVerification`). Redeploy.
2. Submit `https://<your-domain>/sitemap.xml` in Search Console and Yandex Webmaster.
3. Check a page with https://search.google.com/test/rich-results and a link preview with https://www.opengraph.xyz.
4. Play Store links carry `utm_source=website`, `utm_medium=<button>` and `utm_campaign=site_<lang>` — installs from the site show up in Play Console → Grow users → Acquisition reports.

## Blog (Sanity)

Articles live in a Sanity project (`n5hfln30`, dataset `production`, studio in `../glisk-sanity/studio`) and are shown at `/{lang}/blog` and `/{lang}/blog/{slug}`.

- A language shows the blog (header and footer links, "From the blog" block on the home page, sitemap entries) only once it has at least one published article. The dataset must be public for the site to read it.
- Queries and caching are in `src/lib/blog.ts`; data is cached with the `posts` tag.
- To publish without redeploying, create a webhook in Sanity (manage.sanity.io → API → Webhooks): URL `https://<your-domain>/api/revalidate`, method POST, filter `_type == "post"`, trigger on create, update and delete, HTTP header `x-revalidate-secret` with the same value as the `SANITY_REVALIDATE_SECRET` environment variable (set it on the host and in `.env.local`).
- Without the webhook the site picks up changes within an hour.
