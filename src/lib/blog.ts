import type { PortableTextProps } from "@portabletext/react";
import { cacheLife, cacheTag } from "next/cache";
import { defaultLocale, isLocale, languageTags, type Locale } from "@/i18n/config";
import { sanityClient as client } from "@/lib/sanity";
import { getIndexedLocales } from "@/lib/settings";

export interface PostImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  image: PostImage | null;
}

export interface RelatedPost {
  title: string;
  slug: string;
  description: string;
}

export interface PostRobots {
  index: boolean;
  follow: boolean;
}

export interface Post extends PostSummary {
  seoTitle: string | null;
  keywords: string[];
  body: PortableTextProps["value"];
  related: RelatedPost[];
  robots: PostRobots;
  /** Every published language of this post, for the language switcher. */
  translations: string[];
  /** Published languages of this post that allow indexing, for hreflang. */
  indexedTranslations: string[];
}

export interface BodyImage {
  _type: "image";
  _key: string;
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface PostPath {
  lang: Locale;
  slug: string;
  updatedAt: string;
  index: boolean;
}

interface RawPostPath {
  language: string;
  slug: string;
  updatedAt: string;
  index: boolean;
}

export const POSTS_TAG = "posts";
export const PLACEHOLDER_SLUG = "__placeholder__";

const PUBLISHED = `_type == "post" && defined(slug.current) && publishedAt <= now()`;

// Posts created before the SEO block existed have no `seo` object: they stay index, follow.
const INDEX = `coalesce(seo.index, true)`;
const FOLLOW = `coalesce(seo.follow, true)`;

const SUMMARY_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  description,
  publishedAt,
  "updatedAt": _updatedAt,
  "image": select(defined(mainImage.asset) => mainImage{
    "url": asset->url,
    alt,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }, null)
`;

const POSTS_QUERY = `*[${PUBLISHED} && language == $language] | order(publishedAt desc)[0...$limit]{${SUMMARY_FIELDS}}`;

const POST_QUERY = `*[${PUBLISHED} && language == $language && slug.current == $slug][0]{
  ${SUMMARY_FIELDS},
  seoTitle,
  "keywords": coalesce(keywords, []),
  body[]{
    ...,
    _type == "image" => {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  },
  "related": *[${PUBLISHED} && _id in ^.relatedPosts[]._ref]{
    title,
    "slug": slug.current,
    description
  },
  "robots": { "index": ${INDEX}, "follow": ${FOLLOW} },
  "translations": *[${PUBLISHED} && slug.current == ^.slug.current].language,
  "indexedTranslations": *[${PUBLISHED} && ${INDEX} && slug.current == ^.slug.current].language
}`;

const LANGUAGES_QUERY = `array::unique(*[${PUBLISHED}].language)`;

const INDEXED_LANGUAGES_QUERY = `array::unique(*[${PUBLISHED} && ${INDEX}].language)`;

const PATHS_QUERY = `*[${PUBLISHED}]{language, "slug": slug.current, "updatedAt": _updatedAt, "index": ${INDEX}}`;

async function fetchPosts(language: Locale, limit: number) {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);
  return client.fetch<PostSummary[]>(POSTS_QUERY, { language, limit });
}

async function fetchBlogLanguages() {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);
  return client.fetch<string[]>(LANGUAGES_QUERY);
}

async function fetchIndexedBlogLanguages() {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);
  return client.fetch<string[]>(INDEXED_LANGUAGES_QUERY);
}

export async function getPosts(language: Locale, limit = 100) {
  return fetchPosts(language, limit);
}

async function fetchPost(language: Locale, slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);
  return client.fetch<Post | null>(POST_QUERY, { language, slug });
}

async function fetchPostPaths() {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);
  return client.fetch<RawPostPath[]>(PATHS_QUERY);
}

// Indexing is gated twice: by the post's own SEO block and by the site-wide
// list of indexed languages in Sanity settings. Both are cached separately,
// so a settings change applies without refetching posts.

export async function getPost(language: Locale, slug: string): Promise<Post | null> {
  const [post, indexedLocales] = await Promise.all([fetchPost(language, slug), getIndexedLocales()]);
  if (!post) return null;
  return {
    ...post,
    robots: { ...post.robots, index: post.robots.index && indexedLocales.includes(language) },
    indexedTranslations: post.indexedTranslations.filter((lang) => isLocale(lang) && indexedLocales.includes(lang)),
  };
}

export async function getPostPaths() {
  const [paths, indexedLocales] = await Promise.all([fetchPostPaths(), getIndexedLocales()]);
  return paths.flatMap(({ language, slug, updatedAt, index }): PostPath[] =>
    isLocale(language) ? [{ lang: language, slug, updatedAt, index: index && indexedLocales.includes(language) }] : [],
  );
}

export async function getBlogLanguages() {
  try {
    return (await fetchBlogLanguages()).filter(isLocale);
  } catch {
    return [];
  }
}

/**
 * Indexed locales with at least one indexable post: only their blog lists are
 * indexed and listed in hreflang.
 */
export async function getIndexedBlogLanguages() {
  const indexedLocales = await getIndexedLocales();
  try {
    return (await fetchIndexedBlogLanguages()).filter(isLocale).filter((language) => indexedLocales.includes(language));
  } catch {
    return [];
  }
}

/**
 * Page-level robots metadata. It replaces the layout's `robots` as a whole,
 * so googleBot directives are repeated here.
 */
export function robotsMetadata({ index, follow }: PostRobots) {
  return {
    index,
    follow,
    googleBot: { index, follow, ...(index && { "max-image-preview": "large" as const, "max-snippet": -1 }) },
  };
}

export async function getLatestPosts(language: Locale, limit: number) {
  try {
    return await fetchPosts(language, limit);
  } catch {
    return [];
  }
}

export function localeAlternates(languages: Locale[], path: string) {
  return {
    ...Object.fromEntries(languages.map((language) => [languageTags[language], `/${language}${path}`])),
    ...(languages.includes(defaultLocale) && { "x-default": `/${defaultLocale}${path}` }),
  };
}

export function blogAlternates(languages: Locale[]) {
  return localeAlternates(languages, "/blog");
}

export function formatPostDate(isoDate: string, lang: Locale) {
  return new Date(isoDate).toLocaleDateString(languageTags[lang], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
