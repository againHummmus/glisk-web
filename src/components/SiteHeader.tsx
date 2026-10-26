import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { getBlogLanguages } from "@/lib/blog";
import { getPlayStoreLink, site } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface SiteHeaderProps {
  lang: Locale;
  path: string;
  dict: Dictionary;
}

export async function SiteHeader({ lang, path, dict }: SiteHeaderProps) {
  const hasBlog = (await getBlogLanguages()).includes(lang);
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center">
            <Image src="/logo.png" alt="" width={36} height={36} priority />
          </span>
          <span className="text-lg font-semibold tracking-tight">{site.name}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <LanguageSwitcher lang={lang} path={path} label={dict.nav.language} />
          {hasBlog && (
            <Link
              href={`/${lang}/blog`}
              className="hidden rounded-full px-4 py-2 text-neutral-400 transition-colors hover:text-white sm:block"
            >
              {dict.nav.blog}
            </Link>
          )}
          <Link
            href={`/${lang}/privacy`}
            className="hidden rounded-full px-4 py-2 text-neutral-400 transition-colors hover:text-white sm:block"
          >
            {dict.nav.privacy}
          </Link>
          <a
            href={getPlayStoreLink(lang, "header")}
            className="rounded-full border border-white/15 bg-neutral-950 px-4 py-2 font-medium transition-opacity hover:opacity-80"
          >
            {dict.nav.getApp}
          </a>
        </nav>
      </div>
    </header>
  );
}
