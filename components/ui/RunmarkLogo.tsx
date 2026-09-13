import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RunmarkLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function RunmarkLogo({
  className,
  showText = true,
  size = "md",
  href = "/",
}: RunmarkLogoProps) {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-lg font-bold tracking-tight",
    md: "text-xl font-bold tracking-tight",
    lg: "text-2xl font-bold tracking-tight",
  };

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg bg-[#FF5A1F] text-white shadow-warm-sm group-hover:bg-[#E94D17] transition-all duration-200",
          iconSizes[size]
        )}
      >
        {/* Isometric 3D Cube R glyph */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5 text-white"
        >
          {/* Cube isometric faces */}
          <path
            d="M16 3L28 9.5V22.5L16 29L4 22.5V9.5L16 3Z"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M16 3L28 9.5L16 16L4 9.5L16 3Z"
            fill="white"
            fillOpacity="0.4"
          />
          <path
            d="M16 16L28 9.5V22.5L16 29V16Z"
            fill="black"
            fillOpacity="0.15"
          />
          {/* Bold R letter in center */}
          <text
            x="16"
            y="21"
            fontSize="14"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
            fill="white"
          >
            R
          </text>
        </svg>
      </div>
      {showText && (
        <span
          className={cn(
            "text-[#202124] tracking-tight font-semibold flex items-center gap-1.5",
            textSizes[size]
          )}
        >
          Runmark
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
