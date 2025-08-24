// components/Footer.jsx
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

function trackSocialClick({ network, target = "Footer" }) {
  try {
    window.gtag?.("event", "click_social", {
      social_network: network,    // "Instagram" | "WhatsApp"
      social_target: target,      // "Footer"
      location_path: typeof window !== "undefined" ? window.location.pathname : "",
    });
  } catch {
    /* stil falen, geen blokkade van de klik */
  }
}

export default function Footer() {
  // ✅ VUL HIER JE ECHTE LINKS IN
  const INSTAGRAM_URL = "https://instagram.com/sudhir_s94"; // TODO
  const WHATSAPP_URL  = "https://wa.me/31639371019";         // TODO (zonder + en zonder spaties)

  return (
    <footer className="bg-black text-gray-300 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Kolom 1: logo/naam */}
          <div>
            <h3 className="text-xl font-bold text-white">SudhirPT</h3>
            <p className="mt-2 text-sm text-gray-400">
              Sterker. Fitter. Duurzame resultaten.
            </p>
          </div>

          {/* Kolom 2: navigatie (voorbeeld – laat zoals je ‘m al had) */}
          <nav className="text-sm">
            <ul className="space-y-2">
              <li><Link href="/#over" className="hover:text-white">Over</Link></li>
              <li><Link href="/#diensten" className="hover:text-white">Diensten</Link></li>
              <li><Link href="/#tarieven" className="hover:text-white">Tarieven</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/#contact" className="hover:text-white">Contact</Link></li>
              <li className="pt-2"><Link href="/voorwaarden" className="hover:text-white">Algemene voorwaarden</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacyverklaring</Link></li>
              <li><Link href="/intake" className="hover:text-white">Intakeformulier</Link></li>
            </ul>
          </nav>

          {/* Kolom 3: socials + contact */}
          <div className="text-sm">
            <h4 className="font-semibold text-white">Volg of bericht me</h4>
            <div className="mt-3 flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opent in nieuw tabblad)"
                onClick={() => trackSocialClick({ network: "Instagram" })}
                className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 hover:bg-white/10 transition"
                title="Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp (opent in nieuw tabblad)"
                onClick={() => trackSocialClick({ network: "WhatsApp" })}
                className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 hover:bg-white/10 transition"
                title="WhatsApp"
              >
                <FaWhatsapp className="h-6 w-6" />
              </a>
            </div>

            {/* Contactgegevens (optioneel aanpassen) */}
            <div className="mt-5 space-y-1 text-gray-400">
              <p>info@sudhirpt.nl</p>
              <p>KVK: 98034820</p>
              <p>BTW: NL005305222B64</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} SudhirPT. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
