// pages/index.js
import Image from "next/image";
import { motion } from "framer-motion";
import { ctaClick } from "../lib/gtag";
import Navbar from "../components/Navbar";
import OverMij from "../components/OverMij";
import Locaties from "../components/Locaties";
import Diensten from "../components/Diensten";
import Tarieven from "../components/Tarieven";
import BlogPreview from "../components/BlogPreview";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Head from "next/head";

// Smooth scroll helper
function scrollToWithOffset(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: "smooth" });
}

// Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Index() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.sudhirpt.nl";

  // WebSite JSON-LD (bestond al)
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SudhirPT",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Organization JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SudhirPT",
    url: siteUrl,
    logo: `${siteUrl}/favicon-512.png`,
    sameAs: ["https://instagram.com/sudhir_s94"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+31-6-3937-1019",
        contactType: "customer service",
        areaServed: "NL",
        availableLanguage: ["nl", "en"],
      },
    ],
  };

  // LocalBusiness JSON-LD (Personal training)
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SudhirPT",
    url: siteUrl,
    image: `${siteUrl}/og-default.jpg`,
    telephone: "+31-6-3937-1019",
    email: "info@sudhirpt.nl",
    priceRange: "€€",
    taxID: "98034820", // KVK
    vatID: "NL005305222B64", // BTW
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industrieweg 40",
      addressLocality: "Berkel en Rodenrijs",
      addressCountry: "NL",
    },
    sameAs: ["https://instagram.com/sudhir_s94"],
    // optional: geo / openingHoursSpecification kun je later toevoegen
  };

  return (
    <div className="min-h-screen bg-[#0b121a] text-white">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </Head>

      <Navbar />

      {/* HERO */}
      <motion.section
        id="home"
        className="relative isolate overflow-hidden bg-black min-h-[72vh] md:min-h-[86vh]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 1.1, y: -40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-fitness.png"
            alt="Hero achtergrond – krachttraining"
            fill
            priority
            sizes="100vw"
            className="object-cover pointer-events-none"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/50 to-transparent" />

        <motion.div
          className="relative z-10 mx-auto max-w-5xl px-6 pt-40 pb-20 md:pt-80 md:pb-28 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Word de sterkste versie van jezelf
          </motion.h1>

          <motion.p className="mt-4 text-lg md:text-xl text-gray-200">
            Persoonlijke begeleiding, heldere communicatie en duurzame resultaten.
          </motion.p>

          <motion.button
            onClick={() => {
              ctaClick("hero_intake");
              scrollToWithOffset("contact");
            }}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3 text-white font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Boek een gratis intake
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Secties */}
      <motion.section
        id="over"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="scroll-mt-24 bg-[#0b121a] px-6 py-20"
      >
        <OverMij />
      </motion.section>

      <motion.section
        id="locaties"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="scroll-mt-24 bg-[#0b121a] px-6 py-20"
      >
        <Locaties />
      </motion.section>

      <motion.section
        id="diensten"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="scroll-mt-24 bg-[#0b121a] px-6 py-20"
      >
        <Diensten />
      </motion.section>

      <motion.section
        id="tarieven"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="scroll-mt-24 bg-[#0b121a] px-6 py-20"
      >
        <Tarieven />
      </motion.section>

      <motion.section
        id="blog"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="scroll-mt-24 bg-[#0b121a] px-6 py-20"
      >
        <BlogPreview />
      </motion.section>

      <motion.section
        id="contact"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="scroll-mt-24 bg-[#0b121a] px-6 py-20 text-center"
      >
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="max-w-xl mx-auto text-lg mb-8 text-gray-300">
          Heb je interesse in personal training of vragen? Stuur gerust een bericht.
        </p>
        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>
      </motion.section>

      <Footer
        onInstagramClick={() => ctaClick("footer_instagram")}
        onWhatsAppClick={() => ctaClick("footer_whatsapp")}
      />
    </div>
  );
}
