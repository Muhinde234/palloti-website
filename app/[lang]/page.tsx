import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
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
          <h1 className="text-5xl md:text-7xl font-bold mt-2 mb-4">
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

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
