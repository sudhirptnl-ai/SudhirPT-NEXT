// lib/gtag.js
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Paginaweergave bij routewissel
export const pageview = (url) => {
  if (typeof window === "undefined" || !window.gtag || !GA_TRACKING_ID) return;
  window.gtag("config", GA_TRACKING_ID, { page_path: url });
};

// Generiek event
export const event = ({ action, category, label, value }) => {
  if (typeof window === "undefined" || !window.gtag || !GA_TRACKING_ID) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

// Handige shortcuts
export const ctaClick = (label = "cta_generic") =>
  event({ action: "cta_click", category: "engagement", label, value: 1 });

export const contactSubmitted = (method = "form") =>
  event({ action: "contact_submit", category: "engagement", label: method, value: 1 });
