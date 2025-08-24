// lib/client.js
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "yjdztjk4",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-01-01",
  useCdn: true, // snelle public reads
});

// Server-side client zonder CDN (betrouwbaarder tijdens build/SSR)
export const serverClient = client.withConfig({ useCdn: false });
