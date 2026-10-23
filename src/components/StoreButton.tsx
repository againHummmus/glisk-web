import { Download } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getPlayStoreLink } from "@/lib/site";

interface StoreButtonProps {
  label: string;
  lang: Locale;
  placement: string;
}

export function StoreButton({ label, lang, placement }: StoreButtonProps) {
  return (
    <a
      href={getPlayStoreLink(lang, placement)}
      className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-black transition-opacity hover:opacity-85"
    >
      <Download size={18} />
      {label}
    </a>
  );
}
