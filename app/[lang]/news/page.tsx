import Image from "next/image";
import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";

const getDictionary = async (lang: string) => {
  if (lang === "fr") return import("../../../dictionaries/fr.json").then((m) => m.default);
  return import("../../../dictionaries/en.json").then((m) => m.default);
};

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const { newsSection } = dict;

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      <div className="py-14" style={{ background: "#8B1A1A" }}>
        <div className="container mx-auto px-6 text-center text-white">
          <p className="badge" style={{ color: "#C9A84C" }}>{newsSection.badge}</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2" style={{ fontFamily: "Georgia, serif" }}>
            {newsSection.title}
          </h1>
        </div>
      </div>

      <main className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsSection.articles.map((article: { id: number; title: string; date: string; summary: string; imageUrl: string }) => (
              <div key={article.id} className="card">
                <div className="relative h-48 overflow-hidden">
                  <Image src={article.imageUrl} alt={article.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#C9A84C", fontFamily: "Arial, sans-serif" }}>
                    {article.date}
                  </p>
                  <h3 className="text-base font-bold mb-3 leading-snug" style={{ color: "#1C1C1C", fontFamily: "Georgia, serif" }}>
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7280" }}>
                    {article.summary}
                  </p>
                  <Link href={`/${lang}/news/${article.id}`} className="read-more">
                    {newsSection.readMore} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
