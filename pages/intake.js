// pages/intake.js
import Head from "next/head";
import PdfButtons from "../components/PdfButtons";

export default function Intake() {
  return (
    <>
      <Head>
        <title>Intakeformulier & Gezondheidsverklaring – Sudhir PT</title>
      </Head>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
          <a href="/" className="text-sm text-red-400 hover:text-red-300">← Terug naar site</a>
          <PdfButtons
            targetId="intake-content"
            filename="Intakeformulier-SudhirPT.pdf"
            gaLabel="intake"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-4 lg:col-span-3 print:hidden">
            <div className="sticky top-4 rounded-xl bg-black/30 ring-1 ring-white/10 p-4">
              <h2 className="text-lg font-semibold mb-3">Inhoud</h2>
              <nav className="text-sm space-y-2 leading-6">
                <a href="#intro" className="block hover:text-red-300">Introductie</a>
                <a href="#persoonlijk" className="block hover:text-red-300">Persoonlijke gegevens</a>
                <a href="#doelen" className="block hover:text-red-300">Doelen en motivatie</a>
                <a href="#gezondheid" className="block hover:text-red-300">Gezondheidsverklaring</a>
                <a href="#verklaring" className="block hover:text-red-300">Verklaring & toestemming</a>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main id="intake-content" className="md:col-span-8 lg:col-span-9 prose prose-invert max-w-none relative pdf-watermark">
            <h1 className="!mb-6">Intakeformulier & Gezondheidsverklaring</h1>

            <h2 id="intro">Introductie</h2>
            <p>
              Dit formulier dient voorafgaand aan de eerste trainingssessie ingevuld en
              ondertekend te worden. Alle gegevens worden vertrouwelijk behandeld.
            </p>

            <h2 id="persoonlijk">Persoonlijke gegevens</h2>
            <ul>
              <li>Naam: ____________________________</li>
              <li>Geboortedatum: ____________________</li>
              <li>Telefoonnummer: ___________________</li>
              <li>E-mailadres: ______________________</li>
              <li>Adres: ____________________________</li>
            </ul>

            <h2 id="doelen">Doelen en motivatie</h2>
            <p>Wat wil je bereiken met personal training?</p>
            <ul>
              <li>☐ Afvallen</li>
              <li>☐ Spiermassa opbouwen</li>
              <li>☐ Conditie verbeteren</li>
              <li>☐ Revalidatie</li>
              <li>☐ Anders: ____________________</li>
            </ul>

            <p>Heb je eerder aan fitness of sport gedaan? ☐ Ja ☐ Nee</p>
            <p>Heb je voorkeuren of beperkingen qua oefeningen? _____________________</p>

            <h2 id="gezondheid">Gezondheidsverklaring</h2>
            <ol>
              <li>Heb je last van hartklachten of hoge bloeddruk? ☐ Ja ☐ Nee – Toelichting: _________</li>
              <li>Heb je recent een operatie of blessure gehad? ☐ Ja ☐ Nee – Toelichting: _________</li>
              <li>Gebruik je medicijnen die inspanning beïnvloeden? ☐ Ja ☐ Nee – Toelichting: _________</li>
              <li>Heb je last van duizeligheid of ademhalingsproblemen bij inspanning? ☐ Ja ☐ Nee – Toelichting: _________</li>
              <li>Andere medische omstandigheden waar rekening mee moet worden gehouden? ☐ Ja ☐ Nee – Toelichting: _________</li>
            </ol>

            <h2 id="verklaring">Verklaring en toestemming</h2>
            <p>
              Ik verklaar dat de bovenstaande informatie naar waarheid is ingevuld. Ik begrijp dat deelname aan trainingen bij Sudhir PT op eigen risico is en ik ben zelf verantwoordelijk voor het informeren van Sudhir PT bij veranderingen in mijn gezondheid.
            </p>
            <p>
              Handtekening klant: _____________________ &nbsp;&nbsp; Datum: __________
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
