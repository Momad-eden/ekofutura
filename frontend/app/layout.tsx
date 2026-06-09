import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "@/modules/shared/components/Navbar";
import Footer from "@/modules/shared/components/Footer";

import ThemeProvider from "@/modules/shared/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EKOFUTURA",
  description:
    "Plateforme citoyenne de veille environnementale",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        className="
            min-h-screen
            flex
            flex-col
            bg-background
            text-foreground
            transition-colors
          "
      >
        <ThemeProvider>

          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
       </ThemeProvider>

      </body>
    </html>
  );
}