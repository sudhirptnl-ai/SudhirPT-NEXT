// scripts/test-mail.js
const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env.local" });

async function main() {
  try {
    // Transport configuratie (zelfde als contact.js)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_PROTOCOL === "smtps", // true bij 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Testmail
    const info = await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      subject: "✅ Testmail SudhirPT",
      text: "Dit is een testmail verzonden via je SMTP instellingen.",
      html: "<p><strong>Dit is een testmail</strong> verzonden via je SMTP instellingen.</p>",
    });

    console.log("📨 Mail verstuurd:", info.messageId);
  } catch (err) {
    console.error("❌ Fout bij versturen:", err);
  }
}

main();
