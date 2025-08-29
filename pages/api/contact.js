// pages/api/contact.js
export const config = { runtime: "nodejs" }; // stabiel op Vercel

import { Resend } from "resend";

/** ── Rate-limit (jouw bestaande logica, ongewijzigd) ─────────────────────── */
const WINDOW_MS = 60 * 1000;       // 60 seconden
const MAX_REQS = 3;                // max 3 submits per IP per window
const buckets = new Map();         // Map<ip, number[] timestamps>

function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}
function rateLimit(req) {
  const ip = getClientIp(req);
  const now = Date.now();
  const arr = buckets.get(ip) || [];
  const fresh = arr.filter((t) => now - t < WINDOW_MS);
  if (fresh.length >= MAX_REQS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - fresh[0])) / 1000);
    return { ok: false, retryAfter };
  }
  fresh.push(now);
  buckets.set(ip, fresh);
  return { ok: true };
}

/** ── Resend setup ───────────────────────────────────────────────────────────
 * Zet in Vercel env:
 *  - RESEND_API_KEY = <jouw key>
 *  - CONTACT_TO     = info@sudhirpt.nl        (optioneel, default hieronder)
 *  - CONTACT_FROM   = noreply@sudhirpt.nl     (na DNS-verify)
 *
 * TIP: zolang je Resend-DNS nog niet “groen” is, kun je tijdelijk
 * CONTACT_FROM leeg laten; we vallen dan terug op 'onboarding@resend.dev'.
 */
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Honeypots
  if (req.body?.website || req.body?._gotcha) {
    return res.status(200).json({ ok: true });
  }

  // Rate limit
  const rl = rateLimit(req);
  if (!rl.ok) {
    res.setHeader("Retry-After", rl.retryAfter);
    return res
      .status(429)
      .json({ ok: false, error: `Te veel verzoeken. Probeer het over ${rl.retryAfter}s opnieuw.` });
  }

  // Veldnamen (NL/EN)
  const name    = req.body?.name     || req.body?.naam     || "";
  const email   = req.body?.email    || "";
  const phone   = req.body?.phone    || req.body?.telefoon || "";
  const service = req.body?.service  || req.body?.dienst   || "";
  const message = req.body?.message  || req.body?.bericht  || "";

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Vul naam, e-mail en bericht in." });
  }

  // Adressen
  const to   = process.env.CONTACT_TO   || "info@sudhirpt.nl";
  // Gebruik je eigen domein zodra Resend-DNS is geverifieerd; anders fallback.
  const from = process.env.CONTACT_FROM || "onboarding@resend.dev";

  const subject = `Nieuw bericht via website – ${name}`;
  const lines = [
    `Naam: ${name}`,
    `E-mail: ${email}`,
    `Telefoon: ${phone || "-"}`,
    `Dienst: ${service || "-"}`,
    "",
    "Bericht:",
    message,
  ];
  const text = lines.join("\n");
  const html = lines.map((l) => (l === "" ? "<br/>" : l.replace(/</g, "&lt;"))).join("<br/>");

  try {
    const data = await resend.emails.send({
      from,                // bv. "noreply@sudhirpt.nl" (na DNS verify) of "onboarding@resend.dev"
      to,
      reply_to: email,     // zodat je direct kunt beantwoorden
      subject,
      text,
      html,
    });

    return res.status(200).json({ ok: true, id: data?.id || null });
  } catch (err) {
    // Resend geeft vaak err?.message of err?.response?.error aan
    const msg =
      err?.response?.error?.message ||
      err?.message ||
      "E-mail verzenden mislukt.";
    console.error("RESEND_ERROR:", msg);
    return res.status(500).json({ ok: false, error: msg });
  }
}
