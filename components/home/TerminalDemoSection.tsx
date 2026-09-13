"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Terminal, Play, Sparkles } from "lucide-react";

export function TerminalDemoSection() {
  const [activeTab, setActiveTab] = useState<"scan" | "check" | "contract" | "diff">("scan");
  const [copied, setCopied] = useState(false);

  const tabs = [
    {
      id: "scan" as const,
      name: "runmark scan",
      cmd: "runmark scan",
      output: `╭─ Runmark Environment Scan ───────────────────────────────────────────────────╮
│ Project: HerSakhi (Python, Django)                                           │
│ Host OS: Windows 11 (AMD64)                                                  │
│                                                                              │
│ Runtimes:                                                                    │
│   ✓ Python 3.12.10                                                           │
│   ✓ Node.js 22.19.0                                                          │
│   ✓ Git 2.53.0                                                               │
│   ✗ Docker (Not installed / Daemon inactive)                                 │
│                                                                              │
│ Backing Services:                                                            │
│   ✓ PostgreSQL 16.3 (Port 5432 - Active)                                     │
│   ✗ Redis (Port 6379 - Closed)                                               │
│                                                                              │
│ Environment Variables:                                                       │
│   ✓ DATABASE_URL (Present, Secret Redacted)                                  │
│   ✓ OPENROUTER_API_KEY (Present, Secret Redacted)                            │
│                                                                              │
│ Canonical Digest: ce19840abda5675a69937dfa7c49bbf25ba3a2a3b10180ac3b95d1... │
│ Snapshot saved to .runmark/snapshots/snap_01J8F9X2K3Q7W.json                  │
╰──────────────────────────────────────────────────────────────────────────────╯`
    },
    {
      id: "check" as const,
      name: "runmark check",
      cmd: "runmark check --explain",
      output: `╭─ Runmark Contract Evaluation ──────────────────────────────────────────────╮
│ Contract: runmark.json (Version 1)                                         │
│ Overall Status: PASS (6/6 checks satisfied)                                │
│                                                                            │
│ ✓ runtime.python: >=3.11,<3.13 [Found: 3.12.10]                            │
│ ✓ runtime.node: >=20 [Found: 22.19.0]                                      │
│ ✓ service.postgresql: >=15 [Found: 16.3]                                   │
│ ✓ environment.required: DATABASE_URL [Present: Yes (Secret)]               │
│ ✓ environment.required: SECRET_KEY [Present: Yes (Secret)]                 │
│                                                                            │
│ Host machine satisfies project environment contract. Ready to run!        │
╰────────────────────────────────────────────────────────────────────────────╯`
    },
    {
      id: "contract" as const,
      name: "contract init",
      cmd: "runmark contract init --dry-run",
      output: `🔍 Inspecting project evidence manifests...
  ✓ Discovered Python project signals (pyproject.toml, requirements.txt)
  ✓ Discovered PostgreSQL requirement (compose.yaml: image postgres:16)
  ✓ Discovered required environment variables (.env.example)

Synthesized Contract Candidate:
  • platform: ["windows", "linux", "darwin"]
  • runtime: {"python": ">=3.12", "node": ">=22"}
  • services: {"postgresql": {"version": ">=16", "required": true}}
  • environment: {"required": ["DATABASE_URL", "SECRET_KEY"]}

[Dry Run] No files modified. Run with --yes to generate runmark.json.`
    },
    {
      id: "diff" as const,
      name: "runmark diff",
      cmd: "runmark diff",
      output: `⚠ Environment Drift Detected (2 differences):
  [CHANGED] Python Runtime: 3.12.10 → 3.11.9 (WARNING)
  [CHANGED] OS Platform: Windows → Linux (WARNING)
  [UNCHANGED] PostgreSQL: 16.3 (Port 5432)
  [UNCHANGED] Node.js: 22.19.0

Run 'runmark doctor' to view actionable remediation advice.`
    }
  ];

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  const copyOutput = () => {
    navigator.clipboard.writeText(currentTab.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F3] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Terminal Output Box */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-[#17191C] border border-[#2A2E33] shadow-warm-xl overflow-hidden">
              
              {/* Terminal Titlebar & Tabs */}
              <div className="flex items-center justify-between px-4 py-3.5 bg-[#111315] border-b border-[#2A2E33]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="text-xs text-[#77736C] font-mono ml-2 hidden sm:inline">
                    terminal — runmark-cli
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1.5 bg-[#17191C] p-1 rounded-xl border border-[#2A2E33]">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-[#2A2E33] text-white font-bold shadow-sm"
                          : "text-[#77736C] hover:text-white hover:bg-[#2A2E33]/50"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>

                {/* Copy Output Button */}
                <button
                  onClick={copyOutput}
                  className="text-[#77736C] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#2A2E33]"
                  title="Copy terminal output"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#238636]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Command Prompt Line */}
              <div className="px-6 pt-5 pb-3 font-mono text-sm text-[#77736C] flex items-center gap-2 border-b border-[#2A2E33]/40">
                <span className="text-[#FF5A1F] font-bold">$</span>
                <span className="text-white font-bold">{currentTab.cmd}</span>
              </div>

              {/* Terminal Body */}
              <pre className="p-6 text-xs sm:text-sm font-mono text-[#E6EDF3] overflow-x-auto whitespace-pre leading-relaxed">
                {currentTab.output}
              </pre>
            </div>
          </div>

          {/* Right: Explanatory Side Card */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
              Real CLI Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
              See it in action.
            </h2>
            <p className="text-base text-[#77736C] leading-relaxed">
              A simple command gives you a clearer, deterministic picture of your development environment. No bloated daemons, no background cloud trackers.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EAF5EA] text-[#238636] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="text-sm text-[#202124]">
                  <strong className="font-semibold text-[#202124]">Sub-second execution:</strong> Scans runtimes, dependencies, and ports concurrently.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EAF5EA] text-[#238636] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="text-sm text-[#202124]">
                  <strong className="font-semibold text-[#202124]">Zero-Secret guarantee:</strong> Multi-pass credential masking protects secrets.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EAF5EA] text-[#238636] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="text-sm text-[#202124]">
                  <strong className="font-semibold text-[#202124]">Deterministic hashing:</strong> Identical environments always produce identical digests.
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <Button href="/docs/getting-started/quick-start" variant="primary" size="md" className="text-sm font-semibold">
                Try Runmark
              </Button>
              <Button href="/docs" variant="secondary" size="md" className="text-sm font-semibold">
                Read Docs
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
