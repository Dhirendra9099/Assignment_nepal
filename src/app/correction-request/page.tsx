import { CorrectionRequestForm } from "@/components/forms/CorrectionRequestForm";
import { CardArt } from "@/components/ui/CardArt";
import { card3dAssets } from "@/lib/card-assets";
import { MANDATORY_DISCLAIMER } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Correction or Update Request",
  description:
    "Request a correction to college, university, programme, module, source, or policy information listed on Assignment Nepal.",
  path: "/correction-request",
});

export default function CorrectionRequestPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 md:px-6">
      <h1 className="text-4xl font-black text-white md:text-6xl">Correction / Update Request</h1>
      <p className="mt-5 text-lg leading-8 text-slate-300">
        College, university, programme, and module information can change. Submit a source-backed update and our team will review it before publishing.
      </p>
      <div className="mt-6 flex items-center gap-4 rounded-[1.5rem] border border-cyan-200/20 bg-cyan-200/8 p-5 text-sm leading-7 text-cyan-50">
        <CardArt src={card3dAssets.moduleRoadmap} alt="" compact />
        <p>{MANDATORY_DISCLAIMER}</p>
      </div>
      <div className="mt-8">
        <CorrectionRequestForm />
      </div>
    </section>
  );
}
