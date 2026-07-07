import Image from "next/image";

type FooterDict = {
  tagline: string;
  quickLinks: string;
  contact: string;
  address: string;
  phone: string;
  email: string;
  rights: string;
};

interface FooterProps {
  lang: string;
  dict: FooterDict;
  navigation: { identity: string; provincialDirection: string; communitiesAndWorks: string; news: string; galleries: string };
}

export const Footer = ({ lang, dict, navigation }: FooterProps) => {
  const routes = [
    { href: `/${lang}/identity`, label: navigation.identity },
    { href: `/${lang}/direction`, label: navigation.provincialDirection },
    { href: `/${lang}/communities`, label: navigation.communitiesAndWorks },
    { href: `/${lang}/news`, label: navigation.news },
    { href: `/${lang}/galleries`, label: navigation.galleries },
  ];

  return (
    <footer style={{ background: "#8B1A1A", color: "rgba(255,255,255,0.85)" }}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/p4.png" alt="SAC Logo" width={56} height={56} className="object-contain" />
              <div>
                <p className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>SAC Province</p>
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#E2C06A" }}>Holy Family · Kigali</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{dict.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#C9A84C", fontFamily: "Arial, sans-serif" }}>
              {dict.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              {routes.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#C9A84C", fontFamily: "Arial, sans-serif" }}>
              {dict.contact}
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              <li>📍 {dict.address}</li>
              <li>📞 {dict.phone}</li>
              <li>✉️ {dict.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 text-center text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}>
          {dict.rights}
        </div>
      </div>
    </footer>
  );
};
