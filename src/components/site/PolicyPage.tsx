import { CardArt } from "@/components/ui/CardArt";
import { card3dAssets } from "@/lib/card-assets";
import { MANDATORY_DISCLAIMER } from "@/lib/constants";

export function PolicyPage({ title, content }: { title: string; content: string }) {
  const paragraphs = content.split("\n").filter(Boolean);
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 md:px-6">
      <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">{title}</h1>
      <div className="prose-policy mt-8 rounded-[1.75rem] border border-white/12 bg-white/7 p-6 md:p-8">
        <CardArt src={title.toLowerCase().includes("privacy") ? card3dAssets.cyberSecurityShield : card3dAssets.moduleRoadmap} alt="" className="mb-6" />
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {!content.includes(MANDATORY_DISCLAIMER) ? <p>{MANDATORY_DISCLAIMER}</p> : null}
      </div>
    </section>
  );
}
