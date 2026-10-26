import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { getLatestPosts } from "@/lib/blog";
import { PostCard } from "./PostCard";

interface LatestPostsProps {
  lang: Locale;
  dict: Dictionary;
}

const LATEST_POSTS_COUNT = 3;

export async function LatestPosts({ lang, dict }: LatestPostsProps) {
  const posts = await getLatestPosts(lang, LATEST_POSTS_COUNT);
  if (posts.length === 0) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-3xl font-semibold tracking-tight">{dict.blog.latest}</h2>
        <Link href={`/${lang}/blog`} className="text-sm text-neutral-400 transition-colors hover:text-white">
          {dict.blog.all} →
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} lang={lang} headingLevel="h3" />
        ))}
      </div>
    </section>
  );
}
