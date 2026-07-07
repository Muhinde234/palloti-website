import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { NewsSection } from "../components/NewsSection";
import { Footer } from "../components/Footer";

const getDictionary = async (lang: string) => {
  if (lang === "fr") return import("../../dictionaries/fr.json").then((m) => m.default);
  return import("../../dictionaries/en.json").then((m) => m.default);
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#8B1A1A" }}>
        <div className="absolute inset-0">
          <Image src="/images/p7.jpg" alt="Hero" fill className="object-cover" style={{ opacity: 0.15 }} priority />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white py-24">
          <p className="badge" style={{ color: "#C9A84C" }}>{dict.hero.badge}</p>
          <h1 className="text-5xl md:text-7xl font-bold mt-2 mb-4" style={{ fontFamily: "Georgia, serif" }}>
            {dict.hero.title}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-6" style={{ color: "#E2C06A" }}>
            {dict.hero.subtitle}
          </p>
          <div style={{ width: 60, height: 3, background: "#C9A84C", margin: "0 auto 2rem" }} />
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.82)" }}>
            {dict.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/identity`} className="btn-primary">{dict.hero.ctaPrimary}</Link>
            <Link href={`/${lang}/communities`} className="btn-outline">{dict.hero.ctaSecondary}</Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "#C9A84C" }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── FOUNDER / IDENTITY ── */}
      <section id="identity" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="badge">{dict.founder.badge}</p>
            <h2 className="section-title">{dict.founder.title}</h2>
            <p className="text-base mt-1" style={{ color: "var(--gray)" }}>{dict.founder.subtitle}</p>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 flex flex-col items-center gap-6">
              <div className="rounded-xl overflow-hidden" style={{ border: "3px solid #C9A84C", boxShadow: "0 12px 40px rgba(139,26,26,0.15)" }}>
                <Image src="/founder.png" alt="Saint Vincent Pallotti" width={380} height={480} className="w-full object-cover" />
              </div>
              <blockquote className="w-full rounded-lg p-6 text-center italic" style={{ background: "#8B1A1A", color: "white" }}>
                <p className="text-lg mb-2" style={{ fontFamily: "Georgia, serif" }}>"{dict.founder.quote}"</p>
                <footer className="text-sm" style={{ color: "#E2C06A" }}>{dict.founder.quoteAuthor}</footer>
              </blockquote>
            </div>

            <div className="lg:col-span-3 space-y-5">
              {dict.founder.biography.map((paragraph: string, index: number) => (
                <p key={index} className="text-base leading-relaxed" style={{ color: "#374151", fontFamily: "Georgia, serif", fontSize: "1.05rem" }}>
                  {index === 0 && (
                    <span className="float-left text-6xl font-bold mr-3 leading-none" style={{ color: "#8B1A1A" }}>
                      {paragraph[0]}
                    </span>
                  )}
                  {index === 0 ? paragraph.slice(1) : paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROVINCIAL DIRECTION ── */}
      <section id="direction" className="py-20" style={{ background: "var(--cream)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="badge">{dict.direction.badge}</p>
            <h2 className="section-title">{dict.direction.title}</h2>
            <p className="text-base mt-1" style={{ color: "var(--gray)" }}>{dict.direction.subtitle}</p>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dict.direction.members.map((member: { name: string; role: string; message: string }, index: number) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center" style={{ border: "1px solid #e5e0d8", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ background: "#8B1A1A" }}>
                  {member.name.split(" ")[1]?.[0] ?? "P"}
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "#1C1C1C", fontFamily: "Georgia, serif" }}>{member.name}</h3>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#C9A84C", fontFamily: "Arial, sans-serif" }}>{member.role}</p>
                <p className="text-sm italic leading-relaxed" style={{ color: "#6B7280" }}>"{member.message}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITIES & WORKS ── */}
      <section id="communities" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="badge">{dict.communities.badge}</p>
            <h2 className="section-title">{dict.communities.title}</h2>
            <p className="text-base mt-1" style={{ color: "var(--gray)" }}>{dict.communities.subtitle}</p>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.communities.items.map((community: { name: string; location: string; description: string; works: string[] }, index: number) => (
              <div key={index} className="card">
                <div style={{ height: 4, background: "#8B1A1A" }} />
                <div className="p-7">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4" style={{ background: "#8B1A1A", fontFamily: "Arial, sans-serif" }}>
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#8B1A1A", fontFamily: "Georgia, serif" }}>{community.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#C9A84C", fontFamily: "Arial, sans-serif" }}>
                    📍 {community.location}
                  </p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7280" }}>{community.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {community.works.map((work: string, i: number) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "#F9F6F1", color: "#8B1A1A", border: "1px solid #e5e0d8" }}>
                        {work}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <NewsSection title={dict.newsSection.title} articles={dict.newsSection.articles} readMore={dict.newsSection.readMore} />

      {/* ── GALLERY ── */}
      <section id="galleries" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="badge">{dict.galleries.badge}</p>
            <h2 className="section-title">{dict.galleries.title}</h2>
            <p className="text-base mt-1" style={{ color: "var(--gray)" }}>{dict.galleries.subtitle}</p>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["/images/p2.jpg", "/images/p5.jpg", "/images/p6.jpg", "/images/p7.jpg", "/images/p8.jpg", "/images/pic1.jpeg"].map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-lg ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                style={{ height: i === 0 ? "420px" : "200px" }}
              >
                <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
