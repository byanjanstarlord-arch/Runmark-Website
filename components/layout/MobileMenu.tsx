"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Star, X, ExternalLink, ArrowRight } from "lucide-react";
import { RunmarkLogo } from "@/components/ui/RunmarkLogo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden bg-[#202124]/40 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FAF8F3] border-l border-[#E8E2D9] shadow-warm-xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D9]">
            <RunmarkLogo size="sm" />
            <button
              onClick={onClose}
              className="p-2 text-[#77736C] hover:text-[#202124] hover:bg-[#F3EFE8] rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="py-6 space-y-1">
            {siteConfig.navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/") ||
                (link.label === "Docs" && pathname.startsWith("/docs"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-[#FFFDF9] text-[#FF5A1F] shadow-warm-sm border border-[#E8E2D9]"
                      : "text-[#202124] hover:bg-[#F3EFE8] hover:text-[#202124]"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] bg-[#FFF2EC] text-[#FF5A1F] px-1.5 py-0.5 rounded-full font-semibold border border-[#FFD9CA]">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer CTAs */}
        <div className="pt-6 border-t border-[#E8E2D9] space-y-3">
          <Button
            href={siteConfig.githubUrl}
            external
            variant="secondary"
            className="w-full justify-center"
            leftIcon={<Star className="w-4 h-4 text-[#FF5A1F] fill-[#FF5A1F]" />}
          >
            Star on GitHub
          </Button>

          <div className="text-center text-xs text-[#77736C]">
            v{siteConfig.version} • MIT License
          </div>
        </div>
      </div>
    </div>
  );
}
