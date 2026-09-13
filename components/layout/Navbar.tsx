"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { RunmarkLogo } from "@/components/ui/RunmarkLogo";
import { MobileMenu } from "./MobileMenu";
import { Menu } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E8E2D9] shadow-warm-sm py-3"
            : "bg-[#FAF8F3] border-b border-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <RunmarkLogo />
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F3EFE8]/80 p-1 rounded-full border border-[#E8E2D9]">
            {siteConfig.navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1.5",
                    isActive
                      ? "bg-[#FFFDF9] text-[#202124] shadow-warm-sm border border-[#E8E2D9] font-semibold"
                      : "text-[#77736C] hover:text-[#202124] hover:bg-[#FFFDF9]/60"
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[11px] bg-[#FFF2EC] text-[#FF5A1F] px-1.5 py-0.2 rounded-full font-bold border border-[#FFD9CA]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Balance Container */}
          <div className="flex items-center justify-end md:min-w-[124px]">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#77736C] hover:text-[#202124] hover:bg-[#F3EFE8] rounded-xl border border-[#E8E2D9] transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
