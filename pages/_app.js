// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css"; // laat staan als je deze al had

// Haal GA-ID uit environment
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Stuur page_view events bij routewissels
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "page_view", { page_location: url });
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Head>
        {/* Zorgt dat mobiele statusbalk je merk-kleur toont */}
        <meta name="theme-color" content="#0b121a" />
      </Head>

      {GA_ID && (
        <>
          {/* Laad gtag.js script */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          {/* Init GA4 */}
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}

      {/* ✅ Globale wrapper: forceer overal dezelfde achtergrondkleur */}
      <div
        className="min-h-screen text-white"
        style={{ backgroundColor: "#0b121a" }} // hard fallback los van Tailwind
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}
