// components/ContactForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 },
  },
};
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function ContactForm() {
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Honeypot
    if (fd.get("website")) {
      setStatus({ type: "error", msg: "Er ging iets mis. Probeer het later opnieuw." });
      return;
    }

    setStatus({ type: "loading", msg: "" });
    const body = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Netwerkfout");

      setStatus({ type: "success", msg: "Bedankt! Ik reageer zo snel mogelijk." });
      e.currentTarget.reset();
    } catch {
      setStatus({ type: "error", msg: "Er ging iets mis. Probeer het later opnieuw." });
    }
  }

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="mx-auto max-w-xl w-full"
    >
      {/* Kaart */}
      <motion.div
        variants={item}
        className="rounded-2xl bg-black/30 ring-1 ring-white/10 shadow-xl shadow-black/30 p-5 sm:p-6 md:p-7 backdrop-blur-[2px]"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4 text-left">
          {/* Honeypot */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <motion.div variants={item} className="flex flex-col gap-1.5">
            <label htmlFor="naam" className="text-sm text-gray-300">Naam</label>
            <input
              id="naam"
              name="naam"
              type="text"
              required
              placeholder="Naam"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/90 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:bg-gray-800"
            />
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-gray-300">E‑mailadres</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="E‑mailadres"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/90 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:bg-gray-800"
            />
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-1.5">
            <label htmlFor="telefoon" className="text-sm text-gray-300">Telefoonnummer (optioneel)</label>
            <input
              id="telefoon"
              name="telefoon"
              type="tel"
              placeholder="Telefoonnummer"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/90 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:bg-gray-800"
            />
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-1.5">
            <label htmlFor="dienst" className="text-sm text-gray-300">Dienst</label>
            <select
              id="dienst"
              name="dienst"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/90 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:bg-gray-800"
              defaultValue=""
            >
              <option value="" disabled>Kies een dienst…</option>
              <option>1‑op‑1 Personal Training</option>
              <option>Duo Training</option>
              <option>Rittenkaart</option>
            </select>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-1.5">
            <label htmlFor="bericht" className="text-sm text-gray-300">Bericht</label>
            <textarea
              id="bericht"
              name="bericht"
              rows={4}
              required
              placeholder="Je bericht…"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/90 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:bg-gray-800 resize-y"
            />
          </motion.div>

          <motion.button
            variants={item}
            type="submit"
            disabled={status.type === "loading"}
            className="mt-2 w-full bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:hover:bg-red-600
                       px-6 py-3 rounded-lg text-white font-semibold transition-colors"
          >
            {status.type === "loading" ? "Versturen…" : "Versturen"}
          </motion.button>

          {/* Statusmeldingen */}
          {status.type === "success" && (
            <motion.p variants={item} className="text-green-400 text-sm pt-1">
              {status.msg}
            </motion.p>
          )}
          {status.type === "error" && (
            <motion.p variants={item} className="text-red-400 text-sm pt-1">
              {status.msg}
            </motion.p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}
