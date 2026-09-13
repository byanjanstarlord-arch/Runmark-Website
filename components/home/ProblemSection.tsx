import React from "react";
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight mt-2 mb-4">
            &ldquo;Works on my machine.&rdquo;
          </h2>
          <p className="text-base sm:text-lg text-[#77736C] leading-relaxed">
            Every developer has heard it. Different environments, different runtime versions, different system dependencies. Git tracks your code. Runmark tracks what makes your code run.
          </p>
        </div>

        {/* Side-by-Side Comparison: Developer A vs Developer B */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Developer A Card (Working Machine) */}
          <div className="rounded-3xl bg-[#FFFDF9] border-2 border-[#C6E7C6] p-6 sm:p-8 shadow-warm-md relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EAF5EA] text-[#238636] flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#202124]">Developer A</h3>
                  <p className="text-xs text-[#77736C]">Commit: a81f29c (main)</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#238636] bg-[#EAF5EA] px-2.5 py-1 rounded-full border border-[#C6E7C6]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Working
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Python:</span>
                <span className="font-semibold text-[#202124]">3.12.4</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Host OS:</span>
                <span className="font-semibold text-[#202124]">Windows 11 (AMD64)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Django:</span>
                <span className="font-semibold text-[#202124]">5.1.2</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">PostgreSQL:</span>
                <span className="font-semibold text-[#238636]">16.3 (Port 5432 - Active)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">.env Variables:</span>
                <span className="font-semibold text-[#238636]">All 6 Present</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E2D9] text-xs text-[#77736C] italic text-center">
              &ldquo;Application boots with zero errors in 1.2s.&rdquo;
            </div>
          </div>

          {/* Developer B Card (Broken Machine) */}
          <div className="rounded-3xl bg-[#FFFDF9] border-2 border-[#FECDCA] p-6 sm:p-8 shadow-warm-md relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FEECEB] text-[#D92D20] flex items-center justify-center font-bold text-xs">
                  B
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#202124]">Developer B</h3>
                  <p className="text-xs text-[#77736C]">Commit: a81f29c (Exact same commit)</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D92D20] bg-[#FEECEB] px-2.5 py-1 rounded-full border border-[#FECDCA]">
                <XCircle className="w-3.5 h-3.5" /> Crashes
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Python:</span>
                <span className="font-semibold text-[#D97706]">3.11.9 (Mismatch)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Host OS:</span>
                <span className="font-semibold text-[#202124]">Ubuntu 24.04 (Linux)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Django:</span>
                <span className="font-semibold text-[#202124]">5.1.2</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">PostgreSQL:</span>
                <span className="font-semibold text-[#D92D20]">Not Installed / Missing</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">.env Variables:</span>
                <span className="font-semibold text-[#D92D20]">DATABASE_URL Missing</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E2D9] text-xs text-[#D92D20] font-medium text-center">
              &ldquo;OperationalError: could not connect to server: Connection refused&rdquo;
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
