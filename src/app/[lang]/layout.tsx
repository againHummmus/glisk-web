import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, languageAlternates, languageTags, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { playStoreUrl, site } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const verification: Metadata["verification"] = {
    ...(site.googleSiteVerification && { google: site.googleSiteVerification }),
    ...(site.yandexVerification && { yandex: site.yandexVerification }),
  };
  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    title: {
      default: dict.meta.title,
      template: `%s · ${site.name}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: languageAlternates(""),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      siteName: site.name,
      type: "website",
      locale: languageTags[lang].replace("-", "_"),
      alternateLocale: locales.filter((locale) => locale !== lang).map((locale) => languageTags[locale].replace("-", "_")),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    appLinks: {
      android: { package: site.androidPackage, app_name: site.name, url: playStoreUrl },
    },
    verification,
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const htmlLang = isLocale(lang) ? languageTags[lang] : languageTags.en;
  return (
    <html lang={htmlLang} className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
