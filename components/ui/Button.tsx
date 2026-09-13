import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "terminal";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  external,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-[#FF5A1F] text-white hover:bg-[#E94D17] shadow-sm hover:shadow-warm-md border border-[#FF5A1F]",
    secondary:
      "bg-[#FFFDF9] text-[#202124] hover:bg-white hover:border-[#D8D2C7] border border-[#E8E2D9] shadow-warm-sm",
    outline:
      "bg-transparent text-[#202124] hover:bg-[#F3EFE8] border border-[#E8E2D9]",
    ghost:
      "bg-transparent text-[#202124] hover:bg-[#F3EFE8] hover:text-[#202124]",
    terminal:
      "bg-[#17191C] text-[#E6EDF3] hover:bg-[#202428] border border-[#2A2E33] shadow-warm-sm",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-5 py-3 gap-2.5 font-semibold",
  };

  const combinedClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
        >
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
