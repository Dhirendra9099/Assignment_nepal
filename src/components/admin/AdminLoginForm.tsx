"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(data.error || "Unable to sign in.");
      return;
    }
    router.push(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel glass-border mx-auto max-w-md rounded-[1.75rem] p-6">
      <label className="block">
        <span className="text-sm font-semibold text-white">Email</span>
        <input name="email" type="email" required className="mt-2 h-12 w-full rounded-2xl border border-white/14 bg-slate-950/70 px-4 text-sm text-white" />
      </label>
      <label className="mt-4 block">
        <span className="text-sm font-semibold text-white">Password</span>
        <input name="password" type="password" required className="mt-2 h-12 w-full rounded-2xl border border-white/14 bg-slate-950/70 px-4 text-sm text-white" />
      </label>
      {error ? <p className="mt-4 rounded-2xl bg-red-300/12 p-3 text-sm text-red-100">{error}</p> : null}
      <Button className="mt-6 w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
