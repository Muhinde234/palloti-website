import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

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
    <html className={`h-full ${mulish.variable}`}>
      <body className={`min-h-full flex flex-col antialiased ${mulish.className}`}>
        {children}
      </body>
    </html>
  );
}
