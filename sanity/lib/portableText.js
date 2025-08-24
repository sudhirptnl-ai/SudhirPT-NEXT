// sanity/lib/portableText.js
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Prism from "prismjs";
// Laad een lichte Prism CSS (pas aan naar smaak)
import "prismjs/themes/prism-tomorrow.css";
// Laad talen die je verwacht te gebruiken (voeg toe naar behoefte)
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";

import { client } from "./client";

const builder = imageUrlBuilder(client);
export const urlFor = (src) => (src ? builder.image(src) : null);

/** CodeBlock: rendert en highlight code veilig */
function CodeBlock({ value }) {
  // Sanity code type: {language, code, filename}
  const { language = "javascript", code = "", filename } = value || {};
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current);
  }, [code, language]);

  // Prism verwacht className="language-xxx"
  const langClass = `language-${language}`;

  return (
    <figure className="my-6 overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black/30">
      {filename && (
        <div className="border-b border-white/10 bg-black/40 px-3 py-2 text-xs text-gray-300">{filename}</div>
      )}
      <pre className="m-0 p-4 overflow-x-auto">
        <code ref={ref} className={langClass}>
          {code}
        </code>
      </pre>
    </figure>
  );
}

/** Portable Text component mappings (koppen, lijsten, links, afbeeldingen, code) */
export const ptComponents = {
  types: {
    image: ({ value }) => {
      const img = urlFor(value)?.width(1400).auto("format").url();
      if (!img) return null;
      const alt = value?.alt || "Afbeelding";
      return (
        <figure className="my-6 overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black/30">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={img}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          {alt && <figcaption className="px-4 py-2 text-sm text-gray-400">{alt}</figcaption>}
        </figure>
      );
    },
    // Als je Sanity's standaard "code" type gebruikt:
    code: CodeBlock,
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const external = /^https?:\/\//i.test(href);
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 underline decoration-red-400/40 hover:decoration-red-400"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="text-red-400 underline decoration-red-400/40 hover:decoration-red-400">
          {children}
        </Link>
      );
    },
    strong: ({ children }) => <strong className="text-white">{children}</strong>,
    em: ({ children }) => <em className="text-gray-200">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-gray-100">{children}</code>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-1">{children}</ol>,
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-extrabold mt-8 mb-3">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mt-5 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-red-500/60 pl-4 text-gray-200 italic">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="leading-relaxed text-gray-200">{children}</p>,
  },
};

export function PortableBody({ value }) {
  if (!value) return null;
  return (
    <div className="prose prose-invert max-w-none">
      <PortableText value={value} components={ptComponents} />
    </div>
  );
}
