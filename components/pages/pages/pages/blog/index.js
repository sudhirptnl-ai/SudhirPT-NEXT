// pages/blog/index.js
import Link from "next/link";
import SeoHead from "../../components/SeoHead";
import { client } from "../../sanity/lib/client";

export default function BlogIndex({ posts }) {
  return (
    <>
    <SeoHead
  title="SudhirPT – Personal Training in (regio)"
  description="Personal training, duo training en rittenkaarten. Inclusief maatwerk trainingsplan en voedingsschema’s."
  url="https://www.sudhirpt.nl"
/>

      <SeoHead
        title="Blog – SudhirPT"
        description="Artikelen over training, voeding en lifestyle van SudhirPT."
        url="https://www.sudhirpt.nl/blog"
      />
      <main className="min-h-screen bg-black text-white px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-8">Blog</h1>
        {!posts?.length ? (
          <p className="text-gray-400">Nog geen artikelen geplaatst.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post._id} className="bg-gray-900 rounded-xl p-5">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-300 text-sm mb-4">
                  {post.excerpt || "Lees het volledige artikel…"}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-red-400 hover:text-red-300 underline"
                >
                  Lees verder
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
      _id, title, "slug": slug.current, excerpt
    }`
  );

  return {
    props: { posts },
    revalidate: 60, // ISR
  };
}
