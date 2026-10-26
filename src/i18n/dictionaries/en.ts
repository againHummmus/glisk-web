import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "Glisk: a video diary of 30-second moments for Android",
    description: "A cosy video diary for Android. Film short clips of ordinary days, keep them in a calendar and turn a month or a year into a warm film. Free, with no ads or subscriptions.",
  },
  nav: {
    privacy: "Privacy",
    getApp: "Get the app",
    language: "Language",
    blog: "Blog",
  },
  storeButton: "Get it on Google Play",
  hero: {
    badge: "Free on Android",
    titleStart: "Your life, ",
    titleAccent: "as it is.",
    titleEnd: "",
    text: "Perfect shots are quickly forgotten, but real everyday moments, with all their details, stay with you for a long time. Don’t worry about shaky hands, voices behind the camera, cut-off sentences or a crooked horizon. Real life doesn’t have to be flawless. Film what’s happening right now.",
    privacyLink: "What happens to your data →",
  },
  mockup: {
    month: "October 2026",
    moments: "12 moments",
    createFilm: "Create film",
  },
  features: [
    {
      title: "30 seconds max",
      text: "The timer stops recording at 30 seconds. That’s plenty for one moment, and it keeps filming every day easy.",
    },
    {
      title: "Sorted by day",
      text: "Each clip goes to the day it was filmed. No feed, no followers, just a calendar of your days.",
    },
    {
      title: "A film of the month or year",
      text: "Choose a month, a year or a few days, add music if you like, and Glisk joins the clips into one video.",
    },
    {
      title: "Stays on your phone",
      text: "There’s no account and no cloud. Nobody sees your clips unless you send them.",
    },
  ],
  howItWorks: {
    title: "How it works",
    steps: [
      {
        title: "Film",
        text: "The app opens straight to the camera. Tap to start, tap again to stop.",
      },
      {
        title: "Keep",
        text: "Clips land in the calendar day by day, exactly as they were filmed.",
      },
      {
        title: "Watch",
        text: "Make a film of a month or a year and see how it all really was.",
      },
    ],
  },
  blog: {
    title: "Glisk blog",
    description: "Articles about keeping a video diary, filming everyday life and turning a month or a year into one film.",
    latest: "From the blog",
    all: "All articles",
    related: "Read next",
    ctaTitle: "Try Glisk",
    ctaText: "A free video diary for Android. 30-second clips, a calendar of your days and a film of your year, all kept on your phone.",
  },
  notFound: {
    title: "Page not found",
    text: "This page doesn’t exist or has been moved. Let’s get you back to the start.",
    home: "Back to home",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Is Glisk really free?",
        answer: "Yes, completely. And there are no ads. The app was first made for personal use, and sharing it with others is a real joy.",
      },
      {
        question: "What does the name “Glisk” mean?",
        answer: "It’s an old Scots word for a quick glance or a glimpse of light. Every short video is a small glimpse of a day.",
      },
      {
        question: "Why are there no filters in the app?",
        answer: "Real life is beautiful in its natural colours, without masks or filters.",
      },
      {
        question: "Why exactly 30 seconds?",
        answer: "Short clips are easy to film every day. And at the end of the year they add up to a lively, complete film that’s worth watching to the end.",
      },
      {
        question: "Do my videos get uploaded to the internet?",
        answer: "No. Recording, processing and editing happen only on the phone. The app has no servers and no accounts, so the recordings stay completely safe.",
      },
      {
        question: "Can I add my own music to a film?",
        answer: "Of course! Choose any audio file on your phone, pick your favourite part of the song and decide whether to keep the clips’ own sound.",
      },
      {
        question: "How do I save a film or send it to family?",
        answer: "A finished film can be saved to the gallery or sent through the usual share menu with a single tap.",
      },
      {
        question: "Is there an iPhone (iOS) version?",
        answer: "Not yet. Right now Glisk is available only on Android devices.",
      },
    ],
  },
  privacyBand: {
    title: "Your videos stay on your phone.",
    text: "Glisk records, stores and edits everything on the device. The app has no servers, no sign-up and no analytics, so nobody but you can see your videos.",
    link: "Read the privacy policy",
  },
  footer: {
    tagline: "Made by one person, for ordinary days.",
    privacy: "Privacy policy",
    contact: "Contact",
  },
  privacy: {
    metaTitle: "Privacy policy",
    metaDescription: "How Glisk handles your videos and data: everything stays on your device.",
    title: "Privacy policy",
    lastUpdated: "Last updated",
    translationNote: null,
    summaryTitle: "The short version",
    summaryText:
      "Glisk does not collect, store or share any personal data. Your videos are recorded, kept and edited only on your phone. I have no servers, no accounts, no analytics and no ads.",
    sectionsBefore: [
      {
        title: "Who makes Glisk",
        paragraphs: [
          "Glisk is a video diary app for Android. I make it on my own, there is no company behind it. This policy explains what happens to your information when you use the app.",
        ],
      },
      {
        title: "What data is collected",
        paragraphs: [
          "None. The app does not collect personal information, usage statistics, crash reports, device identifiers or location. It does not contain advertising or analytics software, and it does not send any data over the internet.",
        ],
      },
      {
        title: "Your videos",
        paragraphs: [
          "Clips you record are saved in the app’s private storage on your device, together with a small preview image, the date and the length of each clip. This information never leaves your phone and is not accessible to me or to other apps.",
          "Films you create are put together on the device. A finished film only leaves the app when you choose to save it to your gallery or share it through the standard Android share menu. In that case it goes exactly where you send it.",
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
          purpose: "Only when you choose to save a finished film to your gallery. Glisk never reads your gallery.",
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
          "Glisk is made for adults who want to capture family moments. It is not directed at children. Videos you record of your family stay on your device and never reach me.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "If this policy changes, I will update this page and the date above. Because the app collects no data, any change can only affect how the app works on your device.",
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
