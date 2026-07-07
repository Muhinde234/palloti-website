import Image from "next/image";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";

const getDictionary = async (lang: string) => {
  if (lang === "fr") return import("../../../dictionaries/fr.json").then((m) => m.default);
  return import("../../../dictionaries/en.json").then((m) => m.default);
};

export default async function IdentityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      {/* Page hero banner */}
      <div className="py-14" style={{ background: "#8B1A1A" }}>
        <div className="container mx-auto px-6 text-center text-white">
          <p className="badge" style={{ color: "#C9A84C" }}>{dict.founder.badge}</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2" style={{ fontFamily: "Georgia, serif" }}>
            {dict.founder.title}
          </h1>
          <p className="mt-2 text-base" style={{ color: "rgba(255,255,255,0.7)" }}>{dict.founder.subtitle}</p>
        </div>
      </div>

      <main className="py-20 bg-white">
        <div className="container mx-auto px-6">
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
                <p key={index} className="leading-relaxed" style={{ color: "#374151", fontFamily: "Georgia, serif", fontSize: "1.05rem" }}>
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
      </main>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
