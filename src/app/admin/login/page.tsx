import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Admin Login",
  description: "Secure Assignment Nepal admin login.",
  path: "/admin/login",
});

export default function AdminLoginPage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black text-white md:text-5xl">Admin Login</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">Sign in to manage colleges, universities, programmes, modules, services, blog posts, enquiries, SEO metadata, and policy pages.</p>
      </div>
      <div className="mt-8">
        <Suspense fallback={null}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </section>
  );
}
