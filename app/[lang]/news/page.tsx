import Image from "next/image";
import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";
import { getDictionary } from "@/lib/getDictionary";

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const { newsSection } = dict;

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      <div className="page-banner">
        <div className="container mx-auto px-6">
          <p className="badge">{newsSection.badge}</p>
          <h1>{newsSection.title}</h1>
        </div>
      </div>

      <main className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsSection.articles.map((article: { id: number; title: string; date: string; summary: string; imageUrl: string }) => (
              <div key={article.id} className="card group">
                <div className="relative h-52 overflow-hidden">
                  <Image src={article.imageUrl} alt={article.title} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[var(--dark)]/0 group-hover:bg-[var(--dark)]/20 transition-all duration-500" />
                  <div className="absolute top-4 left-4 bg-[var(--red)] px-3 py-1">
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">
                      {article.date}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold mb-3 leading-snug text-[var(--dark)] group-hover:text-[var(--red)] transition-colors"
                    style={{ fontFamily: "Georgia, serif" }}>
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5 text-[var(--gray)] line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#e8e2d9]">
                    <Link href={`/${lang}/news/${article.id}`} className="read-more">
                      {newsSection.readMore}
                    </Link>
                    <span className="w-5 h-px bg-[var(--gold)] group-hover:w-9 transition-all duration-300" />
                  </div>
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
