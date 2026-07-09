import nodemailer from "nodemailer";
import { env } from "../config/env";
import type { ContactMessageInput } from "@portfolio/shared";

// Best-effort contact notification. If SMTP is not configured, it no-ops so the
// contact form still works (the message is always stored regardless).
export async function sendContactNotification(input: ContactMessageInput): Promise<void> {
  if (!env.smtpUser || !env.smtpPass) {
    // eslint-disable-next-line no-console
    console.log("[email] SMTP not configured — skipping notification (message was stored).");
    return;
  }

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
  console.log(`[email] notification sent to ${env.contactTo}`);
}
