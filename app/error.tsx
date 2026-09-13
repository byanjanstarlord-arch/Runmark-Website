"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-warm-grid">
      <div className="max-w-md w-full text-center space-y-6 bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl p-8 sm:p-12 shadow-warm-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FEECEB] text-[#D92D20] font-mono font-extrabold text-xl border border-[#FECDCA]">
          Error
        </div>
        <h1 className="text-2xl font-extrabold text-[#202124] tracking-tight">
          Something went wrong
        </h1>
        <p className="text-xs text-[#77736C] leading-relaxed">
          An unexpected error occurred while rendering this view.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary" size="md" leftIcon={<RotateCcw className="w-4 h-4" />}>
            Try again
          </Button>
          <Button href="/" variant="secondary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
