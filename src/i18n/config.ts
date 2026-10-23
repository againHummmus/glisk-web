export const locales = ["en", "ru", "uk", "pl", "de", "fr", "es", "pt", "it", "tr", "hi", "id", "zh", "ja", "ko"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  uk: "Українська",
  pl: "Polski",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
  it: "Italiano",
  tr: "Türkçe",
  hi: "हिन्दी",
  id: "Bahasa Indonesia",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
};

export const languageTags: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  uk: "uk",
  pl: "pl",
  de: "de",
  fr: "fr",
  es: "es",
  pt: "pt-BR",
  it: "it",
  tr: "tr",
  hi: "hi",
  id: "id",
  zh: "zh-CN",
  ja: "ja",
  ko: "ko",
};

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const preferences = acceptLanguage
    .split(",")
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(";");
      const qualityParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qualityParam ? Number(qualityParam.trim().slice(2)) : 1;
      return { language: tag.split("-")[0].toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality };
    })
    .sort((first, second) => second.quality - first.quality);
  for (const { language } of preferences) {
    if (isLocale(language)) return language;
  }
  return defaultLocale;
}

export function languageAlternates(path: string, baseUrl = "") {
  return {
    ...Object.fromEntries(locales.map((locale) => [languageTags[locale], `${baseUrl}/${locale}${path}`])),
    "x-default": `${baseUrl}/${defaultLocale}${path}`,
  };
}
