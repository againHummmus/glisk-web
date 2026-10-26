import type { PortableTextProps } from "@portabletext/react";
import { createClient } from "@sanity/client";
import { cacheLife, cacheTag } from "next/cache";
import { defaultLocale, isLocale, languageTags, type Locale } from "@/i18n/config";

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

export interface Post extends PostSummary {
  seoTitle: string | null;
  keywords: string[];
  body: PortableTextProps["value"];
  related: RelatedPost[];
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
}

interface RawPostPath {
  language: string;
  slug: string;
  updatedAt: string;
}

export const POSTS_TAG = "posts";
export const PLACEHOLDER_SLUG = "__placeholder__";

const client = createClient({
  projectId: "n5hfln30",
  dataset: "production",
  apiVersion: "2026-10-26",
  useCdn: false,
  perspective: "published",
});

const PUBLISHED = `_type == "post" && defined(slug.current) && publishedAt <= now()`;

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
  "related": coalesce(relatedPosts[]->[defined(slug.current) && publishedAt <= now()]{
    title,
    "slug": slug.current,
    description
  }, [])
}`;

const LANGUAGES_QUERY = `array::unique(*[${PUBLISHED}].language)`;

const PATHS_QUERY = `*[${PUBLISHED}]{language, "slug": slug.current, "updatedAt": _updatedAt}`;

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

export async function getPosts(language: Locale, limit = 100) {
  return fetchPosts(language, limit);
}

export async function getPost(language: Locale, slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);
  return client.fetch<Post | null>(POST_QUERY, { language, slug });
}

export async function getPostPaths() {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);
  const paths = await client.fetch<RawPostPath[]>(PATHS_QUERY);
  return paths.flatMap(({ language, slug, updatedAt }): PostPath[] =>
    isLocale(language) ? [{ lang: language, slug, updatedAt }] : [],
  );
}

export async function getBlogLanguages() {
  try {
    return (await fetchBlogLanguages()).filter(isLocale);
  } catch {
    return [];
  }
}

export async function getLatestPosts(language: Locale, limit: number) {
  try {
    return await fetchPosts(language, limit);
  } catch {
    return [];
  }
}

export function blogAlternates(languages: Locale[]) {
  return {
    ...Object.fromEntries(languages.map((language) => [languageTags[language], `/${language}/blog`])),
    ...(languages.includes(defaultLocale) && { "x-default": `/${defaultLocale}/blog` }),
  };
}

export function formatPostDate(isoDate: string, lang: Locale) {
  return new Date(isoDate).toLocaleDateString(languageTags[lang], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
