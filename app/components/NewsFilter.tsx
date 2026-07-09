"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  date: string;
  tags: string;
  summary: string;
  imageUrl: string;
};

type Category = {
  key: string;
  label: string;
  match: string;
  icon: string;
};

const CATEGORIES: Category[] = [
  { key: "all",         label: "All",                           match: "",                              icon: "◈" },
  { key: "province",   label: "Holy Family Province",          match: "Holy Family Province",          icon: "🏛" },
  { key: "newspaper",  label: "Pallottines' Newspaper",        match: "Pallottines' Newspaper",        icon: "📰" },
  { key: "generalate", label: "Generalate",                    match: "Generalate",                    icon: "✦" },
  { key: "union",      label: "Union of the Catholic Apostolate", match: "Union of the Catholic Apostolate", icon: "✝" },
  { key: "announce",   label: "Announcements",                 match: "Announcements",                 icon: "📣" },
  { key: "reflections",label: "Reflections & Life",            match: "Reflections",                   icon: "🕊" },
  { key: "others",     label: "Others",                        match: "__others__",                    icon: "⊕" },
];

const KNOWN_MATCHES = CATEGORIES.slice(1, 7).map((c) => c.match);

const PAGE_SIZE = 6;

interface NewsFilterProps {
  articles: Article[];
  readMore: string;
  lang: string;
  allPublicationsLabel: string;
}

export default function NewsFilter({ articles, readMore, lang, allPublicationsLabel }: NewsFilterProps) {
  const [activeKey, setActiveKey] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (activeKey === "all") return articles;
    const cat = CATEGORIES.find((c) => c.key === activeKey)!;
    if (cat.match === "__others__") {
      return articles.filter((a) => !KNOWN_MATCHES.some((m) => a.tags.includes(m)));
    }
    return articles.filter((a) => a.tags.includes(cat.match));
  }, [activeKey, articles]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const isFirstPage = currentPage === 1;
  const pageArticles = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const featured   = isFirstPage && activeKey === "all" ? pageArticles[0]      : null;
  const secondary  = isFirstPage && activeKey === "all" ? pageArticles.slice(1, 4) : [];
  const listArticles = isFirstPage && activeKey === "all" ? pageArticles.slice(4) : pageArticles;

  function handleFilter(key: string) {
    setActiveKey(key);
    setCurrentPage(1);
  }

  return (
    <>
      {/* ── Filter bar ── */}
      <div className="mb-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px bg-[var(--gold)]" />
          <span className="text-[10px] font-black tracking-[0.35em] uppercase text-[var(--gray)]">
            {lang === "fr" ? "Filtrer par catégorie" : "Filter by category"}
          </span>
          <div className="flex-1 h-px bg-[#e8e2d9]" />
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeKey === cat.key;
            const count = cat.key === "all"
              ? articles.length
              : cat.match === "__others__"
                ? articles.filter((a) => !KNOWN_MATCHES.some((m) => a.tags.includes(m))).length
                : articles.filter((a) => a.tags.includes(cat.match)).length;

            return (
              <button
                key={cat.key}
                onClick={() => handleFilter(cat.key)}
                className="group relative flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] rounded-full transition-all duration-300 overflow-hidden"
                style={{
                  background: isActive ? "var(--red)" : "white",
                  color: isActive ? "white" : "var(--mid)",
                  border: isActive ? "2px solid var(--red)" : "2px solid #e8e2d9",
                  boxShadow: isActive ? "0 4px 16px rgba(92,51,23,0.25)" : "none",
                  transform: isActive ? "translateY(-1px)" : "translateY(0)",
                }}
              >
                {/* Hover fill effect */}
                {!isActive && (
                  <span className="absolute inset-0 bg-[var(--cream2)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                )}
                <span className="relative z-10 text-[13px] leading-none">{cat.icon}</span>
                <span className="relative z-10">{cat.label}</span>
                <span
                  className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-black"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.2)" : "var(--cream2)",
                    color: isActive ? "white" : "var(--red)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active filter indicator */}
        {activeKey !== "all" && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] text-[var(--gray)]">
              {lang === "fr" ? "Résultats pour" : "Showing results for"}:
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--red)]/10 text-[var(--red)] text-[10px] font-bold uppercase tracking-wider rounded-full">
              {CATEGORIES.find((c) => c.key === activeKey)?.label}
              <button onClick={() => handleFilter("all")} className="hover:text-[var(--red-dk)] transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </span>
            <span className="text-[10px] text-[var(--gray)]">
              — {filtered.length} {lang === "fr" ? "article(s)" : "article(s)"}
            </span>
          </div>
        )}
      </div>

      {/* ── No results ── */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-[var(--gray)] font-medium">
            {lang === "fr" ? "Aucun article dans cette catégorie." : "No articles in this category."}
          </p>
          <button onClick={() => handleFilter("all")}
            className="mt-4 text-[11px] font-bold uppercase tracking-wider text-[var(--red)] hover:text-[var(--gold)] transition-colors">
            {lang === "fr" ? "Voir tous les articles" : "View all articles"}
          </button>
        </div>
      )}

      {/* ── Featured (page 1, all filter only) ── */}
      {featured && (
        <div className="group grid lg:grid-cols-2 gap-0 mb-14 bg-white overflow-hidden cursor-pointer"
          style={{ border: "1px solid #e8e2d9", boxShadow: "0 8px 40px rgba(92,51,23,0.08)" }}>
          <div className="relative overflow-hidden" style={{ minHeight: "360px" }}>
            <Image src={featured.imageUrl} alt={featured.title} fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            <div className="absolute top-5 left-5 bg-[var(--red)] px-3 py-1.5">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">{featured.date}</span>
            </div>
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-[var(--gold)] mb-3">{featured.tags}</p>
            <h2 className="font-bold leading-snug text-[var(--dark)] group-hover:text-[var(--red)] transition-colors mb-4"
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)" }}>
              {featured.title}
            </h2>
            <div className="w-10 h-[2px] bg-[var(--gold)] mb-4" />
            <p className="text-sm text-[var(--gray)] leading-relaxed mb-6 line-clamp-3">{featured.summary}</p>
            <div className="flex items-center gap-3">
              <span className="read-more">{readMore}</span>
              <span className="w-6 h-px bg-[var(--gold)] group-hover:w-12 transition-all duration-300" />
            </div>
          </div>
        </div>
      )}

      {/* ── Secondary 3-col grid (page 1, all filter only) ── */}
      {secondary.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {secondary.map((article) => (
            <article key={article.id} className="card group cursor-pointer">
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <Image src={article.imageUrl} alt={article.title} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[var(--dark)]/0 group-hover:bg-[var(--dark)]/20 transition-all duration-500" />
                <div className="absolute top-4 left-4 bg-[var(--red)] px-2.5 py-1">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">{article.date}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[8px] font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-2 line-clamp-1">{article.tags}</p>
                <h3 className="font-bold text-[14px] leading-snug text-[var(--dark)] group-hover:text-[var(--red)] transition-colors mb-3"
                  style={{ fontFamily: "Georgia, serif" }}>{article.title}</h3>
                <p className="text-[12px] text-[var(--gray)] leading-relaxed line-clamp-2 mb-4">{article.summary}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-[#e8e2d9]">
                  <span className="read-more text-[10px]">{readMore}</span>
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
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--dark)]">{allPublicationsLabel}</h3>
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
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">{article.date}</span>
                  </div>
                  <h4 className="font-bold text-[13px] leading-snug text-[var(--dark)] group-hover:text-[var(--red)] transition-colors mb-1 line-clamp-2"
                    style={{ fontFamily: "Georgia, serif" }}>{article.title}</h4>
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
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] border rounded transition-all duration-200 border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white disabled:opacity-40 disabled:pointer-events-none"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {lang === "fr" ? "Précédent" : "Previous"}
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className="w-9 h-9 flex items-center justify-center text-[12px] font-bold rounded transition-all duration-200"
                style={{
                  background: p === currentPage ? "var(--red)" : "white",
                  color: p === currentPage ? "white" : "var(--mid)",
                  border: p === currentPage ? "2px solid var(--red)" : "2px solid #e8e2d9",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] border rounded transition-all duration-200 border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white disabled:opacity-40 disabled:pointer-events-none"
          >
            {lang === "fr" ? "Suivant" : "Next"}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
