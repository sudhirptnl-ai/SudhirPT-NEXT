// components/LegalActions.jsx
import React from "react";
import html2pdf from "html2pdf.js";

export default function LegalActions({ targetId = "doc-content", filename = "document.pdf" }) {
  const downloadPdf = () => {
    const el = document.getElementById(targetId);
    if (!el) return alert("Documentelement niet gevonden.");
    const opt = {
      margin: [10, 10, 10, 10],
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };
    html2pdf().set(opt).from(el).save();
  };

  return (
    <div className="no-print mt-8 flex flex-wrap gap-3 justify-center">
      <button onClick={() => window.print()} className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white">
        Printen
      </button>
      <button onClick={downloadPdf} className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white">
        Download PDF
      </button>
    </div>
  );
}
