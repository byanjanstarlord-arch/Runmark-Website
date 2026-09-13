import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, AlertCircle } from "lucide-react";

export function PlaygroundPreviewSection() {
  return (
    <section className="py-20 md:py-24 bg-[#FFFDF9] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-[#FAF8F3] border border-[#E8E2D9] p-8 sm:p-12 shadow-warm-md flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Simulation</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#202124] tracking-tight">
              See environment drift in action.
            </h2>
            <p className="text-sm text-[#77736C] leading-relaxed">
              Test how Runmark detects discrepancies across Python, Django, Node, and background services in our browser simulator.
            </p>
            <div className="pt-2">
              <Button
                href="/playground"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Try the Playground
              </Button>
            </div>
          </div>

          {/* Mini Drift Card Visual */}
          <div className="w-full max-w-md rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] p-5 shadow-warm-sm font-mono text-xs space-y-2.5">
            <div className="text-[11px] font-bold text-[#202124] pb-2 border-b border-[#E8E2D9] flex items-center justify-between">
              <span>Drift Simulation Preview</span>
              <span className="text-[#FF5A1F]">4 Differences</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
              <span className="text-[#77736C]">Python:</span>
              <span className="text-[#D97706] font-semibold">3.12.4 → 3.11.9</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
              <span className="text-[#77736C]">OS Platform:</span>
              <span className="text-[#D97706] font-semibold">Windows → Linux</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
              <span className="text-[#77736C]">Node.js:</span>
              <span className="text-[#D97706] font-semibold">22.14.0 → 20.11.1</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
              <span className="text-[#77736C]">Django:</span>
              <span className="text-[#238636] font-semibold">5.1.2 (Match)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
