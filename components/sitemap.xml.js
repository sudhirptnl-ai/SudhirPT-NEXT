// pages/sitemap.xml.js
import { client } from "../../sanity/lib/client"; // pas dit pad aan als jouw client elders staat

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.sudhirpt.nl";

function buildUrl(loc, lastmod, changefreq = "weekly", priority = "0.7") {
  return `
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function getServerSideProps({ res }) {
  // 1) Statische routes die je wilt opnemen
  const staticUrls = [
    { loc: `${SITE_URL}/`, priority: "1.0", changefreq: "daily" },
    { loc: `${SITE_URL}/#over`, priority: "0.8" },
    { loc: `${SITE_URL}/#diensten`, priority: "0.8" },
    { loc: `${SITE_URL}/#locaties`, priority: "0.6" },
    { loc: `${SITE_URL}/#tarieven`, priority: "0.8" },
    { loc: `${SITE_URL}/contact`, priority: "0.6" },
    { loc: `${SITE_URL}/blog`, priority: "0.7" },
    { loc: `${SITE_URL}/algemene-voorwaarden`, priority: "0.2" },
    { loc: `${SITE_URL}/privacy`, priority: "0.2" },
    { loc: `${SITE_URL}/intakeformulier`, priority: "0.2" },
  ];

  // 2) Blogposts uit Sanity ophalen (alleen gepubliceerde)
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt,
      publishedAt
    } | order(publishedAt desc)`
  );

  const postsUrls = posts.map((p) =>
    buildUrl(`${SITE_URL}/blog/${p.slug}`, p._updatedAt || p.publishedAt, "weekly", "0.7")
  );

  const staticXml = staticUrls
    .map((u) => buildUrl(u.loc, new Date().toISOString(), u.changefreq || "weekly", u.priority || "0.5"))
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${postsUrls.join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function SiteMap() {
  // Dit component rendert niets; Next.js streamt de XML al in getServerSideProps.
  return null;
}
