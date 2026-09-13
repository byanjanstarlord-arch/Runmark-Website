"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  Copy, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  GitCompare, 
  TerminalSquare,
  Layers,
  Cpu,
  PackageCheck,
  Globe
} from "lucide-react";

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(siteConfig.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-warm-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2">
              <Link href="/changelog">
                <Badge variant="orange" size="md" className="cursor-pointer hover:bg-[#FFE6DC] transition-colors">
                  <span className="font-bold">v{siteConfig.version}</span>
                  <span className="text-[#202124] ml-1">Now with Environment Contracts</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </Badge>
              </Link>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202124] tracking-tight leading-[1.12]">
              Your code runs <span className="text-[#202124]">somewhere.</span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-[#FF5A1F]">Make sure it runs everywhere.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#77736C] max-w-2xl leading-relaxed font-normal">
              Runmark helps you understand, snapshot, compare, and verify the environment your code depends on.
            </p>

            {/* CTAs and Install Pill */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                href="/docs/getting-started/introduction"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Get Started
              </Button>
              <Button
                href={siteConfig.githubUrl}
                external
                variant="secondary"
                size="lg"
              >
                View on GitHub
              </Button>
            </div>

            {/* Copyable CLI Command Pill */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={copyCommand}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#17191C] border border-[#2A2E33] text-sm text-[#E6EDF3] font-mono hover:border-[#FF5A1F]/50 transition-all shadow-warm-sm"
                title="Click to copy install command"
              >
                <span className="text-[#FF5A1F] select-none font-bold">$</span>
                <span className="text-[#E6EDF3]">{siteConfig.installCommand}</span>
                <span className="text-[#77736C] group-hover:text-white transition-colors ml-2">
                  {copied ? (
                    <Check className="w-4 h-4 text-[#238636]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </span>
              </button>
              {copied && (
                <span className="text-xs text-[#238636] font-medium animate-fade-in">
                  Copied to clipboard!
                </span>
              )}
            </div>
          </div>

          {/* Right Hero Visual — Isometric Environment Intelligence Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Isometric Stack Card Container */}
            <div className="relative w-full max-w-md bg-[#FFFDF9] rounded-3xl border border-[#E8E2D9] p-8 shadow-warm-xl">
              
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FF5A1F]/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Top Card Header */}
              <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E8E2D9]" />
                  <div className="w-3 h-3 rounded-full bg-[#E8E2D9]" />
                  <div className="w-3 h-3 rounded-full bg-[#E8E2D9]" />
                </div>
                <span className="text-xs font-mono text-[#77736C]">runmark.env.inspect</span>
              </div>

              {/* Stacked Technical Layers */}
              <div className="space-y-3 relative z-10">
                
                {/* Layer 1: Code */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9] shadow-warm-sm hover:border-[#FF5A1F]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#FFFDF9] border border-[#E8E2D9] text-[#77736C]">
                      <TerminalSquare className="w-4 h-4 text-[#202124]" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-[#202124]">Application Code</div>
                      <div className="text-[11px] text-[#77736C] font-mono">Git Tracked • main@a81f29c</div>
                    </div>
                  </div>
                  <Badge variant="default" size="sm">Source</Badge>
                </div>

                {/* Layer 2: Dependencies */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9] shadow-warm-sm hover:border-[#FF5A1F]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#FFFDF9] border border-[#E8E2D9] text-[#77736C]">
                      <PackageCheck className="w-4 h-4 text-[#202124]" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-[#202124]">Dependencies</div>
                      <div className="text-[11px] text-[#77736C] font-mono">Django 5.1.2 • FastAPI • uv</div>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Locked</Badge>
                </div>

                {/* Layer 3: System & Runtime */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9] shadow-warm-sm hover:border-[#FF5A1F]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#FFFDF9] border border-[#E8E2D9] text-[#77736C]">
                      <Cpu className="w-4 h-4 text-[#202124]" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-[#202124]">System & Runtime</div>
                      <div className="text-[11px] text-[#77736C] font-mono">Python 3.12.4 • Node 22.14</div>
                    </div>
                  </div>
                  <Badge variant="orange" size="sm">Verified</Badge>
                </div>

                {/* Layer 4: Environment & Services */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9] shadow-warm-sm hover:border-[#FF5A1F]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#FFFDF9] border border-[#E8E2D9] text-[#77736C]">
                      <Layers className="w-4 h-4 text-[#202124]" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-[#202124]">Environment & Services</div>
                      <div className="text-[11px] text-[#77736C] font-mono">Postgres 16 • Redis 7 • .env</div>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Healthy</Badge>
                </div>
              </div>

              {/* Bottom Visual Tag */}
              <div className="mt-6 pt-4 border-t border-[#E8E2D9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FF5A1F] text-white flex items-center justify-center font-bold text-xs">
                    R
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[#202124]">You&apos;re covered!</div>
                    <div className="text-[10px] text-[#77736C] font-mono">Fingerprint: ce19840a...</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#238636] bg-[#EAF5EA] px-2 py-0.5 rounded-full font-medium border border-[#C6E7C6]">
                  ✓ 100% In Sync
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Highlight Cards Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFF2EC] text-[#FF5A1F] shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#202124]">Environment Scanning</h4>
              <p className="text-[11px] text-[#77736C]">Detect what matters</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFF2EC] text-[#FF5A1F] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#202124]">Smart Snapshots</h4>
              <p className="text-[11px] text-[#77736C]">Create reliable fingerprints</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFF2EC] text-[#FF5A1F] shrink-0">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#202124]">Drift Detection</h4>
              <p className="text-[11px] text-[#77736C]">Spot differences instantly</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFF2EC] text-[#FF5A1F] shrink-0">
              <TerminalSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#202124]">Developer First</h4>
              <p className="text-[11px] text-[#77736C]">Simple, fast, local-first</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
