import Image from "next/image";
import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";
import { getDictionary } from "@/lib/getDictionary";

type Article = {
  id: number;
  title: string;
  date: string;
  tags: string;
  summary: string;
  imageUrl: string;
};

const PAGE_SIZE = 6;

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  const { page: pageParam } = await searchParams;
  const dict = getDictionary(lang);
  const { newsSection } = dict;
  const articles: Article[] = newsSection.articles;

  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const isFirstPage = currentPage === 1;

  // Page 1: featured (1) + secondary grid (3) + list (2) = 6
  // Page 2+: list of PAGE_SIZE articles
  const pageArticles = articles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const featured = isFirstPage ? pageArticles[0] : null;
  const secondary = isFirstPage ? pageArticles.slice(1, 4) : [];
  const listArticles = isFirstPage ? pageArticles.slice(4) : pageArticles;

  const pageUrl = (p: number) => `/${lang}/news?page=${p}`;

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      <div className="page-banner">
        <div className="container mx-auto px-6">
          <p className="badge">{newsSection.badge}</p>
          <h1>{newsSection.title}</h1>
          <p className="subtitle">Province Sainte Famille · SAC</p>
        </div>
      </div>

      <main className="py-16 bg-[var(--cream)]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">

          {/* ── Page 1 only: Featured article ── */}
          {featured && (
            <div className="group grid lg:grid-cols-2 gap-0 mb-14 bg-white overflow-hidden cursor-pointer"
              style={{ border: "1px solid #e8e2d9", boxShadow: "0 8px 40px rgba(92,51,23,0.08)" }}>
              <div className="relative overflow-hidden" style={{ minHeight: "360px" }}>
                <Image src={featured.imageUrl} alt={featured.title} fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                <div className="absolute top-5 left-5 bg-[var(--red)] px-3 py-1.5">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">
                    {featured.date}
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-[var(--gold)] mb-3">
                  {featured.tags}
                </p>
                <h2 className="font-bold leading-snug text-[var(--dark)] group-hover:text-[var(--red)] transition-colors mb-4"
                  style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)" }}>
                  {featured.title}
                </h2>
                <div className="w-10 h-[2px] bg-[var(--gold)] mb-4" />
                <p className="text-sm text-[var(--gray)] leading-relaxed mb-6 line-clamp-3">
                  {featured.summary}
                </p>
                <div className="flex items-center gap-3">
                  <span className="read-more">{newsSection.readMore}</span>
                  <span className="w-6 h-px bg-[var(--gold)] group-hover:w-12 transition-all duration-300" />
                </div>
              </div>
            </div>
          )}

          {/* ── Page 1 only: Secondary 3-column grid ── */}
          {secondary.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {secondary.map((article) => (
                <article key={article.id} className="card group cursor-pointer">
                  <div className="relative overflow-hidden" style={{ height: "200px" }}>
                    <Image src={article.imageUrl} alt={article.title} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[var(--dark)]/0 group-hover:bg-[var(--dark)]/20 transition-all duration-500" />
                    <div className="absolute top-4 left-4 bg-[var(--red)] px-2.5 py-1">
                      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">
                        {article.date}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[8px] font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-2 line-clamp-1">
                      {article.tags}
                    </p>
                    <h3 className="font-bold text-[14px] leading-snug text-[var(--dark)] group-hover:text-[var(--red)] transition-colors mb-3"
                      style={{ fontFamily: "Georgia, serif" }}>
                      {article.title}
                    </h3>
                    <p className="text-[12px] text-[var(--gray)] leading-relaxed line-clamp-2 mb-4">
                      {article.summary}
                    </p>
                    <div className="flex items-center gap-2 pt-3 border-t border-[#e8e2d9]">
                      <span className="read-more text-[10px]">{newsSection.readMore}</span>
                      <span className="w-4 h-px bg-[var(--gold)] group-hover:w-8 transition-all duration-300" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* ── List articles ── */}
          {listArticles.length > 0 && (
            <div className="bg-white" style={{ border: "1px solid #e8e2d9" }}>
              <div className="px-6 py-4 border-b border-[#e8e2d9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 bg-[var(--red)] rounded" />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--dark)]">
                    {lang === "fr" ? "Toutes les Publications" : "All Publications"}
                  </h3>
                </div>
                <span className="text-[10px] text-[var(--gray)] font-medium">
                  {lang === "fr" ? `Page ${currentPage} sur ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
                </span>
              </div>
              <div className="divide-y divide-[#f0ebe3]">
                {listArticles.map((article) => (
                  <article key={article.id}
                    className="group flex gap-5 p-5 cursor-pointer hover:bg-[var(--cream)] transition-colors duration-200">
                    <div className="relative shrink-0 overflow-hidden rounded" style={{ width: 90, height: 70 }}>
                      <Image src={article.imageUrl} alt={article.title} fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 rounded-full bg-[var(--gold)]" />
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">
                          {article.date}
                        </span>
                      </div>
                      <h4 className="font-bold text-[13px] leading-snug text-[var(--dark)] group-hover:text-[var(--red)] transition-colors mb-1 line-clamp-2"
                        style={{ fontFamily: "Georgia, serif" }}>
                        {article.title}
                      </h4>
                      <p className="text-[11px] text-[var(--gray)] line-clamp-1">{article.tags}</p>
                    </div>
                    <div className="shrink-0 flex items-center">
                      <svg className="text-[var(--gold)] group-hover:translate-x-1 transition-transform duration-200"
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">

              {/* Prev */}
              <Link
                href={pageUrl(currentPage - 1)}
                className={`flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] border transition-all duration-200 rounded
                  ${currentPage === 1
                    ? "border-[#e8e2d9] text-[var(--gray)] pointer-events-none opacity-40"
                    : "border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white"
                  }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                {lang === "fr" ? "Précédent" : "Previous"}
              </Link>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={pageUrl(p)}
                    className={`w-9 h-9 flex items-center justify-center text-[12px] font-bold rounded transition-all duration-200
                      ${p === currentPage
                        ? "bg-[var(--red)] text-white"
                        : "text-[var(--mid)] hover:bg-[var(--cream2)] border border-[#e8e2d9]"
                      }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>

              {/* Next */}
              <Link
                href={pageUrl(currentPage + 1)}
                className={`flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] border transition-all duration-200 rounded
                  ${currentPage === totalPages
                    ? "border-[#e8e2d9] text-[var(--gray)] pointer-events-none opacity-40"
                    : "border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white"
                  }`}
              >
                {lang === "fr" ? "Suivant" : "Next"}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>

            </div>
          )}

        </div>
      </main>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
