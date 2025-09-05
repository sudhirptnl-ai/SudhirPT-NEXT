// lib/gtag.js
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

/** generieke event helper */
export const gaEvent = (action, params = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
};

/** CTA clicks */
export const ctaClick = (label) =>
  gaEvent("cta_click", { event_category: "engagement", event_label: label });

/** Contactformulier succes */
export const contactSubmit = () =>
  gaEvent("contact_submit", { event_category: "engagement", value: 1 });

/** PDF events */
export const pdfPrint = (label = "document") =>
  gaEvent("print_pdf", { event_category: "pdf", event_label: label });
export const pdfDownload = (label = "document") =>
  gaEvent("download_pdf", { event_category: "pdf", event_label: label });
