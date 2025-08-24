// components/Navbar.jsx
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Secties die op index.js staan
  const navPrimary = [
    { href: "/#home", label: "Home" },
    { href: "/#over", label: "Over mij" },
    { href: "/#locaties", label: "Locaties" },
    { href: "/#diensten", label: "Diensten" },
    { href: "/#tarieven", label: "Tarieven" },
    { href: "/contact", label: "Contact" },
  ];

  // Juridische pagina's + Blog altijd echte routes
  const navLegal = [
    { href: "/blog", label: "Blog" },
    { href: "/voorwaarden", label: "Algemene voorwaarden" },
    { href: "/privacy", label: "Privacy" },
    { href: "/intake", label: "Intakeformulier" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/#home" className="flex items-center gap-2">
          <Image
            src="/sudhirpt_logo_transparent.png"
            alt="SudhirPT"
            width={36}
            height={36}
            priority
          />
          <span className="font-semibold text-white">SudhirPT</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
          {navPrimary.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
          <div className="mx-2 h-5 w-px bg-white/10" />
          {navLegal.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="md:hidden rounded-lg border border-white/10 px-3 py-2 text-gray-200"
        >
          Menu
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm text-gray-300">
            {[...navPrimary, ...navLegal].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
