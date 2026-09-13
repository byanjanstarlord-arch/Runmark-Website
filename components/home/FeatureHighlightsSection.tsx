import React from "react";
import Link from "next/link";
import { featuresList } from "@/lib/features-data";
import { Badge } from "@/components/ui/Badge";
import { 
  Search, 
  Camera, 
  GitCompare, 
  FileCheck2, 
  ShieldCheck, 
  TerminalSquare, 
  Lock, 
  Cpu, 
  Blocks,
  ArrowRight
} from "lucide-react";

const iconMap: Record<string, any> = {
  Search,
  Camera,
  GitCompare,
  FileCheck2,
  ShieldCheck,
  TerminalSquare,
  Lock,
  Cpu,
  Blocks
};

export function FeatureHighlightsSection() {
  const highlights = featuresList.slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F3] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
              Feature Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight mt-2">
              Everything you need to understand your environment.
            </h2>
          </div>
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF5A1F] hover:text-[#E94D17] transition-colors shrink-0"
          >
            <span>Explore all features</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((feat) => {
            const Icon = iconMap[feat.iconName] || Search;
            return (
              <div
                key={feat.id}
                className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-7 shadow-warm-sm hover:shadow-warm-md hover:border-[#D8D2C7] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] text-[#FF5A1F]">
                      <Icon className="w-5 h-5" />
                    </div>
                    {feat.status === "new" && (
                      <Badge variant="orange" size="sm">New</Badge>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#202124] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#77736C] leading-relaxed mb-4">
                    {feat.description}
                  </p>
                </div>

                {feat.command && (
                  <div className="pt-4 border-t border-[#E8E2D9]">
                    <div className="text-[11px] font-mono text-[#77736C] bg-[#FAF8F3] px-3 py-1.5 rounded-lg border border-[#E8E2D9] truncate">
                      $ {feat.command}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
