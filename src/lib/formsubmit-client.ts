import { CONTACT_EMAIL, MANDATORY_DISCLAIMER, SITE_NAME, SITE_URL } from "./constants";

type FormSubmitInput = {
  subject: string;
  replyTo?: string;
  fields: Record<string, string>;
  messageLines: string[];
  sourceUrl?: string;
};

export async function submitToFormSubmit(input: FormSubmitInput) {
  const payload = new URLSearchParams({
    name: input.fields.Name || SITE_NAME,
    email: input.replyTo || CONTACT_EMAIL,
    _replyto: input.replyTo || CONTACT_EMAIL,
    _subject: input.subject,
    _template: "table",
    _captcha: "false",
    _honey: "",
    _url: input.sourceUrl || currentPageUrl(),
    message: [...input.messageLines, "", MANDATORY_DISCLAIMER].join("\n"),
  });

  Object.entries(input.fields).forEach(([key, value]) => {
    payload.set(key, value || "Not provided");
  });

  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload.toString(),
  });

  if (!response.ok) {
    throw new Error(`FormSubmit failed with status ${response.status}`);
  }

  return response.json().catch(() => null);
}

function currentPageUrl() {
  if (typeof window !== "undefined") return window.location.href;
  return `${SITE_URL}/contact`;
}
