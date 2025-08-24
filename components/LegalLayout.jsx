import Head from "next/head";
import Link from "next/link";

export default function LegalLayout({ title, description, children }) {
  return (
    <>
      <Head>
        <title>{title} • SudhirPT</title>
        {description && <meta name="description" content={description} />}
      </Head>

      {/* Topbar */}
      <div className="bg-gray-900/80 backdrop-blur sticky top-0 z-40 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-300 hover:text-white">← Terug naar site</Link>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="text-sm bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg">Print</button>
            <a href="#" onClick={(e) => {e.preventDefault(); window.print();}} className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg">Download PDF</a>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="min-h-screen bg-gray-950 text-gray-100">
        <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* (optionele) TOC-kolom – we kunnen later dynamisch headings scannen */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 text-sm text-gray-400">
              <p className="mb-3">Inhoud</p>
              <p className="text-gray-600">(Kopjes via h2 in de tekst)</p>
            </div>
          </aside>

          <section className="prose prose-invert max-w-none">
            <h1 className="!mb-6">{title}</h1>
            {children}
          </section>
        </div>
      </main>
    </>
  );
}
