import { languageTags, type Locale } from "@/i18n/config";
import { brandProfiles, playStoreUrl, site } from "@/lib/site";

export const ORGANIZATION_ID = `${site.url}/#organization`;

const logo = { "@type": "ImageObject", url: `${site.url}/icon-512.png`, width: 512, height: 512 };

/** Short reference to the organization for nested `author` / `publisher` fields. */
export const organizationRef = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: site.name,
  url: site.url,
  logo,
};

/** Site-wide brand entities: rendered in <head> of every page. */
export function brandGraph(lang: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...organizationRef,
        alternateName: `${site.name} app`,
        email: site.contactEmail,
        sameAs: brandProfiles,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        inLanguage: languageTags[lang],
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "MobileApplication",
        "@id": `${site.url}/#app`,
        name: site.name,
        alternateName: `${site.name} app`,
        description,
        url: `${site.url}/${lang}`,
        image: `${site.url}/icon-512.png`,
        operatingSystem: "Android",
        applicationCategory: "MultimediaApplication",
        installUrl: playStoreUrl,
        downloadUrl: playStoreUrl,
        sameAs: [playStoreUrl],
        inLanguage: languageTags[lang],
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };
}

export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
