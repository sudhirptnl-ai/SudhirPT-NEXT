// components/SeoHead.jsx
import Head from "next/head";

export default function SeoHead({
  title = "SudhirPT – Personal Training",
  description = "Word sterker, fitter en zelfverzekerder met persoonlijke coaching, voedingsschema’s en maatwerk begeleiding.",
  image = "/sudhirpt_og.jpg", // zet hier evt. een afbeelding in /public
  url = "https://www.sudhirpt.nl",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Favicon kun je in /public plaatsen (favicon.ico, apple-touch-icon, etc.) */}
    </Head>
  );
}
