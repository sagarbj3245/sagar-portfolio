import nodemailer from "nodemailer";
import { env } from "../config/env";
import type { ContactMessageInput } from "@portfolio/shared";

// Best-effort contact notification. Prefers the Brevo HTTP API (works on
// hosts that block SMTP ports); falls back to Gmail SMTP when only SMTP
// credentials are configured; no-ops when neither is set (the message is
// always stored in the database regardless).
export async function sendContactNotification(input: ContactMessageInput): Promise<void> {
  if (env.brevoApiKey) {
    await sendViaBrevo(input);
    return;
  }
  if (env.smtpUser && env.smtpPass) {
    await sendViaSmtp(input);
    return;
  }
  // eslint-disable-next-line no-console
  console.log("[email] no mail provider configured — skipping notification (message was stored).");
}

async function sendViaBrevo(input: ContactMessageInput): Promise<void> {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": env.brevoApiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Portfolio Contact", email: env.contactTo },
      to: [{ email: env.contactTo }],
      replyTo: { email: input.email, name: input.name },
      subject: `New portfolio message from ${input.name}`,
      textContent: `From: ${input.name} <${input.email}>\n\n${input.message}`,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Brevo API ${res.status}: ${body.slice(0, 200)}`);
  }
  // eslint-disable-next-line no-console
  console.log(`[email] notification sent to ${env.contactTo} via Brevo`);
}

async function sendViaSmtp(input: ContactMessageInput): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: env.smtpUser, pass: env.smtpPass },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${env.smtpUser}>`,
    to: env.contactTo,
    replyTo: input.email,
    subject: `New portfolio message from ${input.name}`,
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
  });

  // eslint-disable-next-line no-console
  console.log(`[email] notification sent to ${env.contactTo} via SMTP`);
}
