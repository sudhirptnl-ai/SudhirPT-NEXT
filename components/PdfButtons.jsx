// components/PdfButtons.jsx
import { useCallback } from "react";
import { pdfPrint, pdfDownload } from "../lib/gtag";


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
    pdfPrint(gaLabel);
    if (typeof window !== "undefined") window.print();
  }, [track]);

  const handleDownload = useCallback(async () => {
    track("pdf_download_click");
    pdfDownload(gaLabel);
    if (typeof window === "undefined") return;

    const el = document.getElementById(targetId);
    if (!el) {
      console.error(`[PdfButtons] Element met id="${targetId}" niet gevonden`);
      return;
    }

    // 1) Forceer donker + witte tekst ALLEEN tijdens export op dit element
    const styleId = "pdf-force-dark";
    document.getElementById(styleId)?.remove();

    const forceDarkStyles = `
      #${CSS.escape(targetId)} {
        background-color: #0b121a !important;
        color: #ffffff !important;              /* ← tekst basis wit */
      }
      #${CSS.escape(targetId)} * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color: #ffffff !important;              /* ← alle tekst wit */
      }
      /* Als je ergens expliciet andere kleuren wilt (bijv. links), pas hier aan */
      #${CSS.escape(targetId)} a { color: #d1d5db !important; } /* zacht grijs voor links */
      #${CSS.escape(targetId)} strong { color: #ffffff !important; font-weight: 700; }
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
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#0b121a",           // ← exact dezelfde bg als de site
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(el).save();
    } finally {
      // 2) Opruimen – site weer exact zoals voorheen
      document.getElementById(styleId)?.remove();
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
