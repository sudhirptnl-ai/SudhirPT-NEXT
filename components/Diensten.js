// components/Diensten.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../sanity/lib/client";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Diensten() {
  const [diensten, setDiensten] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "dienst"] | order(orderRank) { _id, titel, omschrijving }`)
      .then(setDiensten)
      .catch(console.error);
  }, []);

  return (
    <motion.section
      id="diensten"
      className="scroll-mt-24 bg-[#0B121A] px-6 py-20 text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white mb-10">Diensten</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {diensten.map((d) => (
            <motion.div
              key={d._id}
              variants={itemVariants}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 text-left"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{d.titel}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{d.omschrijving}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
