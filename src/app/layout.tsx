// src/app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Kurian Jose - AI Developer Portfolio",
  description:
    "AI Developer specializing in LangChain, RAG systems, and legal tech solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        

        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
