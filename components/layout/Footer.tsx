import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { RunmarkLogo } from "@/components/ui/RunmarkLogo";
import { Github, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#FAF8F3] border-t border-[#E8E2D9] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-[#E8E2D9]">
          {/* Brand Info Column */}
          <div className="col-span-2 space-y-4">
            <RunmarkLogo size="md" />
            <p className="text-sm text-[#77736C] max-w-sm leading-relaxed">
              {siteConfig.statement}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#77736C] font-mono pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#238636]" />
              Runmark v{siteConfig.version} • MIT Open Source
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#202124]">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-[#77736C]">
              {siteConfig.footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#FF5A1F] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#202124]">
              Documentation
            </h4>
            <ul className="space-y-2 text-sm text-[#77736C]">
              {siteConfig.footerLinks.documentation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#FF5A1F] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#202124]">
              Community
            </h4>
            <ul className="space-y-2 text-sm text-[#77736C]">
              {siteConfig.footerLinks.community.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FF5A1F] transition-colors inline-flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-[#FF5A1F] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77736C]">
          <p>© {new Date().getFullYear()} Runmark Maintainers. Released under MIT License.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#202124] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#202124] transition-colors">
              Contact
            </Link>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#202124] transition-colors flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
