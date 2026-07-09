import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/Footer";
import { getDictionary } from "@/lib/getDictionary";
import { FadeUp, StaggerContainer, StaggerItem, ParallaxSection } from "../components/motion";
import HeroSlider from "../components/HeroSlider";

type NewsItem = { date: string; tags: string; title: string; excerpt: string };

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
      <HeroSlider
        lang={lang}
        ctaPrimary={dict.home.ctaPrimary}
        ctaSecondary={dict.home.ctaSecondary}
        statFounded={dict.home.statFounded}
        statMembers={dict.home.statMembers}
        statCountries={dict.home.statCountries}
      />

      {/* ═══════════════════════════════════════
          § 2  RECTOR'S WELCOME
      ═══════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[var(--cream)] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">

            {/* Photo */}
            <FadeUp className="relative mb-20 lg:mb-0">
              <div className="absolute top-6 left-6 right-6 bottom-6"
                style={{ border: "2px solid rgba(212,168,67,0.35)" }} />
              <div className="relative w-full max-w-[400px] mx-auto lg:mx-0" style={{ aspectRatio: "3/4" }}>
                <Image src="/images/eugene.jpg" alt={dict.home.rectorName}
                  fill className="object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-1/3"
                  style={{ background: "linear-gradient(to top, rgba(92,51,23,0.85), transparent)" }} />
              </div>
              {/* Floating quote card */}
              <div className="absolute -bottom-6 right-0 lg:-right-8 bg-[var(--red)] text-white px-7 py-6 shadow-2xl max-w-[260px]">
                <span className="text-4xl font-serif text-[var(--gold)] leading-none block mb-2">&ldquo;</span>
                <p className="italic text-sm leading-relaxed mb-4 text-white/90">{dict.home.rectorQuote}</p>
                <div className="w-8 h-[2px] bg-[var(--gold)] mb-3" />
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">
                  {dict.home.rectorTitle}
                </p>
                <p className="font-bold text-sm mt-1" style={{ fontFamily: "Georgia, serif" }}>
                  {dict.home.rectorName}
                </p>
              </div>
            </FadeUp>

            {/* Text */}
            <FadeUp delay={0.15} className="lg:pt-8">
              <span className="badge">{dict.home.welcomeBadge}</span>
              <h2 className="mt-3 mb-6 leading-tight text-[var(--dark)]"
                style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                {dict.home.welcomeTitle}
              </h2>
              <div className="w-14 h-[3px] bg-[var(--gold)] mb-8" />
              <p className="text-[2.5rem] leading-none text-[var(--gold)] mb-2 font-serif select-none">&ldquo;</p>
              <div className="space-y-5 text-[var(--mid)] leading-[1.9] text-[15px] font-light">
                {dict.home.welcomeBody.map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
              <div className="mt-10 pt-8 border-t border-[var(--gold)]/20 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full overflow-hidden relative shrink-0 ring-2 ring-[var(--gold)]/50">
                  <Image src="/images/eugene.jpg" alt="" fill className="object-cover object-top" />
                </div>
                <div>
                  <p className="font-bold text-[var(--red)] text-sm" style={{ fontFamily: "Georgia, serif" }}>
                    {dict.home.rectorName}
                  </p>
                  <p className="text-[11px] text-[var(--gray)] tracking-[0.12em] uppercase mt-0.5">
                    {dict.home.rectorTitle}
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          § 3  IMAGE MOSAIC
      ═══════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 h-[300px] md:h-[440px]"
        style={{ gridTemplateRows: "1fr 1fr" }}>
        <div className="relative col-span-2 row-span-2 overflow-hidden group cursor-pointer">
          <Image src="/images/home2.jpeg" alt="" fill
            className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" />
          <div className="absolute inset-0 bg-[var(--red)]/0 group-hover:bg-[var(--red)]/20 transition-colors duration-700" />
        </div>
        {["/images/home3.jpg", "/images/home4.jpeg", "/images/home5.jpeg", "/images/home6.jpeg"].map((src, i) => (
          <div key={i} className="relative overflow-hidden group cursor-pointer border-l border-b border-white/5">
            <Image src={src} alt="" fill
              className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════
          § 4  NEWS
      ═══════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">

          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="badge">{dict.home.newsBadge}</span>
                <h2 className="section-title mt-2">{dict.home.newsTitle}</h2>
                <div className="divider mt-4" />
              </div>
              <Link href={`/${lang}/news`}
                className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--red)] hover:text-[var(--gold)] transition-colors shrink-0">
                {dict.home.viewAllNews}
                <span className="w-8 h-px bg-[var(--gold)] group-hover:w-12 transition-all duration-300" />
              </Link>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-[1fr_360px] gap-10">

            {/* Featured card */}
            <FadeUp>
              <article className="group cursor-pointer h-full flex flex-col bg-[var(--cream)]"
                style={{ border: "1px solid #e8e2d9" }}>
                <div className="relative overflow-hidden" style={{ height: "340px" }}>
                  <Image src="/images/p5.jpg" alt={news[0]?.title} fill
                    className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-5 left-5 bg-[var(--red)] px-3 py-1.5">
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">
                      {news[0]?.date}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-[var(--gray)] mb-4">
                    {news[0]?.tags}
                  </p>
                  <h3 className="font-bold leading-snug text-[var(--dark)] group-hover:text-[var(--red)] transition-colors mb-5 flex-1"
                    style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
                    {news[0]?.title}
                  </h3>
                  <p className="text-sm text-[var(--gray)] leading-relaxed mb-6 line-clamp-3">{news[0]?.excerpt}</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-[#e8e2d9]">
                    <span className="read-more">{dict.home.readStory}</span>
                    <span className="w-6 h-px bg-[var(--gold)] group-hover:w-10 transition-all duration-300" />
                  </div>
                </div>
              </article>
            </FadeUp>

            {/* Side list */}
            <StaggerContainer className="flex flex-col divide-y divide-[#f0ebe3]">
              {news.slice(1, 5).map((item, i) => (
                <StaggerItem key={i}>
                  <article className="group py-6 first:pt-0 cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-1 rounded-full bg-[var(--gold)]" />
                      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">{item.date}</span>
                    </div>
                    <p className="text-[8px] font-bold tracking-[0.15em] uppercase text-[var(--gray)] mb-2">{item.tags}</p>
                    <h4 className="font-bold text-[13px] leading-snug text-[var(--dark)] group-hover:text-[var(--red)] transition-colors mb-2"
                      style={{ fontFamily: "Georgia, serif" }}>
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-[var(--gray)] leading-relaxed line-clamp-2 mb-3">{item.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <span className="read-more text-[10px]">{dict.home.readStory}</span>
                      <span className="w-4 h-px bg-[var(--gold)] group-hover:w-7 transition-all duration-300" />
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          § 5  PARALLAX QUOTE
      ═══════════════════════════════════════ */}
      <section className="relative py-36 overflow-hidden mb-32">
        <ParallaxSection className="absolute inset-0">
          <Image src="/images/home4.jpeg" alt="" fill className="object-cover" />
        </ParallaxSection>
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(62,32,9,0.97) 0%, rgba(92,51,23,0.93) 50%, rgba(122,69,32,0.90) 100%)" }} />
        <div className="absolute right-20 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden xl:block">
          <svg width="320" height="320" viewBox="0 0 100 100" fill="white">
            <rect x="43" y="5" width="14" height="90" />
            <rect x="5" y="38" width="90" height="14" />
          </svg>
        </div>

        <FadeUp className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <div className="flex justify-center mb-8">
            <Image src="/images/p3.png" alt="" width={56} height={56} className="object-contain opacity-40" />
          </div>
          <div className="flex items-center justify-center gap-5 mb-10">
            <div className="w-16 h-px bg-[var(--gold)]/50" />
            <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-[var(--gold)]">
              {dict.home.missionBadge}
            </span>
            <div className="w-16 h-px bg-[var(--gold)]/50" />
          </div>
          <blockquote className="text-white font-light italic leading-[1.4] mb-10"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
            &ldquo;{dict.home.missionQuote}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-10 h-px bg-[var(--gold)]" />
            <p className="text-[var(--gold)] font-bold text-[11px] tracking-[0.3em] uppercase">
              {dict.home.missionAuthor}
            </p>
            <div className="w-10 h-px bg-[var(--gold)]" />
          </div>
          <Link href={`/${lang}/identity`} className="btn-outline">{dict.home.ctaPrimary}</Link>
        </FadeUp>
      </section>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
