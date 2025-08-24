// pages/intake.js
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_TITLE = "Intakeformulier & Gezondheidsverklaring";

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

export default function Intake() {
  const articleRef = useRef(null);
  const [toc, setToc] = useState([]);

  // ======= PLAK HIER JE EXACTE TEKST =======
  const RAW = useMemo(
    () => `
Dit formulier dient voorafgaand aan de eerste trainingssessie ingevuld en ondertekend te worden. Alle gegevens worden vertrouwelijk behandeld.
## Persoonlijke gegevens
Naam: __________________________________________
Geboortedatum: _______________
Telefoonnummer: _______________
E-mailadres: ___________________
Adres: __________________________________________
## Doelen en motivatie
Wat wil je bereiken met personal training?
☐ Afvallen    ☐ Spiermassa opbouwen    ☐ Conditie verbeteren    ☐ Revalidatie    ☐ Anders: __________________________
Heb je eerder aan fitness of sport gedaan?
☐ Ja    ☐ Nee
Heb je voorkeuren of beperkingen qua oefeningen?
__________________________________________________
## Gezondheidsverklaring
Beantwoord de volgende vragen naar waarheid:
1. Heb je last van hartklachten of een hoge bloeddruk?
☐ Ja    ☐ Nee
Toelichting (indien van toepassing): __________________________________________
2. Heb je recent een operatie of blessure gehad?
☐ Ja    ☐ Nee
Toelichting (indien van toepassing): __________________________________________
3. Gebruik je medicijnen die van invloed zijn op fysieke inspanning?
☐ Ja    ☐ Nee
Toelichting (indien van toepassing): __________________________________________
4. Heb je last van duizeligheid of ademhalingsproblemen bij inspanning?
☐ Ja    ☐ Nee
Toelichting (indien van toepassing): __________________________________________
5. Zijn er andere medische omstandigheden waar wij rekening mee moeten houden?
☐ Ja    ☐ Nee
Toelichting (indien van toepassing): __________________________________________
## Verklaring en toestemming
Ik verklaar dat de bovenstaande informatie naar waarheid is ingevuld. Ik begrijp dat deelname aan trainingen bij Sudhir PT op eigen risico is en ik ben zelf verantwoordelijk voor het informeren van Sudhir PT bij veranderingen in mijn gezondheid.
Handtekening klant: _______________________    Datum: ___________
Ik geef toestemming voor het verwerken van mijn persoonsgegevens zoals beschreven in de privacyverklaring van Sudhir PT.
Handtekening: _______________________    Datum: ___________   
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
