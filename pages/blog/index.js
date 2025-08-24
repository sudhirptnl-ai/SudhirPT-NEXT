// pages/blog/index.js
import { client } from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";

const builder = imageUrlBuilder(client);
const urlFor = (src) => (src ? builder.image(src) : null);

const PAGE_SIZE = 9;

// Animatie
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.06 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function BlogPage({ posts, total, page, pageCount, categories, activeCat, baseUrl }) {
  const activeCategory = activeCat ? categories.find((c) => c.slug?.current === activeCat) : null;

  const seoTitle = activeCategory
    ? `Blog • ${activeCategory.title} • SudhirPT`
    : "Blog • SudhirPT";

  const seoDesc = activeCategory
    ? `Artikelen in de categorie “${activeCategory.title}” door SudhirPT.`
    : "Artikelen over training, voeding en lifestyle door SudhirPT.";

  const canonical = activeCategory
    ? `${baseUrl}/blog?cat=${encodeURIComponent(activeCat)}${page > 1 ? `&page=${page}` : ""}`
    : `${baseUrl}/blog${page > 1 ? `?page=${page}` : ""}`;

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} canonical={canonical} />

      <main className="min-h-screen bg-[#0B121A] text-gray-100">
        <motion.section
          className="mx-auto max-w-6xl px-6 py-14"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <motion.header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" variants={itemVariants}>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {activeCategory ? `Blog — ${activeCategory.title}` : "Blog"}
              </h1>
              <p className="mt-2 text-gray-300">
                {activeCategory
                  ? `Artikelen in “${activeCategory.title}”.`
                  : "Artikelen over training, voeding en lifestyle – helder en praktisch."}
              </p>
            </div>
            <Link href="/" className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15">
              ← Terug naar site
            </Link>
          </motion.header>

          {/* Grid */}
          {(!posts || posts.length === 0) ? (
            <motion.div className="rounded-xl border border-white/10 bg-black/20 p-6 text-gray-300" variants={itemVariants}>
              Geen artikelen gevonden.
            </motion.div>
          ) : (
            <motion.ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={sectionVariants}>
              {posts.map((p) => {
                const cover = urlFor(p.mainImage)?.width(800).height(500).fit("crop").auto("format").url();
                return (
                  <motion.li key={p._id} className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20" variants={itemVariants}>
                    {cover && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={cover}
                          alt={p.title || "Blogafbeelding"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h2 className="text-lg font-bold text-white">
                        <Link href={`/blog/${p.slug?.current || ""}`} className="hover:underline">
                          {p.title || "Zonder titel"}
                        </Link>
                      </h2>
                      {p.excerpt && <p className="mt-3 line-clamp-3 text-sm text-gray-300">{p.excerpt}</p>}
                      <div className="mt-4">
                        <Link href={`/blog/${p.slug?.current || ""}`} className="inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                          Lees verder
                        </Link>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </motion.section>
      </main>
    </>
  );
}

export async function getServerSideProps({ query, req }) {
  const page = Math.max(1, parseInt(query.page || "1", 10));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  const groq = `{
    "posts": *[_type == "post"] | order(publishedAt desc) [${from}...${to}]{
      _id,
      title,
      "slug": slug,
      mainImage,
      publishedAt,
      excerpt
    },
    "total": count(*[_type == "post"])
  }`;

  const { posts, total } = await client.fetch(groq);

  const proto = req?.headers["x-forwarded-proto"] || "http";
  const host = req?.headers["x-forwarded-host"] || req?.headers.host || "localhost:3000";
  const baseUrl = `${proto}://${host}`;

  return { props: { posts: posts || [], total: total || 0, page, pageCount: Math.ceil((total || 0) / PAGE_SIZE), categories: [], activeCat: null, baseUrl } };
}
