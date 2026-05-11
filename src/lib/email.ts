import nodemailer from "nodemailer";
import { CONTACT_EMAIL, MANDATORY_DISCLAIMER, SITE_NAME } from "./constants";

type MailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

function hasSmtpConfig() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendAdminNotification(input: MailInput) {
  if (!hasSmtpConfig()) {
    console.info(`[${SITE_NAME}] Email not sent because SMTP is not configured: ${input.subject}`);
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `${SITE_NAME} <${CONTACT_EMAIL}>`,
      to: process.env.ADMIN_NOTIFICATION_EMAIL || CONTACT_EMAIL,
      subject: input.subject,
      text: `${input.text}\n\n${MANDATORY_DISCLAIMER}`,
      replyTo: input.replyTo,
    });
    return true;
  } catch (error) {
    console.error(`[${SITE_NAME}] Email notification failed`, error);
    return false;
  }
}
