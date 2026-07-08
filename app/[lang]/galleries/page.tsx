import Image from "next/image";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";
import { getDictionary } from "@/lib/getDictionary";

const images = [
  { src: "/images/p2.jpg",    caption: "Community Life" },
  { src: "/images/p5.jpg",    caption: "Province Events" },
  { src: "/images/p6.jpg",    caption: "Apostolic Works" },
  { src: "/images/p7.jpg",    caption: "Formation" },
  { src: "/images/p8.jpg",    caption: "Mission" },
  { src: "/images/pic1.jpeg", caption: "Celebration" },
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

      <main className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg cursor-pointer"
                style={{ height: "280px" }}>
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-[var(--dark)]/0 group-hover:bg-[var(--dark)]/50 transition-all duration-500" />
                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-5"
                  style={{ background: "linear-gradient(to top, rgba(139,26,26,0.92), transparent)" }}>
                  <div className="w-8 h-[2px] bg-[var(--gold)] mb-2" />
                  <p className="text-white font-bold text-sm tracking-wide"
                    style={{ fontFamily: "Georgia, serif" }}>{item.caption}</p>
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
