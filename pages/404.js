// pages/404.js
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B121A] text-gray-100 flex items-center">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-400">Error 404</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold">Pagina niet gevonden</h1>
        <p className="mt-4 text-gray-300">
          De pagina die je zoekt bestaat niet (meer) of is verplaatst.
        </p>
        <div className="mt-8">
          <Link
            href="/#home"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    </main>
  );
}
