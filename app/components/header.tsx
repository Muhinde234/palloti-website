"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";
import { MapPin, Phone } from "lucide-react";

type Navigation = {
  home: string;
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMenuOpen]);

  const navLinks = [
    { href: `/${lang}`, label: navigation.home },
    { href: `/${lang}/identity`, label: navigation.identity },
    { href: `/${lang}/direction`, label: navigation.provincialDirection },
    { href: `/${lang}/communities`, label: navigation.communitiesAndWorks },
    { href: `/${lang}/news`, label: navigation.news },
    { href: `/${lang}/galleries`, label: navigation.galleries },
  ];

  return (
    <>
      {/* TOP BAR */}
      <div className="w-full bg-[#8B1A1A] text-white hidden md:block">
        <div className="container mx-auto px-4 md:px-6 py-2 relative flex items-center justify-between gap-4 text-[11px] font-medium">

          {/* Left: address + phones */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-white/90">
              <MapPin size={12} className="text-[#C9A84C] shrink-0" />
              <span>Gikondo – 1083 Kigali, RWANDA</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 text-white/90">
              <Phone size={12} className="text-[#C9A84C] shrink-0" />
              <span>+250 788 307 271</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90">
              <Phone size={12} className="text-[#C9A84C] shrink-0" />
              <span>+250 788 381 737</span>
            </div>
          </div>

          {/* Center: p3 emblem */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/p3.png"
              alt="SAC Emblem"
              width={36}
              height={36}
              className="object-contain drop-shadow-md"
            />
          </div>

          {/* Right: socials */}
          <div className="flex items-center gap-3">
            <a href="https://twitter.com/NiyonzimaEugne1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white/80 hover:text-[#C9A84C] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <span>@NiyonzimaEugne1</span>
            </a>
            <span className="text-white/30">|</span>
            <a href="https://instagram.com/sac-psf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white/80 hover:text-[#C9A84C] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
              <span>@sac-psf</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-[100] w-full transition-all duration-300 border-b-[3px] border-[#8B1A1A]",
          scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white py-4"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            
            {/* LOGO SECTION - Responsive Sizing */}
            <Link href={`/${lang}`} className="flex items-center gap-2 md:gap-4 group shrink-0">
              <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform group-hover:scale-105">
                <Image
                  src="/p4.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base md:text-lg leading-none text-[#8B1A1A]" style={{ fontFamily: 'Georgia, serif' }}>
                  SAC Holy Family Province
                </span>
                <span className="text-[9px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-[#C9A84C] mt-1">
                  Societas Apostolatus Catholici · Kigali
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION - Hidden on Mobile/Tablet */}
            <div className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative py-2 text-[13px] font-bold uppercase tracking-wider transition-colors hover:text-[#C9A84C]",
                    pathname === link.href || (link.href === `/${lang}` && pathname === `/${lang}`) ? "text-[#8B1A1A]" : "text-gray-700"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8B1A1A]" />
                  )}
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE: Language + Toggle */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* HAMBURGER BUTTON - Visible below XL */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden p-2 text-[#8B1A1A] focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={cn("w-full h-0.5 bg-current transition-all duration-300", isMenuOpen && "rotate-45 translate-y-2")} />
                  <span className={cn("w-full h-0.5 bg-current transition-all duration-300", isMenuOpen && "opacity-0")} />
                  <span className={cn("w-full h-0.5 bg-current transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-2")} />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY - Animated */}
      <div
        className={cn(
          "fixed inset-0 z-[90] bg-white transition-all duration-500 ease-in-out xl:hidden",
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="flex flex-col h-full pt-28 px-8 gap-6 overflow-y-auto">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-2xl font-serif font-bold border-b border-gray-100 pb-4 transition-all",
              pathname === link.href ? "text-[#8B1A1A] translate-x-2" : "text-gray-800"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 sm:hidden">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Select Language</p>
            <LanguageSwitcher />
          </div>
          
          <div className="mt-auto pb-10 text-center">
             <p className="text-[#C9A84C] font-bold text-sm tracking-widest">SAC HOLY FAMILY PROVINCE</p>
          </div>
        </div>
      </div>
    </>
  );
};