import Image from "next/image";
import Link from "next/link";

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
  navigation: {
    identity: string;
    provincialDirection: string;
    communitiesAndWorks: string;
    news: string;
    galleries: string;
  };
}

export const Footer = ({ lang, dict, navigation }: FooterProps) => {
  return (
    <footer style={{ backgroundColor: "var(--pallot-red-dark)", color: "rgba(255,255,255,0.85)" }}>
      {/* Gold top border */}
      <div style={{ height: "3px", background: "linear-gradient(to right, var(--pallot-gold), var(--pallot-gold-light), var(--pallot-gold))" }} />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/p4.png" alt="Pallottine Logo" width={50} height={50} className="rounded-full" />
              <div>
                <p className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>SAC Province</p>
                <p style={{ color: "var(--pallot-gold-light)", fontSize: "0.7rem", letterSpacing: "0.15em" }}>HOLY FAMILY · KIGALI</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{dict.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "var(--pallot-gold)" }}>
              {dict.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#identity", label: navigation.identity },
                { href: "#direction", label: navigation.provincialDirection },
                { href: "#communities", label: navigation.communitiesAndWorks },
                { href: "#news", label: navigation.news },
                { href: "#galleries", label: navigation.galleries },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-yellow-300"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "var(--pallot-gold)" }}>
              {dict.contact}
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              <li>📍 {dict.address}</li>
              <li>📞 {dict.phone}</li>
              <li>✉️ {dict.email}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 text-center text-xs"
          style={{ borderTop: "1px solid rgba(201,168,76,0.2)", color: "rgba(255,255,255,0.4)" }}
        >
          {dict.rights}
        </div>
      </div>
    </footer>
  );
};
