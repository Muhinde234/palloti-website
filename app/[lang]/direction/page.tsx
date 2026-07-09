import Image from "next/image";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";
import { getDictionary } from "@/lib/getDictionary";
import DecorativeDivider from "../../components/ui/DecorativeDivider";

type Member = { name: string; role: string; image: string };

export default async function DirectionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const members = dict.direction.members as Member[];
  const rector = members[0];
  const consultors = members.slice(1);

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />
      <DecorativeDivider />

      <div className="page-banner">
        <div className="container mx-auto px-6">
          <p className="badge">{dict.direction.badge}</p>
          <h1>{dict.direction.title}</h1>
          <p className="subtitle">{dict.direction.subtitle}</p>
        </div>
      </div>

      <main className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

          {/* Rector — featured card */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center p-6 md:p-8 rounded-2xl mb-10 md:mb-14 border-2 border-[var(--gold)]"
            style={{ boxShadow: "0 8px 40px rgba(139,26,26,0.10)" }}>
            <div className="relative flex-shrink-0 rounded-xl overflow-hidden border-[3px] border-[var(--gold)]"
              style={{ width: 160, height: 200 }}>
              <Image src={rector.image} alt={rector.name} fill className="object-cover object-top" />
            </div>
            <div className="text-center md:text-left">
              <p className="badge mb-2">{rector.role}</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[var(--red)]"
                style={{ fontFamily: "Georgia, serif" }}>{rector.name}</h2>
              <div className="w-12 h-[3px] rounded bg-[var(--gold)] mx-auto md:mx-0" />
            </div>
          </div>

          {/* Consultors grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {consultors.map((member, index) => (
              <div key={index} className="card text-center overflow-hidden">
                <div className="relative w-full" style={{ height: 200 }}>
                  <Image src={member.image} alt={member.name} fill className="object-cover object-top" />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(139,26,26,0.7) 0%, transparent 60%)" }} />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[var(--gold)]">
                    {member.role}
                  </p>
                  <h3 className="text-sm font-bold leading-snug text-[var(--gold)]"
                    style={{ fontFamily: "Georgia, serif" }}>
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
