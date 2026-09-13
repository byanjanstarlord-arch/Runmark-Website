import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home, FileText } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-warm-grid">
      <div className="max-w-md w-full text-center space-y-6 bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl p-8 sm:p-12 shadow-warm-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFF2EC] text-[#FF5A1F] font-mono font-extrabold text-2xl border border-[#FFD9CA]">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
          Page not found
        </h1>
        <p className="text-xs sm:text-sm text-[#77736C] leading-relaxed">
          The requested path does not exist in the Runmark documentation or website hierarchy.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
          <Button href="/docs" variant="secondary" size="md" leftIcon={<FileText className="w-4 h-4" />}>
            Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
