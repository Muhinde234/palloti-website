import Image from "next/image";
import Link from "next/link";

export function Logo({ lang }: { lang: string }) {
  return (
    <Link href={`/${lang}`} className="flex items-center gap-2 group shrink-0">
      <div className="relative w-32 h-32 transition-transform group-hover:scale-105">
        <Image src="/p4.png" alt="Logo" fill className="object-contain" priority />
      </div>
  
    </Link>
  );
}
