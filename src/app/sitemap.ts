import type { MetadataRoute } from "next";
import { languageAlternates, locales } from "@/i18n/config";
import { site } from "@/lib/site";

interface SitemapPage {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "yearly";
  lastModified: string;
}

const PAGES: SitemapPage[] = [
  { path: "", priority: 1, changeFrequency: "weekly", lastModified: site.contentUpdatedAt },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: site.privacyUpdatedAt },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority, changeFrequency, lastModified }) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path, site.url) },
    })),
  );
}
