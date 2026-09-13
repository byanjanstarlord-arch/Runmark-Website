export const siteConfig = {
  name: "Runmark",
  shortName: "Runmark",
  tagline: "Know what makes your code run.",
  statement: "Git tracks your code. Runmark tracks what makes your code run.",
  primaryMessage: "Your code runs somewhere. Make sure it runs everywhere.",
  description: "Local-first development environment observability, fingerprinting, comparison, and verification. Eliminate 'works on my machine' forever.",
  version: "0.2.2",
  latestReleaseDate: "Aug 15, 2026",
  schemaVersion: "1.0",
  license: "MIT",
  installCommand: "pip install runmark",
  githubUrl: "https://github.com/byanjanstarlord-arch/Runmark",
  discussionsUrl: "https://github.com/byanjanstarlord-arch/Runmark/discussions",
  issuesUrl: "https://github.com/byanjanstarlord-arch/Runmark/issues",
  releasesUrl: "https://github.com/byanjanstarlord-arch/Runmark/releases",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://runmark.dev",
  navLinks: [
    { label: "Features", href: "/features" },
    { label: "Docs", href: "/docs" },
    { label: "Playground", href: "/playground", badge: "Demo" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Community", href: "/community" },
  ],
  footerLinks: {
    product: [
      { label: "Features", href: "/features" },
      { label: "Environment Contracts", href: "/docs/concepts/environment-contracts" },
      { label: "Playground", href: "/playground" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
    documentation: [
      { label: "Getting Started", href: "/docs/getting-started/introduction" },
      { label: "Installation", href: "/docs/getting-started/installation" },
      { label: "Quick Start", href: "/docs/getting-started/quick-start" },
      { label: "CLI Reference", href: "/docs/cli/runmark-scan" },
      { label: "Security Architecture", href: "/docs/security/zero-secret" },
    ],
    community: [
      { label: "GitHub Repository", href: "https://github.com/byanjanstarlord-arch/Runmark", external: true },
      { label: "Discussions", href: "https://github.com/byanjanstarlord-arch/Runmark/discussions", external: true },
      { label: "Issue Tracker", href: "https://github.com/byanjanstarlord-arch/Runmark/issues", external: true },
      { label: "Contributing", href: "/docs/contributing/development-setup" },
      { label: "Community Hub", href: "/community" },
    ],
    company: [
      { label: "About Runmark", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "License (MIT)", href: "https://github.com/byanjanstarlord-arch/Runmark/blob/main/LICENSE", external: true },
    ]
  }
};
