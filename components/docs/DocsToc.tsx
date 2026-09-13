"use client";

import React, { useEffect, useState } from "react";
import { DocSection } from "@/lib/docs-data";
import { cn } from "@/lib/utils";

interface DocsTocProps {
  headings: DocSection[];
}

export function DocsToc({ headings }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="space-y-3 sticky top-28">
      <h4 className="text-xs font-bold uppercase tracking-wider text-[#202124]">
        On this page
      </h4>
      <ul className="space-y-2 text-xs border-l border-[#E8E2D9] pl-3">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block transition-colors py-0.5",
                  isActive
                    ? "text-[#FF5A1F] font-semibold -ml-[13px] pl-3 border-l-2 border-[#FF5A1F]"
                    : "text-[#77736C] hover:text-[#202124]"
                )}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
