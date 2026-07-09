"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { TopBar } from "./header/TopBar";
import { Logo } from "./header/Logo";
import { DesktopNav } from "./header/DesktopNav";
import { HamburgerButton } from "./header/HamburgerButton";
import { MobileMenu } from "./header/MobileMenu";

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

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  const navLinks = [
    { href: `/${lang}`,             label: navigation.home },
    { href: `/${lang}/identity`,    label: navigation.identity },
    { href: `/${lang}/direction`,   label: navigation.provincialDirection },
    { href: `/${lang}/communities`, label: navigation.communitiesAndWorks },
    { href: `/${lang}/news`,        label: navigation.news },
    { href: `/${lang}/galleries`,   label: navigation.galleries },
  ];

  return (
    <>
      <TopBar />

      <header
        className={cn(
          "sticky top-8 z-[100] w-full h-14 transition-all duration-300",
          scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 h-full">
          <nav className="flex items-center justify-between h-full">
            <Logo lang={lang} />
            <DesktopNav navLinks={navLinks} pathname={pathname} />
            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              <HamburgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} navLinks={navLinks} pathname={pathname} />
    </>
  );
};
