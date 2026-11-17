import { cacheLife, cacheTag } from "next/cache";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { sanityClient } from "@/lib/sanity";

export const SETTINGS_TAG = "settings";

const INDEXED_LANGUAGES_QUERY = `*[_id == "siteSettings"][0].indexedLanguages`;

async function fetchIndexedLanguages() {
  "use cache";
  cacheLife("hours");
  cacheTag(SETTINGS_TAG);
  return sanityClient.fetch<string[] | null>(INDEXED_LANGUAGES_QUERY);
}

/**
 * Locales open to search engines, set in Sanity → "Настройки сайта". The rest stay
 * reachable but are noindex and left out of the sitemap and hreflang.
 * No published settings document means no restriction. A fetch error is not
 * swallowed: guessing here could deindex the whole site.
 */
export async function getIndexedLocales(): Promise<Locale[]> {
  const languages = await fetchIndexedLanguages();
  if (!languages) return [...locales];
  return locales.filter((locale) => languages.some((language) => isLocale(language) && language === locale));
}
