// components/SEO.jsx
import Head from "next/head";

/**
 * SEO helper
 * - Zorgt voor correcte Open Graph + Twitter tags
 * - Bouwt absolute URL's voor pagina en afbeelding
 */
export default function SEO({
  title = "SudhirPT",
  description = "Persoonlijke training, heldere communicatie en duurzame resultaten.",
  url = "/",
  image,            // b.v. volledige URL van mainImage
  type = "website", // "article" voor blogpost
  publishedTime,    // ISO string (optioneel, voor blogposts)
  modifiedTime,     // ISO string (optioneel)
  locale = "nl_NL",
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
  const canonical = url.startsWith("http") ? url : `${siteUrl}${url}`;

  // Zorg dat og:image altijd absoluut is
  const ogImage = image
    ? (image.startsWith("http") ? image : `${siteUrl}${image}`)
    : `${siteUrl}/og-default.jpg`; // zet eventueel /public/og-default.jpg neer

  const siteName = "SudhirPT";

  return (
    <Head>
      {/* Basis */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      {/* <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" /> */}

      {/* Article data (alleen voor blogposts) */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
