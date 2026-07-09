"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Landmark, Users, Globe } from "lucide-react";

type Slide = {
  image: string;
  location: string;
  title: string;
  subtitle?: string;
  titleGold?: boolean;
  subtitleGold?: boolean;
};

const slides: Slide[] = [
  {
    image: "/images/hero.jpg",
    location: "Kigali — Rwanda",
    title: "Sanctuaire de la Miséricorde Divine",
  },
  {
    image: "/images/hero2.jpg",
    location: "Kibeho — Rwanda",
    title: "La Nouvelle Communauté de Kibeho",
    titleGold: true,
  },
  {
    image: "/images/hero3.jpeg",
    location: "Montereau — France",
    title: "La Nouvelle Communauté Pallottine de Montereau",
  },
  {
    image: "/images/hero4.jpg",
    location: "PSF Province",
    title: "Pallottins de la PSF",
    subtitle: "Venez et rebâtissons les murailles de Jérusalem.",
    subtitleGold: true,
  },
  {
    image: "/images/hero5.jpg",
    location: "Kabuga — Rwanda",
    title: "Centre Pallottin de formation Genezareth",
    subtitle: "Keshero - R D Congo",
    subtitleGold: true,
  },
];

interface HeroSliderProps {
  lang: string;
  ctaPrimary: string;
  ctaSecondary: string;
  statFounded: string;
  statMembers: string;
  statCountries: string;
}

export default function HeroSlider({
  lang,
  ctaPrimary,
  ctaSecondary,
  statFounded,
  statMembers,
  statCountries,
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 800);
    },
    [animating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[70vh] sm:h-screen min-h-[500px] max-h-[900px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          {/* Image with Ken Burns */}
          <div
            className="absolute inset-0"
            style={{
              animation: i === current ? "kenburns 8s ease-out forwards" : "none",
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(28,15,5,0.25)" }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 sm:pb-28 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="transition-all duration-700"
              style={{
                opacity: i === current ? 1 : 0,
                transform: i === current ? "translateY(0)" : "translateY(24px)",
                position: i === current ? "relative" : "absolute",
                pointerEvents: i === current ? "auto" : "none",
              }}
            >
              {/* Location badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[var(--gold)]" />
                <span
                  className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--gold)]"
                >
                  {slide.location}
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-bold leading-tight mb-3 max-w-3xl"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)",
                  textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                  color: slide.titleGold ? "var(--gold)" : "#ffffff",
                }}
              >
                {slide.title}
              </h1>

              {/* Subtitle */}
              {slide.subtitle && (
                <p className="font-light italic mb-6 max-w-xl"
                  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", color: slide.subtitleGold ? "var(--gold)" : "rgba(255,255,255,0.8)" }}>
                  {slide.subtitle}
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6">
                <Link
                  href={`/${lang}/identity`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)] text-[var(--dark)] text-[11px] font-bold uppercase tracking-[0.14em] rounded-full transition-all duration-300 hover:bg-[var(--gold-lt)] hover:shadow-xl"
                >
                  {ctaPrimary}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href={`/${lang}/communities`}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/50 text-white text-[11px] font-bold uppercase tracking-[0.14em] rounded-full transition-all duration-300 hover:bg-white hover:text-[var(--red-dk)]"
                >
                  {ctaSecondary}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? "2rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "9999px",
              background: i === current ? "var(--gold)" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={() => next()}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-20 text-[var(--gold)] text-[11px] font-bold tracking-widest hidden md:block">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20" style={{ background: "linear-gradient(135deg, rgba(62,32,9,0.97) 0%, rgba(92,51,23,0.95) 50%, rgba(122,69,32,0.93) 100%)" }}>
        <div className="h-px w-full" style={{ background: "var(--gold)" }} />
        <div className="container mx-auto px-4 md:px-14 lg:px-20">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { num: "1890", label: statFounded,   Icon: Landmark, color: "#C9952A" },
              { num: "111+", label: statMembers,   Icon: Users,    color: "#E8B84B" },
              { num: "3",    label: statCountries, Icon: Globe,    color: "#C9952A" },
            ].map((s, i) => (
              <div key={i} className="py-3 sm:py-4 px-2 sm:px-4 md:px-8 flex items-center justify-center gap-2 sm:gap-4 group">
                {/* Icon box */}
                <div className="hidden sm:flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-lg shrink-0"
                  style={{ background: "rgba(201,149,42,0.15)", border: "1px solid rgba(201,149,42,0.35)" }}>
                  <s.Icon size={18} style={{ color: s.color }} strokeWidth={1.8} />
                </div>
                {/* Text */}
                <div className="text-left">
                  <span className="block font-black leading-none" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: s.color }}>
                    {s.num}
                  </span>
                  <span className="block uppercase tracking-[0.15em] font-semibold mt-0.5" style={{ fontSize: "clamp(0.55rem, 1vw, 0.7rem)", color: "rgba(255,255,255,0.85)" }}>
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ken Burns keyframe */}
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
