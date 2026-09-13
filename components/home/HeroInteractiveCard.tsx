"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/Badge";
import { 
  TerminalSquare,
  PackageCheck,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Activity,
  Check,
  Copy
} from "lucide-react";

interface LayerItem {
  id: number;
  title: string;
  detail: string;
  tag: string;
  variant: "default" | "success" | "orange";
  icon: React.ElementType;
  annotation: string;
  metric: string;
  status: string;
}

const LAYERS: LayerItem[] = [
  {
    id: 1,
    title: "Application Code",
    detail: "Git Tracked • main@a81f29c",
    tag: "Source",
    variant: "default",
    icon: TerminalSquare,
    annotation: "Repository HEAD clean • 0 untracked diffs • origin/main in sync",
    metric: "SHA a81f29c",
    status: "Clean"
  },
  {
    id: 2,
    title: "Dependencies",
    detail: "Django 5.1.2 • FastAPI 0.115 • uv.lock",
    tag: "Locked",
    variant: "success",
    icon: PackageCheck,
    annotation: "Deterministic hashes matched against lockfiles • 84 packages verified",
    metric: "84 pkgs lock",
    status: "Verified"
  },
  {
    id: 3,
    title: "System & Runtime",
    detail: "Python 3.12.10 • Node 22.19.0",
    tag: "Verified",
    variant: "orange",
    icon: Cpu,
    annotation: "Host AMD64 runtime verified • ABI libc compatible",
    metric: "CPython 64-bit",
    status: "Matched"
  },
  {
    id: 4,
    title: "Environment & Services",
    detail: "Postgres 16.3 (Port 5432) • .env secrets",
    tag: "Healthy",
    variant: "success",
    icon: Layers,
    annotation: "Multi-pass zero-secret masking applied to 6 variables • Port open",
    metric: "6 masked",
    status: "Protected"
  }
];

export function HeroInteractiveCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [digestCopied, setDigestCopied] = useState(false);
  const [secondsAgo, setSecondsAgo] = useState(2);

  // 3D Tilt & Cursor Spotlight state (21st.dev TiltCard physics)
  const [transform, setTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // Auto-cycle through layers when not hovered to keep the UI dynamic & alive
  useEffect(() => {
    if (isHovered || isScanning) return;
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev % LAYERS.length) + 1);
    }, 3600);
    return () => clearInterval(interval);
  }, [isHovered, isScanning]);

  // Live seconds-ago ticker
  useEffect(() => {
    const ticker = setInterval(() => {
      setSecondsAgo((s) => (s >= 15 ? 1 : s + 1));
    }, 1000);
    return () => clearInterval(ticker);
  }, []);

  // 3D Tilt interaction
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    
    // Tilt limits: gentle 8 degrees for a premium, non-gimmicky feel
    const tiltLimit = 8;
    const xRot = (py - 0.5) * -(tiltLimit * 2);
    const yRot = (px - 0.5) * (tiltLimit * 2);
    
    setTransform(
      `perspective(1200px) rotateX(${xRot.toFixed(2)}deg) rotateY(${yRot.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    );
    setSpotlightPos({ x: Math.round(px * 100), y: Math.round(py * 100) });
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  }, []);

  // Manual Trigger Scan
  const handleManualScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setSecondsAgo(0);
    
    // Quick sweep across each layer
    let step = 1;
    const scanInterval = setInterval(() => {
      if (step <= LAYERS.length) {
        setActiveLayer(step);
        step++;
      } else {
        clearInterval(scanInterval);
        setIsScanning(false);
      }
    }, 300);
  };

  const copyDigest = () => {
    navigator.clipboard.writeText("ce19840abda5675a69937dfa7c49bbf25ba3a2a3b10180ac3b95d1");
    setDigestCopied(true);
    setTimeout(() => setDigestCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Background Ambient Glow with breathing pulse */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FF5A1F]/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-[#FFA07A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating 3D Telemetry Badges (Orbits) */}
      <div className="absolute -top-4 -right-3 sm:-right-6 z-30 animate-float-badge pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#E8E2D9] shadow-warm-lg">
        <span className="w-2 h-2 rounded-full bg-[#238636] animate-pulse" />
        <span className="text-xs font-mono font-bold text-[#202124]">Python 3.12.10</span>
        <span className="text-[10px] uppercase font-bold text-[#238636] bg-[#EAF5EA] px-1.5 py-0.5 rounded border border-[#C6E7C6]">
          Locked
        </span>
      </div>

      <div className="absolute -bottom-4 -left-3 sm:-left-6 z-30 animate-float-badge-delayed pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#E8E2D9] shadow-warm-lg">
        <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A1F]" />
        <span className="text-xs font-mono font-bold text-[#202124]">0 Secrets Leaked</span>
        <span className="text-[10px] text-[#77736C] font-semibold">100% Masked</span>
      </div>

      {/* 3D Tilt Card Shell (from 21st.dev Tilt physics) */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="will-change-transform relative rounded-3xl p-[1.5px] overflow-hidden group transition-all duration-300"
        style={{
          transform,
          transition: "transform 0.18s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated Rotating Border Beam (from 21st.dev Magic UI BorderBeam) */}
        <div 
          className="absolute -inset-[150%] animate-border-rotate opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 72%, #FF5A1F 86%, #FFA07A 94%, transparent 100%)"
          }}
        />

        {/* Inner Card Container */}
        <div className="relative w-full rounded-[22px] bg-[#FFFDF9] border border-[#E8E2D9] p-5 sm:p-7 shadow-warm-xl overflow-hidden backdrop-blur-sm">
          
          {/* Animated Laser Scanline (Continuous Environment Sweeping Beam) */}
          <div className="pointer-events-none absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#FF5A1F]/10 to-transparent border-b border-[#FF5A1F]/40 shadow-[0_4px_16px_rgba(255,90,31,0.2)] animate-scan-sweep z-20" />

          {/* Cursor Spotlight Effect */}
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 280px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255,90,31,0.06), transparent 70%)`
            }}
          />

          {/* Card Header: Window Controls & Live Radar Activity */}
          <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4 mb-5 relative z-20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF8C66]/80" />
              <div className="w-3 h-3 rounded-full bg-[#E8E2D9]" />
              <div className="w-3 h-3 rounded-full bg-[#E8E2D9]" />
              <span className="text-[11px] font-mono text-[#77736C] ml-1.5 hidden sm:inline">runmark v0.2.2</span>
            </div>

            {/* Interactive Live Radar Beacon & Scan Trigger */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleManualScan}
                disabled={isScanning}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F3] hover:bg-[#FFF2EC] border border-[#E8E2D9] hover:border-[#FF5A1F]/40 text-[11px] font-mono font-medium text-[#77736C] hover:text-[#FF5A1F] transition-all active:scale-95 shadow-xs"
                title="Trigger real-time contract audit"
              >
                <RefreshCw className={`w-3 h-3 ${isScanning ? "animate-spin text-[#FF5A1F]" : ""}`} />
                <span>{isScanning ? "Scanning..." : "Audit"}</span>
              </button>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#EAF5EA] border border-[#C6E7C6]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#238636] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#238636]" />
                </span>
                <span className="text-[11px] font-mono text-[#238636] font-bold">LIVE</span>
              </div>
            </div>
          </div>

          {/* Live Status Sub-Ticker */}
          <div className="mb-4 flex items-center justify-between text-[11px] font-mono text-[#77736C] bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#E8E2D9] relative z-20">
            <div className="flex items-center gap-1.5 text-[#202124] font-medium">
              <Activity className="w-3 h-3 text-[#FF5A1F]" />
              <span>Contract: <strong className="text-[#FF5A1F]">runmark.json</strong></span>
            </div>
            <span className="text-[#77736C]">Verified {secondsAgo}s ago</span>
          </div>

          {/* Stacked Technical Layers */}
          <div className="space-y-2.5 relative z-20">
            {LAYERS.map((layer) => {
              const Icon = layer.icon;
              const isSelected = activeLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-[#FFF4EE] border-[#FF5A1F] shadow-warm-md ring-1 ring-[#FF5A1F]/30"
                      : "bg-[#FAF8F3]/80 border-[#E8E2D9] shadow-warm-sm hover:border-[#D8D2C7] hover:bg-[#FFFDF9]"
                  }`}
                >
                  {/* Subtle active layer left accent bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF5A1F]" />
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`p-2 rounded-xl border transition-colors ${
                        isSelected
                          ? "bg-[#FFFDF9] border-[#FFD9CA] text-[#FF5A1F] shadow-xs"
                          : "bg-[#FFFDF9] border-[#E8E2D9] text-[#202124]"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-[#202124] flex items-center gap-2">
                          {layer.title}
                          {isSelected && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
                          )}
                        </div>
                        <div className="text-[11px] text-[#77736C] font-mono mt-0.5 truncate max-w-[190px] sm:max-w-[220px]">
                          {layer.detail}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge variant={layer.variant} size="sm">
                        {layer.tag}
                      </Badge>
                    </div>
                  </div>

                  {/* Expanded detail on active/selected layer */}
                  {isSelected && (
                    <div className="mt-2.5 pt-2 border-t border-[#FFD9CA]/80 text-[11px] text-[#202124] font-medium flex items-center justify-between gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="flex items-center gap-1.5 text-[#404247]">
                        <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                        <span className="line-clamp-1">{layer.annotation}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-[#FF5A1F]/10 text-[#FF5A1F] px-1.5 py-0.5 rounded font-bold shrink-0">
                        {layer.metric}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Card Footer: Digest & Synchronized State */}
          <div className="mt-5 pt-3.5 border-t border-[#E8E2D9] flex items-center justify-between relative z-20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5A1F] to-[#E94D17] text-white flex items-center justify-center font-extrabold text-xs shadow-warm-sm ring-2 ring-[#FF5A1F]/20">
                R
              </div>
              <div>
                <div className="text-xs font-bold text-[#202124] flex items-center gap-1.5">
                  <span>Environment Match</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#238636]" />
                </div>
                <div 
                  onClick={copyDigest} 
                  className="text-[11px] text-[#77736C] font-mono hover:text-[#202124] cursor-pointer flex items-center gap-1 transition-colors"
                  title="Click to copy digest"
                >
                  <span>ce19840a...</span>
                  {digestCopied ? (
                    <Check className="w-3 h-3 text-[#238636]" />
                  ) : (
                    <Copy className="w-3 h-3 text-[#77736C] hover:text-[#202124]" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-[#238636] bg-[#EAF5EA] px-3 py-1.5 rounded-full font-bold border border-[#C6E7C6] shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#238636]" />
              <span>100% In Sync</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
