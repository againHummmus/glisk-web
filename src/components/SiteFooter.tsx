import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { getBlogLanguages } from "@/lib/blog";
import { site } from "@/lib/site";

interface SiteFooterProps {
  lang: Locale;
  dict: Dictionary;
}

export async function SiteFooter({ lang, dict }: SiteFooterProps) {
  const hasBlog = (await getBlogLanguages()).includes(lang);
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {site.copyrightYear} {site.name}. {dict.footer.tagline}
        </p>
        <div className="flex gap-5">
          {hasBlog && (
            <Link href={`/${lang}/blog`} className="transition-colors hover:text-white">
              {dict.nav.blog}
            </Link>
          )}
          <Link href={`/${lang}/privacy`} className="transition-colors hover:text-white">
            {dict.footer.privacy}
          </Link>
          <a href={`mailto:${site.contactEmail}`} className="transition-colors hover:text-white">
            {dict.footer.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}
