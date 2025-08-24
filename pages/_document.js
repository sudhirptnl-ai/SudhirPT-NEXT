// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const isProduction = siteUrl === "https://www.sudhirpt.nl";

  return (
    <Html lang="nl">
      <Head>
        {/* ✅ Alleen indexeren op productie */}
        {!isProduction && (
          <meta name="robots" content="noindex, nofollow" />
        )}

        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ Basis meta */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0B121A" />
      </Head>
      <body className="bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
