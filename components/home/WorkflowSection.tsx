"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Camera, GitCompare, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface WorkflowStep {
  number: string;
  id: number;
  title: string;
  action: string;
  desc: string;
  icon: React.ElementType;
  outputTitle: string;
  outputLines: {
    text: string;
    type?: "cmd" | "success" | "warning" | "error" | "info" | "muted";
  }[];
}

const STEPS: WorkflowStep[] = [
  {
    number: "01",
    id: 1,
    title: "Scan",
    action: "Detect your environment",
    desc: "Inspect operating systems, runtimes, dependencies, services, and ports in milliseconds without daemons.",
    icon: Search,
    outputTitle: "terminal — runmark scan",
    outputLines: [
      { text: "$ runmark scan", type: "cmd" },
      { text: "✓ Python 3.12.10 (AMD64)", type: "success" },
      { text: "✓ Node.js 22.19.0", type: "success" },
      { text: "✓ PostgreSQL 16.3 (Active)", type: "success" },
      { text: "Scan complete · 0.42s", type: "muted" }
    ]
  },
  {
    number: "02",
    id: 2,
    title: "Snapshot",
    action: "Create a deterministic fingerprint",
    desc: "Compute a canonical SHA-256 fingerprint of your declared stack and store an immutable baseline snapshot.",
    icon: Camera,
    outputTitle: "snapshot — hashing engine",
    outputLines: [
      { text: "Hashing environment...", type: "info" },
      { text: "██████████████░░ 85%", type: "cmd" },
      { text: "SHA-256 fingerprint:", type: "muted" },
      { text: "ce19840abda5675a...", type: "success" },
      { text: "Snapshot saved locally", type: "muted" }
    ]
  },
  {
    number: "03",
    id: 3,
    title: "Compare",
    action: "Find discrepancies before failure",
    desc: "Detect semantic drift between developer machines, CI workers, and staging environments instantly.",
    icon: GitCompare,
    outputTitle: "diff — drift detection",
    outputLines: [
      { text: "Comparing against baseline...", type: "info" },
      { text: "Python      ⚠ 3.12 vs 3.11", type: "warning" },
      { text: "PostgreSQL  ✕ Missing", type: "error" },
      { text: "Django      ✓ 5.1.2 Match", type: "success" },
      { text: "2 discrepancies flagged", type: "warning" }
    ]
  },
  {
    number: "04",
    id: 4,
    title: "Verify",
    action: "Guarantee compliance everywhere",
    desc: "Enforce contract compliance in pre-commit hooks and CI pipelines with standard exit codes and zero cloud bloat.",
    icon: ShieldCheck,
    outputTitle: "contract — verify check",
    outputLines: [
      { text: "Contract: runmark.json", type: "info" },
      { text: "Environment rules evaluated", type: "muted" },
      { text: "Host compatibility verified", type: "muted" },
      { text: "✓ PASS: 100% In Sync", type: "success" },
      { text: "Ready to boot application", type: "success" }
    ]
  }
];

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

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
          // Step sequentially through 1 -> 2 -> 3 -> 4
          const timer1 = setTimeout(() => setActiveStep(2), 600);
          const timer2 = setTimeout(() => setActiveStep(3), 1300);
          const timer3 = setTimeout(() => setActiveStep(4), 2000);

          return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
          };
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-[#FAF8F3] border-t border-[#E8E2D9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Refined Typography & Spacing */}
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-24">
          <span className="text-sm sm:text-base font-bold uppercase tracking-widest text-[#FF5A1F] inline-block mb-4">
            How Runmark Works
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202124] tracking-tight leading-[1.12] mb-6">
            From chaos to consistency.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#77736C] max-w-3xl mx-auto leading-relaxed font-normal">
            Four deterministic steps to eliminate environment discrepancies and guarantee your code runs reliably everywhere.
          </p>
        </div>

        {/* Connected Workflow Pipeline Container */}
        <div className="relative">
          
          {/* Desktop Horizontal Connecting Guide Track */}
          <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-[#E8E2D9] z-0" />

          {/* Desktop Animated Connecting Active Pipeline Line */}
          <div 
            className="hidden lg:block absolute top-[44px] left-[8%] h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#FF8C66] to-[#FF5A1F] z-0 transition-all duration-700 ease-out"
            style={{
              width: `${((activeStep - 1) / (STEPS.length - 1)) * 84}%`
            }}
          />

          {/* 4 Connected Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isCurrent = activeStep === step.id;
              const isPassed = activeStep > step.id;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(step.id)}
                  className={`rounded-3xl bg-[#FFFDF9] border p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative ${
                    isCurrent
                      ? "border-[#FF5A1F] shadow-warm-lg ring-2 ring-[#FF5A1F]/20 scale-[1.02]"
                      : isPassed
                      ? "border-[#D8D2C7] shadow-warm-md hover:border-[#FF5A1F]/50"
                      : "border-[#E8E2D9] shadow-warm-sm hover:border-[#D8D2C7]"
                  }`}
                >
                  <div>
                    {/* Top Step Number Badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border transition-all duration-200 ${
                        isCurrent
                          ? "bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-xs"
                          : isPassed
                          ? "bg-[#EAF5EA] text-[#238636] border-[#C6E7C6]"
                          : "bg-[#FAF8F3] text-[#77736C] border-[#E8E2D9]"
                      }`}>
                        {isPassed ? "✓ " : ""}{step.number}
                      </span>
                      
                      <div className={`p-2.5 rounded-2xl border transition-all duration-200 ${
                        isCurrent
                          ? "bg-[#FFF2EC] text-[#FF5A1F] border-[#FFD9CA]"
                          : "bg-[#FAF8F3] border-[#E8E2D9] text-[#202124] group-hover:text-[#FF5A1F] group-hover:border-[#FFD9CA]"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title & Action Header */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#202124] tracking-tight mb-1">
                      {step.title}
                    </h3>
                    <div className="text-sm font-semibold text-[#FF5A1F] mb-3">
                      {step.action}
                    </div>

                    {/* Description Body */}
                    <p className="text-sm sm:text-base text-[#77736C] leading-relaxed mb-6">
                      {step.desc}
                    </p>
                  </div>

                  {/* Mini Visual Output Panel (Simulated Step Artifact) */}
                  <div className={`rounded-2xl bg-[#141619] border p-3.5 font-mono text-xs transition-all duration-300 ${
                    isCurrent 
                      ? "border-[#FF5A1F]/60 shadow-[0_0_12px_rgba(255,90,31,0.15)]" 
                      : "border-[#2A2E33]"
                  }`}>
                    {/* Mini Window Bar */}
                    <div className="flex items-center justify-between border-b border-[#2A2E33] pb-2 mb-2 text-[10px] text-[#77736C]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                        <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                      </div>
                      <span className="truncate max-w-[130px]">{step.outputTitle}</span>
                    </div>

                    {/* Output Lines */}
                    <div className="space-y-1 text-[11px] leading-tight select-none">
                      {step.outputLines.map((line, lIdx) => {
                        let lineClass = "text-[#E6EDF3]";
                        if (line.type === "cmd") lineClass = "text-[#FF5A1F] font-bold";
                        if (line.type === "success") lineClass = "text-[#3FB950]";
                        if (line.type === "warning") lineClass = "text-[#E3B341]";
                        if (line.type === "error") lineClass = "text-[#F85149]";
                        if (line.type === "info") lineClass = "text-[#58A6FF]";
                        if (line.type === "muted") lineClass = "text-[#77736C]";

                        return (
                          <div key={lIdx} className={`${lineClass} truncate`}>
                            {line.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Pipeline Completion Summary Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 py-3 rounded-full bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm text-xs sm:text-sm text-[#77736C] font-mono">
            <span className="text-[#FF5A1F] font-bold">01 Scan</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E8E2D9]" />
            <span className="text-[#FF5A1F] font-bold">02 Snapshot</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E8E2D9]" />
            <span className="text-[#FF5A1F] font-bold">03 Compare</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E8E2D9]" />
            <span className="text-[#238636] font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> 04 Verify
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
