import { motion, useReducedMotion } from "framer-motion";

export default function MotionSection({ id, className = "", children, delay = 0, y = 30 }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } };
  const anim = prefersReducedMotion ? {} : {
    initial: "hidden",
    whileInView: "show",
    variants,
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.6, ease: "easeOut", delay },
  };
  return <motion.section id={id} className={className} {...anim}>{children}</motion.section>;
}
