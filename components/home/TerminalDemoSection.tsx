"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Copy, Check, RefreshCw, Terminal, CheckCircle2, ShieldCheck, Zap, Hash, ArrowRight } from "lucide-react";
import { TERMINAL_DEMOS, TerminalLine, HighlightKey } from "@/lib/terminal-demos";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function TerminalDemoSection() {
  const [activeTab, setActiveTab] = useState<"scan" | "check" | "contract" | "diff">("scan");
  const [typedCommand, setTypedCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [spinnerIndex, setSpinnerIndex] = useState(0);
  const [isScanningPhase, setIsScanningPhase] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<HighlightKey>(null);
  const [dynamicStatus, setDynamicStatus] = useState("Ready to scan");
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLPreElement>(null);
  const hasTriggeredRef = useRef(false);
  const animationTimerRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all pending animation timers
  const clearTimers = () => {
    animationTimerRef.current.forEach((t) => clearTimeout(t));
    animationTimerRef.current = [];
  };

  // Run the animated demo for a given tab
  const runDemo = useCallback((tabId: "scan" | "check" | "contract" | "diff") => {
    clearTimers();
    const demo = TERMINAL_DEMOS[tabId];

    // Reset states
    setTypedCommand("");
    setVisibleLines([]);
    setProgress(0);
    setIsCompleted(false);
    setIsScanningPhase(false);
    setActiveHighlight(null);
    setDynamicStatus("Initializing CLI...");
    setIsTyping(true);

    const fullCmd = demo.cmd;
    let charIdx = 0;

    // 1. Typing animation (types char-by-char)
    const typeInterval = setInterval(() => {
      charIdx++;
      setTypedCommand(fullCmd.slice(0, charIdx));
      if (charIdx >= fullCmd.length) {
        clearInterval(typeInterval);
        setIsTyping(false);

        // Pause briefly after command typing, then execute steps
        const postTypeTimer = setTimeout(() => {
          executeSteps(demo.steps);
        }, 350);
        animationTimerRef.current.push(postTypeTimer);
      }
    }, 55);

    const executeSteps = (steps: typeof demo.steps) => {
      let cumulativeDelay = 0;

      steps.forEach((step, index) => {
        const timer = setTimeout(() => {
          setVisibleLines(step.lines);
          setProgress(step.progress);
          setDynamicStatus(step.rightNarrative.status);
          setActiveHighlight(step.rightNarrative.activeHighlight);

          if (step.phase === "SCANNING") {
            setIsScanningPhase(true);
          } else {
            setIsScanningPhase(false);
          }

          if (step.phase === "COMPLETE" || index === steps.length - 1) {
            setIsCompleted(true);
          }

          // Auto-scroll terminal smoothly to bottom
          if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTo({
              top: terminalBodyRef.current.scrollHeight,
              behavior: "smooth"
            });
          }
        }, cumulativeDelay);

        animationTimerRef.current.push(timer);
        cumulativeDelay += step.durationMs;
      });
    };
  }, []);

  // CLI Spinner ticker
  useEffect(() => {
    if (!isScanningPhase) return;
    const interval = setInterval(() => {
      setSpinnerIndex((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 80);
    return () => clearInterval(interval);
  }, [isScanningPhase]);

  // ScrollTrigger Viewport Detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      once: true,
      onEnter: () => {
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          // Smooth entrance fade & slide
          gsap.fromTo(
            el,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
          runDemo("scan");
        }
      }
    });

    return () => {
      trigger.kill();
      clearTimers();
    };
  }, [runDemo]);

  // Switch tabs
  const handleTabChange = (tabId: "scan" | "check" | "contract" | "diff") => {
    if (tabId === activeTab && !isCompleted && isTyping) return;
    setActiveTab(tabId);
    runDemo(tabId);
  };

  // Replay
  const handleReplay = () => {
    runDemo(activeTab);
  };

  const copyOutput = () => {
    const rawText = visibleLines.map((l) => l.text).join("\n");
    navigator.clipboard.writeText(`$ ${typedCommand}\n\n${rawText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#FAF8F3] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive Simulated Terminal */}
          <div className="lg:col-span-8">
            <div 
              ref={terminalRef}
              className={`rounded-3xl bg-[#17191C] border transition-all duration-300 shadow-warm-xl overflow-hidden ${
                isCompleted 
                  ? "border-[#2A2E33] hover:border-[#FF5A1F]/50 shadow-[0_0_0_1px_rgba(255,90,31,0.08),0_20px_60px_rgba(40,30,20,0.08)]" 
                  : "border-[#2A2E33]"
              }`}
            >
              
              {/* Terminal Titlebar & Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 bg-[#111315] border-b border-[#2A2E33]">
                {/* Window Controls */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="text-xs text-[#77736C] font-mono ml-2 hidden sm:inline">
                    terminal — runmark-cli
                  </span>
                </div>

                {/* Center: Live Progress Indicator */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  {isCompleted ? (
                    <span className="text-[#3FB950] font-bold flex items-center gap-1.5 bg-[#238636]/10 px-2 py-0.5 rounded-full border border-[#238636]/30 animate-in fade-in">
                      <Check className="w-3 h-3" /> COMPLETE
                    </span>
                  ) : progress > 0 ? (
                    <div className="flex items-center gap-2 text-[#FF5A1F]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
                      <span className="text-[11px] font-semibold tracking-wider uppercase">
                        SCAN {progress}%
                      </span>
                      <div className="w-16 sm:w-24 h-1.5 rounded-full bg-[#2A2E33] overflow-hidden">
                        <div 
                          className="h-full bg-[#FF5A1F] transition-all duration-300 rounded-full" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-[#77736C] text-[11px]">READY</span>
                  )}
                </div>

                {/* Right: Interactive Tabs & Copy */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#17191C] p-1 rounded-xl border border-[#2A2E33]">
                    {(["scan", "check", "contract", "diff"] as const).map((tabId) => {
                      const demo = TERMINAL_DEMOS[tabId];
                      return (
                        <button
                          key={tabId}
                          onClick={() => handleTabChange(tabId)}
                          className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                            activeTab === tabId
                              ? "bg-[#2A2E33] text-white font-bold shadow-sm"
                              : "text-[#77736C] hover:text-white hover:bg-[#2A2E33]/50"
                          }`}
                        >
                          {demo.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={copyOutput}
                    className="text-[#77736C] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#2A2E33]"
                    title="Copy terminal output"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#3FB950]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Command Prompt Line */}
              <div className="px-6 pt-5 pb-3 font-mono text-sm text-[#77736C] flex items-center justify-between gap-2 border-b border-[#2A2E33]/40 bg-[#17191C]">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF5A1F] font-bold select-none">$</span>
                  <span className="text-white font-bold">
                    {typedCommand}
                    {isTyping && <span className="terminal-cursor text-[#FF5A1F] font-bold">▌</span>}
                    {!isTyping && !isCompleted && progress === 0 && (
                      <span className="terminal-cursor text-[#77736C]">▌</span>
                    )}
                  </span>
                </div>

                {isCompleted && (
                  <button
                    onClick={handleReplay}
                    className="text-xs font-mono text-[#77736C] hover:text-[#FF5A1F] flex items-center gap-1 px-2 py-0.5 rounded border border-[#2A2E33] hover:border-[#FF5A1F]/40 bg-[#111315] transition-all"
                    title="Replay this scan"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Replay</span>
                  </button>
                )}
              </div>

              {/* Terminal Body */}
              <pre 
                ref={terminalBodyRef}
                className="p-6 text-xs sm:text-sm font-mono text-[#E6EDF3] min-h-[300px] max-h-[420px] overflow-y-auto overflow-x-auto whitespace-pre leading-relaxed select-text"
                style={{ fontFamily: '"JetBrains Mono", "Geist Mono", ui-monospace, monospace' }}
              >
                {/* When scanning phase, display live spinning glyph */}
                {isScanningPhase && (
                  <div className="text-[#FF5A1F] flex items-center gap-2 py-1">
                    <span className="font-bold text-base">{SPINNER_FRAMES[spinnerIndex]}</span>
                    <span>Inspecting project environment manifests...</span>
                  </div>
                )}

                {/* Render streamed lines */}
                {visibleLines.map((line, idx) => {
                  let colorClass = "text-[#E6EDF3]";
                  if (line.type === "success") colorClass = "text-[#3FB950]";
                  if (line.type === "warning") colorClass = "text-[#E3B341]";
                  if (line.type === "error") colorClass = "text-[#F85149]";
                  if (line.type === "info") colorClass = "text-[#58A6FF]";
                  if (line.type === "muted") colorClass = "text-[#77736C]";
                  if (line.type === "divider") colorClass = "text-[#2A2E33]";
                  if (line.type === "box") colorClass = "text-[#77736C]";

                  return (
                    <div key={idx} className={`${colorClass} transition-opacity duration-150`}>
                      {line.text || " "}
                    </div>
                  );
                })}

                {/* Bottom Replay Action Bar inside terminal when completed */}
                {isCompleted && (
                  <div className="mt-4 pt-3 border-t border-[#2A2E33] flex items-center justify-between text-xs text-[#77736C]">
                    <span className="text-[#3FB950] font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Finished execution
                    </span>
                    <button
                      onClick={handleReplay}
                      className="px-3 py-1.5 rounded-lg bg-[#2A2E33] hover:bg-[#32383E] text-[#E6EDF3] hover:text-white font-bold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#FF5A1F]" />
                      <span>Run scan again</span>
                    </button>
                  </div>
                )}
              </pre>

            </div>
          </div>

          {/* Right: Synchronized Reactive Storytelling Card */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F] flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Real CLI Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
              See it in action.
            </h2>
            <p className="text-base text-[#77736C] leading-relaxed">
              A simple command gives you a clearer, deterministic picture of your development environment. No bloated daemons, no background cloud trackers.
            </p>

            {/* Dynamic Status Ticker (synchronizes with terminal phase) */}
            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center justify-between gap-3 transition-all">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${isCompleted ? "bg-[#238636]" : "bg-[#FF5A1F] animate-ping"}`} />
                <span className="text-xs font-mono font-bold text-[#202124]">
                  {dynamicStatus}
                </span>
              </div>
              {isCompleted && (
                <span className="text-[11px] font-mono font-bold text-[#238636] bg-[#EAF5EA] px-2 py-0.5 rounded border border-[#C6E7C6]">
                  Done
                </span>
              )}
            </div>

            {/* 3 Synchronized Value Props */}
            <div className="space-y-3 pt-1">
              
              {/* Prop 1: Sub-second execution */}
              <div className={`p-3 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                activeHighlight === "subsecond"
                  ? "border-[#FF5A1F] bg-[#FFF2EC] shadow-warm-md scale-[1.02]"
                  : "border-[#E8E2D9] bg-[#FFFDF9] shadow-warm-sm"
              }`}>
                <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  activeHighlight === "subsecond"
                    ? "bg-[#FF5A1F] text-white"
                    : "bg-[#EAF5EA] text-[#238636]"
                }`}>
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#202124] flex items-center justify-between">
                    <span>Sub-second execution</span>
                    {activeHighlight === "subsecond" && (
                      <span className="text-[10px] font-mono text-[#FF5A1F] font-extrabold uppercase">
                        Active Check (0.42s)
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#77736C] mt-0.5">
                    Scans runtimes, dependencies, and ports concurrently without daemon overhead.
                  </div>
                </div>
              </div>

              {/* Prop 2: Zero-Secret guarantee */}
              <div className={`p-3 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                activeHighlight === "zerosecret"
                  ? "border-[#FF5A1F] bg-[#FFF2EC] shadow-warm-md scale-[1.02]"
                  : "border-[#E8E2D9] bg-[#FFFDF9] shadow-warm-sm"
              }`}>
                <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  activeHighlight === "zerosecret"
                    ? "bg-[#FF5A1F] text-white"
                    : "bg-[#EAF5EA] text-[#238636]"
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#202124] flex items-center justify-between">
                    <span>Zero-Secret guarantee</span>
                    {activeHighlight === "zerosecret" && (
                      <span className="text-[10px] font-mono text-[#FF5A1F] font-extrabold uppercase">
                        6 Masked
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#77736C] mt-0.5">
                    Multi-pass heuristic credential masking guarantees 0 credentials leaked in snapshots.
                  </div>
                </div>
              </div>

              {/* Prop 3: Deterministic hashing */}
              <div className={`p-3 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                activeHighlight === "deterministic"
                  ? "border-[#FF5A1F] bg-[#FFF2EC] shadow-warm-md scale-[1.02]"
                  : "border-[#E8E2D9] bg-[#FFFDF9] shadow-warm-sm"
              }`}>
                <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  activeHighlight === "deterministic"
                    ? "bg-[#FF5A1F] text-white"
                    : "bg-[#EAF5EA] text-[#238636]"
                }`}>
                  <Hash className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#202124] flex items-center justify-between">
                    <span>Deterministic hashing</span>
                    {activeHighlight === "deterministic" && (
                      <span className="text-[10px] font-mono text-[#FF5A1F] font-extrabold uppercase">
                        SHA256 Match
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#77736C] mt-0.5">
                    Identical environments always produce identical digests across host machines.
                  </div>
                </div>
              </div>

            </div>

            {/* CTAs and Replay Link */}
            <div className="pt-3 flex items-center gap-3">
              <Button href="/docs/getting-started/quick-start" variant="primary" size="md" className="text-sm font-semibold">
                Try Runmark
              </Button>
              <Button href="/docs" variant="secondary" size="md" className="text-sm font-semibold">
                Read Docs
              </Button>
              {isCompleted && (
                <button
                  onClick={handleReplay}
                  className="text-xs font-mono text-[#77736C] hover:text-[#FF5A1F] flex items-center gap-1 transition-colors ml-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Replay demo</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
