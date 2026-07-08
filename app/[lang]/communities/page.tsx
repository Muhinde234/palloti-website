import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";
import { getDictionary } from "@/lib/getDictionary";

export default async function CommunitiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      <div className="py-14" style={{ background: "#8B1A1A" }}>
        <div className="container mx-auto px-6 text-center text-white">
          <p className="badge" style={{ color: "#C9A84C" }}>{dict.communities.badge}</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2" style={{ fontFamily: "Georgia, serif" }}>
            {dict.communities.title}
          </h1>
          <p className="mt-2 text-base" style={{ color: "rgba(255,255,255,0.7)" }}>{dict.communities.subtitle}</p>
        </div>
      </div>

      <main className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.communities.items.map((community: { name: string; location: string; description: string; works: string[] }, index: number) => (
              <div key={index} className="card">
                <div style={{ height: 4, background: "#8B1A1A" }} />
                <div className="p-7">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4" style={{ background: "#8B1A1A", fontFamily: "Arial, sans-serif" }}>
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#8B1A1A", fontFamily: "Georgia, serif" }}>{community.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#C9A84C", fontFamily: "Arial, sans-serif" }}>
                    📍 {community.location}
                  </p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7280" }}>{community.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {community.works.map((work: string, i: number) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "#F9F6F1", color: "#8B1A1A", border: "1px solid #e5e0d8" }}>
                        {work}
                      </span>
                    ))}
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
