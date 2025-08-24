// pages/privacy.js
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_TITLE = "Privacyverklaring";

function parseContentToHtmlAndToc(raw) {
  const lines = raw.split(/\r?\n/);
  const toc = [];
  const html = [];
  let para = [];

  const escapeHtml = (s) =>
    s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  const flushPara = () => {
    if (para.length) {
      const text = para.join("\n");
      html.push(`<div style="white-space:pre-wrap">${escapeHtml(text)}</div>`);
      para = [];
    }
  };

  lines.forEach((line) => {
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      flushPara();
      const title = m[1].trim();
      const id = `sec-${toc.length + 1}`;
      toc.push({ id, text: title });
      html.push(`<h2 id="${id}">${escapeHtml(title)}</h2>`);
    } else {
      para.push(line);
    }
  });
  flushPara();

  return { html: html.join("\n"), toc };
}

export default function Privacy() {
  const articleRef = useRef(null);
  const [toc, setToc] = useState([]);

  // ======= PLAK HIER JE EXACTE TEKST =======
  const RAW = useMemo(
    () => `
    Laatste update: 31-08-2025
## Artikel 1:  Verantwoordelijke
Sudhir PT
Sudhir Sewtahalsing
Prins Johan Willem Frisolaan 272
KvK: 98034820
E-mail: info@sudhirpt.nl
## Artikel 2: Welke persoonsgegevens verzamelen wij?
Wij kunnen de volgende gegevens verzamelen:
- Naam, adres, woonplaats (NAW-gegevens)
- Telefoonnummer en e-mailadres
- Geboortedatum
- Gezondheidsgegevens (voor trainingsdoeleinden)
- Informatie over je trainingsdoelen en voortgang
- Betaalgegevens
## Artikel 3: Waarom verzamelen wij deze gegevens?
Wij verwerken je gegevens voor de volgende doeleinden:
- Om je aan te melden als klant
- Voor het plannen en uitvoeren van trainingen
- Om contact met je op te nemen
- Voor facturatie en administratie
- Om trainingen af te stemmen op jouw gezondheid en doelen
- Voor het voldoen aan wettelijke verplichtingen
## Artikel 4: Hoe lang bewaren wij jouw gegevens?
- Administratieve gegevens: maximaal 7 jaar (fiscale bewaarplicht)
- Gezondheidsgegevens: maximaal 2 jaar na beëindiging van de dienstverlening, tenzij je eerder om verwijdering vraagt
## Artikel 5: Delen van gegevens
Wij delen jouw gegevens niet met derden, tenzij:
- Dit wettelijk verplicht is (bijv. voor de Belastingdienst)
- Je daar uitdrukkelijk toestemming voor hebt gegeven
## Artikel 6: Beveiliging van gegevens
Sudhir PT neemt passende technische en organisatorische maatregelen om jouw gegevens te beschermen tegen verlies, misbruik of onbevoegde toegang.
## Artikel 7: Rechten van betrokkenen
Je hebt het recht om:
- Je gegevens in te zien, aan te passen of te laten verwijderen
- Bezwaar te maken tegen de verwerking van je gegevens
- Je toestemming op elk moment in te trekken
Stuur hiervoor een e-mail naar info@sudhirpt.nl
## Artikel 8: Klachten
Heb je een klacht over de verwerking van je persoonsgegevens? Neem dan contact met ons op. Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens via https://autoriteitpersoonsgegevens.nl.
`, []
  );
  // =========================================

  const parsed = useMemo(() => parseContentToHtmlAndToc(RAW), [RAW]);

  useEffect(() => { setToc(parsed.toc); }, [parsed.toc]);

  const handlePrint = () => window.print();
  const handlePdf = () => {
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;
    const html = `
      <html>
        <head>
          <title>${PAGE_TITLE}</title>
          <link rel="stylesheet" href="/styles/globals.css" />
          <style>
            body { background:#0B121A; color:#E5E7EB; font-family: ui-sans-serif, system-ui, -apple-system; }
            .legal-wrap { max-width: 62rem; margin: 2rem auto; padding: 0 1rem; }
            h1 { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; }
            h2 { font-size: 1.25rem; font-weight: 700; margin-top: 2rem; margin-bottom: .75rem; }
            div[style*="white-space:pre-wrap"] { line-height: 1.7; }
          </style>
        </head>
        <body>
          <div class="legal-wrap">
            <h1>${PAGE_TITLE}</h1>
            ${parsed.html}
          </div>
          <script>window.print()</script>
        </body>
      </html>`;
    w.document.open(); w.document.write(html); w.document.close();
  };

  return (
    <>
      <Head><title>{PAGE_TITLE} • SudhirPT</title></Head>
      <main className="min-h-screen bg-gray-900 text-gray-100">
        <div className="no-print sticky top-16 z-40 bg-black/60 backdrop-blur border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-2">
            <Link href="/" className="text-sm text-red-500 hover:underline">← Terug naar site</Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-16 pb-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-extrabold tracking-tight">{PAGE_TITLE}</h1>
            <div className="flex gap-3">
              <button onClick={handlePrint} className="rounded-lg bg-gray-800 hover:bg-gray-700 px-4 py-2 text-sm font-semibold">Print</button>
              <button onClick={handlePdf} className="rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-semibold">Download PDF</button>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <h2 className="text-base font-semibold">Inhoud</h2>
                {toc.length === 0 ? (
                  <p className="mt-2 text-sm text-gray-400">—</p>
                ) : (
                  <ol className="mt-3 space-y-2 text-sm">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="text-gray-300 hover:text-white">{t.text}</a>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </aside>

            <article
              ref={articleRef}
              className="prose prose-invert max-w-none lg:col-span-9"
              dangerouslySetInnerHTML={{ __html: parsed.html }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
