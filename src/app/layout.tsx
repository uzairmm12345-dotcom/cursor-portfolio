import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import HashScrollHandler from "@/components/HashScrollHandler";
import Scene3D from "@/components/Scene3D";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrainsMono",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plusJakarta",
});

export const metadata: Metadata = {
  title: "Uzair Riasat — Software Engineer · Backend & Full-Stack",
  description:
    "Software Engineer building Python/FastAPI backends, SQL and APIs, AI features, and Next.js frontends. Production experience with business systems. Based in Islamabad, Pakistan.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Uzair Riasat — Software Engineer · Backend & Full-Stack",
    description:
      "Software Engineer building Python/FastAPI backends, SQL and APIs, AI features, and Next.js frontends. Production experience with business systems. Based in Islamabad, Pakistan.",
    url: "https://uzairriasat.netlify.app",
    siteName: "Uzair Riasat",
    images: [{ url: "https://uzairriasat.netlify.app/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uzair Riasat — Software Engineer · Backend & Full-Stack",
    description:
      "Software Engineer building Python/FastAPI backends, SQL and APIs, AI features, and Next.js frontends. Production experience with business systems. Based in Islamabad, Pakistan.",
    images: ["https://uzairriasat.netlify.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <style>{`
          :root { --header-h: 64px; }
          @media (min-width: 1024px) { :root { --header-h: 76px; } }
        `}</style>
      </head> */}
      <body className={`${jetbrainsMono.variable} ${plusJakarta.variable}`}>
        <Scene3D />

        {/*
          page-shell: centers and caps the entire site at 1200px.
          On wide monitors the background bleeds full-width but all
          content stays in this column — exactly like image 2.
        */}
        <Header />
        <HashScrollHandler />
        <div className="page-shell">
          <main className="relative z-10" style={{ paddingTop: "var(--header-h)" }}>
            {children}
          </main>
          <Footer />
        </div>
        <Chatbot />
      </body>
    </html>
  );
}