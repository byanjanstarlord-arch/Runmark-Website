"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface DocsCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function DocsCodeBlock({ code, language = "bash", filename }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-[#17191C] border border-[#2A2E33] my-6 overflow-hidden shadow-warm-md font-mono text-xs sm:text-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-[#111315] border-b border-[#2A2E33]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          {filename && (
            <span className="text-xs text-[#77736C] font-mono ml-2">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#77736C] uppercase font-semibold">{language}</span>
          <button
            onClick={handleCopy}
            className="text-[#77736C] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#2A2E33]"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#238636]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      <pre className="p-5 text-[#E6EDF3] overflow-x-auto whitespace-pre leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
