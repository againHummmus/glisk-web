import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { blogAlternates, getBlogLanguages, getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const blogLanguages = await getBlogLanguages();
  return {
    title: { absolute: dict.blog.title },
    description: dict.blog.description,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: blogAlternates(blogLanguages),
    },
    openGraph: {
      title: dict.blog.title,
      description: dict.blog.description,
      url: `/${lang}/blog`,
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const posts = await getPosts(lang);
  if (posts.length === 0) {
    if (lang === defaultLocale) notFound();
    redirect(`/${defaultLocale}/blog`);
  }

  return (
    <>
      <SiteHeader lang={lang} path="" dict={dict} />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-8 lg:pt-16">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{dict.blog.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-400">{dict.blog.description}</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} lang={lang} headingLevel="h2" />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </>
  );
}
