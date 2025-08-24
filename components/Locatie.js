// components/Locatie.js (DEBUG, ultra-minimal)
import React, { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";

// 👉 IMPORTANT: TYPE NAME
// If your schema has: export default { name: 'locatie', ... } leave as is.
// If it's 'locaties' (plural) or something else, change the type below.
const TYPE_NAME = "locatie";

const QUERY = `
*[_type == "${TYPE_NAME}"] | order(coalesce(orderRank, 0) asc, _createdAt asc) {
  _id, titel, omschrijving, adres, stad, googleMapsLink
}
`;

export default function Locatie() {
  const [state, setState] = useState({ loading: true, error: "", items: [] });

  useEffect(() => {
    let on = true;
    client
      .fetch(QUERY)
      .then((res) => {
        if (!on) return;
        console.log("LOCATIES_RAW", res); // ← open devtools console to see raw data
        setState({ loading: false, error: "", items: Array.isArray(res) ? res : [] });
      })
      .catch((err) => {
        if (!on) return;
        console.error("LOCATIES_ERROR", err);
        setState({ loading: false, error: "Kon locaties niet laden.", items: [] });
      });
    return () => { on = false; };
  }, []);

  return (
    <section id="locaties" className="bg-black px-6 py-20 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Locaties (debug)</h2>

        {state.loading && <p className="text-gray-400">Laden…</p>}
        {state.error && <p className="text-red-400">{state.error}</p>}
        {!state.loading && !state.error && state.items.length === 0 && (
          <p className="text-gray-400">Geen locaties gevonden (controleer type & publicatie).</p>
        )}

        {state.items.length > 0 && (
          <ul className="space-y-3">
            {state.items.map((l) => (
              <li key={l._id} className="rounded-lg bg-gray-900/60 p-4 border border-white/5">
                <div className="font-semibold">{l.titel || "(zonder titel)"}</div>
                {(l.adres || l.stad) && (
                  <div className="text-sm text-gray-400">
                    {l.adres ? `${l.adres}${l.stad ? ", " : ""}` : ""}
                    {l.stad || ""}
                  </div>
                )}
                {l.omschrijving && <div className="text-gray-300 mt-1">{l.omschrijving}</div>}
                {l.googleMapsLink && (
                  <div className="mt-2">
                    <a
                      className="text-red-400 underline"
                      href={l.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
