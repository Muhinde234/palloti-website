import Image from "next/image";
import { Header } from "../components/header";
import { NewsSection } from "../components/NewsSection";
import { Footer } from "../components/Footer";

const getDictionary = async (lang: string) => {
  if (lang === "fr") {
    return import("../../dictionaries/fr.json").then((m) => m.default);
  }
  return import("../../dictionaries/en.json").then((m) => m.default);
};

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #6B1212 0%, #8B1A1A 50%, #5a0e0e 100%)" }}
      >
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/p7.jpg"
            alt="Pallottine Community"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Gold decorative circles */}
        <div
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10"
          style={{ border: "2px solid var(--pallot-gold)" }}
        />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-5"
          style={{ border: "2px solid var(--pallot-gold)" }}
        />

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--pallot-gold-light)", fontFamily: "Arial, sans-serif" }}
          >
            {dict.hero.badge}
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold mb-3 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {dict.hero.title}
          </h1>
          <p
            className="text-2xl md:text-3xl font-light mb-6"
            style={{ color: "var(--pallot-gold-light)", fontFamily: "Georgia, serif" }}
          >
            {dict.hero.subtitle}
          </p>
          <div
            className="w-24 h-1 mx-auto mb-8 rounded-full"
            style={{ background: "linear-gradient(to right, var(--pallot-gold), var(--pallot-gold-light))" }}
          />
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.85)" }}>
            {dict.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#identity"
              className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "var(--pallot-gold)",
                color: "var(--pallot-red-dark)",
                fontFamily: "Arial, sans-serif",
                boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
              }}
            >
              {dict.hero.ctaPrimary}
            </a>
            <a
              href="#communities"
              className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                border: "2px solid rgba(201,168,76,0.6)",
                color: "white",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {dict.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6" style={{ color: "var(--pallot-gold)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── FOUNDER / IDENTITY ── */}
      <section id="identity" className="py-20" style={{ backgroundColor: "var(--pallot-cream)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "var(--pallot-gold)", fontFamily: "Arial, sans-serif" }}>
              {dict.founder.badge}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "var(--pallot-red)", fontFamily: "Georgia, serif" }}>
              {dict.founder.title}
            </h2>
            <p className="text-lg" style={{ color: "var(--pallot-gray)" }}>{dict.founder.subtitle}</p>
            <div className="section-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Image */}
            <div className="lg:col-span-2 flex flex-col items-center">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(139,26,26,0.25)", border: "4px solid var(--pallot-gold)" }}
              >
                <Image
                  src="/founder.png"
                  alt="Saint Vincent Pallotti"
                  width={400}
                  height={500}
                  className="w-full object-cover"
                />
              </div>
              {/* Quote */}
              <blockquote
                className="mt-6 p-6 rounded-xl text-center italic"
                style={{
                  backgroundColor: "var(--pallot-red)",
                  color: "white",
                  fontFamily: "Georgia, serif",
                  maxWidth: "360px",
                }}
              >
                <p className="text-lg mb-2">"{dict.founder.quote}"</p>
                <footer className="text-sm" style={{ color: "var(--pallot-gold-light)" }}>
                  {dict.founder.quoteAuthor}
                </footer>
              </blockquote>
            </div>

            {/* Biography */}
            <div className="lg:col-span-3 space-y-5">
              {dict.founder.biography.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="text-base leading-relaxed"
                  style={{ color: "#374151", fontFamily: "Georgia, serif", fontSize: "1.05rem" }}
                >
                  {index === 0 && (
                    <span
                      className="float-left text-6xl font-bold mr-3 leading-none"
                      style={{ color: "var(--pallot-red)", fontFamily: "Georgia, serif" }}
                    >
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
      <section
        id="direction"
        className="py-20"
        style={{ background: "linear-gradient(135deg, var(--pallot-red-dark), var(--pallot-red))" }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "var(--pallot-gold-light)", fontFamily: "Arial, sans-serif" }}>
              {dict.direction.badge}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white" style={{ fontFamily: "Georgia, serif" }}>
              {dict.direction.title}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>{dict.direction.subtitle}</p>
            <div className="section-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dict.direction.members.map((member: { name: string; role: string; message: string }, index: number) => (
              <div
                key={index}
                className="rounded-2xl p-8 text-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                  style={{ backgroundColor: "var(--pallot-gold)", color: "var(--pallot-red-dark)", fontFamily: "Georgia, serif" }}
                >
                  {member.name.split(" ")[1]?.[0] ?? "P"}
                </div>
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>
                  {member.name}
                </h3>
                <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--pallot-gold-light)" }}>
                  {member.role}
                </p>
                <p className="text-sm italic leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  "{member.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITIES & WORKS ── */}
      <section id="communities" className="py-20" style={{ backgroundColor: "var(--pallot-cream)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "var(--pallot-gold)", fontFamily: "Arial, sans-serif" }}>
              {dict.communities.badge}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "var(--pallot-red)", fontFamily: "Georgia, serif" }}>
              {dict.communities.title}
            </h2>
            <p style={{ color: "var(--pallot-gray)" }}>{dict.communities.subtitle}</p>
            <div className="section-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.communities.items.map((community: { name: string; location: string; description: string; works: string[] }, index: number) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden card-hover"
                style={{ boxShadow: "0 4px 20px rgba(139,26,26,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
              >
                <div className="h-2" style={{ background: "linear-gradient(to right, var(--pallot-red), var(--pallot-gold))" }} />
                <div className="p-8">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white font-bold text-lg"
                    style={{ backgroundColor: "var(--pallot-red)" }}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: "var(--pallot-red)", fontFamily: "Georgia, serif" }}>
                    {community.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--pallot-gold)" }}>
                    📍 {community.location}
                  </p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--pallot-gray)" }}>
                    {community.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {community.works.map((work: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ backgroundColor: "rgba(139,26,26,0.08)", color: "var(--pallot-red)" }}
                      >
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
      <NewsSection
        title={dict.newsSection.title}
        articles={dict.newsSection.articles}
        readMore={dict.newsSection.readMore}
      />

      {/* ── GALLERY ── */}
      <section id="galleries" className="py-20" style={{ backgroundColor: "var(--pallot-red-dark)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "var(--pallot-gold-light)", fontFamily: "Arial, sans-serif" }}>
              {dict.galleries.badge}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white" style={{ fontFamily: "Georgia, serif" }}>
              {dict.galleries.title}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)" }}>{dict.galleries.subtitle}</p>
            <div className="section-divider mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["/images/p2.jpg", "/images/p5.jpg", "/images/p6.jpg", "/images/p7.jpg", "/images/p8.jpg", "/images/pic1.jpeg"].map(
              (src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl card-hover ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                  style={{ height: i === 0 ? "400px" : "190px", border: "2px solid rgba(201,168,76,0.2)" }}
                >
                  <Image
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(139,26,26,0.5)" }}
                  >
                    <span style={{ color: "var(--pallot-gold-light)", fontSize: "2rem" }}>✦</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
