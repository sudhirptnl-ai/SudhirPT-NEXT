import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "yjdztjk4", // Vervang dit door jouw echte projectId van Sanity
  dataset: 'production',
  apiVersion: "2023-01-01",
  useCdn: true,
});
