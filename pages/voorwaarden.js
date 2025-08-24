// pages/voorwaarden.js
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_TITLE = "Algemene Voorwaarden";

/**
 * HELPER: Maak HTML uit Markdown-achtige koppen "## Titel"
 * - Plain text blijft plain (met witregels), dus je hoeft niets te doen.
 * - Als je headings gebruikt met "## ", wordt een eenvoudige TOC opgebouwd.
 */
function parseContentToHtmlAndToc(raw) {
  const lines = raw.split(/\r?\n/);
  const toc = [];
  const html = [];
  let para = [];

  const flushPara = () => {
    if (para.length) {
      const text = para.join("\n");
      // Toon exact met enters:
      html.push(`<div style="white-space:pre-wrap">${escapeHtml(text)}</div>`);
      para = [];
    }
  };

  const escapeHtml = (s) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  lines.forEach((line) => {
    const m = line.match(/^##\s+(.+)$/); // heading 2
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

export default function Voorwaarden() {
  const articleRef = useRef(null);
  const [toc, setToc] = useState([]);

  // ======= PLAK HIER JE EXACTE TEKST TUSSEN DE BACKTICKS =======
  const RAW = useMemo(
    () => `
## Artikel 1: Definities
In deze algemene voorwaarden wordt verstaan onder:
- Dienstverlener: Sudhir PT, gevestigd te Leidschendam, ingeschreven bij de Kamer van Koophandel onder nummer: 98034820
- Klant: de natuurlijke persoon die een overeenkomst aangaat met Sudhir PT voor personal training.
- Training: een fysieke trainingssessie van 60 minuten, individueel of in duo, verzorgd door Sudhir PT op locatie bij InvictusGym in Berkel en Rodenrijs.
## Artikel 2: Toepasselijkheid
Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en diensten van Sudhir PT, tenzij schriftelijk anders overeengekomen.
## Artikel 3: Diensten
Sudhir PT biedt personal training aan in de vorm van individuele of duo-sessies, op afspraak en op locatie bij InvictusGym in Berkel en Rodenrijs. Daarnaast biedt Sudhir PT ook strippenkaarten en maatwerktrajecten aan, in overleg met de klant.
## Artikel 4: Inschrijvingen en afspraken
1. Een training wordt geboekt op afspraak via e-mail, telefoon of app.
2. Een sessie is pas definitief na bevestiging door Sudhir PT.
3. Klanten zijn zelf verantwoordelijk voor het tijdig aanwezig zijn op de afgesproken locatie.
## Artikel 5: Annulering en no-show
1. Een training kan kosteloos worden geannuleerd tot 24 uur vóór aanvang van de sessie.
2. Bij annulering binnen 24 uur of bij niet verschijnen (no-show), wordt het volledige tarief van de sessie in rekening gebracht.
3. In geval van overmacht (zoals plotselinge ziekte of familieomstandigheden) kan Sudhir PT, naar redelijkheid, besluiten om de sessie kosteloos te verplaatsen.
4. Sudhir PT behoudt zich het recht voor om in uitzonderlijke gevallen (zoals ziekte of overmacht) een sessie te annuleren of te verplaatsen. In dat geval wordt in overleg een nieuw moment ingepland zonder extra kosten voor de klant.
## Artikel 6: Tarieven en betaling
1. Alle tarieven zijn inclusief btw (tenzij anders vermeld).
2. Betaling dient voorafgaand aan de training te geschieden, of via een overeengekomen abonnementsvorm.
3. Sudhir PT accepteert alleen digitale betalingen via het officiële boekhoudsysteem.
4. Bij niet-tijdige betaling behoudt Sudhir PT zich het recht voor om de sessie(s) op te schorten.
## Artikel 6a: Strippenkaarten en geldigheid
1. Sudhir PT biedt strippenkaarten aan voor personal training in de vorm van:
   - 5 sessies:  geldig tot 3 maanden na de eerste geboekte sessie.
   - 10 sessies: geldig tot 4 maanden na de eerste geboekte sessie.
2. De geldigheid gaat in vanaf de datum van de eerste sessie die met de strippenkaart wordt geboekt.
3. Niet-gebruikte sessies vervallen na de genoemde geldigheidsduur en kunnen niet worden verlengd of gerestitueerd, tenzij schriftelijk anders overeengekomen.
4. Strippenkaarten zijn persoonlijk en niet overdraagbaar aan derden.
5. Bij langdurige ziekte of blessure kan, in overleg, een tijdelijke opschorting worden toegestaan. Hiervoor moet de klant dit tijdig melden en eventueel bewijs aanleveren.
6. Indien de klant de samenwerking tussentijds beëindigt, vindt er geen restitutie plaats van de resterende sessies, tenzij Sudhir PT hier uit coulance anders over beslist.
## Artikel 7: Gezondheid en eigen verantwoordelijkheid
1. De klant verklaart naar beste weten gezond te zijn en fysiek in staat te zijn om deel te nemen aan de trainingen.
2. Bij twijfel over de gezondheid dient de klant vooraf medisch advies in te winnen.
3. Deelname aan de trainingen is volledig op eigen risico van de klant.
4. Bij aanvang vult de klant een intakeformulier in waarop gezondheidsgegevens vrijwillig worden gedeeld.
## Artikel 8: Aansprakelijkheid
1. Sudhir PT is niet aansprakelijk voor enige directe of indirecte schade als gevolg van lichamelijk letsel, blessures, verlies van eigendommen of andere schade, tenzij er sprake is van opzet of grove nalatigheid.
2. De klant blijft te allen tijde verantwoordelijk voor het eigen lichaam en de eigen grenzen tijdens de training.
## Artikel 9: Privacy
Sudhir PT verwerkt persoonsgegevens en gezondheidsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).
Gegevens worden alleen verzameld voor trainingsdoeleinden, administratie en communicatie met de klant.
Sudhir PT neemt passende technische en organisatorische maatregelen om deze gegevens te beschermen.
De klant heeft het recht om zijn of haar gegevens in te zien, te corrigeren of te laten verwijderen. Zie de aparte privacyverklaring voor volledige informatie.
## Artikel 10: Beëindiging van de overeenkomst
Beide partijen kunnen de overeenkomst opzeggen met inachtneming van een opzegtermijn van 7 dagen, tenzij anders overeengekomen.
Sessies die binnen deze opzegtermijn vallen, dienen nog te worden afgerond of betaald door de klant.
## Artikel 11: Toepasselijk recht en geschillen
Op deze algemene voorwaarden is Nederlands recht van toepassing. Geschillen worden bij voorkeur in onderling overleg opgelost. Indien dit niet lukt, worden geschillen voorgelegd aan de bevoegde rechter in de regio Haaglanden/langsingerland.
`,
    []
  );
  // =============================================================

  const parsed = useMemo(() => parseContentToHtmlAndToc(RAW), [RAW]);

  useEffect(() => {
    setToc(parsed.toc);
  }, [parsed.toc]);

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
        {/* Terug naar site */}
        <div className="no-print sticky top-16 z-40 bg-black/60 backdrop-blur border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-2">
            <Link href="/" className="text-sm text-red-500 hover:underline">← Terug naar site</Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-16 pb-24">
          {/* Titel + knoppen */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-extrabold tracking-tight">{PAGE_TITLE}</h1>
            <div className="flex gap-3">
              <button onClick={handlePrint} className="rounded-lg bg-gray-800 hover:bg-gray-700 px-4 py-2 text-sm font-semibold">Print</button>
              <button onClick={handlePdf} className="rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-semibold">Download PDF</button>
            </div>
          </div>

          {/* Inhoudsopgave + artikel */}
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
