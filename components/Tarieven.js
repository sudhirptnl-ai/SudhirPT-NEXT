// components/Tarieven.js
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../sanity/lib/client"; // laat dit pad staan zoals jij het nu gebruikt

const container = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// euro helper – toont 2 decimalen bij x.5 etc., anders zonder
function euro(v) {
  if (v === null || v === undefined || v === "") return "—";
  const n = Number(v);
  if (Number.isNaN(n)) return String(v);
  return n % 1 === 0 ? `€ ${n}` : `€ ${n.toFixed(2)}`;
}

// fallback voor "groep" veld
function detectGroup(t) {
  const raw = (t.groep || t.group || "").toString().toLowerCase();
  if (raw.includes("duo")) return "duo";
  if (raw.includes("ritten")) return "rittenkaart";
  if (raw.includes("1") || raw.includes("op")) return "1op1";
  return "1op1";
}

export default function Tarieven() {
  const [tarieven, setTarieven] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    client
      .fetch(
        `*[_type == "tarief" && actief == true] | order(orderRank) {
          _id,
          titel,
          groep,
          prijsPerMaand,
          prijsPerLes,
          totaalprijs,
          geldigheid,
          beschrijving
        }`
      )
      .then((res) => {
        if (!active) return;
        setTarieven(res || []);
      })
      .catch((e) => console.error("Sanity tarieven error:", e))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  const grouped = useMemo(() => {
    const one = [];
    const duo = [];
    const rit = [];
    (tarieven || []).forEach((t) => {
      const g = detectGroup(t);
      if (g === "duo") duo.push(t);
      else if (g === "rittenkaart") rit.push(t);
      else one.push(t);
    });
    return { one, duo, rit };
  }, [tarieven]);

  return (
    <section id="tarieven" className="s-body py-20">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Titel */}
        <motion.div variants={item} className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">Tarieven</h2>
          <p className="mt-2 text-gray-300">
            Trajecten van 3 of 6 maanden • Inclusief persoonlijk trainingsplan en
            voedingsschema’s
          </p>
        </motion.div>

        {/* Tabel layout */}
        <motion.div
          variants={item}
          className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* 1-op-1 */}
          <Column
            title="1-op-1"
            items={grouped.one}
            emptyText={loading ? "Laden…" : "Geen tarieven"}
          />

          {/* Duo */}
          <Column
            title="Duo"
            items={grouped.duo}
            emptyText={loading ? "Laden…" : "Geen tarieven"}
          />

          {/* Rittenkaart */}
          <Column
            title="Rittenkaart"
            items={grouped.rit}
            isRittenkaart
            emptyText={loading ? "Laden…" : "Geen tarieven"}
          />
        </motion.div>

        {/* CTA */}
        <motion.div variants={item} className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-block rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3 font-semibold shadow-lg transition"
          >
            Plan je gratis intake
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Kolom + kaartjes */
function Column({ title, items = [], isRittenkaart = false, emptyText }) {
  return (
    <div>
      <div className="s-pill text-center">{title}</div>

      <div className="mt-4 space-y-4">
        {items.length === 0 ? (
          <div className="s-card p-5 text-center text-gray-400">{emptyText}</div>
        ) : (
          items.map((t) => (
            <motion.div key={t._id} variants={item} className="s-card p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-white">{t.titel}</h3>
              </div>

              {/* Prijsblok */}
              <div className="mt-2">
                {isRittenkaart ? (
                  <>
                    {/* Rittenkaart: toon totaalprijs groot */}
                    <div className="text-2xl font-extrabold text-red-400">
                      {euro(t.totaalprijs)}
                    </div>
                    {t.geldigheid || t.beschrijving ? (
                      <div className="mt-1 text-sm text-gray-300">
                        {t.geldigheid || t.beschrijving}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    {/* Abonnementen: per maand groot, per les klein */}
                    <div className="text-2xl font-extrabold text-red-400">
                      {euro(t.prijsPerMaand)}
                      <span className="ml-1 text-sm font-medium text-gray-300">
                        / maand
                      </span>
                    </div>
                    {t.prijsPerLes ? (
                      <div className="mt-1 text-sm text-gray-300">
                        ({euro(t.prijsPerLes)} per les)
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
