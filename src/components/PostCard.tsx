import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { formatPostDate, type PostSummary } from "@/lib/blog";

interface PostCardProps {
  post: PostSummary;
  lang: Locale;
  headingLevel: "h2" | "h3";
}

export function PostCard({ post, lang, headingLevel: Heading }: PostCardProps) {
  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 transition-colors hover:border-white/25"
    >
      {post.image && (
        <Image
          src={post.image.url}
          alt={post.image.alt}
          width={post.image.width}
          height={post.image.height}
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          className="aspect-video w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <time dateTime={post.publishedAt} className="text-sm text-neutral-500">
          {formatPostDate(post.publishedAt, lang)}
        </time>
        <Heading className="text-xl font-semibold tracking-tight">{post.title}</Heading>
        <p className="leading-7 text-neutral-400">{post.description}</p>
      </div>
    </Link>
  );
}
