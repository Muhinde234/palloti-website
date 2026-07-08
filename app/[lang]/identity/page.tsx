import Image from "next/image";
import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";
import { getDictionary } from "@/lib/getDictionary";

export default async function IdentityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const { founder, charisma } = dict;

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />

      <div className="page-banner">
        <div className="container mx-auto px-6">
          <p className="badge">{founder.badge}</p>
          <h1>{founder.title}</h1>
          <p className="subtitle">{founder.subtitle}</p>
        </div>
      </div>

      {/* FOUNDER */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Photo + quote */}
            <div className="lg:col-span-2 flex flex-col items-center gap-6">
              <div className="rounded-xl overflow-hidden w-full max-w-sm border-[3px] border-[var(--gold)]"
                style={{ boxShadow: "0 12px 40px rgba(139,26,26,0.15)" }}>
                <Image src="/founder.png" alt="Saint Vincent Pallotti" width={380} height={480}
                  className="w-full object-cover" />
              </div>
              <blockquote className="w-full max-w-sm rounded-lg p-6 text-center italic bg-[var(--red)] text-[var(--white)]">
                <p className="text-lg mb-2">&ldquo;{founder.quote}&rdquo;</p>
                <footer className="text-sm font-semibold text-[var(--gold)]">{founder.quoteAuthor}</footer>
              </blockquote>
            </div>

            {/* Biography */}
            <div className="lg:col-span-3 space-y-5">
              {founder.biography.map((paragraph: string, index: number) => (
                <p key={index} className="leading-relaxed text-[var(--mid)]" style={{ fontSize: "1.05rem" }}>
                  {index === 0 && (
                    <span className="float-left text-6xl font-bold mr-3 leading-none text-[var(--red)]"
                      style={{ fontFamily: "Georgia, serif" }}>
                      {paragraph[0]}
                    </span>
                  )}
                  {index === 0 ? paragraph.slice(1) : paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHARISMA */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="container mx-auto px-6">

          <div className="text-center mb-14">
            <p className="badge">{charisma.badge}</p>
            <h2 className="section-title mt-2">{charisma.title}</h2>
            <div className="divider mt-4 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Image */}
            <div className="relative rounded-xl overflow-hidden border-[3px] border-[var(--gold)]"
              style={{ height: 420, boxShadow: "0 12px 40px rgba(139,26,26,0.12)" }}>
              <Image src={charisma.image} alt="Charisma" fill className="object-cover" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(139,26,26,0.35), transparent 60%)" }} />
            </div>

            {/* Text */}
            <div className="space-y-5">
              {charisma.paragraphs.map((paragraph: string, index: number) => (
                <p key={index} className="leading-relaxed text-[var(--mid)]" style={{ fontSize: "1.02rem" }}>
                  {index === 0 && (
                    <span className="float-left text-6xl font-bold mr-3 leading-none text-[var(--red)]"
                      style={{ fontFamily: "Georgia, serif" }}>
                      {paragraph[0]}
                    </span>
                  )}
                  {index === 0 ? paragraph.slice(1) : paragraph}
                </p>
              ))}
              <div className="pt-4">
                <Link href={`/${lang}/history`} className="btn-primary">
                  {lang === "fr" ? "Notre Histoire →" : "Our History →"}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
