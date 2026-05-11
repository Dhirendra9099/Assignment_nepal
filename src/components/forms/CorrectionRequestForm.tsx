"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MANDATORY_DISCLAIMER } from "@/lib/constants";

export function CorrectionRequestForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/correction-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const data = await response.json();
    if (response.ok) {
      setState("success");
      setMessage(data.message);
      event.currentTarget.reset();
    } else {
      setState("error");
      setMessage(data.error || "Please check the form and try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel glass-border rounded-[1.75rem] p-5 md:p-7">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
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
