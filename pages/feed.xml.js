// pages/feed.xml.js
import { client } from "../sanity/lib/client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const postsQuery = `
*[_type == "post" && defined(slug.current) && !(_id in path('drafts.**'))] | order(publishedAt desc){
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  _updatedAt
}
`;

function escapeXml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function getServerSideProps({ res }) {
  let posts = [];
  try {
    posts = await client.fetch(postsQuery);
  } catch (e) {
    posts = [];
  }

  const items = posts
    .map((p) => {
      const url = `${siteUrl}/blog/${encodeURIComponent(p.slug)}`;
      const title = escapeXml(p.title || "Untitled");
      const desc = escapeXml(p.excerpt || "");
      const pubDate = p.publishedAt ? new Date(p.publishedAt).toUTCString() : new Date().toUTCString();

      return `
        <item>
          <title>${title}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${desc}]]></description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>SudhirPT • Blog</title>
  <link>${siteUrl}/blog</link>
  <description>Laatste artikelen van SudhirPT</description>
  <language>nl-NL</language>
  ${items}
</channel>
</rss>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function FeedXML() {
  return null;
}
