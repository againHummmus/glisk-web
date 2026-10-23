import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { site } from "@/lib/site";

interface SiteFooterProps {
  lang: Locale;
  dict: Dictionary;
}

export function SiteFooter({ lang, dict }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {site.copyrightYear} {site.name}. {dict.footer.tagline}
        </p>
        <div className="flex gap-5">
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
