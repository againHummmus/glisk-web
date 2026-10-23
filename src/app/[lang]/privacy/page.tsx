import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale, languageAlternates, languageTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { PolicySection } from "@/i18n/types";
import { site } from "@/lib/site";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return {
    title: dict.privacy.metaTitle,
    description: dict.privacy.metaDescription,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: languageAlternates("/privacy"),
    },
  };
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="flex flex-col gap-3 leading-7 text-neutral-400">{children}</div>
    </section>
  );
}

function renderSections(sections: PolicySection[]) {
  return sections.map(({ title, paragraphs }) => (
    <Section key={title} title={title}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </Section>
  ));
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { privacy } = dict;
  const updatedAt = new Intl.DateTimeFormat(languageTags[lang], { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(site.privacyUpdatedAt),
  );

  return (
    <>
      <SiteHeader lang={lang} path="/privacy" dict={dict} />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-5 pb-24 pt-10 sm:px-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{privacy.title}</h1>
          <p className="text-neutral-500">
            {privacy.lastUpdated}: {updatedAt}
          </p>
          {privacy.translationNote && <p className="text-sm text-neutral-500">{privacy.translationNote}</p>}
        </div>

        <div className="rounded-3xl border border-white/10 bg-neutral-950 p-6 leading-7">
          <p className="font-medium">{privacy.summaryTitle}</p>
          <p className="mt-2 text-neutral-400">{privacy.summaryText}</p>
        </div>

        {renderSections(privacy.sectionsBefore)}

        <Section title={privacy.permissions.title}>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {privacy.permissions.rows.map(({ name, purpose }) => (
              <div
                key={name}
                className="flex flex-col gap-1 border-b border-white/10 p-4 last:border-b-0 sm:flex-row sm:gap-6"
              >
                <span className="font-medium text-white sm:w-56 sm:shrink-0">{name}</span>
                <span>{purpose}</span>
              </div>
            ))}
          </div>
          <p>{privacy.permissions.note}</p>
        </Section>

        {renderSections(privacy.sectionsAfter)}

        <Section title={privacy.contact.title}>
          <p>
            {privacy.contact.textBefore}
            <a href={`mailto:${site.contactEmail}`} className="text-white underline underline-offset-4">
              {site.contactEmail}
            </a>
            {privacy.contact.textAfter}
          </p>
        </Section>
      </main>

      <SiteFooter lang={lang} dict={dict} />
    </>
  );
}
