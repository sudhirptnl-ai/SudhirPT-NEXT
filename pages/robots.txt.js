// pages/robots.txt.js
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function generateRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

export async function getServerSideProps({ res }) {
  const content = generateRobots();

  res.setHeader("Content-Type", "text/plain");
  res.write(content);
  res.end();

  return { props: {} };
}

export default function RobotsTxt() {
  return null;
}
