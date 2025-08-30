// pages/api/contact.js
export const config = { runtime: "nodejs" };

import { Resend } from "resend";

/** ── Rate-limit ───────────────────────────────────── */
const WINDOW_MS = 60 * 1000; // 60 seconden
const MAX_REQS = 3;
const buckets = new Map();

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

/** ── Resend client ─────────────────────────────────── */
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Honeypot
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

  // Veldnamen
  const name    = req.body?.name    || req.body?.naam     || "";
  const email   = req.body?.email   || "";
  const phone   = req.body?.phone   || req.body?.telefoon || "";
  const service = req.body?.service || req.body?.dienst   || "";
  const message = req.body?.message || req.body?.bericht  || "";

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Vul naam, e-mail en bericht in." });
  }

  const to   = process.env.CONTACT_TO   || "info@sudhirpt.nl";
  const from = process.env.CONTACT_FROM || "noreply@sudhirpt.nl"; // verified domein

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
      from,
      to,
      reply_to: email,
      subject,
      text,
      html,
    });

    return res.status(200).json({ ok: true, id: data?.id || null });
  } catch (err) {
    const msg =
      err?.response?.error?.message ||
      err?.message ||
      "E-mail verzenden mislukt.";
    console.error("RESEND_ERROR:", msg);
    return res.status(500).json({ ok: false, error: msg });
  }
}
