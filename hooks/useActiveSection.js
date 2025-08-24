import { useEffect, useState } from "react";

export default function useActiveSection(sectionIds = [], offset = 100) {
  const [active, setActive] = useState(sectionIds[0] || "");

  useEffect(() => {
    const onScroll = () => {
      let current = sectionIds[0] || "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0 && rect.bottom > 0) {
          current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return active;
}

