// pages/robots.txt.js
export default function Robots() {
  // wordt nooit gerenderd; Next verstuurt raw text in getServerSideProps
  return null;
}

export async function getServerSideProps({ res }) {
  const SITE_URL = "https://www.sudhirpt.nl";

  const content = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain");
  res.write(content);
  res.end();

  return { props: {} };
}
