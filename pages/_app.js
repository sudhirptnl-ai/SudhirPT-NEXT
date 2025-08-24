// pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";
import Script from "next/script";
import CookieBanner from "../components/CookieBanner";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // bv. G-SZTYF4S690

export default function MyApp({ Component, pageProps }) {
  // Zet default consent zodra gtag geladen is (en ook bij client mount als fallback)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;

      gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "granted",
        security_storage: "granted",
      });
    }
  }, []);

  return (
    <>
      {/* Google tag (gtag.js) */}
      {GA_ID && (
        <>
          <Script
            id="ga-consent-default"
            strategy="beforeInteractive"
          >{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            // Default: alles denied totdat gebruiker kiest (Consent Mode v2)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'granted',
              'security_storage': 'granted'
            });
          `}</Script>

          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              anonymize_ip: true
            });
          `}</Script>
        </>
      )}

      <Component {...pageProps} />
      <CookieBanner />
    </>
  );
}
