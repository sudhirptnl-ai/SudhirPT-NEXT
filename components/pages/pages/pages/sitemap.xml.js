// pages/sitemap.xml.js
import { client } from "../sanity/lib/client";

export default function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const SITE_URL = "https://www.sudhirpt.nl";

  // Haal gepubliceerde blogposts op
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }`
  );

  const staticPages = [
    "",
    "#over",
    "#locaties",
    "#diensten",
    "#tarieven",
    "blog",
  ];

  const urls = [
    ...staticPages.map((p) => `${SITE_URL}/${p}`.replace(/\/#/, "#")),
    ...posts.map((p) => `${SITE_URL}/blog/${p.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `<url>
  <loc>${u}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();

  return { props: {} };
}
