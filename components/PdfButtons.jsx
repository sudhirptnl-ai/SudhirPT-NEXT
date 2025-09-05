// components/PdfButtons.jsx
import { useCallback } from "react";

/**
 * PdfButtons
 * - Print-knop => window.print()
 * - Download PDF => html2pdf.js van de target (id) DOM-node
 *
 * Props:
 *   - targetId:   string (id van de DOM-node die je als PDF wilt)
 *   - filename:   string (naam van de PDF, bijv. "Privacyverklaring-SudhirPT.pdf")
 *   - gaLabel:    string (label voor GA4 event tracking)
 */
export default function PdfButtons({ targetId, filename = "document.pdf", gaLabel = "doc" }) {
  const track = useCallback((action) => {
    try {
      // optioneel: GA4 event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
          event_category: "pdf",
          event_label: gaLabel,
        });
      }
    } catch {}
  }, [gaLabel]);

  const handlePrint = useCallback(() => {
    track("print_click");
    if (typeof window !== "undefined") {
      window.print();
    }
  }, [track]);

  const handleDownload = useCallback(async () => {
    track("pdf_download_click");
    if (typeof window === "undefined") return;

    const el = document.getElementById(targetId);
    if (!el) {
      console.error(`[PdfButtons] Element met id="${targetId}" niet gevonden`);
      return;
    }

    // Dynamische import; bundelt niet op de server
    const html2pdf = (await import("html2pdf.js")).default;

    const opt = {
      margin:       [10, 10, 10, 10], // mm
      filename,
      image:        { type: "jpeg", quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, backgroundColor: "#0b121a" },
      jsPDF:        { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak:    { mode: ["avoid-all", "css", "legacy"] },
    };

    await html2pdf().set(opt).from(el).save();
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
