import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docGroups, docArticles } from "@/lib/docs-data";

interface DocsPrevNextProps {
  currentSlug: string;
}

export function DocsPrevNext({ currentSlug }: DocsPrevNextProps) {
  // Flatten all items
  const allItems: { title: string; slug: string }[] = [];
  docGroups.forEach((group) => {
    group.items.forEach((item) => {
      allItems.push({ title: item.title, slug: item.slug });
    });
  });

  const currentIndex = allItems.findIndex((item) => item.slug === currentSlug);
  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-[#E8E2D9] grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex flex-col p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] hover:border-[#D8D2C7] transition-all shadow-warm-sm"
        >
          <div className="flex items-center gap-1 text-xs text-[#77736C] mb-1">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Previous</span>
          </div>
          <span className="text-sm font-semibold text-[#202124] group-hover:text-[#FF5A1F] transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex flex-col items-end text-right p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] hover:border-[#D8D2C7] transition-all shadow-warm-sm"
        >
          <div className="flex items-center gap-1 text-xs text-[#77736C] mb-1">
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="text-sm font-semibold text-[#202124] group-hover:text-[#FF5A1F] transition-colors">
            {next.title}
          </span>
        </Link>
      ) : <div />}
    </div>
  );
}
