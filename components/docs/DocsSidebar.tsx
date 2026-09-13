"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docGroups } from "@/lib/docs-data";
import { cn } from "@/lib/utils";
import { DocsSearchModal } from "./DocsSearchModal";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

export function DocsSidebar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <aside className="w-full md:w-64 shrink-0 space-y-6">
        
        {/* Search Trigger Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#FFFDF9] border border-[#E8E2D9] text-xs text-[#77736C] hover:border-[#D8D2C7] transition-all shadow-warm-sm"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search docs...</span>
          </span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#FAF8F3] border border-[#E8E2D9] rounded">
            ⌘K
          </kbd>
        </button>

        {/* Navigation Groups */}
        <nav className="space-y-6">
          {docGroups.map((group) => {
            const isGroupCollapsed = collapsed[group.id];
            return (
              <div key={group.id} className="space-y-1.5">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#202124] py-1 px-1 hover:text-[#FF5A1F] transition-colors text-left"
                >
                  <span>{group.title}</span>
                  {isGroupCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 text-[#77736C]" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#77736C]" />
                  )}
                </button>

                {!isGroupCollapsed && (
                  <ul className="space-y-0.5 border-l border-[#E8E2D9] ml-1 pl-2.5">
                    {group.items.map((item) => {
                      const itemUrl = `/docs/${item.slug}`;
                      const isActive = pathname === itemUrl;
                      return (
                        <li key={item.slug}>
                          <Link
                            href={itemUrl}
                            className={cn(
                              "block px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between",
                              isActive
                                ? "bg-[#FFF2EC] text-[#FF5A1F] font-semibold border border-[#FFD9CA]"
                                : "text-[#77736C] hover:text-[#202124] hover:bg-[#F3EFE8]"
                            )}
                          >
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="text-[9px] bg-[#FF5A1F] text-white px-1.5 py-0.2 rounded-full font-bold">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <DocsSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
