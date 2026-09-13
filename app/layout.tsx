import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.siteUrl),
  keywords: [
    "Runmark",
    "development environment",
    "environment drift",
    "works on my machine",
    "reproducible environments",
    "environment snapshot",
    "developer tools",
    "environment contract",
    "runmark CLI",
    "Python",
    "Django",
    "Docker"
  ],
  authors: [{ name: "Runmark Maintainers" }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-[#FAF8F3] text-[#202124] min-h-screen flex flex-col font-sans selection:bg-[#FF5A1F] selection:text-white">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
