"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminResource } from "@/lib/admin-config";
import { Button } from "@/components/ui/Button";

export function AdminResourceManager({ resource }: { resource: AdminResource }) {
  const [items, setItems] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [status, setStatus] = useState("");

  async function load() {
    const response = await fetch(`/api/admin/resource/${resource.slug}?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (response.ok) setItems(data.items || []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource.slug]);

  const editableFields = useMemo(() => resource.fields, [resource.fields]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving...");
    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = {};
    editableFields.forEach((field) => {
      payload[field.name] = field.type === "boolean" ? form.get(field.name) === "on" : form.get(field.name) || "";
    });

    const response = await fetch(editing ? `/api/admin/resource/${resource.slug}/${editing.id}` : `/api/admin/resource/${resource.slug}`, {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(response.ok ? "Saved." : "Unable to save. Check required fields and relation IDs.");
    if (response.ok) {
      setEditing(null);
      await load();
      (event.target as HTMLFormElement).reset();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    const response = await fetch(`/api/admin/resource/${resource.slug}/${id}`, { method: "DELETE" });
    setStatus(response.ok ? "Deleted." : "Unable to delete.");
    if (response.ok) await load();
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[1.5rem] p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">{resource.label}</h1>
            <p className="mt-2 text-sm text-slate-300">Create, edit, delete, search, verify sources, update status, and manage publication state.</p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              load();
            }}
            className="flex gap-2"
          >
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="h-11 rounded-full border border-white/14 bg-slate-950/70 px-4 text-sm text-white" />
            <Button variant="secondary">Search</Button>
          </form>
        </div>
      </div>

      <form onSubmit={submit} className="glass-panel rounded-[1.5rem] p-5">
        <h2 className="text-xl font-bold text-white">{editing ? `Edit ${editing[resource.titleField] || "item"}` : `Create ${resource.label}`}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {editableFields.map((field) => (
            <label key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
              <span className="text-sm font-semibold text-white">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea name={field.name} defaultValue={editing?.[field.name] || ""} required={field.required} rows={4} className="mt-2 w-full rounded-2xl border border-white/14 bg-slate-950/70 px-4 py-3 text-sm text-white" />
              ) : field.type === "boolean" ? (
                <input name={field.name} type="checkbox" defaultChecked={Boolean(editing?.[field.name])} className="mt-4 h-5 w-5" />
              ) : field.type === "select" ? (
                <select name={field.name} defaultValue={editing?.[field.name] || ""} className="mt-2 h-12 w-full rounded-2xl border border-white/14 bg-slate-950/70 px-4 text-sm text-white">
                  <option value="">Select</option>
                  {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input name={field.name} type={field.type} defaultValue={formatValue(editing?.[field.name], field.type)} required={field.required} className="mt-2 h-12 w-full rounded-2xl border border-white/14 bg-slate-950/70 px-4 text-sm text-white" />
              )}
            </label>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button>{editing ? "Update" : "Create"}</Button>
          {editing ? (
            <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-white/14 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Cancel
            </button>
          ) : null}
          {status ? <span className="self-center text-sm text-cyan-100">{status}</span> : null}
        </div>
      </form>

      <div className="glass-panel overflow-hidden rounded-[1.5rem]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/8 text-slate-300">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-semibold text-white">{item[resource.titleField] || item.id}</td>
                  <td className="px-4 py-3 text-slate-300">{item.status || (item.isPublished === false ? "Draft" : "Active")}</td>
                  <td className="px-4 py-3 text-slate-400">{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setEditing(item)} className="rounded-full border border-white/14 px-3 py-1.5 text-xs font-semibold text-cyan-100 hover:bg-white/10">
                        Edit
                      </button>
                      <button type="button" onClick={() => remove(item.id)} className="rounded-full border border-red-200/20 px-3 py-1.5 text-xs font-semibold text-red-100 hover:bg-red-300/10">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function formatValue(value: unknown, type: string) {
  if (!value) return "";
  if (type === "date") return new Date(String(value)).toISOString().slice(0, 10);
  return String(value);
}
