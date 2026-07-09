import Link from "next/link";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string };

export function DesktopNav({ navLinks, pathname }: { navLinks: NavLink[]; pathname: string }) {
  return (
    <div className="hidden xl:flex items-center gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "relative py-1 text-xs font-bold uppercase tracking-wider transition-colors hover:text-[var(--gold)]",
            pathname === link.href ? "text-[var(--red)]" : "text-[var(--mid)]"
          )}
        >
          {link.label}
          {pathname === link.href && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--red)]" />
          )}
        </Link>
      ))}
    </div>
  );
}
