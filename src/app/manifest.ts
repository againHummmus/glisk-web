import type { MetadataRoute } from "next";
import { playStoreUrl, site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: video diary`,
    short_name: site.name,
    description: "Record 30-second family moments and turn a month or a year into a film. Free on Android.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    related_applications: [{ platform: "play", url: playStoreUrl, id: site.androidPackage }],
    prefer_related_applications: true,
  };
}
