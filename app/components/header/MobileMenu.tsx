import Link from "next/link";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "../language-switcher";

type NavLink = { href: string; label: string };

export function MobileMenu({
  isOpen,
  navLinks,
  pathname,
}: {
  isOpen: boolean;
  navLinks: NavLink[];
  pathname: string;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] xl:hidden transition-all duration-500 ease-in-out bg-gradient-to-br from-[#3e2009] via-[#5c3317] to-[#7a4520]",
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      <div className="flex flex-col h-full pt-24 px-8 gap-6 overflow-y-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-2xl font-serif font-bold border-b border-white/20 pb-4 transition-all",
              pathname === link.href ? "text-yellow-400 translate-x-2" : "text-white"
            )}
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-4 sm:hidden">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Select Language</p>
          <LanguageSwitcher />
        </div>
        <div className="mt-auto pb-10 text-center">
          <p className="text-yellow-400 font-bold text-sm tracking-widest">SAC HOLY FAMILY PROVINCE</p>
        </div>
      </div>
    </div>
  );
}
