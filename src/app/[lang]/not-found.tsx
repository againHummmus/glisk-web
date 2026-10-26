import Link from "next/link";
import { lang as getLang } from "next/root-params";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function NotFound() {
  const requestedLang = await getLang();
  const lang = requestedLang && isLocale(requestedLang) ? requestedLang : defaultLocale;
  const dict = getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} path="" dict={dict} />
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <p className="text-8xl font-semibold tracking-tighter text-accent sm:text-9xl">404</p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{dict.notFound.title}</h1>
        <p className="mt-4 max-w-md text-lg leading-8 text-neutral-400">{dict.notFound.text}</p>
        <Link
          href={`/${lang}`}
          className="mt-10 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-base font-semibold text-black transition-opacity hover:opacity-85"
        >
          {dict.notFound.home}
        </Link>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </>
  );
}
