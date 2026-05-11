import nodemailer from "nodemailer";
import { CONTACT_EMAIL, MANDATORY_DISCLAIMER, SITE_NAME, SITE_URL } from "./constants";

type MailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

function hasSmtpConfig() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendAdminNotification(input: MailInput) {
  const formSubmitSent = await sendViaFormSubmit(input);
  if (formSubmitSent) return true;

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

async function sendViaFormSubmit(input: MailInput) {
  const targetEmail = process.env.ADMIN_NOTIFICATION_EMAIL || CONTACT_EMAIL;
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;
  const payload = new URLSearchParams({
    name: SITE_NAME,
    email: input.replyTo || CONTACT_EMAIL,
    _replyto: input.replyTo || CONTACT_EMAIL,
    _subject: input.subject,
    _template: "table",
    _captcha: "false",
    _honey: "",
    _url: `${SITE_URL}/contact`,
    message: `${input.text}\n\n${MANDATORY_DISCLAIMER}`,
  });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error(`[${SITE_NAME}] FormSubmit request failed`, response.status, text.slice(0, 400));
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[${SITE_NAME}] FormSubmit notification failed`, error);
    return false;
  }
}
