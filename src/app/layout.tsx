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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Gene Carlo Gallardo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gene Carlo Gallardo is an Applied AI Engineer and Enterprise AI Strategist based in Melbourne, Australia. He is the founder of Syntyx Labs Pty Ltd, with 15+ years of experience building AI-powered systems across logistics, healthcare, finance, and real estate."
      }
    },
    {
      "@type": "Question",
      "name": "What does Gene Carlo Gallardo do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gene Carlo builds AI-powered systems including autonomous agents, conversational AI, LLM integrations, enterprise automation platforms, and full-stack web and mobile applications. He also provides AI strategy consulting and enterprise transformation services."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Gene Carlo Gallardo based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gene Carlo Gallardo is based in Melbourne, Victoria, Australia."
      }
    },
    {
      "@type": "Question",
      "name": "What is Syntyx Labs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Syntyx Labs Pty Ltd is Gene Carlo Gallardo's AI SaaS product studio based in Melbourne, Australia. It builds AI tools, automation platforms, and intelligent systems for small and medium businesses."
      }
    },
    {
      "@type": "Question",
      "name": "How can I hire Gene Carlo Gallardo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can contact Gene Carlo at genecarloai@gmail.com or via the contact form at gene-carlo.com. He is open to AI strategy consulting, automation projects, and custom software development engagements, and responds within 24 hours."
      }
    },
    {
      "@type": "Question",
      "name": "What AI services does Gene Carlo offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gene Carlo offers AI Strategy Development, Enterprise AI Architecture, LLM Integration, Agent Orchestration, Conversational AI, AI Copilot Development, Business Process Automation, and Digital Transformation consulting."
      }
    },
    {
      "@type": "Question",
      "name": "What programming languages does Gene Carlo use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gene Carlo works primarily with Python and TypeScript, and has extensive experience with React, Next.js, REST APIs, Docker, AWS, and GCP."
      }
    }
  ]
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
        {/* Google Analytics 4 — G-NEG50XQ3XC */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NEG50XQ3XC" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NEG50XQ3XC');
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body style={{ margin: 0, background: '#020408', overflow: 'hidden auto' }}>
        {children}
      </body>
    </html>
  );
}
