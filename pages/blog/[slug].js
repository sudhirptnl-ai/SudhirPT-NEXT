// pages/blog/[slug].js
import { client } from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import SEO from "../../components/SEO";
import Head from "next/head";

const builder = imageUrlBuilder(client);
const urlFor = (src) => (src ? builder.image(src) : null);

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function BlogPost({ post, baseUrl }) {
  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0B121A] text-gray-100">
        Geen artikel gevonden.
      </main>
    );
  }

  const canonical = `${baseUrl}/blog/${post.slug?.current}`;
  const seoTitle = `${post.title} • Blog • SudhirPT`;
  const seoDesc =
    post.excerpt || (post.bodyText ? post.bodyText.slice(0, 160) + "…" : "");

  // categorieën -> keywords/articleSection
  const categoryTitles =
    (post.categories || []).map((c) => c?.title).filter(Boolean) || [];
  const keywords = categoryTitles.join(", ");
  const articleSection = categoryTitles.length ? categoryTitles : undefined;

  // veilige og-image
  const ogImage =
    post.mainImageUrl || `${baseUrl}/og-default.png`; // Zet eventueel een eigen default in /public

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: seoDesc,
    image: ogImage,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: "Sudhir Sewtahalsing" },
    publisher: {
      "@type": "Organization",
      name: "SudhirPT",
      logo: { "@type": "ImageObject", url: `${baseUrl}/sudhirpt_logo_transparent.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    ...(articleSection ? { articleSection } : {}),
    ...(keywords ? { keywords } : {}),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={canonical}
        imageUrl={ogImage}
      />

      <Head>
        {/* RSS discoverability */}
        <link rel="alternate" type="application/rss+xml" title="SudhirPT • Blog" href="/feed.xml" />
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      </Head>

      <main className="min-h-screen bg-[#0B121A] text-gray-100">
        <motion.article
          className="mx-auto max-w-3xl px-6 py-14"
          variants={sectionVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-200">
              ← Terug naar blog
            </Link>
          </motion.div>

          <motion.header variants={itemVariants} className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              {post.publishedAt && (
                <span>{new Date(post.publishedAt).toLocaleDateString("nl-NL")}</span>
              )}
              {categoryTitles.length > 0 && (
                <span>• {categoryTitles.join(" • ")}</span>
              )}
            </div>
          </motion.header>

          {post.mainImageUrl && (
            <motion.div
              variants={itemVariants}
              className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-xl shadow-black/30"
            >
              <Image
                src={post.mainImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}

          <motion.section variants={itemVariants} className="prose prose-invert max-w-none">
            <PortableText value={post.body} />
          </motion.section>
        </motion.article>
      </main>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  const { slug } = params;
  const groq = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug,
    mainImage,
    "mainImageUrl": mainImage.asset->url,
    publishedAt,
    excerpt,
    body,
    "bodyText": pt::text(body),
    categories[]->{ title, "slug": slug.current }
  }`;

  const post = await client.fetch(groq, { slug });

  const proto = req?.headers["x-forwarded-proto"] || "http";
  const host = req?.headers["x-forwarded-host"] || req?.headers.host || "localhost:3000";
  const baseUrl = `${proto}://${host}`;

  return { props: { post: post || null, baseUrl } };
}
