// pages/sitemap.xml.js
import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server"; // pas aan naar jouw sanity client pad

const query = groq`*[_type == "post"]{ "slug": slug.current, publishedAt }`;

function generateSiteMap(posts) {
  const baseUrl = "https://www.sudhirpt.nl"; // ✅ pas aan naar je domein

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Statische pagina’s -->
     <url><loc>${baseUrl}/</loc></url>
     <url><loc>${baseUrl}/over</loc></url>
     <url><loc>${baseUrl}/locaties</loc></url>
     <url><loc>${baseUrl}/diensten</loc></url>
     <url><loc>${baseUrl}/tarieven</loc></url>
     <url><loc>${baseUrl}/contact</loc></url>
     <url><loc>${baseUrl}/blog</loc></url>

     <!-- Blogposts -->
     ${posts
       .map((post) => {
         return `
           <url>
             <loc>${baseUrl}/blog/${post.slug}</loc>
             <lastmod>${post.publishedAt || new Date().toISOString()}</lastmod>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const posts = await getClient().fetch(query);
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SiteMap() {
  return null;
}
