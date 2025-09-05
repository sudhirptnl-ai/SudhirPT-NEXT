// pages/voorwaarden.js
import Head from "next/head";
import PdfButtons from "../components/PdfButtons";

export default function Voorwaarden() {
  return (
    <>
      <Head>
        <title>Algemene Voorwaarden – Sudhir PT</title>
      </Head>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Topbar met teruglink en knoppen */}
        <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
          <a href="/" className="text-sm text-red-400 hover:text-red-300">
            ← Terug naar site
          </a>
          <PdfButtons
            targetId="voorwaarden-content"
            filename="Algemene-Voorwaarden-SudhirPT.pdf"
            gaLabel="voorwaarden"
          />
        </div>

        {/* Layout: sidebar + content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Inhoudsbalk links (sticky) */}
          <aside className="md:col-span-4 lg:col-span-3 print:hidden">
            <div className="sticky top-4 rounded-xl bg-black/30 ring-1 ring-white/10 p-4">
              <h2 className="text-lg font-semibold mb-3">Inhoud</h2>
              <nav className="text-sm space-y-2 leading-6">
                <a href="#definities" className="block hover:text-red-300">Artikel 1: Definities</a>
                <a href="#toepasselijkheid" className="block hover:text-red-300">Artikel 2: Toepasselijkheid</a>
                <a href="#diensten" className="block hover:text-red-300">Artikel 3: Diensten</a>
                <a href="#inschrijvingen" className="block hover:text-red-300">Artikel 4: Inschrijvingen en afspraken</a>
                <a href="#annulering" className="block hover:text-red-300">Artikel 5: Annulering en no-show</a>
                <a href="#tarieven" className="block hover:text-red-300">Artikel 6: Tarieven en betaling</a>
                <a href="#strippenkaarten" className="block hover:text-red-300">Artikel 6a: Strippenkaarten en geldigheid</a>
                <a href="#gezondheid" className="block hover:text-red-300">Artikel 7: Gezondheid en eigen verantwoordelijkheid</a>
                <a href="#aansprakelijkheid" className="block hover:text-red-300">Artikel 8: Aansprakelijkheid</a>
                <a href="#privacy" className="block hover:text-red-300">Artikel 9: Privacy</a>
                <a href="#beeindiging" className="block hover:text-red-300">Artikel 10: Beëindiging</a>
                <a href="#recht" className="block hover:text-red-300">Artikel 11: Toepasselijk recht & geschillen</a>
              </nav>
            </div>
          </aside>

          {/* Content rechts – gaat naar PDF */}
          <main
            id="voorwaarden-content"
            className="md:col-span-8 lg:col-span-9 prose prose-invert max-w-none relative pdf-watermark"
          >
            <h1 className="!mb-6">Algemene Voorwaarden</h1>

            <h2 id="definities">Artikel 1 – Definities</h2>
            <p>In deze algemene voorwaarden wordt verstaan onder:</p>
            <ul>
              <li><strong>Dienstverlener:</strong> Sudhir PT, gevestigd te Leidschendam, ingeschreven bij de Kamer van Koophandel onder nummer 98034820.</li>
              <li><strong>Klant:</strong> de natuurlijke persoon die een overeenkomst aangaat met Sudhir PT voor personal training.</li>
              <li><strong>Training:</strong> een fysieke trainingssessie van 60 minuten, individueel of in duo, verzorgd door Sudhir PT op locatie bij InvictusGym in Berkel en Rodenrijs.</li>
            </ul>

            <h2 id="toepasselijkheid">Artikel 2 – Toepasselijkheid</h2>
            <p>
              Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en
              diensten van Sudhir PT, tenzij schriftelijk anders overeengekomen.
            </p>

            <h2 id="diensten">Artikel 3 – Diensten</h2>
            <p>
              Sudhir PT biedt personal training aan in de vorm van individuele of duo-sessies, op afspraak
              en op locatie bij InvictusGym in Berkel en Rodenrijs. Daarnaast biedt Sudhir PT ook
              strippenkaarten en maatwerktrajecten aan, in overleg met de klant.
            </p>

            <h2 id="inschrijvingen">Artikel 4 – Inschrijvingen en afspraken</h2>
            <ol>
              <li>Een training wordt geboekt op afspraak via e-mail, telefoon of app.</li>
              <li>Een sessie is pas definitief na bevestiging door Sudhir PT.</li>
              <li>Klanten zijn zelf verantwoordelijk voor het tijdig aanwezig zijn op de afgesproken locatie.</li>
            </ol>

            <h2 id="annulering">Artikel 5 – Annulering en no-show</h2>
            <ol>
              <li>Een training kan kosteloos worden geannuleerd tot 24 uur vóór aanvang van de sessie.</li>
              <li>Bij annulering binnen 24 uur of bij niet verschijnen (no-show) wordt het volledige tarief van de sessie in rekening gebracht.</li>
              <li>In geval van overmacht (zoals plotselinge ziekte of familieomstandigheden) kan Sudhir PT, naar redelijkheid, besluiten om de sessie kosteloos te verplaatsen.</li>
              <li>Sudhir PT behoudt zich het recht voor om in uitzonderlijke gevallen (zoals ziekte of overmacht) een sessie te annuleren of te verplaatsen. In dat geval wordt in overleg een nieuw moment ingepland zonder extra kosten voor de klant.</li>
            </ol>

            <h2 id="tarieven">Artikel 6 – Tarieven en betaling</h2>
            <ol>
              <li>Alle tarieven zijn inclusief btw (tenzij anders vermeld).</li>
              <li>Betaling dient voorafgaand aan de training te geschieden, of via een overeengekomen abonnementsvorm.</li>
              <li>Sudhir PT accepteert alleen digitale betalingen via het officiële boekhoudsysteem.</li>
              <li>Bij niet-tijdige betaling behoudt Sudhir PT zich het recht voor om de sessie(s) op te schorten.</li>
            </ol>

            <h2 id="strippenkaarten">Artikel 6a – Strippenkaarten en geldigheid</h2>
            <ol>
              <li>Sudhir PT biedt strippenkaarten aan voor personal training in de vorm van:
                <ul>
                  <li>5 sessies – geldig tot 3 maanden na de eerste geboekte sessie.</li>
                  <li>10 sessies – geldig tot 4 maanden na de eerste geboekte sessie.</li>
                </ul>
              </li>
              <li>De geldigheid gaat in vanaf de datum van de eerste sessie die met de strippenkaart wordt geboekt.</li>
              <li>Niet-gebruikte sessies vervallen na de genoemde geldigheidsduur en kunnen niet worden verlengd of gerestitueerd, tenzij schriftelijk anders overeengekomen.</li>
              <li>Strippenkaarten zijn persoonlijk en niet overdraagbaar aan derden.</li>
              <li>Bij langdurige ziekte of blessure kan, in overleg, een tijdelijke opschorting worden toegestaan. Hiervoor moet de klant dit tijdig melden en eventueel bewijs aanleveren.</li>
              <li>Indien de klant de samenwerking tussentijds beëindigt, vindt er geen restitutie plaats van de resterende sessies, tenzij Sudhir PT hier uit coulance anders over beslist.</li>
            </ol>

            <h2 id="gezondheid">Artikel 7 – Gezondheid en eigen verantwoordelijkheid</h2>
            <ol>
              <li>De klant verklaart naar beste weten gezond te zijn en fysiek in staat te zijn om deel te nemen aan de trainingen.</li>
              <li>Bij twijfel over de gezondheid dient de klant vooraf medisch advies in te winnen.</li>
              <li>Deelname aan de trainingen is volledig op eigen risico van de klant.</li>
              <li>Bij aanvang vult de klant een intakeformulier in waarop gezondheidsgegevens vrijwillig worden gedeeld.</li>
            </ol>

            <h2 id="aansprakelijkheid">Artikel 8 – Aansprakelijkheid</h2>
            <ol>
              <li>Sudhir PT is niet aansprakelijk voor enige directe of indirecte schade als gevolg van lichamelijk letsel, blessures, verlies van eigendommen of andere schade, tenzij er sprake is van opzet of grove nalatigheid.</li>
              <li>De klant blijft te allen tijde verantwoordelijk voor het eigen lichaam en de eigen grenzen tijdens de training.</li>
            </ol>

            <h2 id="privacy">Artikel 9 – Privacy</h2>
            <p>
              Sudhir PT verwerkt persoonsgegevens en gezondheidsgegevens in overeenstemming met de
              Algemene Verordening Gegevensbescherming (AVG). Gegevens worden alleen verzameld voor
              trainingsdoeleinden, administratie en communicatie met de klant. Sudhir PT neemt passende
              technische en organisatorische maatregelen om deze gegevens te beschermen. De klant heeft
              het recht om zijn of haar gegevens in te zien, te corrigeren of te laten verwijderen.
              Zie de aparte privacyverklaring voor volledige informatie.
            </p>

            <h2 id="beeindiging">Artikel 10 – Beëindiging van de overeenkomst</h2>
            <p>
              Beide partijen kunnen de overeenkomst opzeggen met inachtneming van een opzegtermijn van 7 dagen,
              tenzij anders overeengekomen. Sessies die binnen deze opzegtermijn vallen, dienen nog te worden
              afgerond of betaald door de klant.
            </p>

            <h2 id="recht">Artikel 11 – Toepasselijk recht en geschillen</h2>
            <p>
              Op deze algemene voorwaarden is Nederlands recht van toepassing. Geschillen worden bij voorkeur in
              onderling overleg opgelost. Indien dit niet lukt, worden geschillen voorgelegd aan de bevoegde
              rechter in de regio Haaglanden/Lansingerland.
            </p>
          </main>
        </div>
      </div>

      {/* Watermerk alleen in print/PDF en zijbalk verbergen in print */}
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
