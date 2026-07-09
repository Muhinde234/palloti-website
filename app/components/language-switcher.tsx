"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "../../i18n.config";

export const LanguageSwitcher = () => {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center gap-1">
      {i18n.locales.map((locale, index) => {
        const isActive = pathName.startsWith(`/${locale}`);
        return (
          <span key={locale} className="flex items-center gap-1">
            <Link
              href={redirectedPathName(locale)}
              className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded transition-colors"
              style={{
                color: isActive ? "#fff" : "var(--red)",
                backgroundColor: isActive ? "var(--red)" : "transparent",
              }}
            >
              {locale}
            </Link>
            {index < i18n.locales.length - 1 && (
              <span style={{ color: "#d1d5db", fontSize: "0.7rem" }}>|</span>
            )}
          </span>
        );
      })}
    </div>
  );
};
