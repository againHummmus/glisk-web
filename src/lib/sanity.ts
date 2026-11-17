import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "n5hfln30",
  dataset: "production",
  apiVersion: "2026-10-26",
  useCdn: false,
  perspective: "published",
});
