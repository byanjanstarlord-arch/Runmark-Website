import React from "react";
import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    "url": siteConfig.siteUrl,
    "name": siteConfig.name,
    "alternateName": ["Runmark CLI", "Runmark Dev"],
    "description": siteConfig.description,
    "publisher": {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    "inLanguage": "en-US",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.siteUrl}/#organization`,
    "name": siteConfig.name,
    "url": siteConfig.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.siteUrl}/images/logo-runmark.png`,
      "width": "512",
      "height": "512",
    },
    "sameAs": [
      siteConfig.githubUrl,
      "https://pypi.org/project/runmark/",
    ],
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.siteUrl}/#software`,
    "name": siteConfig.name,
    "operatingSystem": "Linux, macOS, Windows",
    "applicationCategory": "DeveloperApplication",
    "description": siteConfig.description,
    "softwareVersion": siteConfig.version,
    "license": "https://opensource.org/licenses/MIT",
    "url": siteConfig.siteUrl,
    "downloadUrl": "https://pypi.org/project/runmark/",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "author": {
      "@type": "Organization",
      "name": "Runmark Maintainers",
      "url": siteConfig.githubUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Runmark and what problem does it solve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Runmark is a local-first development environment observability, fingerprinting, comparison, and verification tool designed to permanently eliminate 'works on my machine' issues across teams and CI pipelines."
        }
      },
      {
        "@type": "Question",
        "name": "How does Runmark detect development environment drift?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Runmark scans runtime interpreters, package dependencies, OS packages, port bindings, and environment variables into a deterministic canonical digest and compares it against expected environment contracts."
        }
      },
      {
        "@type": "Question",
        "name": "How does Runmark compare to Docker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Runmark works directly on native host environments without the heavy overhead, virtualization, or build times of Docker containers, while also being able to verify inside containers and CI jobs."
        }
      },
      {
        "@type": "Question",
        "name": "Does Runmark inspect or leak sensitive secrets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Runmark features a zero-secret security architecture. Environment variable values matching secret heuristics (API tokens, passwords, private keys) are automatically redacted locally before calculating digests."
        }
      },
      {
        "@type": "Question",
        "name": "How do I install Runmark?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Runmark is available on PyPI. You can install it using 'pip install runmark' or run it directly in your virtual environment."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
