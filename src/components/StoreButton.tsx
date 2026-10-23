import { Download } from "lucide-react";
import { site } from "@/lib/site";

interface StoreButtonProps {
  label: string;
}

export function StoreButton({ label }: StoreButtonProps) {
  return (
    <a
      href={site.playStoreUrl}
      className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-black transition-opacity hover:opacity-85"
    >
      <Download size={18} />
      {label}
    </a>
  );
}
