import Image from "next/image";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";

const getDictionary = async (lang: string) => {
  if (lang === "fr") return import("../../../dictionaries/fr.json").then((m) => m.default);
  return import("../../../dictionaries/en.json").then((m) => m.default);
};

const images = [
  "/images/p2.jpg",
  "/images/p5.jpg",
  "/images/p6.jpg",
  "/images/p7.jpg",
  "/images/p8.jpg",
  "/images/pic1.jpeg",
];

export default async function GalleriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      <div className="py-14" style={{ background: "#8B1A1A" }}>
        <div className="container mx-auto px-6 text-center text-white">
          <p className="badge" style={{ color: "#C9A84C" }}>{dict.galleries.badge}</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2" style={{ fontFamily: "Georgia, serif" }}>
            {dict.galleries.title}
          </h1>
          <p className="mt-2 text-base" style={{ color: "rgba(255,255,255,0.7)" }}>{dict.galleries.subtitle}</p>
        </div>
      </div>

      <main className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg" style={{ height: "260px" }}>
                <Image
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
