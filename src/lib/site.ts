function resolveSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Glisk",
  url: resolveSiteUrl(),
  androidPackage: "com.ahh.glisk",
  contactEmail: "ahhummmus@gmail.com",
  privacyUpdatedAt: "2026-10-26T00:00:00Z",
  contentUpdatedAt: "2026-10-26T00:00:00Z",
  copyrightYear: 2026,
  googleSiteVerification: "",
  yandexVerification: "",
};

export const playStoreUrl = `https://play.google.com/store/apps/details?id=${site.androidPackage}`;

export function getPlayStoreLink(lang: string, placement: string) {
  const referrer = `utm_source=website&utm_medium=${placement}&utm_campaign=site_${lang}`;
  return `${playStoreUrl}&hl=${lang}&referrer=${encodeURIComponent(referrer)}`;
}
