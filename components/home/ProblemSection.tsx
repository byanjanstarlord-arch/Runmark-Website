import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#202124] tracking-tight mt-2 mb-4">
            &ldquo;Works on my machine.&rdquo;
          </h2>
          <p className="text-base sm:text-lg text-[#77736C] leading-relaxed">
            Every developer has heard it. Different environments, different runtime versions, different system dependencies. Git tracks your code. Runmark tracks what makes your code run.
          </p>
        </div>

        {/* Side-by-Side Comparison: Developer A vs Developer B */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Developer A Card (Working Machine) */}
          <div className="rounded-3xl bg-[#FFFDF9] border-2 border-[#C6E7C6] p-6 sm:p-8 shadow-warm-md relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EAF5EA] text-[#238636] flex items-center justify-center font-bold text-sm shadow-warm-sm">
                  A
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202124]">Developer A</h3>
                  <p className="text-xs text-[#77736C] font-mono">Commit: a81f29c (main)</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#238636] bg-[#EAF5EA] px-3 py-1 rounded-full border border-[#C6E7C6]">
                <CheckCircle2 className="w-4 h-4" /> Working
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Python:</span>
                <span className="font-bold text-[#202124]">3.12.10</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Host OS:</span>
                <span className="font-bold text-[#202124]">Windows 11 (AMD64)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Django:</span>
                <span className="font-bold text-[#202124]">5.1.2</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">PostgreSQL:</span>
                <span className="font-bold text-[#238636]">16.3 (Port 5432 - Active)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">.env Variables:</span>
                <span className="font-bold text-[#238636]">All 6 Present (Redacted)</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E2D9] text-sm text-[#77736C] italic text-center">
              &ldquo;Application boots with zero errors in 1.2s.&rdquo;
            </div>
          </div>

          {/* Developer B Card (Broken Machine) */}
          <div className="rounded-3xl bg-[#FFFDF9] border-2 border-[#FECDCA] p-6 sm:p-8 shadow-warm-md relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FEECEB] text-[#D92D20] flex items-center justify-center font-bold text-sm shadow-warm-sm">
                  B
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202124]">Developer B</h3>
                  <p className="text-xs text-[#77736C] font-mono">Commit: a81f29c (Exact same commit)</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D92D20] bg-[#FEECEB] px-3 py-1 rounded-full border border-[#FECDCA]">
                <XCircle className="w-4 h-4" /> Crashes
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Python:</span>
                <span className="font-bold text-[#D97706]">3.11.9 (Mismatch)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Host OS:</span>
                <span className="font-bold text-[#202124]">Ubuntu 24.04 (Linux)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">Django:</span>
                <span className="font-bold text-[#202124]">5.1.2</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">PostgreSQL:</span>
                <span className="font-bold text-[#D92D20]">Not Installed / Inactive</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9]">
                <span className="text-[#77736C]">.env Variables:</span>
                <span className="font-bold text-[#D92D20]">DATABASE_URL Missing</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E2D9] text-sm text-[#D92D20] font-medium text-center">
              &ldquo;OperationalError: could not connect to server: Connection refused&rdquo;
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
