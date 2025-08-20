import "./globals.css";
import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { LanguageProvider } from "../components/LanguageProvider";

export const metadata = {
  title: "CalmClick — AI Wellness for Dubai",
  description: "Your AI-powered wellness coach — Arabic & English, just a click away.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <LanguageProvider>
          <Navbar />
          <main className="container py-10">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
