import type { ReactNode } from "react";

export function SectionHeader({
  title,
  description,
  children,
  as = "h2",
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <Heading className="text-3xl font-bold leading-tight text-white md:text-5xl">{title}</Heading>
        {description ? <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
