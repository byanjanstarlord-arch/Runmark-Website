import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface DocsBreadcrumbsProps {
  group: string;
  title: string;
}

export function DocsBreadcrumbs({ group, title }: DocsBreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-[#77736C] mb-6 font-medium">
      <Link href="/docs" className="hover:text-[#202124] transition-colors">
        Docs
      </Link>
      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
      <span className="text-[#77736C]">{group}</span>
      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
      <span className="text-[#202124] font-semibold">{title}</span>
    </nav>
  );
}
