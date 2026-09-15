import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { featuresList } from "@/lib/features-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TechStackSection } from "@/components/home/TechStackSection";
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
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features — Development Environment Intelligence",
  description: "Explore all verified Runmark CLI capabilities: environment scanning, deterministic snapshots, drift detection, environment contracts, and doctor diagnostics.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "Features — Development Environment Intelligence | Runmark",
    description: "Explore all verified Runmark CLI capabilities: environment scanning, deterministic snapshots, drift detection, environment contracts, and doctor diagnostics.",
    url: "/features",
  },
};

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

export default function FeaturesPage() {
  return (
    <div className="py-12 md:py-20 bg-warm-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="orange" size="md">Complete Feature Suite</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#202124] tracking-tight">
            Features
          </h1>
          <p className="text-lg sm:text-xl text-[#77736C] leading-relaxed">
            Everything you need for reproducible, reliable, and consistent development environments.
          </p>
        </div>

        {/* 3x3 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {featuresList.map((feat) => {
            const Icon = iconMap[feat.iconName] || Search;
            return (
              <div
                key={feat.id}
                className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-8 shadow-warm-sm hover:shadow-warm-md hover:border-[#D8D2C7] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] text-[#FF5A1F]">
                      <Icon className="w-6 h-6" />
                    </div>
                    {feat.status === "new" && (
                      <Badge variant="orange" size="sm">New</Badge>
                    )}
                    {feat.status === "planned" && (
                      <Badge variant="warning" size="sm">Roadmap</Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#202124] mb-2.5">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#77736C] leading-relaxed mb-6">
                    {feat.description}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-2.5 mb-6">
                    {feat.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-[#202124]">
                        <span className="text-[#238636] font-bold shrink-0 mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-5 border-t border-[#E8E2D9] flex items-center justify-between">
                  {feat.command ? (
                    <code className="text-xs font-mono text-[#77736C] bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#E8E2D9] truncate max-w-[200px]">
                      $ {feat.command}
                    </code>
                  ) : (
                    <span className="text-xs font-medium text-[#77736C]">Architecture Concept</span>
                  )}
                  <Link
                    href={feat.docsUrl}
                    className="text-sm font-bold text-[#FF5A1F] hover:text-[#E94D17] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Docs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Spotlight Card */}
        <div className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-8 sm:p-12 shadow-warm-md mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Terminal Preview */}
            <div className="lg:col-span-6 rounded-3xl bg-[#17191C] border border-[#2A2E33] p-6 font-mono text-xs sm:text-sm text-[#E6EDF3] overflow-x-auto shadow-warm-sm">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#2A2E33]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="text-xs text-[#77736C] ml-2">$ runmark scan</span>
              </div>
              <div className="space-y-1.5 leading-relaxed">
                <div className="text-[#77736C]">Scanning environment...</div>
                <div className="text-[#238636]">✓ Python 3.12.10 detected</div>
                <div className="text-[#238636]">✓ Node.js 22.19.0 detected</div>
                <div className="text-[#238636]">✓ PostgreSQL 16.3 (Port 5432) active</div>
                <div className="text-[#238636]">✓ Environment secrets redacted</div>
                <div className="text-[#FF5A1F] pt-2">Canonical Digest: ce19840abda567...</div>
                <div className="text-white font-semibold">Snapshot saved successfully.</div>
              </div>
            </div>

            {/* Spotlight Info */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
                Developer Experience
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
                More than just a tool.
              </h2>
              <p className="text-base text-[#77736C] leading-relaxed">
                Runmark is designed to fit naturally into your workflow, helping you build, share, and maintain consistent environments across your entire development journey.
              </p>
              <div className="pt-2">
                <Button href="/docs" variant="primary" size="md" className="text-sm font-semibold">
                  Explore Documentation
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Ecosystem Tech Strip */}
        <TechStackSection />

      </div>
    </div>
  );
}
