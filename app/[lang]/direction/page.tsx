import Image from "next/image";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";

const getDictionary = async (lang: string) => {
  if (lang === "fr") return import("../../../dictionaries/fr.json").then((m) => m.default);
  return import("../../../dictionaries/en.json").then((m) => m.default);
};

type Member = { name: string; role: string; image: string };

export default async function DirectionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const members = dict.direction.members as Member[];
  const rector = members[0];
  const consultors = members.slice(1);

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      {/* Banner */}
      <div className="py-14" style={{ background: "#8B1A1A" }}>
        <div className="container mx-auto px-6 text-center text-white">
          <p className="badge" style={{ color: "#C9A84C" }}>{dict.direction.badge}</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">{dict.direction.title}</h1>
          <p className="mt-2 text-sm tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            {dict.direction.subtitle}
          </p>
        </div>
      </div>

      <main className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">

          {/* ── Rector — featured card ── */}
          <div className="flex flex-col md:flex-row gap-8 items-center p-8 rounded-2xl mb-14"
            style={{ border: "2px solid #C9A84C", boxShadow: "0 8px 40px rgba(139,26,26,0.10)" }}>
            <div className="relative flex-shrink-0 rounded-xl overflow-hidden"
              style={{ width: 200, height: 240, border: "3px solid #C9A84C" }}>
              <Image src={rector.image} alt={rector.name} fill className="object-cover object-top" />
            </div>
            <div>
              <p className="badge mb-2">{rector.role}</p>
              <h2 className="text-3xl font-bold mb-3" style={{ color: "#8B1A1A" }}>{rector.name}</h2>
              <div style={{ width: 48, height: 3, background: "#C9A84C", borderRadius: 2 }} />
            </div>
          </div>

          {/* ── Consultors grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultors.map((member, index) => (
              <div key={index} className="card text-center overflow-hidden">
                <div className="relative w-full" style={{ height: 200 }}>
                  <Image src={member.image} alt={member.name} fill className="object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(139,26,26,0.7) 0%, transparent 60%)" }} />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#C9A84C" }}>
                    {member.role}
                  </p>
                  <h3 className="text-sm font-bold leading-snug" style={{ color: "#1C1C1C" }}>
                    {member.name}
                  </h3>
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
