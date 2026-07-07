import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";

const getDictionary = async (lang: string) => {
  if (lang === "fr") return import("../../../dictionaries/fr.json").then((m) => m.default);
  return import("../../../dictionaries/en.json").then((m) => m.default);
};

export default async function DirectionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      <div className="py-14" style={{ background: "#8B1A1A" }}>
        <div className="container mx-auto px-6 text-center text-white">
          <p className="badge" style={{ color: "#C9A84C" }}>{dict.direction.badge}</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2" style={{ fontFamily: "Georgia, serif" }}>
            {dict.direction.title}
          </h1>
          <p className="mt-2 text-base" style={{ color: "rgba(255,255,255,0.7)" }}>{dict.direction.subtitle}</p>
        </div>
      </div>

      <main className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dict.direction.members.map((member: { name: string; role: string; message: string }, index: number) => (
              <div key={index} className="rounded-xl p-8 text-center" style={{ border: "1px solid #e5e0d8", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ background: "#8B1A1A" }}>
                  {member.name.split(" ")[1]?.[0] ?? "P"}
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "#1C1C1C", fontFamily: "Georgia, serif" }}>{member.name}</h3>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#C9A84C", fontFamily: "Arial, sans-serif" }}>{member.role}</p>
                <p className="text-sm italic leading-relaxed" style={{ color: "#6B7280" }}>"{member.message}"</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
