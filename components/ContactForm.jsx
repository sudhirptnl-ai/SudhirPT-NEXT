// components/ContactForm.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const formRef = useRef(null);

  const isLoading = status.type === "loading";
  const isSuccess = status.type === "success";
  const isError = status.type === "error";

  // Meldingen (toast) automatisch laten verdwijnen
  useEffect(() => {
    if (status.type === "success" || status.type === "error") {
      const t = setTimeout(() => setStatus({ type: "idle", msg: "" }), 5000);
      return () => clearTimeout(t);
    }
  }, [status.type]);

  async function onSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    const fd = new FormData(form);

    // Honeypot
    if (fd.get("website")) {
      setStatus({ type: "error", msg: "Er ging iets mis. Probeer het later opnieuw." });
      return;
    }

    setStatus({ type: "loading", msg: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const out = await res.json();
      if (!res.ok || !out.ok) throw new Error(out.error || "Versturen mislukt");

      // Reset velden
      form.reset();
      const dienstSelect = form.querySelector("#dienst");
      if (dienstSelect) dienstSelect.value = "";

      setStatus({ type: "success", msg: "Bedankt! Je bericht is verzonden." });
      
      // GA4 event
      import("../lib/gtag").then(({ contactSubmit }) => contactSubmit());

      // Zet na 2.5s de knop weer terug naar “Versturen”
      const t = setTimeout(() => setStatus({ type: "idle", msg: "" }), 2500);
      return () => clearTimeout(t);
    } catch (err) {
      setStatus({ type: "error", msg: err.message || "Er ging iets mis. Probeer het later opnieuw." });
    }
  }

  return (
    <>
      {/* Toast notificatie */}
      <AnimatePresence>
        {(isSuccess || isError) && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg text-white font-medium
              ${isSuccess ? "bg-green-600" : "bg-red-600"}`}
            role="status"
            aria-live="polite"
          >
            {status.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-xl w-full"
      >
        <motion.div
          variants={item}
          className="rounded-2xl bg-black/30 ring-1 ring-white/10 shadow-xl shadow-black/30 p-5 sm:p-6 md:p-7 backdrop-blur-[2px]"
        >
          <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4 text-left" noValidate>
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
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/90 text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:bg-gray-800 disabled:opacity-70"
              />
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-gray-300">E-mailadres</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="E-mailadres"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/90 text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:bg-gray-800 disabled:opacity-70"
              />
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-1.5">
              <label htmlFor="telefoon" className="text-sm text-gray-300">Telefoonnummer (optioneel)</label>
              <input
                id="telefoon"
                name="telefoon"
                type="tel"
                placeholder="Telefoonnummer"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/90 text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:bg-gray-800 disabled:opacity-70"
              />
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-1.5">
              <label htmlFor="dienst" className="text-sm text-gray-300">Dienst</label>
              <select
                id="dienst"
                name="dienst"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/90 text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:bg-gray-800 disabled:opacity-70"
                defaultValue=""
              >
                <option value="" disabled>Kies een dienst…</option>
                <option>1-op-1 Personal Training</option>
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
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/90 text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:bg-gray-800 resize-y disabled:opacity-70"
              />
            </motion.div>

            {/* Knop met checkmark-animatie */}
            <motion.button
              variants={item}
              type="submit"
              disabled={isLoading || isSuccess}
              className={`mt-2 w-full px-6 py-3 rounded-lg font-semibold transition-colors text-white
                ${isSuccess ? "bg-green-600 hover:bg-green-600" : "bg-red-600 hover:bg-red-700"}
                disabled:opacity-70 disabled:hover:bg-red-600 flex items-center justify-center gap-2`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isLoading ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Versturen…
                  </motion.span>
                ) : isSuccess ? (
                  <motion.span
                    key="sent"
                    className="inline-flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {/* Checkmark icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="h-5 w-5 mr-1"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Verzonden
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Versturen
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}
