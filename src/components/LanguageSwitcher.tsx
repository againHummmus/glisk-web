"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { languageTags, localeNames, locales, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  lang: Locale;
  path: string;
  label: string;
}

export function LanguageSwitcher({ lang, path, label }: LanguageSwitcherProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      const details = detailsRef.current;
      if (details?.open && event.target instanceof Node && !details.contains(event.target)) {
        details.open = false;
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  return (
    <details ref={detailsRef} className="language-menu relative">
      <summary
        aria-label={label}
        className="flex cursor-pointer list-none items-center gap-1.5 rounded-full px-3 py-2 text-neutral-400 transition-colors hover:text-white [&::-webkit-details-marker]:hidden"
      >
        <Globe size={16} />
        <span className="uppercase">{lang}</span>
      </summary>
      <div className="absolute right-0 top-full z-10 mt-2 grid w-52 gap-0.5 rounded-2xl border border-white/15 bg-neutral-950 p-2 shadow-2xl shadow-black">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}${path}`}
            hrefLang={languageTags[locale]}
            aria-current={locale === lang ? "page" : undefined}
            className={`rounded-xl px-3 py-2 transition-colors hover:bg-white/10 ${
              locale === lang ? "bg-white/10 font-medium text-white" : "text-neutral-300"
            }`}
          >
            {localeNames[locale]}
          </Link>
        ))}
      </div>
    </details>
  );
}
