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
  Download,
  Copy,
  Check,
  Stethoscope,
  X
} from "lucide-react";

export function PlaygroundClient() {
  const [envA, setEnvA] = useState<EnvironmentState>(defaultEnvA);
  const [envB, setEnvB] = useState<EnvironmentState>(defaultEnvB);
  const [activePreset, setActivePreset] = useState<string>("classic-drift");
  const [copiedReport, setCopiedReport] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);

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

  const generateContractJson = () => {
    return JSON.stringify(
      {
        "$schema": "https://runmark.dev/schema/v1/contract.json",
        "schema_version": "1.0",
        "name": "project-contract",
        "platform": [envA.os.toLowerCase().includes("win") ? "windows" : envA.os.toLowerCase().includes("mac") ? "darwin" : "linux"],
        "runtime": {
          "python": `>=${envA.python.split(" ")[0]}`,
          "node": `>=${envA.node.split(".")[0]}`
        },
        "dependencies": {
          "django": `==${envA.django}`,
          "package_manager": envA.packageManager
        },
        "services": {
          "postgresql": {
            "version": ">=16",
            "required": true
          }
        },
        "environment": {
          "required": ["DATABASE_URL", "SECRET_KEY"]
        }
      },
      null,
      2
    );
  };

  const copyDiffReport = () => {
    const lines = [
      `# Runmark Environment Drift Report`,
      `Generated from interactive simulator`,
      ``,
      `Environment A (Baseline): Python ${envA.python}, ${envA.os}, Django ${envA.django}, Node ${envA.node}`,
      `Environment B (Target): Python ${envB.python}, ${envB.os}, Django ${envB.django}, Node ${envB.node}`,
      ``,
      `## Discrepancies (${differenceCount} detected):`,
      ...diffResults.map((d) => {
        if (d.status === "same") return `- [MATCH] ${d.label}: ${d.valA}`;
        return `- [${d.status.toUpperCase()}] ${d.label}: ${d.valA} -> ${d.valB} (${d.explanation || "Mismatch"})`;
      })
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="py-12 md:py-20 bg-warm-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="orange" size="md">Interactive Simulator</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#202124] tracking-tight">
            Environment Drift Playground
          </h1>
          <p className="text-base sm:text-xl text-[#77736C]">
            Change the values below and see how Runmark detects differences between environments.
          </p>
        </div>

        {/* Preset Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          <span className="text-sm font-semibold text-[#77736C] mr-2">Try Preset Scenarios:</span>
          {playgroundPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activePreset === preset.id
                  ? "bg-[#202124] text-white shadow-warm-sm font-semibold"
                  : "bg-[#FFFDF9] text-[#77736C] border border-[#E8E2D9] hover:text-[#202124] hover:border-[#D8D2C7]"
              }`}
            >
              {preset.name}
            </button>
          ))}
          <button
            onClick={handleReset}
            className="p-2 text-[#77736C] hover:text-[#202124] rounded-xl hover:bg-[#F3EFE8] ml-2 border border-[#E8E2D9]"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Main Dual Environment Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Environment A: Your Machine */}
          <div className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 shadow-warm-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
              <div>
                <h3 className="text-xl font-bold text-[#202124]">Environment A</h3>
                <p className="text-sm text-[#77736C]">Your Local Machine (Baseline)</p>
              </div>
              <span className="text-xs sm:text-sm font-mono bg-[#FAF8F3] px-3 py-1 rounded-xl border border-[#E8E2D9] text-[#202124] font-bold">
                Local Dev
              </span>
            </div>

            <div className="space-y-4">
              {/* Python */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                  Python Runtime
                </label>
                <select
                  value={envA.python}
                  onChange={(e) => {
                    setEnvA({ ...envA, python: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                >
                  {playgroundOptions.python.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Django */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                  Django Framework
                </label>
                <select
                  value={envA.django}
                  onChange={(e) => {
                    setEnvA({ ...envA, django: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                >
                  {playgroundOptions.django.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* OS */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                  Operating System
                </label>
                <select
                  value={envA.os}
                  onChange={(e) => {
                    setEnvA({ ...envA, os: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                >
                  {playgroundOptions.os.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Node.js */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                  Node.js Runtime
                </label>
                <select
                  value={envA.node}
                  onChange={(e) => {
                    setEnvA({ ...envA, node: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                >
                  {playgroundOptions.node.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Package Manager */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                  Package Manager
                </label>
                <select
                  value={envA.packageManager}
                  onChange={(e) => {
                    setEnvA({ ...envA, packageManager: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                >
                  {playgroundOptions.packageManager.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Environment B: Target Env */}
          <div className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 shadow-warm-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
              <div>
                <h3 className="text-xl font-bold text-[#202124]">Environment B</h3>
                <p className="text-sm text-[#77736C]">Team Coworker / CI Runner</p>
              </div>
              <span className="text-xs sm:text-sm font-mono bg-[#FAF8F3] px-3 py-1 rounded-xl border border-[#E8E2D9] text-[#202124] font-bold">
                Target Env
              </span>
            </div>

            <div className="space-y-4">
              {/* Python */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                  Python Runtime
                </label>
                <select
                  value={envB.python}
                  onChange={(e) => {
                    setEnvB({ ...envB, python: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                >
                  {playgroundOptions.python.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Django */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                  Django Framework
                </label>
                <select
                  value={envB.django}
                  onChange={(e) => {
                    setEnvB({ ...envB, django: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                >
                  {playgroundOptions.django.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* OS */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                  Operating System
                </label>
                <select
                  value={envB.os}
                  onChange={(e) => {
                    setEnvB({ ...envB, os: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                >
                  {playgroundOptions.os.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Node.js */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                  Node.js Runtime
                </label>
                <select
                  value={envB.node}
                  onChange={(e) => {
                    setEnvB({ ...envB, node: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                >
                  {playgroundOptions.node.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Package Manager */}
              <div>
                <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                  Package Manager
                </label>
                <select
                  value={envB.packageManager}
                  onChange={(e) => {
                    setEnvB({ ...envB, packageManager: e.target.value });
                    setActivePreset("");
                  }}
                  className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm font-mono text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
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
        <div className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl p-6 sm:p-10 shadow-warm-md mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E2D9] gap-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className={`p-3.5 rounded-2xl ${
                differenceCount > 0
                  ? criticalCount > 0
                    ? "bg-[#FEECEB] text-[#D92D20]"
                    : "bg-[#FFF2EC] text-[#FF5A1F]"
                  : "bg-[#EAF5EA] text-[#238636]"
              }`}>
                <GitCompare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#202124]">
                  {differenceCount > 0 ? "Environment Drift Detected" : "Environments Perfectly In Sync"}
                </h3>
                <p className="text-sm text-[#77736C] mt-0.5">
                  {differenceCount > 0
                    ? `${differenceCount} discrepancy factor(s) identified between Environment A and B.`
                    : "Both machines satisfy identical runtime and dependency contracts."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {differenceCount > 0 ? (
                <Badge variant={criticalCount > 0 ? "error" : "warning"} size="md">
                  {differenceCount} Discrepanc{differenceCount === 1 ? "y" : "ies"}
                </Badge>
              ) : (
                <Badge variant="success" size="md">
                  100% Parity
                </Badge>
              )}

              {/* Action Buttons */}
              <Button
                onClick={() => setShowDoctorModal(true)}
                variant="secondary"
                size="sm"
                className="text-xs font-semibold"
                leftIcon={<Stethoscope className="w-3.5 h-3.5 text-[#FF5A1F]" />}
              >
                Run Doctor
              </Button>
              <Button
                onClick={() => setShowContractModal(true)}
                variant="secondary"
                size="sm"
                className="text-xs font-semibold"
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#238636]" />}
              >
                Export Contract
              </Button>
              <Button
                onClick={copyDiffReport}
                variant="outline"
                size="sm"
                className="text-xs font-semibold"
                leftIcon={copiedReport ? <Check className="w-3.5 h-3.5 text-[#238636]" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copiedReport ? "Copied Report!" : "Copy Report"}
              </Button>
            </div>
          </div>

          {/* Diff Items Grid */}
          <div className="space-y-3.5">
            {diffResults.map((item) => {
              if (item.status === "same") {
                return (
                  <div
                    key={item.property}
                    className="p-4 rounded-2xl bg-[#EAF5EA]/50 border border-[#C6E7C6] flex items-center justify-between text-sm font-mono"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#238636]" />
                      <span className="font-bold text-[#202124]">{item.label}:</span>
                      <span className="text-[#238636] font-semibold">{item.valA}</span>
                    </div>
                    <span className="text-xs text-[#238636] font-sans font-bold bg-[#EAF5EA] px-2.5 py-0.5 rounded-full border border-[#C6E7C6]">
                      Match
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={item.property}
                  className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm font-mono ${
                    item.status === "critical"
                      ? "bg-[#FEECEB]/60 border-[#FECDCA]"
                      : "bg-[#FFF2EC]/60 border-[#FFD9CA]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {item.status === "critical" ? (
                      <XCircle className="w-5 h-5 text-[#D92D20] shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-[#FF5A1F] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-[#202124] flex flex-wrap items-center gap-2">
                        <span>{item.label} changed:</span>
                        <span className="text-[#77736C] line-through">{item.valA}</span>
                        <ArrowRight className="w-4 h-4 text-[#FF5A1F]" />
                        <span className={item.status === "critical" ? "text-[#D92D20] font-extrabold" : "text-[#FF5A1F] font-extrabold"}>
                          {item.valB}
                        </span>
                      </div>
                      {item.explanation && (
                        <p className="text-xs font-sans text-[#77736C] mt-1.5 leading-relaxed">
                          {item.explanation}
                        </p>
                      )}
                    </div>
                  </div>

                  <Badge variant={item.status === "critical" ? "error" : "orange"} size="sm" className="self-start sm:self-auto font-sans font-semibold">
                    {item.status === "critical" ? "Critical Drift" : "Warning"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] p-4 flex items-center gap-3 text-xs sm:text-sm text-[#77736C] max-w-3xl mx-auto text-center justify-center">
          <Info className="w-4 h-4 text-[#FF5A1F] shrink-0" />
          <span>
            This is an educational browser demo. Real scanning is performed deterministically on your local machine using the <code>runmark</code> CLI.
          </span>
        </div>

      </div>

      {/* Doctor Modal */}
      {showDoctorModal && (
        <div className="fixed inset-0 z-50 bg-[#202124]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#17191C] border border-[#2A2E33] rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-[#E6EDF3] font-mono shadow-warm-xl relative animate-fade-in">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2A2E33]">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Stethoscope className="w-4 h-4 text-[#FF5A1F]" />
                <span>runmark doctor --explain</span>
              </div>
              <button
                onClick={() => setShowDoctorModal(false)}
                className="text-[#77736C] hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm leading-relaxed overflow-x-auto">
              <div className="text-[#77736C]">🩺 Diagnosing environment discrepancies...</div>
              {diffResults.filter(d => d.status !== "same").length === 0 ? (
                <div className="text-[#238636]">✓ No issues found! Environments are 100% compliant.</div>
              ) : (
                diffResults.filter(d => d.status !== "same").map((d, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#111315] border border-[#2A2E33]">
                    <div className="text-[#FF5A1F] font-bold">[{d.property.toUpperCase()}] Remediation:</div>
                    <div className="text-[#E6EDF3] mt-1">{d.explanation || `Upgrade or align ${d.label} to match baseline.`}</div>
                    <div className="text-[#77736C] mt-1 text-xs">Run: <code className="text-white bg-[#2A2E33] px-1.5 py-0.5 rounded">runmark check --target {envB.os.toLowerCase()}</code></div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#2A2E33] flex justify-end">
              <button
                onClick={() => setShowDoctorModal(false)}
                className="px-4 py-2 rounded-xl bg-[#2A2E33] hover:bg-[#383D43] text-white text-xs font-sans font-semibold transition-colors"
              >
                Close Diagnostics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contract Modal */}
      {showContractModal && (
        <div className="fixed inset-0 z-50 bg-[#202124]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#17191C] border border-[#2A2E33] rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-[#E6EDF3] font-mono shadow-warm-xl relative animate-fade-in">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2A2E33]">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Sparkles className="w-4 h-4 text-[#238636]" />
                <span>runmark.json (Synthesized from Env A)</span>
              </div>
              <button
                onClick={() => setShowContractModal(false)}
                className="text-[#77736C] hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#111315] border border-[#2A2E33] text-xs sm:text-sm text-[#E6EDF3] overflow-x-auto max-h-72">
              {generateContractJson()}
            </pre>

            <div className="mt-6 pt-4 border-t border-[#2A2E33] flex items-center justify-between">
              <span className="text-xs text-[#77736C] font-sans">Deterministic schema v1.0</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateContractJson());
                    setShowContractModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FF5A1F] hover:bg-[#E94D17] text-white text-xs font-sans font-semibold transition-colors"
                >
                  Copy JSON Contract
                </button>
                <button
                  onClick={() => setShowContractModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#2A2E33] hover:bg-[#383D43] text-white text-xs font-sans font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
