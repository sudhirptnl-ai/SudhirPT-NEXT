// components/CookieBanner.jsx
import { useEffect, useState, useCallback } from "react";

const CONSENT_KEY = "cookie_consent"; // "accepted" | "denied"

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  // Alleen tonen als nog geen keuze is gemaakt
  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    setOpen(!saved);
  }, []);

  const gtagConsent = useCallback((mode) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: mode,
        analytics_storage: mode,
        ad_user_data: mode,
        ad_personalization: mode,
      });
      // Optioneel event-logging
      window.gtag("event", mode === "granted" ? "consent_accept" : "consent_deny", {
        event_category: "consent",
      });
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    gtagConsent("granted");
    setOpen(false);
  };

  const denyAll = () => {
    localStorage.setItem(CONSENT_KEY, "denied");
    gtagConsent("denied");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookiekeuze"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-safe"
    >
      <div
        className="
          w-full max-w-3xl translate-y-4 opacity-0
          animate-[banner-in_340ms_ease-out_forwards]
          rounded-2xl bg-black/80 ring-1 ring-white/10 backdrop-blur
          shadow-xl shadow-black/30
         "
      >
        <div className="p-4 sm:p-5 md:p-6">
          <p className="text-sm text-gray-200">
            We gebruiken cookies voor basisfunctionaliteit en anonieme statistieken. 
            Met “Accepteren” ga je akkoord met analyse-cookies. 
            Zie ook onze{" "}
            <a href="/privacy" className="underline hover:text-gray-100">
              privacyverklaring
            </a>.
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              onClick={denyAll}
              className="inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 px-4 py-2 text-sm text-white"
            >
              Weigeren
            </button>
            <button
              onClick={acceptAll}
              className="inline-flex items-center justify-center rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-sm text-white"
            >
              Accepteren
            </button>
          </div>
        </div>
      </div>

      {/* Animatie (respecteert reduced motion) */}
      <style jsx global>{`
        @keyframes banner-in {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[banner-in_340ms_ease-out_forwards] {
            animation: none !important;
            transform: translateY(0) !important;
            opacity: 1 !important;
          }
        }
        .pb-safe { padding-bottom: max(0.75rem, env(safe-area-inset-bottom)); }
      `}</style>
    </div>
  );
}
