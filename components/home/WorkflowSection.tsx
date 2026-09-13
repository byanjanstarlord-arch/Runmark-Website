import React from "react";
import { Search, Camera, GitCompare, ShieldCheck } from "lucide-react";

export function WorkflowSection() {
  const steps = [
    {
      number: "01",
      title: "Scan",
      action: "Detect your environment",
      desc: "Inspect operating systems, runtimes, dependencies, services, and ports in milliseconds.",
      icon: Search
    },
    {
      number: "02",
      title: "Snapshot",
      action: "Create a fingerprint",
      desc: "Compute a deterministic SHA-256 fingerprint and store an immutable baseline snapshot.",
      icon: Camera
    },
    {
      number: "03",
      title: "Compare",
      action: "Find what's different",
      desc: "Detect semantic drift between environments and triage discrepancies with rule-based severity.",
      icon: GitCompare
    },
    {
      number: "04",
      title: "Verify",
      action: "Ensure it runs everywhere",
      desc: "Prove host machine compliance in pre-commit hooks and CI pipelines with standard exit codes.",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F3] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
            How Runmark Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight mt-2 mb-4">
            From chaos to consistency.
          </h2>
          <p className="text-base sm:text-lg text-[#77736C]">
            Four deterministic steps to guarantee your software runs reliably across every machine.
          </p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-6 sm:p-7 shadow-warm-sm hover:shadow-warm-md hover:border-[#D8D2C7] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#FF5A1F] bg-[#FFF2EC] px-2.5 py-1 rounded-lg border border-[#FFD9CA]">
                      {step.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9] text-[#202124] group-hover:bg-[#FFF2EC] group-hover:text-[#FF5A1F] group-hover:border-[#FFD9CA] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Action */}
                  <h3 className="text-lg font-bold text-[#202124] mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#FF5A1F] mb-3">
                    {step.action}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#77736C] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
