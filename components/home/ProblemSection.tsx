"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle2, XCircle, RefreshCw, GitCommit, ArrowRight, AlertTriangle, AlertCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ComparePhase = "IDLE" | "COMPARING" | "CHECK_PYTHON" | "CHECK_POSTGRES" | "VERDICT";

interface EnvRow {
  label: string;
  devA: string;
  devB: string;
  status: "match" | "warning" | "error" | "drift";
  callout?: string;
  isKeyMismatch?: boolean;
}

const ROWS: EnvRow[] = [
  {
    label: "Python Runtime",
    devA: "3.12.10",
    devB: "3.11.9",
    status: "warning",
    callout: "Version mismatch (3.12 vs 3.11)",
    isKeyMismatch: true
  },
  {
    label: "Host OS",
    devA: "Windows 11 (AMD64)",
    devB: "Ubuntu 24.04 (Linux)",
    status: "drift",
    callout: "Platform drift"
  },
  {
    label: "Django Framework",
    devA: "5.1.2",
    devB: "5.1.2",
    status: "match"
  },
  {
    label: "PostgreSQL Database",
    devA: "16.3 Active (Port 5432)",
    devB: "Not Installed / Inactive",
    status: "error",
    callout: "Required service missing",
    isKeyMismatch: true
  },
  {
    label: ".env Configuration",
    devA: "All 6 Variables Present",
    devB: "DATABASE_URL Missing",
    status: "error",
    callout: "Critical variable missing",
    isKeyMismatch: true
  }
];

export function ProblemSection() {
  const [phase, setPhase] = useState<ComparePhase>("IDLE");
  const sectionRef = useRef<HTMLElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const hasTriggeredRef = useRef(false);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const startComparison = useCallback(() => {
    clearTimers();
    setPhase("IDLE");

    const t1 = setTimeout(() => setPhase("COMPARING"), 400);
    const t2 = setTimeout(() => setPhase("CHECK_PYTHON"), 1400);
    const t3 = setTimeout(() => setPhase("CHECK_POSTGRES"), 2600);
    const t4 = setTimeout(() => setPhase("VERDICT"), 3800);

    timersRef.current.push(t1, t2, t3, t4);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 65%",
      once: true,
      onEnter: () => {
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          startComparison();
        }
      }
    });

    return () => {
      trigger.kill();
      clearTimers();
    };
  }, [startComparison]);

  const isHighlighted = (rowKey: "python" | "postgres") => {
    if (rowKey === "python") return phase === "CHECK_PYTHON" || phase === "VERDICT";
    if (rowKey === "postgres") return phase === "CHECK_POSTGRES" || phase === "VERDICT";
    return false;
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-[#FAF8F3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Refined Editorial Hierarchy */}
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-24">
          <span className="text-sm sm:text-base font-bold uppercase tracking-widest text-[#FF5A1F] inline-block mb-4">
            The Problem
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#202124] tracking-tight leading-[1.08] mb-6">
            &ldquo;Works on my machine.&rdquo;
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#77736C] leading-relaxed max-w-3xl mx-auto font-normal">
            Same codebase. Different runtime versions. Missing backing services. 
            When environments diverge, identical code yields completely different realities.
          </p>
        </div>

        {/* Interactive Comparison Arena: Developer A vs Developer B */}
        <div className="relative max-w-5xl mx-auto">

          {/* Center Connection Element — Git Commit & State Ticker */}
          <div className="flex flex-col items-center justify-center mb-8 relative z-20">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm text-xs sm:text-sm font-mono text-[#202124]">
              <GitCommit className="w-4 h-4 text-[#FF5A1F]" />
              <span className="font-bold">commit a81f29c</span>
              <span className="text-[#77736C]">●</span>
              <span className="text-[#77736C] font-semibold">Exact Same Code</span>
            </div>

            {/* Live Comparison Status Ticker */}
            <div className="mt-3 text-xs sm:text-sm font-mono font-medium flex items-center gap-2">
              {phase === "IDLE" && (
                <span className="text-[#77736C]">Scroll into view to compare</span>
              )}
              {phase === "COMPARING" && (
                <span className="text-[#FF5A1F] flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
                  Comparing environment manifests...
                </span>
              )}
              {phase === "CHECK_PYTHON" && (
                <span className="text-[#D97706] flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                  Checking Python runtimes: Mismatch detected
                </span>
              )}
              {phase === "CHECK_POSTGRES" && (
                <span className="text-[#D92D20] flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-[#D92D20]" />
                  Checking PostgreSQL: Required service missing on host
                </span>
              )}
              {phase === "VERDICT" && (
                <span className="text-[#202124] font-bold flex items-center gap-2 bg-[#FFFDF9] px-3.5 py-1 rounded-full border border-[#E8E2D9] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#D92D20]" />
                  <span>Comparison complete: 1 commit • 2 breaking discrepancies</span>
                </span>
              )}
            </div>
          </div>

          {/* Side-by-Side Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch relative">
            
            {/* Developer A Card */}
            <div className={`rounded-3xl bg-[#FFFDF9] p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between relative shadow-warm-md border-2 ${
              phase === "VERDICT"
                ? "border-[#238636] ring-4 ring-[#238636]/10"
                : "border-[#E8E2D9]"
            }`}>
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-[#E8E2D9] mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#EAF5EA] text-[#238636] flex items-center justify-center font-extrabold text-base shadow-warm-sm border border-[#C6E7C6]">
                      A
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#202124]">Developer A</h3>
                      <p className="text-xs text-[#77736C] font-mono mt-0.5">Author Machine • main@a81f29c</p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  {phase === "VERDICT" ? (
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#238636] bg-[#EAF5EA] px-3.5 py-1.5 rounded-full border border-[#C6E7C6] animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4" /> Working
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-[#77736C] bg-[#FAF8F3] px-3 py-1 rounded-full border border-[#E8E2D9]">
                      Evaluating...
                    </span>
                  )}
                </div>

                {/* Stack Attributes */}
                <div className="space-y-3 font-mono text-sm sm:text-base">
                  {ROWS.map((row, idx) => {
                    const isPythonRow = idx === 0;
                    const isPostgresRow = idx === 3;
                    const highlighted = (isPythonRow && isHighlighted("python")) || (isPostgresRow && isHighlighted("postgres"));

                    return (
                      <div 
                        key={row.label}
                        className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                          highlighted && phase === "VERDICT"
                            ? "bg-[#EAF5EA]/50 border-[#C6E7C6]"
                            : "bg-[#FAF8F3] border-[#E8E2D9]"
                        }`}
                      >
                        <span className="text-xs sm:text-sm text-[#77736C] font-sans font-medium">{row.label}:</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-xs sm:text-sm ${
                            phase === "VERDICT" && row.status !== "match" && row.status !== "drift" ? "text-[#238636]" : "text-[#202124]"
                          }`}>
                            {row.devA}
                          </span>
                          {phase === "VERDICT" && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#238636] shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Developer Quote */}
              <div className="mt-8 pt-5 border-t border-[#E8E2D9] text-sm sm:text-base text-[#238636] font-medium flex items-center justify-center gap-2 text-center bg-[#EAF5EA]/40 p-3 rounded-2xl border border-[#C6E7C6]/50">
                <CheckCircle2 className="w-4 h-4 text-[#238636] shrink-0" />
                <span>&ldquo;Application boots with zero errors in 1.2s.&rdquo;</span>
              </div>
            </div>

            {/* Developer B Card */}
            <div className={`rounded-3xl bg-[#FFFDF9] p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between relative shadow-warm-md border-2 ${
              phase === "VERDICT"
                ? "border-[#D92D20] ring-4 ring-[#D92D20]/10"
                : "border-[#E8E2D9]"
            }`}>
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-[#E8E2D9] mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#FEECEB] text-[#D92D20] flex items-center justify-center font-extrabold text-base shadow-warm-sm border border-[#FECDCA]">
                      B
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#202124]">Developer B</h3>
                      <p className="text-xs text-[#77736C] font-mono mt-0.5">Teammate Machine • main@a81f29c</p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  {phase === "VERDICT" ? (
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D92D20] bg-[#FEECEB] px-3.5 py-1.5 rounded-full border border-[#FECDCA] animate-in fade-in">
                      <XCircle className="w-4 h-4" /> Crashes
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-[#77736C] bg-[#FAF8F3] px-3 py-1 rounded-full border border-[#E8E2D9]">
                      Evaluating...
                    </span>
                  )}
                </div>

                {/* Stack Attributes */}
                <div className="space-y-3 font-mono text-sm sm:text-base">
                  {ROWS.map((row, idx) => {
                    const isPythonRow = idx === 0;
                    const isPostgresRow = idx === 3;
                    const highlighted = (isPythonRow && isHighlighted("python")) || (isPostgresRow && isHighlighted("postgres"));

                    return (
                      <div 
                        key={row.label}
                        className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                          highlighted && phase === "VERDICT"
                            ? "bg-[#FEECEB]/60 border-[#FECDCA] ring-1 ring-[#D92D20]/20"
                            : "bg-[#FAF8F3] border-[#E8E2D9]"
                        }`}
                      >
                        <span className="text-xs sm:text-sm text-[#77736C] font-sans font-medium">{row.label}:</span>
                        <div className="flex items-center gap-2 text-right">
                          <span className={`font-bold text-xs sm:text-sm ${
                            phase === "VERDICT" && row.status === "warning"
                              ? "text-[#D97706]"
                              : phase === "VERDICT" && row.status === "error"
                              ? "text-[#D92D20]"
                              : "text-[#202124]"
                          }`}>
                            {row.devB}
                          </span>
                          {phase === "VERDICT" && row.status === "warning" && (
                            <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                          )}
                          {phase === "VERDICT" && row.status === "error" && (
                            <XCircle className="w-3.5 h-3.5 text-[#D92D20] shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Developer Quote */}
              <div className="mt-8 pt-5 border-t border-[#E8E2D9] text-sm sm:text-base text-[#D92D20] font-medium flex items-center justify-center gap-2 text-center bg-[#FEECEB]/50 p-3 rounded-2xl border border-[#FECDCA]/60">
                <XCircle className="w-4 h-4 text-[#D92D20] shrink-0" />
                <span>&ldquo;OperationalError: could not connect to server: Connection refused&rdquo;</span>
              </div>
            </div>

          </div>

          {/* Educational Cause-of-Failure Breakdown & Replay Controls */}
          {phase === "VERDICT" && (
            <div className="mt-10 p-6 rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-md text-center animate-in fade-in duration-300">
              <div className="text-lg sm:text-xl font-extrabold text-[#202124] mb-2">
                Same commit. Different environment. That&apos;s the problem Runmark solves.
              </div>
              <p className="text-sm text-[#77736C] max-w-xl mx-auto mb-5">
                Git tracks what was written. Runmark tracks what makes it run — catching Python runtime drift, missing daemon services, and missing environment variables before they hit production.
              </p>
              
              <button
                onClick={startComparison}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F3] hover:bg-[#FFF2EC] border border-[#E8E2D9] hover:border-[#FF5A1F]/40 text-xs sm:text-sm font-mono font-bold text-[#202124] hover:text-[#FF5A1F] transition-all shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <span>Replay comparison</span>
              </button>
            </div>
          )}

          {/* Narrative Bridge to "How Runmark Works" */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm text-xs sm:text-sm text-[#77736C] font-mono">
              <span>Different environments</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <strong className="text-[#202124] font-bold">Runmark</strong>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span className="text-[#238636] font-bold">A consistent understanding of what your code needs</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
