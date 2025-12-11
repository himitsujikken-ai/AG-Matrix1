import type { Metadata } from "next";
import { Noto_Serif_JP, JetBrains_Mono } from "next/font/google";
import { GridBackground } from "@/components/ui/grid-background";
import "./globals.css";

const serif = Noto_Serif_JP({
  weight: ["200", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "神羅万象グリッド | GRID Matrix",
  description: "運命のオーバーライド。この世界の構造をハックする。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${serif.variable} ${mono.variable}`}>
      <body className="font-serif antialiased overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
        <div className="scanlines" />
        <GridBackground />
        {children}
      </body>
    </html>
  );
}
