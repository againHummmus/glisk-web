export interface TextBlock {
  title: string;
  text: string;
}

export interface PolicySection {
  title: string;
  paragraphs: string[];
}

export interface PermissionRow {
  name: string;
  purpose: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    privacy: string;
    getApp: string;
    language: string;
  };
  storeButton: string;
  hero: {
    badge: string;
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    text: string;
    privacyLink: string;
  };
  mockup: {
    month: string;
    moments: string;
    createFilm: string;
  };
  features: [TextBlock, TextBlock, TextBlock, TextBlock];
  howItWorks: {
    title: string;
    steps: [TextBlock, TextBlock, TextBlock];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  privacyBand: {
    title: string;
    text: string;
    link: string;
  };
  footer: {
    tagline: string;
    privacy: string;
    contact: string;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lastUpdated: string;
    translationNote: string | null;
    summaryTitle: string;
    summaryText: string;
    sectionsBefore: PolicySection[];
    permissions: {
      title: string;
      rows: PermissionRow[];
      note: string;
    };
    sectionsAfter: PolicySection[];
    contact: {
      title: string;
      textBefore: string;
      textAfter: string;
    };
  };
}
