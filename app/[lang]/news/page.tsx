import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";
import { getDictionary } from "@/lib/getDictionary";
import NewsFilter from "../../components/NewsFilter";
import DecorativeDivider from "../../components/ui/DecorativeDivider";

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const { newsSection } = dict;

  return (
    <>
      <Header lang={lang} navigation={dict.navigation} />
      <DecorativeDivider />

      <div className="page-banner">
        <div className="container mx-auto px-6">
          <p className="badge">{newsSection.badge}</p>
          <h1>{newsSection.title}</h1>
          <p className="subtitle">Province Sainte Famille · SAC</p>
        </div>
      </div>

      <main className="py-16 bg-[var(--cream)]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <NewsFilter
            articles={newsSection.articles}
            readMore={newsSection.readMore}
            lang={lang}
            allPublicationsLabel={lang === "fr" ? "Toutes les Publications" : "All Publications"}
          />
        </div>
      </main>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
