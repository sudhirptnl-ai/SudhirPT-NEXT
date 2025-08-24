// components/CookieBanner.jsx
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent"; // 'all' | 'functional'

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Toon banner als er nog geen keuze is
    const saved = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (!saved) setOpen(true);
  }, []);

  const setConsent = (type) => {
    try {
      localStorage.setItem(STORAGE_KEY, type);
      // Update Google Consent Mode
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: type === "all" ? "granted" : "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
        // optioneel: meteen page_view sturen als analytics net geactiveerd is
        if (type === "all" && process.env.NEXT_PUBLIC_GA_ID) {
          window.gtag("event", "page_view");
        }
      }
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999]">
      <div className="mx-auto max-w-4xl rounded-t-2xl border border-white/10 bg-black/90 p-4 text-sm text-gray-200 backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="leading-6">
            Deze site gebruikt cookies voor functionele doeleinden en (optioneel) anonieme statistieken (GA4).
            Lees meer in onze{" "}
            <a href="/privacy" className="underline hover:text-white">
              privacyverklaring
            </a>.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setConsent("functional")}
              className="rounded-xl border border-white/20 bg-transparent px-4 py-2 font-semibold hover:bg-white/10"
            >
              Alleen functioneel
            </button>
            <button
              onClick={() => setConsent("all")}
              className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Alles accepteren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
