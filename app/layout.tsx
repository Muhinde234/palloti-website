import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pallottines — Rwanda Province",
  description: "Official website of the Pallottine Community, Rwanda Province (SAC). Inspired by Saint Vincent Pallotti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full">
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "var(--pallot-cream)" }}>
        {children}
      </body>
    </html>
  );
}
