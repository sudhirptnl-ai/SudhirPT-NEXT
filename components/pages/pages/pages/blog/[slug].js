// pages/blog/[slug].js
import { client } from "../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import SeoHead from "../../components/SeoHead";
import Link from "next/link";

export default function BlogPost({ post }) {
  if (!post) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-16">
        <p>Artikel niet gevonden.</p>
        <Link href="/blog" className="underline text-red-400">← Terug naar blog</Link>
      </main>
    );
  }

  const url = `https://www.sudhirpt.nl/blog/${post.slug}`;

  return (
    <>
      <SeoHead title={`${post.title} – SudhirPT`} description={post.excerpt || ""} url={url} />
      <main className="min-h-screen bg-black text-white px-6 py-16">
        <article className="prose prose-invert max-w-3xl">
          <h1>{post.title}</h1>
          {post.publishedAt && (
            <p className="text-gray-400 text-sm">
              Gepubliceerd op {new Date(post.publishedAt).toLocaleDateString("nl-NL")}
            </p>
          )}
          {post.content && <PortableText value={post.content} />}
        </article>
        <div className="mt-8">
          <Link href="/blog" className="underline text-red-400">← Terug naar blog</Link>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type == "post" && defined(slug.current)][].slug.current`);
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title, "slug": slug.current, excerpt, publishedAt, content
    }`,
    { slug }
  );

  return {
    props: { post: post || null },
    revalidate: 60,
  };
}
