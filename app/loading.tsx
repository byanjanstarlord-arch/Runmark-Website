import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#FF5A1F] animate-pulse-subtle flex items-center justify-center text-white font-bold text-xs">
          R
        </div>
        <span className="text-xs font-mono text-[#77736C]">Loading Runmark...</span>
      </div>
    </div>
  );
}
