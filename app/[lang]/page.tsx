import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/Footer";
import { getDictionary } from "@/lib/getDictionary";
import { FadeUp, StaggerContainer, StaggerItem, ParallaxSection } from "../components/motion";
import HeroSlider from "../components/HeroSlider";
import DecorativeDivider from "../components/ui/DecorativeDivider";

type NewsItem = { date: string; tags: string; title: string; excerpt: string; image?: string };

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const news: NewsItem[] = dict.home.newsItems;

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      {/* ═══════════════════════════════════════
          § 1  HERO SLIDER
      ═══════════════════════════════════════ */}
      <DecorativeDivider />
      <HeroSlider
        lang={lang}
        ctaPrimary={dict.home.ctaPrimary}
        ctaSecondary={dict.home.ctaSecondary}
        statFounded={dict.home.statFounded}
        statMembers={dict.home.statMembers}
        statCountries={dict.home.statCountries}
      />

      {/* ═══════════════════════════════════════
          § 2  RECTOR'S WELCOME — MAGAZINE
      ═══════════════════════════════════════ */}
      <section className="py-12 md:py-16 lg:py-20" style={{ background: "var(--cream)" }}>
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">

          {/* ── Top rule + label ── */}
          <FadeUp className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1" style={{ background: "var(--gold)" }} />
            <span className="badge">{dict.home.welcomeBadge}</span>
            <div className="h-px flex-1" style={{ background: "var(--gold)" }} />
          </FadeUp>

          {/* ── Magazine spread: LEFT photo | RIGHT text ── */}
          <div className="grid md:grid-cols-[340px_1fr] lg:grid-cols-[380px_1fr] gap-0 items-stretch">

            {/* LEFT — full portrait photo */}
            <FadeUp className="relative">
              <div className="sticky top-24 relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image src="/images/eugene.jpg" alt={dict.home.rectorName}
                  fill className="object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-2/5"
                  style={{ background: "linear-gradient(to top, rgba(62,32,9,0.97), transparent)" }} />
                {/* Name plate */}
                <div className="absolute bottom-0 inset-x-0 px-5 pb-5">
                  <div className="w-8 h-[2px] mb-2" style={{ background: "var(--gold)" }} />
                  <p className="font-bold text-base leading-tight" style={{ color: "#fff", fontFamily: "Georgia, serif" }}>
                    {dict.home.rectorName}
                  </p>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase mt-1" style={{ color: "var(--gold)" }}>
                    {dict.home.rectorTitle}
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* RIGHT — article text */}
            <FadeUp delay={0.15} className="flex flex-col justify-between pl-0 md:pl-10 lg:pl-14 pt-6 md:pt-0">

              {/* Article headline */}
              <div>
                <h2 className="mb-6 leading-tight" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--dark)" }}>
                  {dict.home.welcomeTitle}
                </h2>
                <div className="w-14 h-[3px] mb-8" style={{ background: "var(--gold)" }} />

                {/* Body copy */}
                <div className="space-y-5">
                  {dict.home.welcomeBody.map((p: string, i: number) => (
                    <p key={i} className="text-base leading-[1.9]" style={{ color: "var(--mid)", textAlign: "justify" }}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Pull quote */}
              <div className="mt-10 py-6 px-6" style={{ borderTop: "3px solid var(--gold)", borderBottom: "1px solid var(--cream3)" }}>
                <p className="font-serif italic leading-snug" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "var(--red)" }}>
                  &ldquo;{dict.home.rectorQuote}&rdquo;
                </p>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mt-3" style={{ color: "var(--gold)" }}>
                  — {dict.home.rectorName}
                </p>
              </div>

              {/* Byline */}
              <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 ring-2 ring-[var(--gold)]/50">
                  <Image src="/images/eugene.jpg" alt="" fill className="object-cover object-top" />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ fontFamily: "Georgia, serif", color: "var(--red)" }}>
                    {dict.home.rectorName}
                  </p>
                  <p className="text-[11px] tracking-[0.12em] uppercase" style={{ color: "var(--gold)" }}>
                    {dict.home.rectorTitle}
                  </p>
                </div>
                <div className="ml-auto text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: "var(--gray)" }}>SAC</div>
              </div>

            </FadeUp>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          § 3  IMAGE MOSAIC
      ═══════════════════════════════════════ */}
     

      {/* ═══════════════════════════════════════
          § 4  NEWS
      ═══════════════════════════════════════ */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">

        
         

          <div className="grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-10">

            {/* ── FEATURED CARD — photo on top, text below ── */}
            <FadeUp>
              <article className="group cursor-pointer flex flex-col bg-white"
                style={{ border: "1px solid var(--cream3)", boxShadow: "0 4px 24px rgba(58,31,10,0.08)" }}>
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height: "300px" }}>
                  <Image src={news[0]?.image ?? "/images/p5.jpg"} alt={news[0]?.title} fill
                    className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Date badge over photo */}
                  <div className="absolute top-4 left-4 px-3 py-1.5" style={{ background: "var(--gold)" }}>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: "var(--dark)" }}>
                      {news[0]?.date}
                    </span>
                  </div>
                </div>
                {/* Text below photo */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: "var(--gold)" }}>
                    {news[0]?.tags}
                  </p>
                  <h3 className="font-bold leading-snug mb-4 flex-1 group-hover:text-[var(--red)] transition-colors"
                    style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 2vw, 1.45rem)", color: "var(--dark)" }}>
                    {news[0]?.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: "var(--gray)" }}>
                    {news[0]?.excerpt}
                  </p>
                  <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid var(--cream3)" }}>
                    <span className="read-more">{dict.home.readStory}</span>
                    <span className="w-6 h-px bg-[var(--gold)] group-hover:w-10 transition-all duration-300" />
                  </div>
                </div>
              </article>
            </FadeUp>

            {/* ── SIDE LIST — thumbnail left, text right ── */}
            <StaggerContainer className="flex flex-col gap-0 divide-y divide-[var(--cream3)]">
              {news.slice(1, 5).map((item, i) => (
                <StaggerItem key={i}>
                  <article className="group flex gap-4 py-5 first:pt-0 cursor-pointer">
                    {/* Thumbnail */}
                    <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 80, height: 80 }}>
                      <Image src={item.image ?? "/images/p5.jpg"} alt={item.title} fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    {/* Text */}
                    <div className="flex flex-col justify-center min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
                          {item.date}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[var(--red)] transition-colors"
                        style={{ fontFamily: "Georgia, serif", color: "var(--dark)" }}>
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="read-more" style={{ fontSize: "0.65rem" }}>{dict.home.readStory}</span>
                        <span className="w-3 h-px bg-[var(--gold)] group-hover:w-6 transition-all duration-300" />
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      
      <section className="relative py-10 md:py-14 overflow-hidden bg-gradient-to-br from-[#3e2009] via-[#5c3317] to-[#7a4520] mb-32">

       
        <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden xl:block">
          <svg width="240" height="240" viewBox="0 0 100 100" fill="white">
            <rect x="43" y="5" width="14" height="90" />
            <rect x="5" y="38" width="90" height="14" />
          </svg>
        </div>

        <FadeUp className="relative z-10 container mx-auto px-6 text-center max-w-2xl">

        
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-10 h-px bg-[var(--gold)]/50" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--gold)]">
              {dict.home.missionBadge}
            </span>
            <div className="w-10 h-px bg-[var(--gold)]/50" />
          </div>

    
          <blockquote className="text-white font-light italic leading-snug mb-6 text-2xl md:text-3xl">
            &ldquo;{dict.home.missionQuote}&rdquo;
          </blockquote>

          {/* Author */}
          <p className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-6">
            — {dict.home.missionAuthor}
          </p>

      
          <Link
            href={`/${lang}/identity`}
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/40 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-white hover:text-[var(--red-dk)] transition-all duration-300"
          >
            {dict.home.ctaPrimary}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

        </FadeUp>
      </section>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
