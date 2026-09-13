import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docGroups } from "@/lib/docs-data";

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
          className="group flex flex-col p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] hover:border-[#D8D2C7] hover:bg-[#FFFDF9] transition-all shadow-warm-sm"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#77736C] mb-1.5">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-[#FF5A1F]" />
            <span>Previous</span>
          </div>
          <span className="text-base font-bold text-[#202124] group-hover:text-[#FF5A1F] transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex flex-col items-end text-right p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] hover:border-[#D8D2C7] hover:bg-[#FFFDF9] transition-all shadow-warm-sm"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#77736C] mb-1.5">
            <span>Next</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-[#FF5A1F]" />
          </div>
          <span className="text-base font-bold text-[#202124] group-hover:text-[#FF5A1F] transition-colors">
            {next.title}
          </span>
        </Link>
      ) : <div />}
    </div>
  );
}
