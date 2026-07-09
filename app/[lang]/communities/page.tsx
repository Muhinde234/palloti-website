import { Header } from "../../components/header";
import { Footer } from "../../components/Footer";
import { getDictionary } from "@/lib/getDictionary";
import CommunitiesFilter from "../../components/CommunitiesFilter";

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
          <CommunitiesFilter
            communities={dict.communities.items}
            labels={dict.communities.filterLabels}
          />
        </div>
      </main>

      <Footer lang={lang} dict={dict.footer} navigation={dict.navigation} />
    </>
  );
}
