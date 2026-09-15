import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { JsonLd } from "@/components/seo/JsonLd";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: {
    canonical: "./",
  },
  keywords: [
    "Runmark",
    "Runmark CLI",
    "development environment",
    "environment drift",
    "works on my machine",
    "reproducible environments",
    "environment snapshot",
    "developer tools",
    "environment contract",
    "local environment observability",
    "canonical environment digest",
    "Python environment detector",
    "Django environment doctor",
    "Docker alternative local dev",
    "CI environment verification"
  ],
  authors: [{ name: "Runmark Maintainers" }],
  creator: "Runmark",
  publisher: "Runmark",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/images/logo-icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/images/logo-icon.png",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "cKmm49dWUv2GB4xV28eqbIIgj4DaphHTYAWTdEoQc8Q",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : {}),
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable} antialiased`}>
      <body className="bg-[#FAF8F3] text-[#202124] min-h-screen flex flex-col font-sans selection:bg-[#FF5A1F] selection:text-white">
        <JsonLd />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow relative z-10 bg-[#FAF8F3] shadow-[0_25px_50px_-12px_rgba(32,33,36,0.06)]">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
