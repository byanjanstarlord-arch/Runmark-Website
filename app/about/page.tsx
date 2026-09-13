import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { RunmarkLogo } from "@/components/ui/RunmarkLogo";

export const metadata: Metadata = {
  title: "About — The Story Behind Runmark",
  description: "Why Runmark exists, our mission to eliminate environment drift, and our open-source philosophy.",
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 bg-warm-grid min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Badge variant="orange" size="md">Our Story & Mission</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#202124] tracking-tight">
            About Runmark
          </h1>
          <p className="text-base sm:text-lg text-[#77736C]">
            The story behind the project and why environment intelligence matters.
          </p>
        </div>

        {/* Narrative Card 1: Why Runmark */}
        <div className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-8 sm:p-12 shadow-warm-sm space-y-4">
          <h2 className="text-2xl font-bold text-[#202124]">
            Why Runmark?
          </h2>
          <p className="text-sm text-[#77736C] leading-relaxed">
            Runmark was born out of a simple but frustrating problem — <strong className="text-[#202124]">&ldquo;It works on my machine.&rdquo;</strong>
          </p>
          <p className="text-sm text-[#77736C] leading-relaxed">
            Developers spend countless hours debugging subtle runtime mismatches, missing environment variables, conflicting service ports, and OS discrepancies. While Git tracks code commits and package managers lock dependencies, nothing was observing and verifying the actual host machine conditions required to execute that code.
          </p>
          <p className="text-sm text-[#77736C] leading-relaxed">
            We wanted a tool that makes it easy to understand, snapshot, and share the environment your code depends on — without bloated daemons, cloud dependencies, or telemetry.
          </p>
        </div>

        {/* Narrative Card 2: Mission & Core Beliefs */}
        <div className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-8 sm:p-12 shadow-warm-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#202124] mb-2">
              Our Mission
            </h2>
            <p className="text-sm text-[#77736C] leading-relaxed">
              To make development environments predictable, reproducible, and reliable for every developer and engineering team on earth.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E8E2D9] space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#202124]">
              What We Believe
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <h4 className="text-xs font-bold text-[#202124] mb-1">1. Environment Matters</h4>
                <p className="text-[11px] text-[#77736C] leading-relaxed">
                  Code does not execute in a vacuum. The runtime, OS, and services are first-class dependencies.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <h4 className="text-xs font-bold text-[#202124] mb-1">2. Local-First & Zero Secrets</h4>
                <p className="text-[11px] text-[#77736C] leading-relaxed">
                  Developer tools should operate 100% offline, respect privacy, and never send secrets to cloud servers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <h4 className="text-xs font-bold text-[#202124] mb-1">3. Deterministic Facts</h4>
                <p className="text-[11px] text-[#77736C] leading-relaxed">
                  Verification must be mathematically reproducible and decoupled from user paths or timestamps.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <h4 className="text-xs font-bold text-[#202124] mb-1">4. Open Source Collaboration</h4>
                <p className="text-[11px] text-[#77736C] leading-relaxed">
                  Great developer infrastructure should be freely available under the MIT license for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Visual Stamp Card */}
        <div className="rounded-3xl bg-[#FAF8F3] border border-[#E8E2D9] p-8 sm:p-12 shadow-warm-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <RunmarkLogo size="lg" />
            <div>
              <div className="text-base font-bold text-[#202124]">Runmark</div>
              <div className="text-xs text-[#77736C] font-mono">{siteConfig.tagline}</div>
            </div>
          </div>
          <div className="text-sm font-semibold text-[#FF5A1F] italic font-mono">
            &ldquo;Same code. Everywhere.&rdquo;
          </div>
        </div>

      </div>
    </div>
  );
}
