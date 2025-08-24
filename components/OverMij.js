// components/OverMij.js
import Image from "next/image";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function OverMij() {
  return (
    <motion.section
      id="over"
      className="scroll-mt-24 bg-[#0B121A] text-gray-100"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-14">
          {/* Tekst */}
          <motion.div variants={item}>
            <motion.h2
              variants={item}
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Over mij
            </motion.h2>

            <motion.div
              variants={item}
              className="mt-6 space-y-5 leading-relaxed text-[17px] text-gray-200"
            >
              <p>
                Mijn naam is{" "}
                <span className="font-semibold text-white">
                  Sudhir Sewtahalsing
                </span>
                . Sinds mijn zestiende ben ik al bezig met fitness en
                krachttraining. In die tijd heb ik een complete fysieke en
                mentale transformatie doorgemaakt. Die ervaring en passie
                hebben me ertoe gebracht om gecertificeerd trainer te worden.
              </p>
              <p>
                Mijn missie is heel eenvoudig: ik wil mensen helpen hun doelen
                te bereiken, of dat nu gaat om afvallen, spieropbouw of het
                verbeteren van je algehele conditie. Met een persoonlijke
                aanpak, duidelijke communicatie en volledige toewijding zorg ik
                ervoor dat jij sterker, fitter en zelfverzekerder wordt. Geen
                valse beloftes, maar echte, duurzame resultaten.
              </p>
              <p>
                Ik geloof in hard werken, open communicatie en samen bouwen aan
                blijvende veranderingen.
              </p>
            </motion.div>
          </motion.div>

 {/* Foto - ronde profielfoto groot zonder accentkleur */}
<motion.div variants={item} className="flex justify-center">
  <div className="relative w-80 h-80 overflow-hidden rounded-full shadow-xl shadow-black/30">
    <Image
      src="/over-hero-landscape-optimized.jpg"
      alt="Sudhir – personal trainer"
      fill
      priority
      className="object-cover"
    />
  </div>
</motion.div>
</div>
      </div>
    </motion.section>
  );
}
