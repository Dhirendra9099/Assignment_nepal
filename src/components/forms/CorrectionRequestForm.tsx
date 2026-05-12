"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CardArt } from "@/components/ui/CardArt";
import { card3dAssets } from "@/lib/card-assets";
import { MANDATORY_DISCLAIMER } from "@/lib/constants";
import { submitToFormSubmit } from "@/lib/formsubmit-client";

export function CorrectionRequestForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");
    setMessage("");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (payload.website) {
      setState("success");
      setMessage("Thanks. Your correction request has been received.");
      form.reset();
      return;
    }

    try {
      await submitToFormSubmit({
        subject: `Correction request: ${textValue(payload.pageType)}`,
        replyTo: textValue(payload.requesterEmail),
        fields: {
          Name: textValue(payload.requesterName),
          Email: textValue(payload.requesterEmail),
          "Page type": textValue(payload.pageType),
          "Page URL": textValue(payload.pageUrl),
          "Source URL": textValue(payload.sourceUrl),
        },
        messageLines: [
          `Requester: ${textValue(payload.requesterName)}`,
          `Email: ${textValue(payload.requesterEmail)}`,
          `Page type: ${textValue(payload.pageType)}`,
          `Page URL: ${textValue(payload.pageUrl)}`,
          `Source URL: ${textValue(payload.sourceUrl) || "Not provided"}`,
          `Details: ${textValue(payload.correctionDetails)}`,
        ],
      });

      void storeCorrectionRequest(payload);
      setState("success");
      setMessage("Thanks. Your correction request has been received and will be reviewed before any update is published.");
      form.reset();
      return;
    } catch {
      // If the browser-side FormSubmit request fails, try the server fallback.
    }

    const response = await fetch("/api/correction-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.ok) {
      setState("success");
      setMessage(data.message);
      form.reset();
    } else {
      setState("error");
      setMessage(data.error || "Please check the form and try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel glass-border rounded-[1.75rem] p-5 md:p-7">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="mb-6 flex items-center gap-4">
        <CardArt src={card3dAssets.moduleRoadmap} alt="" compact />
        <div>
          <p className="section-kicker">Source-backed update</p>
          <p className="mt-1 text-sm leading-6 text-slate-300">Help keep directory information accurate and verified.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="requesterName" label="Your name" required />
        <Field name="requesterEmail" label="Your email" type="email" required />
        <Field name="pageType" label="Page type" placeholder="College, programme, university, blog, policy" required />
        <Field name="pageUrl" label="Page URL" required />
        <Field name="sourceUrl" label="Source URL" placeholder="Official source link if available" />
        <label className="md:col-span-2">
          <span className="text-sm font-semibold text-white">Correction details</span>
          <textarea
            name="correctionDetails"
            required
            rows={6}
            className="mt-2 w-full rounded-2xl border border-white/14 bg-slate-950/70 px-4 py-3 text-sm text-white"
          />
        </label>
      </div>
      <p className="mt-5 rounded-2xl border border-cyan-200/20 bg-cyan-200/8 p-4 text-xs leading-6 text-cyan-50">
        {MANDATORY_DISCLAIMER}
      </p>
      <Button className="mt-6" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending..." : "Submit correction request"}
      </Button>
      {message ? (
        <div className={`mt-5 rounded-2xl p-4 text-sm ${state === "success" ? "bg-emerald-300/12 text-emerald-100" : "bg-red-300/12 text-red-100"}`}>
          {message}
        </div>
      ) : null}
    </form>
  );
}

async function storeCorrectionRequest(payload: Record<string, FormDataEntryValue>) {
  await fetch("/api/correction-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-assignment-nepal-notification": "formsubmit",
    },
    body: JSON.stringify(payload),
  }).catch(() => undefined);
}

function textValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label>
      <span className="text-sm font-semibold text-white">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border border-white/14 bg-slate-950/70 px-4 text-sm text-white placeholder:text-slate-500"
      />
    </label>
  );
}
