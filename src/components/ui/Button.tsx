import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const styles = {
  primary:
    "shine bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 text-slate-950 shadow-[0_20px_55px_rgba(34,211,238,0.25)] hover:scale-[1.02]",
  secondary:
    "glass-panel text-white hover:border-cyan-200/60 hover:bg-white/14",
  ghost: "text-cyan-100 hover:bg-white/10 hover:text-white",
};

const base =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 disabled:pointer-events-none disabled:opacity-50";

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn(base, styles[variant], className)} {...props} />;
}

export function LinkButton({ className, variant = "primary", href, children, ...props }: LinkButtonProps) {
  return (
    <Link className={cn(base, styles[variant], className)} href={href} {...props}>
      {children}
    </Link>
  );
}
