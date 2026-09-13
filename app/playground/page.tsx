"use client";

import React, { useState } from "react";
import { 
  playgroundOptions, 
  defaultEnvA, 
  defaultEnvB, 
  playgroundPresets, 
  computeEnvironmentDiff, 
  EnvironmentState 
} from "@/lib/playground-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  GitCompare, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight,
  Info,
  Sparkles,
  Terminal
} from "lucide-react";

export default function PlaygroundPage() {
  const [envA, setEnvA] = useState<EnvironmentState>(defaultEnvA);
  const [envB, setEnvB] = useState<EnvironmentState>(defaultEnvB);
  const [activePreset, setActivePreset] = useState<string>("classic-drift");

  const diffResults = computeEnvironmentDiff(envA, envB);
  const differenceCount = diffResults.filter((d) => d.status !== "same").length;
  const criticalCount = diffResults.filter((d) => d.status === "critical").length;

  const handlePresetSelect = (presetId: string) => {
    const preset = playgroundPresets.find((p) => p.id === presetId);
    if (preset) {
      setEnvA({ ...preset.envA });
      setEnvB({ ...preset.envB });
      setActivePreset(presetId);
    }
  };

  const handleReset = () => {
    setEnvA({ ...defaultEnvA });
    setEnvB({ ...defaultEnvB });
    setActivePreset("classic-drift");
  };

  return (
    <div className="py-12 md:py-20 bg-warm-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="orange" size="md">Interactive Simulator</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#202124] tracking-tight">
            Environment Drift Playground
          </h1>
          <p className="text-base sm:text-lg text-[#77736C]">
            Change the values below and see how Runmark detects differences between environments.
          </p>
        </div>

        {/* Preset Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs font-semibold text-[#77736C] mr-2">Try Preset Scenarios:</span>
          {playgroundPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activePreset === preset.id
                  ? "bg-[#202124] text-white shadow-warm-sm"
                  : "bg-[#FFFDF9] text-[#77736C] border border-[#E8E2D9] hover:text-[#202124] hover:border-[#D8D2C7]"
              }`}
            >
              {preset.name}
            </button>
          ))}
          <button
            onClick={handleReset}
            className="p-1.5 text-[#77736C] hover:text-[#202124] rounded-lg hover:bg-[#F3EFE8] ml-2"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Main Dual Environment Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Environment A: Your Machine */}
          <div className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 shadow-warm-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
              <div>
                <h3 className="text-lg font-bold text-[#202124]">Environment A</h3>
                <p className="text-xs text-[#77736C]">Your Local Machine (Baseline)</p>
              </div>
              <span className="text-xs font-mono bg-[#FAF8F3] px-2.5 py-1 rounded-lg border border-[#E8E2D9] text-[#202124] font-semibold">
                Local Dev
              </span>
            </div>

            <div className="space-y-4">
              {/* Python */}
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Python Runtime
                </label>
                <select
                  value={envA.python}
                  onChange={(e) => {
                    setEnvA({ ...envA, python: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F]"
                >
                  {playgroundOptions.python.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Django */}
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Django Framework
                </label>
                <select
                  value={envA.django}
                  onChange={(e) => {
                    setEnvA({ ...envA, django: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F]"
                >
                  {playgroundOptions.django.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* OS */}
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Operating System
                </label>
                <select
                  value={envA.os}
                  onChange={(e) => {
                    setEnvA({ ...envA, os: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F]"
                >
                  {playgroundOptions.os.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Node.js */}
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Node.js Runtime
                </label>
                <select
                  value={envA.node}
                  onChange={(e) => {
                    setEnvA({ ...envA, node: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F]"
                >
                  {playgroundOptions.node.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Package Manager */}
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Package Manager
                </label>
                <select
                  value={envA.packageManager}
                  onChange={(e) => {
                    setEnvA({ ...envA, packageManager: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F]"
                >
                  {playgroundOptions.packageManager.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Environment B: Team / Production */}
          <div className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 shadow-warm-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
              <div>
                <h3 className="text-lg font-bold text-[#202124]">Environment B</h3>
                <p className="text-xs text-[#77736C]">Team Coworker / CI Runner</p>
              </div>
              <span className="text-xs font-mono bg-[#FAF8F3] px-2.5 py-1 rounded-lg border border-[#E8E2D9] text-[#202124] font-semibold">
                Target Env
              </span>
            </div>

            <div className="space-y-4">
              {/* Python */}
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Python Runtime
                </label>
                <select
                  value={envB.python}
                  onChange={(e) => {
                    setEnvB({ ...envB, python: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F]"
                >
                  {playgroundOptions.python.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Django */}
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Django Framework
                </label>
                <select
                  value={envB.django}
                  onChange={(e) => {
                    setEnvB({ ...envB, django: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F]"
                >
                  {playgroundOptions.django.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* OS */}
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Operating System
                </label>
                <select
                  value={envB.os}
                  onChange={(e) => {
                    setEnvB({ ...envB, os: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F]"
                >
                  {playgroundOptions.os.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Node.js */}
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Node.js Runtime
                </label>
                <select
                  value={envB.node}
                  onChange={(e) => {
                    setEnvB({ ...envB, node: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F]"
                >
                  {playgroundOptions.node.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Package Manager */}
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Package Manager
                </label>
                <select
                  value={envB.packageManager}
                  onChange={(e) => {
                    setEnvB({ ...envB, packageManager: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F]"
                >
                  {playgroundOptions.packageManager.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Live Drift Analysis Output Card */}
        <div className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl p-6 sm:p-10 shadow-warm-md mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E2D9] gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${
                differenceCount > 0
                  ? criticalCount > 0
                    ? "bg-[#FEECEB] text-[#D92D20]"
                    : "bg-[#FFF2EC] text-[#FF5A1F]"
                  : "bg-[#EAF5EA] text-[#238636]"
              }`}>
                <GitCompare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#202124]">
                  {differenceCount > 0 ? "Environment Drift Detected" : "Environments Perfectly In Sync"}
                </h3>
                <p className="text-xs text-[#77736C]">
                  {differenceCount > 0
                    ? `${differenceCount} discrepancy factor(s) identified between Environment A and B.`
                    : "Both machines satisfy identical runtime and dependency contracts."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {differenceCount > 0 ? (
                <Badge variant={criticalCount > 0 ? "error" : "warning"} size="md">
                  {differenceCount} Discrepanc{differenceCount === 1 ? "y" : "ies"}
                </Badge>
              ) : (
                <Badge variant="success" size="md">
                  100% Parity
                </Badge>
              )}
            </div>
          </div>

          {/* Diff Items Grid */}
          <div className="space-y-3">
            {diffResults.map((item) => {
              if (item.status === "same") {
                return (
                  <div
                    key={item.property}
                    className="p-3.5 rounded-2xl bg-[#EAF5EA]/50 border border-[#C6E7C6] flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#238636]" />
                      <span className="font-semibold text-[#202124]">{item.label}:</span>
                      <span className="text-[#238636]">{item.valA}</span>
                    </div>
                    <span className="text-[11px] text-[#238636] font-sans font-semibold">
                      Match
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={item.property}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono ${
                    item.status === "critical"
                      ? "bg-[#FEECEB]/60 border-[#FECDCA]"
                      : "bg-[#FFF2EC]/60 border-[#FFD9CA]"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {item.status === "critical" ? (
                      <XCircle className="w-4 h-4 text-[#D92D20] shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold text-[#202124] flex items-center gap-2">
                        <span>{item.label} changed:</span>
                        <span className="text-[#77736C]">{item.valA}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#FF5A1F]" />
                        <span className={item.status === "critical" ? "text-[#D92D20] font-bold" : "text-[#FF5A1F] font-bold"}>
                          {item.valB}
                        </span>
                      </div>
                      {item.explanation && (
                        <p className="text-[11px] font-sans text-[#77736C] mt-1">
                          {item.explanation}
                        </p>
                      )}
                    </div>
                  </div>

                  <Badge variant={item.status === "critical" ? "error" : "orange"} size="sm" className="self-start sm:self-auto font-sans">
                    {item.status === "critical" ? "Critical" : "Warning"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] p-4 flex items-center gap-3 text-xs text-[#77736C] max-w-2xl mx-auto text-center justify-center">
          <Info className="w-4 h-4 text-[#FF5A1F] shrink-0" />
          <span>
            This is an educational browser demo. Real scanning is performed deterministically on your local machine using the <code>runmark</code> CLI.
          </span>
        </div>

      </div>
    </div>
  );
}
