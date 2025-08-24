// components/BlogPreview.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../sanity/lib/client";

const query = `
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const defaultItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function BlogPreview({ itemVariants }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    client
      .fetch(query)
      .then(setPosts)
      .catch((e) => setError(e.message || "Kon blogposts niet laden"));
  }, []);

  const cardVariants = itemVariants || defaultItemVariants;

  return (
    <motion.section
      id="blog"
      className="scroll-mt-24 bg-[#0B121A] px-6 py-20 text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white mb-10">Laatste blogposts</h2>

        {error && <p className="text-red-400 mb-6">{error}</p>}
        {posts.length === 0 && !error && (
          <p className="text-gray-400">Nog geen posts beschikbaar.</p>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, idx) => (
            <motion.article
              key={post._id}
              variants={cardVariants}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 text-left"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {post.excerpt || "Geen samenvatting beschikbaar."}
              </p>
              <a
                href={`/blog/${post.slug?.current}`}
                className="text-red-400 hover:text-red-500 font-semibold"
              >
                Lees meer →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
