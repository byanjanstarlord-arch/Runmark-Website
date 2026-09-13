import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "warm" | "terminal" | "interactive";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm",
    warm: "bg-[#FAF8F3] border border-[#E8E2D9]",
    terminal: "bg-[#17191C] border border-[#2A2E33] text-[#E6EDF3] shadow-warm-md",
    interactive:
      "bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm hover:shadow-warm-md hover:border-[#D8D2C7] transition-all duration-200",
  };

  return (
    <div
      className={cn("rounded-2xl p-6 relative", variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
