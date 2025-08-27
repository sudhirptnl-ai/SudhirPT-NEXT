// pages/sitemap.xml.js
import { serverClient } from "../lib/client";

const query = `*[_type == "post"]{ "slug": slug.current, publishedAt }`;

export async function getServerSideProps({ res }) {
  const posts = await serverClient.fetch(query);

  const base = "https://sudhirpt.nl"; // pas aan indien nodig
  res.setHeader("Content-Type", "text/xml");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts
    .map(
      (p) => `<url>
  <loc>${base}/posts/${p.slug}</loc>
  <lastmod>${p.publishedAt ?? new Date().toISOString()}</lastmod>
</url>`
    )
    .join("")}
</urlset>`;

  res.write(body);
  res.end();
  return { props: {} };
}

export default function Sitemap() { return null; }
