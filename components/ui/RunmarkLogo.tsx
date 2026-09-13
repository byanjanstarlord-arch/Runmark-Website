import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface RunmarkLogoProps {
  className?: string;
  showText?: boolean;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string | null;
  priority?: boolean;
}

// Proportional dimensions based on original 2152x731 (approx 2.94:1 ratio)
const SIZES = {
  sm: {
    full: { width: 100, height: 34 },
    icon: { width: 28, height: 28 },
  },
  md: {
    full: { width: 124, height: 42 },
    icon: { width: 36, height: 36 },
  },
  lg: {
    full: { width: 165, height: 56 },
    icon: { width: 48, height: 48 },
  },
  xl: {
    full: { width: 220, height: 75 },
    icon: { width: 64, height: 64 },
  },
};

export function RunmarkLogo({
  className,
  showText = true,
  iconOnly = false,
  size = "md",
  href = "/",
  priority = true,
}: RunmarkLogoProps) {
  const isIcon = iconOnly || !showText;
  const config = SIZES[size][isIcon ? "icon" : "full"];

  const content = (
    <div
      className={cn(
        "inline-flex items-center select-none group transition-transform duration-200 hover:opacity-95 active:scale-[0.98]",
        className
      )}
    >
      {isIcon ? (
        <Image
          src="/images/logo-icon.png"
          alt="Runmark"
          width={config.width}
          height={config.height}
          priority={priority}
          className="object-contain h-auto"
        />
      ) : (
        <Image
          src="/images/logo-runmark.png"
          alt="Runmark — Know what makes your code run"
          width={config.width}
          height={config.height}
          priority={priority}
          className="object-contain h-auto"
        />
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
