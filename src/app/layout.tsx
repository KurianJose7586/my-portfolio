// src/app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const baseUrl = "https://kurianjose.me";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Kurian Jose - AI Engineer & Full Stack Developer",
    template: "%s | Kurian Jose",
  },
  description:
    "AI Engineer specializing in LangChain, RAG systems, Legal AI, and Fintech Automation. Building practical AI solutions with TwinlyAI.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Kurian Jose",
    "TwinlyAI",
    "Legal AI",
    "Fintech Automation",
    "LangChain",
    "RAG",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Kurian Jose" }],
  creator: "Kurian Jose",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Kurian Jose - AI Engineer & Full Stack Developer",
    description:
      "AI Engineer specializing in LangChain, RAG systems, and legal tech solutions. Founder of TwinlyAI.",
    siteName: "Kurian Jose Portfolio",
    images: [
      {
        url: "/avatar.png", // Using avatar as a fallback, ideally should have a dedicated OG image
        width: 800,
        height: 800,
        alt: "Kurian Jose",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurian Jose - AI Engineer & Full Stack Developer",
    description:
      "AI Engineer specializing in LangChain, RAG systems, and legal tech solutions.",
    images: ["/avatar.png"],
    creator: "@KurianJose", // Replace with actual handle if available
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Kurian Jose",
      "url": baseUrl,
      "jobTitle": "AI Engineer & Full Stack Developer",
      "description": "AI Developer specializing in LangChain, RAG systems, and legal tech solutions.",
      "sameAs": [
        "https://github.com/KurianJose7586",
        "https://www.linkedin.com/in/kurian-jose-862b30294/",
      ],
      "knowsAbout": ["Artificial Intelligence", "Full Stack Development", "Legal Tech", "Fintech Automation", "LangChain", "RAG Systems"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kurian Jose Portfolio",
      "url": baseUrl,
      "description": "Portfolio of Kurian Jose, AI Engineer and Full Stack Developer.",
      "publisher": {
        "@type": "Person",
        "name": "Kurian Jose"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": "Kurian Jose",
        "description": "AI Engineer specializing in LangChain, RAG systems, and legal tech solutions.",
        "image": `${baseUrl}/avatar.png`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "numberOfItems": 8,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "CreativeWork",
            "name": "TwinlyAI",
            "description": "TwinlyAI transforms your resume into an intelligent AI assistant.",
            "url": "https://github.com/KurianJose7586/Twinly-consolidated.git"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "CreativeWork",
            "name": "AI Lawyer",
            "description": "PDF-based legal chatbot using LangChain + Groq.",
            "url": "https://github.com/KurianJose7586/Ai-lawyer-project.git"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "CreativeWork",
            "name": "Cablite",
            "description": "Modern ride-sharing application with offline-first design.",
            "url": "https://github.com/KurianJose7586/Cablite-offline.git"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "CreativeWork",
            "name": "BRD Generation",
            "description": "AI-powered Business Requirements Document generation.",
            "url": "https://github.com/KurianJose7586/HackfestFinetuners.git"
          }
        }
      ]
    }
  ];

  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
