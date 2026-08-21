import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import ScrollInit from "@/components/ScrollInit";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gene Carlo Gallardo — Applied AI Engineer",
  description: "Applied AI Engineer, Systems Developer & Automation Architect. I build AI-powered systems that work in the real world, solving business problems in Melbourne, Australia.",
  openGraph: {
    title: "Gene Carlo Gallardo — Applied AI Engineer",
    description: "Applied AI Engineer & Systems Developer building real-world AI solutions",
    url: "https://gene-carlo.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gene Carlo Gallardo — Applied AI Engineer",
    description: "Applied AI Engineer & Systems Developer building real-world AI solutions",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LenisProvider>
          <ScrollInit />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
