// pages/sitemap.xml.js
import { serverClient } from "../lib/client";

const query = `*[_type == "post"]{ "slug": slug.current, publishedAt }`;

export async function getServerSideProps({ res }) {
  const posts = await serverClient.fetch(query);

  res.setHeader("Content-Type", "text/xml");
  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts
        .map(
          (post) => `
        <url>
          <loc>https://sudhirpt.nl/posts/${post.slug}</loc>
          <lastmod>${post.publishedAt}</lastmod>
        </url>`
        )
        .join("")}
    </urlset>
  `;
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
