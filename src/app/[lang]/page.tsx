import { CalendarDays, ChevronDown, Clapperboard, Lock, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneMockup } from "@/components/PhoneMockup";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StoreButton } from "@/components/StoreButton";
import { isLocale, languageTags, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Dictionary } from "@/i18n/types";
import { playStoreUrl, site } from "@/lib/site";

const FEATURE_ICONS = [Timer, CalendarDays, Clapperboard, Lock];

function buildStructuredData(lang: Locale, dict: Dictionary) {
  const pageUrl = `${site.url}/${lang}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        inLanguage: languageTags[lang],
      },
      {
        "@type": "MobileApplication",
        "@id": `${site.url}/#app`,
        name: site.name,
        description: dict.meta.description,
        url: pageUrl,
        image: `${site.url}/icon-512.png`,
        operatingSystem: "Android",
        applicationCategory: "MultimediaApplication",
        installUrl: playStoreUrl,
        downloadUrl: playStoreUrl,
        inLanguage: languageTags[lang],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: languageTags[lang],
        mainEntity: dict.faq.items.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} path="" dict={dict} />

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData(lang, dict)).replace(/</g, "\\u003c") }}
        />
        <section className="mx-auto grid w-full max-w-6xl items-center gap-16 px-5 pb-24 pt-10 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div className="flex flex-col items-start gap-7">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-neutral-950 px-3.5 py-1.5 text-sm text-neutral-300">
              <span className="size-2 rounded-full bg-record" />
              {dict.hero.badge}
            </span>
            <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              {dict.hero.titleStart}
              <span className="whitespace-nowrap text-accent">{dict.hero.titleAccent}</span>
              {dict.hero.titleEnd}
            </h1>
            <p className="max-w-lg text-lg leading-8 text-neutral-400">{dict.hero.text}</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <StoreButton label={dict.storeButton} lang={lang} placement="hero" />
              <Link href={`/${lang}/privacy`} className="px-2 text-sm text-neutral-400 transition-colors hover:text-white">
                {dict.hero.privacyLink}
              </Link>
            </div>
          </div>
          <PhoneMockup labels={dict.mockup} />
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {dict.features.map(({ title, text }, index) => {
              const Icon = FEATURE_ICONS[index];
              return (
                <article key={title} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-neutral-950 p-7">
                  <span className="flex size-11 items-center justify-center rounded-full bg-white/10">
                    <Icon size={20} />
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                  <p className="leading-7 text-neutral-400">{text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight">{dict.howItWorks.title}</h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {dict.howItWorks.steps.map(({ title, text }, index) => (
              <li key={title} className="flex flex-col gap-3 border-t border-white/15 pt-5">
                <span className="text-sm tabular-nums text-neutral-500">0{index + 1}</span>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="leading-7 text-neutral-400">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-8">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight">{dict.faq.title}</h2>
          <div className="flex flex-col gap-3">
            {dict.faq.items.map(({ question, answer }) => (
              <details key={question} className="group rounded-2xl border border-white/10 bg-neutral-950">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium [&::-webkit-details-marker]:hidden">
                  {question}
                  <ChevronDown size={18} className="shrink-0 text-neutral-500 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 leading-7 text-neutral-400">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-[2rem] bg-brand p-8 sm:p-12">
            <Image
              src="/logo-symbol.png"
              alt=""
              width={420}
              height={420}
              className="pointer-events-none absolute -right-24 -top-16 opacity-15"
            />
            <h2 className="relative max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.privacyBand.title}
            </h2>
            <p className="relative max-w-xl leading-7 text-white/75">{dict.privacyBand.text}</p>
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
              <StoreButton label={dict.storeButton} lang={lang} placement="privacy_band" />
              <Link href={`/${lang}/privacy`} className="px-2 text-sm text-white/75 transition-colors hover:text-white">
                {dict.privacyBand.link}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} dict={dict} />
    </>
  );
}
