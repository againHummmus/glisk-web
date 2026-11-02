import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { languageAlternates, locales } from "@/i18n/config";
import { blogAlternates, getBlogLanguages, getPostPaths, localeAlternates, POSTS_TAG } from "@/lib/blog";
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

function absoluteUrls(alternates: Record<string, string>) {
  return Object.fromEntries(Object.entries(alternates).map(([tag, path]) => [tag, `${site.url}${path}`]));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);
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
      languages: absoluteUrls(blogAlternates(blogLanguages)),
    },
  }));

  const postEntries = postPaths.map(({ lang, slug, updatedAt }) => ({
    url: `${site.url}/${lang}/blog/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: absoluteUrls(
        localeAlternates(
          postPaths.filter((path) => path.slug === slug).map((path) => path.lang),
          `/blog/${slug}`,
        ),
      ),
    },
  }));

  return [...staticEntries, ...blogEntries, ...postEntries];
}
