"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

type Navigation = {
  identity: string;
  provincialDirection: string;
  communitiesAndWorks: string;
  news: string;
  galleries: string;
};

interface HeaderProps {
  lang: string;
  navigation: Navigation;
}

export const Header = ({ lang, navigation }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const navLinks = [
    { href: `/${lang}/identity`, label: navigation.identity },
    { href: `/${lang}/direction`, label: navigation.provincialDirection },
    { href: `/${lang}/communities`, label: navigation.communitiesAndWorks },
    { href: `/${lang}/news`, label: navigation.news },
    { href: `/${lang}/galleries`, label: navigation.galleries },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white" style={{ borderBottom: "3px solid #8B1A1A", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo — p4 only, big */}
        <Link href={`/${lang}`} className="flex items-center gap-4">
          <Image
            src="/p4.png"
            alt="SAC Holy Family Province"
            width={72}
            height={72}
            className="object-contain"
            priority
          />
          <div>
            <p className="font-bold text-xl leading-tight" style={{ color: "#8B1A1A", fontFamily: "Georgia, serif" }}>
              SAC Province
            </p>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#C9A84C", fontFamily: "Arial, sans-serif" }}>
              Holy Family · Kigali
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{ color: pathname === link.href ? "#8B1A1A" : undefined }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Language + mobile toggle */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden focus:outline-none"
            style={{ color: "#8B1A1A" }}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="mobile-nav-link"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
