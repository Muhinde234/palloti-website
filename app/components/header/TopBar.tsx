import { MapPin, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="sticky top-0 z-[110] w-full bg-gradient-to-r from-[#3e2009] via-[#5c3317] to-[#7a4520] text-white">
      <div className="container mx-auto px-4 md:px-6 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-xs font-medium">

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-yellow-500 shrink-0" />
            <span>Gikondo – 1083 Kigali, RWANDA</span>
          </div>
          <span className="hidden sm:block text-white/20">|</span>
          <div className="flex items-center gap-1.5">
            <Phone size={12} className="text-yellow-500 shrink-0" />
            <span>+250 788 307 271</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone size={12} className="text-yellow-500 shrink-0" />
            <span>+250 788 381 737</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://twitter.com/NiyonzimaEugne1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="hidden sm:inline">@NiyonzimaEugne1</span>
          </a>
          <span className="text-white/30">|</span>
          <a
            href="https://instagram.com/sac-psf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="hidden sm:inline">@sac-psf</span>
          </a>
        </div>

      </div>
    </div>
  );
}
