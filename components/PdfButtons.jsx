// components/PdfButtons.jsx
import { useCallback } from "react";

export default function PdfButtons({ targetId, filename = "document.pdf", gaLabel = "doc" }) {
  const track = useCallback((action) => {
    try {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, { event_category: "pdf", event_label: gaLabel });
      }
    } catch {}
  }, [gaLabel]);

  const handlePrint = useCallback(() => {
    track("print_click");
    if (typeof window !== "undefined") window.print();
  }, [track]);

  const handleDownload = useCallback(async () => {
    track("pdf_download_click");
    if (typeof window === "undefined") return;

    const el = document.getElementById(targetId);
    if (!el) {
      console.error(`[PdfButtons] Element met id="${targetId}" niet gevonden`);
      return;
    }

    // 1) Forceer donker + witte tekst ALLEEN tijdens export op dit element
    const styleId = "pdf-force-dark";
    const existing = document.getElementById(styleId);
    if (existing) existing.remove();

    const forceDarkStyles = `
      #${CSS.escape(targetId)} {
        background-color: #0b121a !important;
        color: #0b121a !important;
      }
      #${CSS.escape(targetId)} h1,
      #${CSS.escape(targetId)} h2,
      #${CSS.escape(targetId)} h3,
      #${CSS.escape(targetId)} h4,
      #${CSS.escape(targetId)} h5,
      #${CSS.escape(targetId)} h6,
      #${CSS.escape(targetId)} p,
      #${CSS.escape(targetId)} li,
      #${CSS.escape(targetId)} a,
      #${CSS.escape(targetId)} strong,
      #${CSS.escape(targetId)} em {
        color: #ffffff !important;
      }
      #${CSS.escape(targetId)} .prose-invert :where(p,li,small,span) {
        color: #ffffff !important;
      }
      /* Zorg dat kleuren exact gerenderd worden */
      #${CSS.escape(targetId)} * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    `;
    const style = document.createElement("style");
    style.id = styleId;
    style.type = "text/css";
    style.appendChild(document.createTextNode(forceDarkStyles));
    document.head.appendChild(style);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: [10, 10, 10, 10], // mm
        filename,
        image: { type: "jpeg", quality: 0.98 },
        // Gebruik de CSS-achtergrond die we net geforceerd hebben
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: null, // <<< belangrijk: neem de echte (geforceerde) bg over
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(el).save();
    } finally {
      // 2) Opruimen – site weer exact zoals voorheen
      const s = document.getElementById(styleId);
      if (s) s.remove();
    }
  }, [targetId, filename, track]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handlePrint}
        className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm"
      >
        Print
      </button>
      <button
        type="button"
        onClick={handleDownload}
        className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
      >
        Download PDF
      </button>
    </div>
  );
}
