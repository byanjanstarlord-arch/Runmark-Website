import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles } from "lucide-react";

export function LatestReleaseSection() {
  return (
    <section className="py-16 bg-[#FAF8F3] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-8 sm:p-10 shadow-warm-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <Badge variant="orange" size="md">Latest Release</Badge>
              <span className="text-xs sm:text-sm font-mono text-[#77736C]">v{siteConfig.version} • {siteConfig.latestReleaseDate}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#202124]">
              Contract Bootstrap & Developer Experience
            </h3>

            <p className="text-sm sm:text-base text-[#77736C] leading-relaxed">
              Added evidence-driven contract synthesis (<code className="text-[#202124] font-semibold bg-[#FAF8F3] px-1.5 py-0.5 rounded border border-[#E8E2D9]">runmark contract init</code>), live contract check cards (<code className="text-[#202124] font-semibold bg-[#FAF8F3] px-1.5 py-0.5 rounded border border-[#E8E2D9]">runmark check --explain</code>), and pre-export canary security verification.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/changelog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9] text-sm font-semibold text-[#202124] hover:border-[#D8D2C7] transition-all shadow-warm-sm"
            >
              <span>Release notes</span>
              <ArrowRight className="w-4 h-4 text-[#FF5A1F]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
