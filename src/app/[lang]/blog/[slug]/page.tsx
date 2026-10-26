import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StoreButton } from "@/components/StoreButton";
import { defaultLocale, isLocale, languageTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatPostDate, getPost, getPostPaths, PLACEHOLDER_SLUG } from "@/lib/blog";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const paths = await getPostPaths();
  if (paths.length === 0) return [{ lang: defaultLocale, slug: PLACEHOLDER_SLUG }];
  return paths.map(({ lang, slug }) => ({ lang, slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const post = await getPost(lang, slug);
  if (!post) notFound();
  const title = post.seoTitle ?? post.title;
  return {
    title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/${lang}/blog/${slug}` },
    openGraph: {
      title,
      description: post.description,
      url: `/${lang}/blog/${slug}`,
      siteName: site.name,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      ...(post.image && { images: [{ url: post.image.url, alt: post.image.alt }] }),
    },
  };
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const post = await getPost(lang, slug);
  if (!post) notFound();
  const dict = getDictionary(lang);
  const pageUrl = `${site.url}/${lang}/blog/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: languageTags[lang],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: pageUrl,
    ...(post.image && { image: [post.image.url] }),
    ...(post.keywords.length > 0 && { keywords: post.keywords.join(", ") }),
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/icon-512.png` },
    },
  };

  return (
    <>
      <SiteHeader lang={lang} path="" dict={dict} />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <article className="mx-auto w-full max-w-3xl px-5 pb-16 pt-10 sm:px-8 lg:pt-16">
          <Link href={`/${lang}/blog`} className="text-sm text-neutral-400 transition-colors hover:text-white">
            ← {dict.blog.all}
          </Link>
          <time dateTime={post.publishedAt} className="mt-8 block text-sm text-neutral-500">
            {formatPostDate(post.publishedAt, lang)}
          </time>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">{post.title}</h1>
          {post.image && (
            <Image
              src={post.image.url}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              sizes="(min-width: 768px) 768px, 100vw"
              priority
              className="mt-10 w-full rounded-3xl"
            />
          )}
          <div className="mt-4">
            <ArticleBody value={post.body} />
          </div>
        </article>

        {post.related.length > 0 && (
          <section className="mx-auto w-full max-w-3xl px-5 pb-16 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-tight">{dict.blog.related}</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {post.related.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/${lang}/blog/${related.slug}`}
                    className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-neutral-950 p-5 transition-colors hover:border-white/25"
                  >
                    <span className="font-medium">{related.title}</span>
                    <span className="text-neutral-400">{related.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-8">
          <div className="flex flex-col items-start gap-5 rounded-[2rem] bg-brand p-8 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{dict.blog.ctaTitle}</h2>
            <p className="max-w-xl leading-7 text-white/75">{dict.blog.ctaText}</p>
            <StoreButton label={dict.storeButton} lang={lang} placement="blog" />
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </>
  );
}
