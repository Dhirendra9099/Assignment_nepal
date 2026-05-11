import Link from "next/link";
import Image from "next/image";
import {
  BookOpenCheck,
  CalendarCheck,
  ChartNoAxesCombined,
  Code2,
  FileQuestion,
  GraduationCap,
  LibraryBig,
  MessageSquareText,
  PencilLine,
  Presentation,
  Quote,
  Search,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const icons: Record<string, any> = {
  GraduationCap,
  FileQuestion,
  CalendarCheck,
  Search,
  Quote,
  PencilLine,
  MessageSquareText,
  Presentation,
  Code2,
  ChartNoAxesCombined,
  BookOpenCheck,
  LibraryBig,
};

export function ServiceCard({ service }: { service: any }) {
  const Icon = icons[service.icon] || GraduationCap;
  return (
    <GlassCard as="article" className="h-full">
      <div className="service-media depth-lift mb-5">
        <Image
          src="/images/services-liquid-icons.svg"
          alt=""
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="service-media-icon">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-white">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{service.shortDescription}</p>
      <Link href={`/services/${service.slug}`} className="mt-6 inline-flex text-sm font-semibold text-cyan-100 hover:text-white">
        View ethical scope
      </Link>
    </GlassCard>
  );
}
