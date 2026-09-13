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
  ShieldCheck, 
  Camera, 
  GitCompare, 
  TerminalSquare,
  Layers,
  Cpu,
  PackageCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const copyCommand = () => {
    navigator.clipboard.writeText(siteConfig.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const layers = [
    {
      id: 1,
      title: "Application Code",
      detail: "Git Tracked • main@a81f29c",
      tag: "Source",
      variant: "default" as const,
      icon: TerminalSquare,
      annotation: "Repository HEAD, clean working tree, no untracked diffs"
    },
    {
      id: 2,
      title: "Dependencies",
      detail: "Django 5.1.2 • FastAPI 0.115 • uv lock",
      tag: "Locked",
      variant: "success" as const,
      icon: PackageCheck,
      annotation: "Deterministic hashes matched against lockfiles"
    },
    {
      id: 3,
      title: "System & Runtime",
      detail: "Python 3.12.10 • Node 22.19.0",
      tag: "Verified",
      variant: "orange" as const,
      icon: Cpu,
      annotation: "Platform AMD64 Windows/Linux host runtime verified"
    },
    {
      id: 4,
      title: "Environment & Services",
      detail: "Postgres 16.3 (Port 5432) • .env secrets redacted",
      tag: "Healthy",
      variant: "success" as const,
      icon: Layers,
      annotation: "Multi-pass zero-secret masking applied to 6 variables"
    }
  ];

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
                <Badge variant="orange" size="md" className="cursor-pointer hover:bg-[#FFE6DC] transition-colors py-1 px-3.5 text-xs sm:text-sm font-semibold">
                  <span className="font-bold">v{siteConfig.version}</span>
                  <span className="text-[#202124] ml-1.5 font-medium">Now with Environment Contracts</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 inline-block" />
                </Badge>
              </Link>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202124] tracking-tight leading-[1.14]">
              Your code runs <span className="text-[#202124]">somewhere.</span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-[#FF5A1F]">Make sure it runs everywhere.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#77736C] max-w-2xl leading-relaxed font-normal">
              Runmark helps you understand, snapshot, compare, and verify the environment your code depends on.
            </p>

            {/* CTAs and Install Pill */}
            <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                href="/docs/getting-started/introduction"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="text-base font-semibold px-6 py-3"
              >
                Get Started
              </Button>
              <Button
                href={siteConfig.githubUrl}
                external
                variant="secondary"
                size="lg"
                className="text-base font-medium px-6 py-3"
              >
                View on GitHub
              </Button>
            </div>

            {/* Copyable CLI Command Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={copyCommand}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#17191C] border border-[#2A2E33] text-sm sm:text-base text-[#E6EDF3] font-mono hover:border-[#FF5A1F]/60 transition-all shadow-warm-sm"
                title="Click to copy install command"
              >
                <span className="text-[#FF5A1F] select-none font-bold">$</span>
                <span className="text-[#E6EDF3] font-medium">{siteConfig.installCommand}</span>
                <span className="text-[#77736C] group-hover:text-white transition-colors ml-2">
                  {copied ? (
                    <Check className="w-4 h-4 text-[#238636]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </span>
              </button>
              {copied && (
                <span className="text-sm text-[#238636] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Copied to clipboard!
                </span>
              )}
            </div>
          </div>

          {/* Right Hero Visual — Interactive Environment Intelligence Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Stack Card Container */}
            <div className="relative w-full max-w-md bg-[#FFFDF9] rounded-3xl border border-[#E8E2D9] p-6 sm:p-8 shadow-warm-xl">
              
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-52 h-52 bg-[#FF5A1F]/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Top Card Header */}
              <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E8E2D9]" />
                  <div className="w-3 h-3 rounded-full bg-[#E8E2D9]" />
                  <div className="w-3 h-3 rounded-full bg-[#E8E2D9]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#238636] animate-ping" />
                  <span className="text-xs font-mono text-[#77736C] font-semibold">runmark.env.inspect</span>
                </div>
              </div>

              {/* Stacked Technical Layers */}
              <div className="space-y-3 relative z-10">
                {layers.map((layer) => {
                  const Icon = layer.icon;
                  const isSelected = activeLayer === layer.id;
                  return (
                    <div
                      key={layer.id}
                      onClick={() => setActiveLayer(isSelected ? null : layer.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#FFF2EC] border-[#FF5A1F] shadow-warm-md"
                          : "bg-[#FAF8F3] border-[#E8E2D9] shadow-warm-sm hover:border-[#D8D2C7] hover:bg-[#FFFDF9]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`p-2.5 rounded-xl border ${
                            isSelected
                              ? "bg-[#FFFDF9] border-[#FFD9CA] text-[#FF5A1F]"
                              : "bg-[#FFFDF9] border-[#E8E2D9] text-[#202124]"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="text-sm font-bold text-[#202124]">{layer.title}</div>
                            <div className="text-xs text-[#77736C] font-mono mt-0.5">{layer.detail}</div>
                          </div>
                        </div>
                        <Badge variant={layer.variant} size="sm">{layer.tag}</Badge>
                      </div>

                      {isSelected && (
                        <div className="mt-3 pt-2.5 border-t border-[#FFD9CA] text-xs text-[#202124] font-medium flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
                          <span>{layer.annotation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Visual Tag */}
              <div className="mt-6 pt-4 border-t border-[#E8E2D9] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FF5A1F] text-white flex items-center justify-center font-bold text-xs shadow-warm-sm">
                    R
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#202124]">You&apos;re covered!</div>
                    <div className="text-xs text-[#77736C] font-mono">Digest: ce19840a...</div>
                  </div>
                </div>
                <span className="text-xs text-[#238636] bg-[#EAF5EA] px-3 py-1 rounded-full font-semibold border border-[#C6E7C6] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% In Sync
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Highlight Cards Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center gap-3.5 hover:border-[#D8D2C7] transition-all">
            <div className="p-3 rounded-xl bg-[#FFF2EC] text-[#FF5A1F] shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202124]">Environment Scanning</h4>
              <p className="text-xs text-[#77736C] mt-0.5">Detect what matters</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center gap-3.5 hover:border-[#D8D2C7] transition-all">
            <div className="p-3 rounded-xl bg-[#FFF2EC] text-[#FF5A1F] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202124]">Smart Snapshots</h4>
              <p className="text-xs text-[#77736C] mt-0.5">Create reliable fingerprints</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center gap-3.5 hover:border-[#D8D2C7] transition-all">
            <div className="p-3 rounded-xl bg-[#FFF2EC] text-[#FF5A1F] shrink-0">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202124]">Drift Detection</h4>
              <p className="text-xs text-[#77736C] mt-0.5">Spot differences instantly</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center gap-3.5 hover:border-[#D8D2C7] transition-all">
            <div className="p-3 rounded-xl bg-[#FFF2EC] text-[#FF5A1F] shrink-0">
              <TerminalSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202124]">Developer First</h4>
              <p className="text-xs text-[#77736C] mt-0.5">Simple, fast, local-first</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
