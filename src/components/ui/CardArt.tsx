import Image from "next/image";
import { cn } from "@/lib/utils";

export function CardArt({
  src,
  alt = "",
  className,
  compact = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("card-art", compact && "card-art-compact", className)}>
      <Image src={src} alt={alt} fill sizes={compact ? "96px" : "(min-width: 768px) 180px, 42vw"} className="card-art-image" />
    </div>
  );
}
