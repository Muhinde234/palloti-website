import Image from "next/image";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";

const getDictionary = async (lang: string) => {
  if (lang === "fr") return import("../../../dictionaries/fr.json").then((m) => m.default);
  return import("../../../dictionaries/en.json").then((m) => m.default);
};

type Chapter = { year: string; image: string; text: string; caption?: string };

export default async function HistoryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const { history } = dict;

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      {/* Banner */}
      <div className="py-14" style={{ background: "#8B1A1A" }}>
        <div className="container mx-auto px-6 text-center text-white">
          <p className="badge" style={{ color: "#C9A84C" }}>{history.badge}</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">{history.title}</h1>
        </div>
      </div>

      <main className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">

          {(history.chapters as Chapter[]).map((chapter, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="relative mb-20 last:mb-0">

                {/* Timeline connector */}
                {index < history.chapters.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full w-px bg-gray-200" style={{ height: "5rem" }} />
                )}

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${isEven ? "" : "md:[direction:rtl]"}`}>

                  {/* Image side */}
                  <div className={isEven ? "" : "md:[direction:ltr]"}>
                    <div className="relative rounded-xl overflow-hidden"
                      style={{ height: 320, border: "3px solid #C9A84C", boxShadow: "0 12px 40px rgba(139,26,26,0.12)" }}>
                      <Image src={chapter.image} alt={`History ${index + 1}`} fill className="object-cover" />
                      {/* Year badge */}
                      <div className="absolute top-4 left-4 px-4 py-2 rounded-full text-white font-bold text-sm"
                        style={{ background: "#8B1A1A", fontFamily: "var(--font-mulish), sans-serif" }}>
                        {chapter.year}
                      </div>
                    </div>
                    {chapter.caption && (
                      <p className="mt-3 text-xs text-center italic" style={{ color: "#6B7280" }}>
                        {chapter.caption}
                      </p>
                    )}
                  </div>

                  {/* Text side */}
                  <div className={isEven ? "" : "md:[direction:ltr]"}>
                    {/* Gold accent line */}
                    <div className="mb-4" style={{ width: 48, height: 3, background: "#C9A84C", borderRadius: 2 }} />
                    <p className="leading-relaxed" style={{ color: "#374151", fontSize: "1rem", lineHeight: "1.85" }}>
                      {chapter.text}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}

          {/* Stats banner */}
          <div className="mt-20 rounded-2xl p-10 text-center text-white"
            style={{ background: "#8B1A1A" }}>
            <p className="badge mb-4" style={{ color: "#C9A84C" }}>
              {lang === "fr" ? "Province Sainte Famille · SAC" : "Holy Family Province · SAC"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
              {[
                { number: "1890", label: lang === "fr" ? "Début de la mission" : "Mission began" },
                { number: "111", label: lang === "fr" ? "Membres" : "Members" },
                { number: "3", label: lang === "fr" ? "Pays" : "Countries" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-5xl font-bold mb-1" style={{ color: "#C9A84C" }}>{stat.number}</p>
                  <p className="text-sm uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
