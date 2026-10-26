import type { MetadataRoute } from "next";
import { languageAlternates, locales } from "@/i18n/config";
import { blogAlternates, getBlogLanguages, getPostPaths } from "@/lib/blog";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogLanguages, postPaths] = await Promise.all([getBlogLanguages(), getPostPaths()]);

  const staticEntries = PAGES.flatMap(({ path, priority, changeFrequency, lastModified }) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path, site.url) },
    })),
  );

  const blogEntries = blogLanguages.map((language) => ({
    url: `${site.url}/${language}/blog`,
    lastModified: site.contentUpdatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    alternates: {
      languages: Object.fromEntries(
        Object.entries(blogAlternates(blogLanguages)).map(([tag, path]) => [tag, `${site.url}${path}`]),
      ),
    },
  }));

  const postEntries = postPaths.map(({ lang, slug, updatedAt }) => ({
    url: `${site.url}/${lang}/blog/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...postEntries];
}
