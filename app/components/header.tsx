"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle Scroll effect
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
    { href: `/${lang}/identity`, label: navigation.identity },
    { href: `/${lang}/direction`, label: navigation.provincialDirection },
    { href: `/${lang}/communities`, label: navigation.communitiesAndWorks },
    { href: `/${lang}/news`, label: navigation.news },
    { href: `/${lang}/galleries`, label: navigation.galleries },
  ];

  return (
    <>
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
                <span className="font-bold text-base md:text-xl leading-none text-[#8B1A1A] font-serif">
                  SAC Province
                </span>
                <span className="text-[8px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-[#C9A84C] mt-1">
                  Holy Family · Kigali
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
                    pathname === link.href ? "text-[#8B1A1A]" : "text-gray-700"
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