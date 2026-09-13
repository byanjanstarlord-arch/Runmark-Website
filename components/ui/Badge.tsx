import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "orange" | "success" | "warning" | "error" | "neutral" | "outline";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  icon,
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#F3EFE8] text-[#77736C] border border-[#E8E2D9]",
    orange: "bg-[#FFF2EC] text-[#FF5A1F] border border-[#FFD9CA]",
    success: "bg-[#EAF5EA] text-[#238636] border border-[#C6E7C6]",
    warning: "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]",
    error: "bg-[#FEECEB] text-[#D92D20] border border-[#FECDCA]",
    neutral: "bg-[#202124] text-white border border-[#202124]",
    outline: "bg-transparent text-[#77736C] border border-[#E8E2D9]",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 rounded-full font-medium gap-1",
    md: "text-xs px-2.5 py-1 rounded-full font-medium gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center tracking-tight select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
