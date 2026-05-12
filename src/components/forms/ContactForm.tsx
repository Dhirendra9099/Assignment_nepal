"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CardArt } from "@/components/ui/CardArt";
import { card3dAssets } from "@/lib/card-assets";
import { MANDATORY_DISCLAIMER } from "@/lib/constants";
import { submitToFormSubmit } from "@/lib/formsubmit-client";

const supportTypes = [
  "Programme / Module Guidance",
  "Concept Tutoring",
  "Assignment Brief Explanation",
  "Assignment Planning",
  "Draft Feedback",
  "Proofreading and Editing",
  "Referencing and Citation Help",
  "Research Guidance",
  "Presentation Support",
  "Programming / Coding Concept Support",
  "Data Analysis Guidance",
  "Exam Preparation",
  "Dissertation / Research Proposal Guidance",
];

export function ContactForm({ defaultSupportType = "" }: { defaultSupportType?: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");
    setMessage("");

    const formData = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.consentToContact = formData.get("consentToContact") === "on";
    payload.consentToPrivacyPolicy = formData.get("consentToPrivacyPolicy") === "on";
    payload.academicIntegrityAccepted = formData.get("academicIntegrityAccepted") === "on";

    if (payload.website) {
      setState("success");
      setMessage("Thanks. Your enquiry has been received.");
      form.reset();
      return;
    }

    try {
      await submitToFormSubmit({
        subject: `New Assignment Nepal enquiry: ${textValue(payload.supportType)}`,
        replyTo: textValue(payload.email),
        fields: {
          Name: textValue(payload.fullName),
          Email: textValue(payload.email),
          "Phone / WhatsApp": textValue(payload.phone),
          College: textValue(payload.collegeName),
          Programme: textValue(payload.programmeName),
          "Subject / module": textValue(payload.subject),
          "Support type": textValue(payload.supportType),
          "Preferred contact method": textValue(payload.preferredContactMethod),
        },
        messageLines: [
          `Name: ${textValue(payload.fullName)}`,
          `Email: ${textValue(payload.email)}`,
          `Phone: ${textValue(payload.phone) || "Not provided"}`,
          `College: ${textValue(payload.collegeName) || "Not provided"}`,
          `Programme: ${textValue(payload.programmeName) || "Not provided"}`,
          `Subject: ${textValue(payload.subject) || "Not provided"}`,
          `Support type: ${textValue(payload.supportType)}`,
          `Preferred contact method: ${textValue(payload.preferredContactMethod) || "Not provided"}`,
          `Message: ${textValue(payload.message)}`,
        ],
      });

      void storeEnquiry(payload);
      setState("success");
      setMessage("Thanks. Your enquiry has been received. We will respond with ethical study-support options.");
      form.reset();
      return;
    } catch {
      // If the browser-side FormSubmit request fails, try the server fallback.
    }

    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      setState("success");
      setMessage(data.message);
      form.reset();
      return;
    }

    setState("error");
    setMessage(data.error || "Please check the form and try again.");
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel glass-border rounded-[1.75rem] p-5 md:p-7">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="mb-6 flex items-center gap-4">
        <CardArt src={card3dAssets.contactSupportPhone} alt="" compact />
        <div>
          <p className="section-kicker">Study support enquiry</p>
          <p className="mt-1 text-sm leading-6 text-slate-300">Share the module or brief you want to understand.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="fullName" label="Full name" required />
        <Field name="email" label="Email" type="email" required />
        <Field name="phone" label="Phone / WhatsApp" />
        <Field name="collegeName" label="College name" />
        <Field name="programmeName" label="Programme name" />
        <Field name="subject" label="Subject / module" />
        <label className="md:col-span-2">
          <span className="text-sm font-semibold text-white">Support type</span>
          <select
            name="supportType"
            defaultValue={defaultSupportType}
            required
            className="mt-2 h-12 w-full rounded-2xl border border-white/14 bg-slate-950/70 px-4 text-sm text-white"
          >
            <option value="">Select support type</option>
            {supportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="text-sm font-semibold text-white">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us what concept, brief, module, or study issue you want to understand."
            className="mt-2 w-full rounded-2xl border border-white/14 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500"
          />
        </label>
        <Field name="preferredContactMethod" label="Preferred contact method" placeholder="WhatsApp, email, phone" />
      </div>

      <div className="mt-5 space-y-3">
        <Checkbox name="consentToContact" label="I agree to be contacted by Assignment Nepal about my enquiry." />
        <Checkbox name="consentToPrivacyPolicy" label="I have read and agree to the Privacy Policy." />
        <Checkbox
          name="academicIntegrityAccepted"
          label="I understand Assignment Nepal provides academic support and does not complete assessed work for submission."
        />
      </div>

      <p className="mt-5 rounded-2xl border border-cyan-200/20 bg-cyan-200/8 p-4 text-xs leading-6 text-cyan-50">
        {MANDATORY_DISCLAIMER}
      </p>

      <Button type="submit" className="mt-6 w-full md:w-auto" disabled={state === "submitting"}>
        <Send className="mr-2 h-4 w-4" />
        {state === "submitting" ? "Sending..." : "Send enquiry"}
      </Button>

      {message ? (
        <div className={`mt-5 rounded-2xl p-4 text-sm ${state === "success" ? "bg-emerald-300/12 text-emerald-100" : "bg-red-300/12 text-red-100"}`}>
          {message}
          {state === "success" ? <p className="mt-2 text-xs leading-6">{MANDATORY_DISCLAIMER}</p> : null}
        </div>
      ) : null}
    </form>
  );
}

async function storeEnquiry(payload: Record<string, unknown>) {
  await fetch("/api/enquiries", {
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

function Checkbox({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-start gap-3 text-sm leading-6 text-slate-200">
      <input name={name} type="checkbox" required className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-300" />
      <span>{label}</span>
    </label>
  );
}
