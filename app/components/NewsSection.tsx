import Image from "next/image";
import Link from "next/link";

type Article = { id: number; title: string; date: string; summary: string; imageUrl: string };

interface NewsSectionProps {
  title: string;
  articles: Article[];
  readMore: string;
}

export const NewsSection = ({ title, articles, readMore }: NewsSectionProps) => {
  return (
    <section id="news" className="py-20" style={{ background: "var(--cream)" }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="badge">Community Updates</p>
          <h2 className="section-title">{title}</h2>
          <div className="divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="card">
              <div className="relative h-48 overflow-hidden">
                <Image src={article.imageUrl} alt={article.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--gold)" }}>
                  {article.date}
                </p>
                <h3 className="text-base font-bold mb-3 leading-snug" style={{ color: "var(--dark)", fontFamily: "Georgia, serif", minHeight: "3rem" }}>
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--gray)", minHeight: "4rem" }}>
                  {article.summary}
                </p>
                <Link href={`/news/${article.id}`} className="read-more">
                  {readMore} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
