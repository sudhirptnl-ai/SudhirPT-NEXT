// components/LocatiesEnKaart.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { client } from "../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const MapInner = dynamic(() => import("./MapInner"), { ssr: false });

const builder = imageUrlBuilder(client);
const urlFor = (src) => (src ? builder.image(src).width(1200).url() : null);

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const defaultItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function LocatiesEnKaart({ itemVariants }) {
  const [locaties, setLocaties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "locatie" && !(_id in path("drafts.**"))] | order(orderRank asc) {
          _id, titel, omschrijving, uitgebreideOmschrijving, adres, stad, lat, lng,
          googleMapsLink, afbeelding { asset->{ url, metadata { dimensions { width, height } } } }
        }`
      )
      .then(setLocaties)
      .catch((e) => setError(e.message || "Kon locaties niet laden"));
  }, []);

  const cardVariants = itemVariants || defaultItemVariants;

  // markers voor de kaart
  const markers = useMemo(
    () =>
      locaties
        .filter((l) => typeof l.lat === "number" && typeof l.lng === "number")
        .map((l) => ({ id: l._id, title: l.titel, position: [l.lat, l.lng] })),
    [locaties]
  );

  // center bepalen (eerste locatie of NL midden)
  const mapCenter = useMemo(() => {
    if (markers.length) return markers[0].position;
    return [52.1326, 5.2913]; // NL
  }, [markers]);

  const onMarkerClick = useCallback((id) => {
    // je kunt hier bv. scrollen naar het betreffende kaartje of highlighten
    const el = document.getElementById(`loc-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <motion.section
      id="locaties"
      className="scroll-mt-24 bg-[#0B121A] px-6 py-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2">
        {/* Kaart */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="h-[360px] w-full">
            <MapInner center={mapCenter} markers={markers} onMarkerClick={onMarkerClick} />
          </div>
        </div>

        {/* Lijst met locaties (geanimeerd per kaartje) */}
        <div className="grid gap-6 sm:grid-cols-1">
          {error && <p className="text-red-400">{error}</p>}
          {locaties.map((loc) => {
            const imgSrc = loc.afbeelding?.asset?.url || urlFor(loc.afbeelding);
            return (
              <motion.article
                id={`loc-${loc._id}`}
                key={loc._id}
                variants={cardVariants}
                className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="relative aspect-video">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={loc.titel || "Locatie"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-800 flex items-center justify-center text-gray-400">
                      Geen afbeelding
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white">{loc.titel}</h3>
                  {(loc.adres || loc.stad) && (
                    <p className="text-sm text-gray-400 mt-1">
                      {loc.adres}
                      {loc.adres && loc.stad ? ", " : ""}
                      {loc.stad}
                    </p>
                  )}
                  {loc.omschrijving && (
                    <p className="text-gray-300 text-sm leading-relaxed mt-3">
                      {loc.omschrijving}
                    </p>
                  )}
                  {loc.uitgebreideOmschrijving && (
                    <p className="text-gray-400 text-sm leading-relaxed mt-2">
                      {loc.uitgebreideOmschrijving}
                    </p>
                  )}

                  {/* Route knop */}
                  <div className="mt-4">
                    {loc.googleMapsLink ? (
                      <a
                        href={loc.googleMapsLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Route
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-sm text-gray-500">Geen route‑link toegevoegd.</span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
