"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FooterDict = {
  tagline: string;
  quickLinks: string;
  contact: string;
  address: string;
  phone: string;
  email: string;
  rights: string;
};

interface FooterProps {
  lang: string;
  dict: FooterDict;
  navigation: { 
    identity: string; 
    provincialDirection: string; 
    communitiesAndWorks: string; 
    news: string; 
    galleries: string 
  };
}

export const Footer = ({ lang, dict, navigation }: FooterProps) => {
  const routes = [
    { href: `/${lang}/identity`, label: navigation.identity },
    { href: `/${lang}/direction`, label: navigation.provincialDirection },
    { href: `/${lang}/communities`, label: navigation.communitiesAndWorks },
    { href: `/${lang}/news`, label: navigation.news },
    { href: `/${lang}/galleries`, label: navigation.galleries },
  ];

  const socialLinks = [
    {
      name: "X",
      href: "https://x.com/intent/tweet?text=Provincial%20council%20%7C%20SAC-PSF&url=https%3A%2F%2Fwww.sac-psf.info%2Fen%2Fprovincial-direction%2Fprovincial-council",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fwww.sac-psf.info%2Fen%2Fprovincial-direction%2Fprovincial-council",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
      ),
    },
    {
      name: "WhatsApp",
      href: "https://api.whatsapp.com/send?text=Provincial%20council%20%7C%20SAC-PSF%20https%3A%2F%2Fwww.sac-psf.info%2Fen%2Fprovincial-direction%2Fprovincial-council",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      ),
    },
    {
      name: "Telegram",
      href: "https://t.me/share/url?url=https%3A%2F%2Fwww.sac-psf.info%2Fen%2Fprovincial-direction%2Fprovincial-council&text=Provincial%20council%20%7C%20SAC-PSF",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
      ),
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #8B1A1A 0%, #5a1111 100%)" }}>
      {/* Decorative Gold Top Border */}
      <div className="h-1.5 w-full shadow-inner" style={{ backgroundColor: "#C9A84C" }} />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* COLUMN 1: BRANDING */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8 text-center sm:text-left">
            <Link href={`/${lang}`} className="flex flex-col sm:flex-row items-center gap-5 group">
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-full border border-[#C9A84C]/30 group-hover:border-[#C9A84C] transition-colors duration-700" />
                <div className="relative bg-white p-2 rounded-full shadow-xl border-2 border-[#C9A84C] transition-transform group-hover:scale-105">
                  <Image src="/p4.png" alt="SAC Logo" width={60} height={60} className="object-contain" />
                </div>
              </div>
              <div className="pt-1">
                <p className="font-black text-2xl md:text-3xl tracking-tight leading-none font-serif">
                  <span className="text-[#C9A84C]">SAC</span> Province
                </p>
                <p className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase mt-2 text-[#C9A84C]/90">
                  Holy Family · Kigali
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-md text-white/80 italic border-l-0 sm:border-l-2 border-[#C9A84C]/40 sm:pl-4 mx-auto sm:mx-0">
              &ldquo;{dict.tagline}&rdquo;
            </p>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="lg:col-span-3 text-center sm:text-left">
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-6 md:mb-8 flex items-center justify-center sm:justify-start gap-2 text-[#C9A84C]">
              <span className="hidden sm:block w-8 h-px bg-[#C9A84C]"></span>
              {dict.quickLinks}
            </h4>
            <ul className="flex flex-col gap-4">
              {routes.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-[15px] text-white/70 hover:text-[#C9A84C] transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="hidden sm:block w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-3"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT */}
          <div className="lg:col-span-4 text-center sm:text-left">
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-6 md:mb-8 flex items-center justify-center sm:justify-start gap-2 text-[#C9A84C]">
              <span className="hidden sm:block w-8 h-px bg-[#C9A84C]"></span>
              {dict.contact}
            </h4>
            <ul className="space-y-4 md:space-y-5">
              {[
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", text: dict.address },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: dict.phone },
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: dict.email }
              ].map((item, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 group">
                  <div className="p-2 rounded-lg bg-white/5 text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#8B1A1A] transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR: Rights, SANTECH, and Socials */}
        <div className="mt-12 md:mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            
            {/* Copyright */}
            <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-white/40 uppercase text-center lg:text-left order-3 lg:order-1">
              {dict.rights}
            </p>

            {/* SANTECH Attribution */}
            <div className="order-2 flex flex-col items-center gap-1">
               <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium">Developed by</p>
               <a 
                 href="https://santech.rw" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-[#C9A84C] font-black text-xs tracking-widest hover:text-white transition-colors"
                >
                 SANTECH
               </a>
            </div>

            {/* Social Icons & Org Name */}
            <div className="flex flex-col items-center lg:items-end gap-4 order-1 lg:order-3">
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#8B1A1A] hover:border-[#C9A84C] transition-all duration-300"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-widest font-bold">
                Society of the Catholic Apostolate
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none rotate-12 hidden md:block">
        <Image src="/p4.png" alt="" width={500} height={500} />
      </div>
    </footer>
  );
};