// pages/404.js
import Link from "next/link";
import SeoHead from "../SeoHead";

export default function NotFound() {
  return (
    <>
      <SeoHead title="Pagina niet gevonden – SudhirPT" url="https://www.sudhirpt.nl/404" />
      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
        <h1 className="text-5xl font-extrabold mb-4">404</h1>
        <p className="text-gray-300 mb-8 text-center max-w-xl">
          Oeps! Deze pagina bestaat niet (meer). Ga terug naar de homepage of bekijk onze diensten.
        </p>
        <div className="flex gap-3">
          <Link href="/" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl">
            Naar home
          </Link>
          <a href="/#diensten" className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl">
            Diensten
          </a>
        </div>
      </main>
    </>
  );
}
