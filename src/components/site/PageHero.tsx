import Image from "next/image";
import type { ReactNode } from "react";

export function PageHero({
  title,
  description,
  image,
  imageAlt,
  children,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-hero-pro glass-panel glass-border mb-10 overflow-hidden rounded-[2rem] lg:grid lg:grid-cols-[1fr_0.82fr]">
      <div className="min-w-0 p-6 md:p-8 lg:p-10">
        <div className="section-kicker">Assignment Nepal</div>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4.7rem)] font-black leading-[0.98] text-white">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{description}</p>
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
      <div className="page-hero-media relative min-h-[18rem] border-t border-white/10 lg:min-h-full lg:border-l lg:border-t-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="visual-feature-object"
        />
      </div>
    </div>
  );
}
