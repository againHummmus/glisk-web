import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "Blinkin — Your life in 30-second moments",
    description:
      "Blinkin is a private video diary for families. Record 30-second moments, keep them in a calendar and turn a month or a year into a film. Everything stays on your phone.",
  },
  nav: {
    privacy: "Privacy",
    getApp: "Get the app",
    language: "Language",
  },
  storeButton: "Get it on Google Play",
  hero: {
    badge: "Free on Android",
    titleStart: "Your life in ",
    titleAccent: "30-second",
    titleEnd: " moments.",
    text: "Blinkin is a tiny video diary for your family. Record a short clip whenever something matters, keep it on its day, and turn a month or a whole year into a film — without anything leaving your phone.",
    privacyLink: "How we keep it private →",
  },
  mockup: {
    month: "October 2026",
    moments: "12 moments",
    createFilm: "Create film",
  },
  features: [
    {
      title: "30 seconds, never more",
      text: "Tap record and catch the moment. A timer keeps every clip short and sweet, so your diary stays easy to watch.",
    },
    {
      title: "A calendar of moments",
      text: "Every clip lands on its day. Flip through days, months and years and watch any of them with one tap.",
    },
    {
      title: "Turn a year into a film",
      text: "Pick a month, a year or just your favourite days, add music, and Blinkin stitches them into one film.",
    },
    {
      title: "Private by design",
      text: "No account, no cloud, no ads, no tracking. Your videos live on your phone and nowhere else.",
    },
  ],
  howItWorks: {
    title: "How it works",
    steps: [
      { title: "Record", text: "Open the app — it starts on the camera. One tap to start, one tap to stop." },
      { title: "Collect", text: "Clips fill your calendar day by day, building a quiet archive of your family life." },
      { title: "Relive", text: "Make a film for the month or the year and save it to your gallery or share it." },
    ],
  },
  privacyBand: {
    title: "Nothing leaves your phone. Ever.",
    text: "Recording, storage and film-making all happen on the device. There are no servers, no sign-ups and no analytics — just your moments, in your pocket.",
    link: "Read the privacy policy",
  },
  footer: {
    tagline: "Made for families, kept on your phone.",
    privacy: "Privacy policy",
    contact: "Contact",
  },
  privacy: {
    metaTitle: "Privacy policy",
    metaDescription: "How Blinkin handles your videos and data: everything stays on your device.",
    title: "Privacy policy",
    lastUpdated: "Last updated",
    translationNote: null,
    summaryTitle: "The short version",
    summaryText:
      "Blinkin does not collect, store or share any personal data. Your videos are recorded, kept and edited only on your phone. We have no servers, no accounts, no analytics and no ads.",
    sectionsBefore: [
      {
        title: "Who we are",
        paragraphs: [
          "Blinkin (“the app”, “we”) is a video diary app for Android. This policy explains what happens to your information when you use it.",
        ],
      },
      {
        title: "Data we collect",
        paragraphs: [
          "None. The app does not collect personal information, usage statistics, crash reports, device identifiers or location. It does not contain advertising or analytics software, and it does not send any data over the internet.",
        ],
      },
      {
        title: "Your videos",
        paragraphs: [
          "Clips you record are saved in the app’s private storage on your device, together with a small preview image, the date and the length of each clip. This information never leaves your phone and is not accessible to us or to other apps.",
          "Films you create are put together on the device. A finished film only leaves the app when you choose to save it to your gallery or share it through the standard Android share menu — in that case it goes exactly where you send it.",
          "If you add music to a film, the audio file you pick is copied to the app’s temporary storage while you edit and is deleted when you are done.",
        ],
      },
    ],
    permissions: {
      title: "Permissions",
      rows: [
        { name: "Camera", purpose: "To record your 30-second clips." },
        { name: "Microphone", purpose: "To record sound together with your clips." },
        {
          name: "Photos and videos / storage",
          purpose: "Only when you choose to save a finished film to your gallery. Blinkin never reads your gallery.",
        },
        { name: "Vibration", purpose: "For small haptic feedback when you record or tap buttons." },
      ],
      note: "You can revoke any permission at any time in your phone’s settings.",
    },
    sectionsAfter: [
      {
        title: "Backups and deleting your data",
        paragraphs: [
          "Your videos are excluded from automatic cloud backups, so they never end up on any server. This also means that uninstalling the app permanently deletes all clips. Save the films you want to keep to your gallery before uninstalling.",
          "You can delete any clip inside the app at any time. Deleted clips are removed from your device right away.",
        ],
      },
      {
        title: "Third parties",
        paragraphs: [
          "The app does not use third-party services that receive your data. When you download or update the app, Google Play processes information according to Google’s own privacy policy.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Blinkin is made for adults who want to capture family moments. It is not directed at children. Videos you record of your family stay on your device and are never collected by us.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "If this policy changes, we will update this page and the date above. Because the app collects no data, any change can only affect how the app works on your device.",
        ],
      },
    ],
    contact: {
      title: "Contact",
      textBefore: "Questions about privacy? Write to ",
      textAfter: ".",
    },
  },
};
