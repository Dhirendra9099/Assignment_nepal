import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  as: Component = "div",
  ...props
}: HTMLAttributes<HTMLElement> & { children: ReactNode; as?: "div" | "article" | "section" | "li" }) {
  return (
    <Component
      className={cn("glass-panel glass-border creative-card shine rounded-[1.5rem] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/12", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
