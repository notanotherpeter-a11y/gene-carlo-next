import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gene Carlo Gallardo",
  "url": "https://gene-carlo.com",
  "email": "genecarloai@gmail.com",
  "telephone": "+61420418888",
  "jobTitle": "Applied AI Engineer",
  "description": "Applied AI Engineer and Enterprise AI Strategist with 15+ years of cross-domain experience. Founder of Syntyx Labs Pty Ltd, building AI-powered systems for businesses in Melbourne, Australia.",
  "image": "https://gene-carlo.com/syntyx-logo.png",
  "sameAs": [
    "https://linkedin.com/in/gene-carlo-gallardo",
    "https://syntyxlabs.com"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "Victoria",
    "addressCountry": "AU"
  },
  "knowsAbout": [
    "AI Strategy",
    "Enterprise AI Architecture",
    "LLM Integration",
    "Agent Orchestration",
    "Conversational AI",
    "Python",
    "TypeScript",
    "Full Stack Development",
    "Business Process Automation",
    "Digital Transformation"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Syntyx Labs Pty Ltd",
    "url": "https://syntyxlabs.com",
    "description": "AI SaaS product studio building intelligent automation systems for small and medium businesses in Australia."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body style={{ margin: 0, background: '#020408', overflow: 'hidden auto' }}>
        {children}
      </body>
    </html>
  );
}
