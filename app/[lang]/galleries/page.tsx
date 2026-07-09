import Image from "next/image";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";
import { getDictionary } from "@/lib/getDictionary";

type Album = {
  id: number;
  title: string;
  date: string;
  count: number;
  cover: string;
  images: { src: string; alt: string }[];
};

const albums: Album[] = [
  {
    id: 1,
    title: "Communauté de Bruxelles",
    date: "Apr 14, 2020",
    count: 8,
    cover: "/images/picture1.jpeg",
    images: [
      { src: "/images/picture1.jpeg", alt: "Communauté de Bruxelles 1" },
      { src: "/images/p2.jpg",        alt: "Communauté de Bruxelles 2" },
      { src: "/images/p5.jpg",        alt: "Communauté de Bruxelles 3" },
      { src: "/images/p6.jpg",        alt: "Communauté de Bruxelles 4" },
      { src: "/images/p7.jpg",        alt: "Communauté de Bruxelles 5" },
      { src: "/images/p8.jpg",        alt: "Communauté de Bruxelles 6" },
      { src: "/images/pic1.jpeg",     alt: "Communauté de Bruxelles 7" },
      { src: "/images/home2.jpeg",    alt: "Communauté de Bruxelles 8" },
    ],
  },
  {
    id: 2,
    title: "The XII Consultative Congress of the SAC Major Superiors",
    date: "Feb 06, 2020",
    count: 13,
    cover: "/images/picture2.jpg",
    images: [
      { src: "/images/picture2.jpg",  alt: "SAC Congress 1" },
      { src: "/images/home3.jpg",     alt: "SAC Congress 2" },
      { src: "/images/home4.jpeg",    alt: "SAC Congress 3" },
      { src: "/images/home5.jpeg",    alt: "SAC Congress 4" },
      { src: "/images/home6.jpeg",    alt: "SAC Congress 5" },
      { src: "/images/p2.jpg",        alt: "SAC Congress 6" },
      { src: "/images/p5.jpg",        alt: "SAC Congress 7" },
      { src: "/images/p6.jpg",        alt: "SAC Congress 8" },
      { src: "/images/p7.jpg",        alt: "SAC Congress 9" },
      { src: "/images/p8.jpg",        alt: "SAC Congress 10" },
      { src: "/images/pic1.jpeg",     alt: "SAC Congress 11" },
      { src: "/images/home2.jpeg",    alt: "SAC Congress 12" },
      { src: "/images/picture1.jpeg", alt: "SAC Congress 13" },
    ],
  },
];

export default async function GalleriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      <div className="page-banner">
        <div className="container mx-auto px-6">
          <p className="badge">{dict.galleries.badge}</p>
          <h1>{dict.galleries.title}</h1>
          <p className="subtitle">{dict.galleries.subtitle}</p>
        </div>
      </div>

      <main className="py-16 bg-[var(--cream)]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">

          {/* ── Section header ── */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-8 bg-[var(--red)] rounded" />
            <div>
              <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[var(--gray)]">
                {lang === "fr" ? "Albums Photos" : "Photo Albums"}
              </p>
              <p className="text-[var(--mid)] text-sm mt-0.5">
                {lang === "fr" ? `${albums.length} albums · ${albums.reduce((a, b) => a + b.count, 0)} photos` : `${albums.length} albums · ${albums.reduce((a, b) => a + b.count, 0)} photos`}
              </p>
            </div>
            <div className="flex-1 h-px bg-[#e8e2d9]" />
          </div>

          {/* ── Albums ── */}
          <div className="space-y-16">
            {albums.map((album) => (
              <div key={album.id}>

                {/* Album header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                  <div>
                    <h2 className="font-bold text-[var(--dark)] leading-tight"
                      style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}>
                      {album.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" className="text-[var(--gold)]">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--gray)]">
                          {album.date}
                        </span>
                      </div>
                      <span className="text-[var(--gold)]">·</span>
                      <div className="flex items-center gap-1.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" className="text-[var(--gold)]">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="M21 15l-5-5L5 21"/>
                        </svg>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--gray)]">
                          {album.count} {lang === "fr" ? "photos" : "images"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-[2px] bg-[var(--gold)] sm:mb-1" />
                </div>

                {/* Album grid — cover is large, rest are small */}
                <div className="grid grid-cols-4 grid-rows-2 gap-2" style={{ height: "380px" }}>

                  {/* Cover — spans 2 cols × 2 rows */}
                  <div className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer rounded-lg">
                    <Image src={album.cover} alt={album.title} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[var(--dark)]/0 group-hover:bg-[var(--dark)]/30 transition-all duration-500" />
                    {/* Cover badge */}
                    <div className="absolute top-3 left-3 bg-[var(--red)] px-2.5 py-1">
                      <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">
                        {lang === "fr" ? "Couverture" : "Cover"}
                      </span>
                    </div>
                  </div>

                  {/* Remaining 4 thumbnails */}
                  {album.images.slice(1, 5).map((img, i) => {
                    const isLast = i === 3;
                    const remaining = album.count - 5;
                    return (
                      <div key={i} className="relative overflow-hidden group cursor-pointer rounded-lg">
                        <Image src={img.src} alt={img.alt} fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-[var(--dark)]/0 group-hover:bg-[var(--dark)]/30 transition-all duration-500" />
                        {/* Last thumbnail — show remaining count */}
                        {isLast && remaining > 0 && (
                          <div className="absolute inset-0 bg-[var(--dark)]/60 flex flex-col items-center justify-center">
                            <span className="text-white font-black text-2xl leading-none"
                              style={{ fontFamily: "Georgia, serif" }}>
                              +{remaining}
                            </span>
                            <span className="text-white/70 text-[9px] font-bold tracking-widest uppercase mt-1">
                              {lang === "fr" ? "photos" : "more"}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

          {/* ── Movies section placeholder ── */}
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 bg-[var(--red)] rounded" />
              <div>
                <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[var(--gray)]">
                  {lang === "fr" ? "Vidéos & Films" : "Videos & Movies"}
                </p>
                <p className="text-[var(--mid)] text-sm mt-0.5">
                  {lang === "fr" ? "Bientôt disponible" : "Coming soon"}
                </p>
              </div>
              <div className="flex-1 h-px bg-[#e8e2d9]" />
            </div>

            <div className="relative overflow-hidden rounded-xl bg-[var(--dark)] flex items-center justify-center"
              style={{ height: "220px", border: "1px solid #e8e2d9" }}>
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                  backgroundSize: "20px 20px",
                }} />
              <div className="relative z-10 text-center px-6">
                <div className="w-16 h-16 rounded-full border-2 border-[var(--gold)]/40 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.5" className="text-[var(--gold)] ml-1">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <p className="text-white font-bold text-sm tracking-wide mb-1"
                  style={{ fontFamily: "Georgia, serif" }}>
                  {lang === "fr" ? "Section Vidéos" : "Videos Section"}
                </p>
                <p className="text-white/40 text-[11px] tracking-widest uppercase">
                  {lang === "fr" ? "Bientôt disponible" : "Coming Soon"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
