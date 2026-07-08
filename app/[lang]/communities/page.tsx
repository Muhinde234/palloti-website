import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";
import { getDictionary } from "@/lib/getDictionary";

export default async function CommunitiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      <div className="page-banner">
        <div className="container mx-auto px-6">
          <p className="badge">{dict.communities.badge}</p>
          <h1>{dict.communities.title}</h1>
          <p className="subtitle">{dict.communities.subtitle}</p>
        </div>
      </div>

      <main className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.communities.items.map((community: { name: string; location: string; description: string; works: string[] }, index: number) => (
              <div key={index} className="card">
                <div className="h-1 bg-[var(--red)]" />
                <div className="p-7">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--white)] font-bold mb-4 bg-[var(--red)]"
                    style={{ fontFamily: "Georgia, serif" }}>
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-[var(--red)]"
                    style={{ fontFamily: "Georgia, serif" }}>{community.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-[var(--gold)]">
                    📍 {community.location}
                  </p>
                  <p className="text-sm leading-relaxed mb-5 text-[var(--gray)]">{community.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {community.works.map((work: string, i: number) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full font-medium bg-[var(--cream2)] text-[var(--red)] border border-[#e5e0d8]">
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
