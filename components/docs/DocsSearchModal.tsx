"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { docArticles } from "@/lib/docs-data";

interface DocsSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocsSearchModal({ isOpen, onClose }: DocsSearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim() === "" ? [] : Object.entries(docArticles).filter(([key, article]) => {
    const q = query.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.description.toLowerCase().includes(q) ||
      article.markdownContent.toLowerCase().includes(q) ||
      article.group.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#202124]/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl shadow-warm-xl max-w-2xl w-full overflow-hidden animate-fade-in">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-[#E8E2D9] gap-3.5">
          <Search className="w-5 h-5 text-[#77736C]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation, commands, concepts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-transparent text-base text-[#202124] placeholder-[#77736C] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#77736C] hover:text-[#202124] rounded-lg hover:bg-[#FAF8F3]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {query.trim() === "" ? (
            <div className="text-center py-10 text-sm text-[#77736C]">
              Type a command like <code className="font-bold text-[#202124] bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#E8E2D9]">runmark scan</code> or concept like <code className="font-bold text-[#202124] bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#E8E2D9]">drift</code>...
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-sm text-[#77736C]">
              No documentation found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map(([key, article]) => (
              <Link
                key={key}
                href={`/docs/${key}`}
                onClick={onClose}
                className="flex items-start justify-between p-4 rounded-2xl bg-[#FAF8F3] hover:bg-[#FFF2EC] border border-[#E8E2D9] hover:border-[#FFD9CA] transition-all group"
              >
                <div className="space-y-1.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold text-[#FF5A1F] bg-[#FFF2EC] px-2 py-0.5 rounded-full border border-[#FFD9CA]">
                      {article.group}
                    </span>
                    <h5 className="text-sm sm:text-base font-bold text-[#202124] group-hover:text-[#FF5A1F] transition-colors">
                      {article.title}
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-[#77736C] line-clamp-1">
                    {article.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#77736C] group-hover:text-[#FF5A1F] shrink-0 mt-1 transition-colors" />
              </Link>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#FAF8F3] border-t border-[#E8E2D9] flex items-center justify-between text-xs text-[#77736C]">
          <span>Press <kbd className="font-mono bg-[#FFFDF9] border border-[#E8E2D9] px-1 rounded">ESC</kbd> to close</span>
          <span>{results.length} result(s) found</span>
        </div>
      </div>
    </div>
  );
}
