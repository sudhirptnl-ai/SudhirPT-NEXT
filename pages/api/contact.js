// pages/api/contact.js
import nodemailer from "nodemailer";

/**
 * Simple in-memory rate limiter (per server instance).
 * Vercel/Lambda kan meerdere instances draaien; dit is alsnog prima als eerste verdedigingslinie.
 */
const WINDOW_MS = 60 * 1000;  // 60 seconden
const MAX_REQS = 3;           // max 3 submits per IP per window
const buckets = new Map();    // Map<ip, number[] timestamps>

function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function rateLimit(req) {
  const ip = getClientIp(req);
  const now = Date.now();
  const arr = buckets.get(ip) || [];
  // filter oude timestamps buiten window
  const fresh = arr.filter((t) => now - t < WINDOW_MS);
  if (fresh.length >= MAX_REQS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - fresh[0])) / 1000);
    return { ok: false, retryAfter };
  }
  fresh.push(now);
  buckets.set(ip, fresh);
  return { ok: true };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Honeypots (front-end heeft 'website'; sommige bots vullen '_gotcha')
  if (req.body?.website || req.body?._gotcha) {
    return res.status(200).json({ ok: true }); // stilzwijgend slagen
  }

  // Rate limit
  const rl = rateLimit(req);
  if (!rl.ok) {
    res.setHeader("Retry-After", rl.retryAfter);
    return res.status(429).json({
      ok: false,
      error: `Te veel verzoeken. Probeer het over ${rl.retryAfter}s opnieuw.`,
    });
  }

  // Ondersteun zowel NL- als EN-veldnamen
  const name = req.body?.name || req.body?.naam || "";
  const email = req.body?.email || "";
  const phone = req.body?.phone || req.body?.telefoon || "";
  const service = req.body?.service || req.body?.dienst || "";
  const message = req.body?.message || req.body?.bericht || "";

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ ok: false, error: "Vul naam, e‑mail en bericht in." });
  }

  try {
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // SSL/TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Indien nodig bij shared hosting:
      // tls: { rejectUnauthorized: false },
    });

    const to = process.env.CONTACT_TO || "info@sudhirpt.nl";
    // Beste deliverability: from = geauthenticeerde mailbox
    const from = process.env.SMTP_USER || process.env.CONTACT_FROM || to;

    const subject = `Nieuw bericht via website – ${name}`;
    const lines = [
      `Naam: ${name}`,
      `E‑mail: ${email}`,
      `Telefoon: ${phone || "-"}`,
      `Dienst: ${service || "-"}`,
      "",
      "Bericht:",
      message,
    ];
    const text = lines.join("\n");
    const html = lines
      .map((l) => (l === "" ? "<br/>" : l.replace(/</g, "&lt;")))
      .join("<br/>");

    await transporter.sendMail({
      to,
      from,
      replyTo: email, // jij kunt direct terugmailen naar afzender
      subject,
      text,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("MAIL_ERROR:", err?.message || err);
    return res
      .status(500)
      .json({ ok: false, error: "Versturen mislukt. Probeer later opnieuw." });
  }
}
