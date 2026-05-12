import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { LinkButton } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="nav-shell sticky top-0 z-50 border-b border-white/10 bg-slate-950/45 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
          <span className="brand-mark grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 text-slate-950 shadow-lg">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-base font-bold text-white md:text-lg">Assignment Nepal</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LinkButton href="/contact" className="hidden sm:inline-flex">
            Get Study Guidance
          </LinkButton>
          <details className="relative lg:hidden">
            <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-white/15 bg-white/10 text-white">
              <Menu className="h-5 w-5" />
            </summary>
            <div className="glass-panel absolute right-0 top-14 w-64 rounded-2xl p-3">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-100 hover:bg-white/10">
                  {link.label}
                </Link>
              ))}
              <LinkButton href="/contact" className="mt-2 w-full">
                Get Study Guidance
              </LinkButton>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
