// pages/privacy.js
import Head from "next/head";
import PdfButtons from "../components/PdfButtons";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacyverklaring – Sudhir PT</title>
      </Head>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
          <a href="/" className="text-sm text-red-400 hover:text-red-300">← Terug naar site</a>
          <PdfButtons
            targetId="privacy-content"
            filename="Privacyverklaring-SudhirPT.pdf"
            gaLabel="privacy"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-4 lg:col-span-3 print:hidden">
            <div className="sticky top-4 rounded-xl bg-black/30 ring-1 ring-white/10 p-4">
              <h2 className="text-lg font-semibold mb-3">Inhoud</h2>
              <nav className="text-sm space-y-2 leading-6">
                <a href="#verantwoordelijke" className="block hover:text-red-300">Artikel 1: Verantwoordelijke</a>
                <a href="#gegevens" className="block hover:text-red-300">Artikel 2: Gegevens</a>
                <a href="#doeleinden" className="block hover:text-red-300">Artikel 3: Waarom verzamelen</a>
                <a href="#bewaartermijn" className="block hover:text-red-300">Artikel 4: Bewaartermijn</a>
                <a href="#delen" className="block hover:text-red-300">Artikel 5: Delen</a>
                <a href="#beveiliging" className="block hover:text-red-300">Artikel 6: Beveiliging</a>
                <a href="#rechten" className="block hover:text-red-300">Artikel 7: Rechten</a>
                <a href="#klachten" className="block hover:text-red-300">Artikel 8: Klachten</a>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main id="privacy-content" className="md:col-span-8 lg:col-span-9 prose prose-invert max-w-none relative pdf-watermark">
            <h1 className="!mb-6">Privacyverklaring – Sudhir PT</h1>
            <p><em>Laatste update: 31-08-2025</em></p>

            <h2 id="verantwoordelijke">Artikel 1 – Verantwoordelijke</h2>
            <p>
              Sudhir PT<br />
              Sudhir Sewtahalsing<br />
              Prins Johan Willem Frisolaan 272<br />
              KvK: 98034820<br />
              E-mail: <a href="mailto:info@sudhirpt.nl">info@sudhirpt.nl</a>
            </p>

            <h2 id="gegevens">Artikel 2 – Welke persoonsgegevens verzamelen wij?</h2>
            <ul>
              <li>Naam, adres, woonplaats (NAW-gegevens)</li>
              <li>Telefoonnummer en e-mailadres</li>
              <li>Geboortedatum</li>
              <li>Gezondheidsgegevens (voor trainingsdoeleinden)</li>
              <li>Informatie over trainingsdoelen en voortgang</li>
              <li>Betaalgegevens</li>
            </ul>

            <h2 id="doeleinden">Artikel 3 – Waarom verzamelen wij deze gegevens?</h2>
            <ul>
              <li>Om je aan te melden als klant</li>
              <li>Voor het plannen en uitvoeren van trainingen</li>
              <li>Om contact met je op te nemen</li>
              <li>Voor facturatie en administratie</li>
              <li>Om trainingen af te stemmen op jouw gezondheid en doelen</li>
              <li>Voor het voldoen aan wettelijke verplichtingen</li>
            </ul>

            <h2 id="bewaartermijn">Artikel 4 – Hoe lang bewaren wij jouw gegevens?</h2>
            <ul>
              <li>Administratieve gegevens: maximaal 7 jaar (fiscale bewaarplicht)</li>
              <li>Gezondheidsgegevens: maximaal 2 jaar na beëindiging van de dienstverlening, tenzij je eerder om verwijdering vraagt</li>
            </ul>

            <h2 id="delen">Artikel 5 – Delen van gegevens</h2>
            <p>
              Wij delen jouw gegevens niet met derden, tenzij:
            </p>
            <ul>
              <li>Dit wettelijk verplicht is (bijv. Belastingdienst)</li>
              <li>Je daar uitdrukkelijk toestemming voor hebt gegeven</li>
            </ul>

            <h2 id="beveiliging">Artikel 6 – Beveiliging van gegevens</h2>
            <p>
              Sudhir PT neemt passende technische en organisatorische maatregelen om jouw gegevens te beschermen tegen verlies, misbruik of onbevoegde toegang.
            </p>

            <h2 id="rechten">Artikel 7 – Rechten van betrokkenen</h2>
            <ul>
              <li>Inzage, correctie of verwijdering</li>
              <li>Bezwaar maken tegen verwerking</li>
              <li>Toestemming intrekken</li>
              <li>Mail: <a href="mailto:info@sudhirpt.nl">info@sudhirpt.nl</a></li>
            </ul>

            <h2 id="klachten">Artikel 8 – Klachten</h2>
            <p>
              Heb je een klacht? Neem contact met ons op. Je kunt ook terecht bij de Autoriteit Persoonsgegevens:{" "}
              <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noreferrer">
                https://autoriteitpersoonsgegevens.nl
              </a>.
            </p>
          </main>
        </div>
      </div>

      <style jsx global>{`
        .pdf-watermark::before { display: none; }
        @media print {
          .print\\:hidden { display: none !important; }
          .pdf-watermark::before {
            content: "Sudhir PT";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 4rem;
            font-weight: 700;
            color: rgba(200, 200, 200, 0.08);
            pointer-events: none;
            white-space: nowrap;
          }
        }
      `}</style>
    </>
  );
}
