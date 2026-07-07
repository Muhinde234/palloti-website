import Image from "next/image";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  date: string;
  summary: string;
  imageUrl: string;
};

interface NewsSectionProps {
  title: string;
  articles: Article[];
  readMore: string;
}

export const NewsSection = ({ title, articles, readMore }: NewsSectionProps) => {
  return (
    <section id="news" style={{ backgroundColor: "var(--pallot-cream)" }} className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "var(--pallot-gold)", fontFamily: "Arial, sans-serif" }}>
            Community Updates
          </p>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--pallot-red)", fontFamily: "Georgia, serif" }}>
            {title}
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl overflow-hidden card-hover"
              style={{ boxShadow: "0 4px 20px rgba(139,26,26,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(139,26,26,0.4), transparent)" }} />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--pallot-gold)", fontFamily: "Arial, sans-serif" }}>
                  {article.date}
                </p>
                <h3 className="text-lg font-bold mb-3 leading-snug" style={{ color: "var(--pallot-red)", fontFamily: "Georgia, serif", minHeight: "3.5rem" }}>
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--pallot-gray)", minHeight: "4.5rem" }}>
                  {article.summary}
                </p>
                <Link href={`/news/${article.id}`} className="news-read-more inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                  {readMore} <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
