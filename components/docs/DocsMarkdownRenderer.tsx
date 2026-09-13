"use client";

import React from "react";
import { DocsCodeBlock } from "./DocsCodeBlock";

interface DocsMarkdownRendererProps {
  content: string;
}

export function DocsMarkdownRenderer({ content }: DocsMarkdownRendererProps) {
  // Robust markdown parser with clean typography and spacing
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let codeBlockBuffer: string[] = [];
  let isCodeBlock = false;
  let codeLanguage = "";
  let tableBuffer: string[] = [];
  let isTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check code blocks
    if (line.startsWith("```")) {
      if (isCodeBlock) {
        // End of code block
        elements.push(
          <DocsCodeBlock
            key={`code-${i}`}
            code={codeBlockBuffer.join("\n")}
            language={codeLanguage || "text"}
          />
        );
        codeBlockBuffer = [];
        isCodeBlock = false;
        codeLanguage = "";
      } else {
        // Start of code block
        isCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (isCodeBlock) {
      codeBlockBuffer.push(line);
      continue;
    }

    // Check tables
    if (line.includes("|") && line.trim().startsWith("|")) {
      isTable = true;
      tableBuffer.push(line);
      continue;
    } else if (isTable) {
      // End of table
      elements.push(renderTable(tableBuffer, `table-${i}`));
      tableBuffer = [];
      isTable = false;
    }

    // Check horizontal rule
    if (line.trim() === "---") {
      elements.push(<hr key={`hr-${i}`} className="my-10 border-[#E8E2D9]" />);
      continue;
    }

    // Headings
    if (line.startsWith("# ")) {
      const title = line.slice(2).trim();
      elements.push(
        <h1 key={`h1-${i}`} className="text-3xl sm:text-5xl font-extrabold text-[#202124] tracking-tight mb-6 mt-2">
          {title}
        </h1>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      const title = line.slice(4).trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      elements.push(
        <h3 key={`h3-${i}`} id={id} className="text-xl sm:text-2xl font-bold text-[#202124] mt-10 mb-3.5 scroll-mt-24">
          {title}
        </h3>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      elements.push(
        <h2 key={`h2-${i}`} id={id} className="text-2xl sm:text-3xl font-bold text-[#202124] mt-12 mb-5 pb-2 border-b border-[#E8E2D9] scroll-mt-24">
          {title}
        </h2>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={`quote-${i}`} className="border-l-4 border-[#FF5A1F] bg-[#FFF2EC] p-5 my-6 rounded-r-2xl text-base text-[#202124] italic leading-relaxed">
          {line.slice(2)}
        </blockquote>
      );
      continue;
    }

    // List items
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      elements.push(
        <li key={`li-${i}`} className="text-base text-[#202124] ml-6 list-disc mb-2 leading-relaxed">
          {parseInlineFormatting(line.trim().slice(2))}
        </li>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      continue;
    }

    // Paragraph
    elements.push(
      <p key={`p-${i}`} className="text-base text-[#77736C] leading-relaxed my-4">
        {parseInlineFormatting(line)}
      </p>
    );
  }

  // Flush remaining table if file ends with table
  if (isTable && tableBuffer.length > 0) {
    elements.push(renderTable(tableBuffer, "table-end"));
  }

  return <div className="docs-content space-y-2">{elements}</div>;
}

function parseInlineFormatting(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="px-2 py-0.5 rounded-md bg-[#FAF8F3] border border-[#E8E2D9] font-mono text-xs sm:text-sm text-[#202124] font-semibold">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-[#202124]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]} className="text-[#FF5A1F] hover:underline font-semibold">
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

function renderTable(tableLines: string[], key: string) {
  if (tableLines.length < 2) return null;
  const header = tableLines[0].split("|").map(s => s.trim()).filter(Boolean);
  const rows = tableLines.slice(2).map(line => line.split("|").map(s => s.trim()).filter(Boolean));

  return (
    <div key={key} className="overflow-x-auto my-8 rounded-2xl border border-[#E8E2D9] bg-[#FFFDF9] shadow-warm-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#FAF8F3] border-b border-[#E8E2D9] text-[#202124] font-bold">
          <tr>
            {header.map((h, i) => (
              <th key={i} className="p-3.5 font-bold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8E2D9]">
          {rows.map((row, rIndex) => (
            <tr key={rIndex} className="hover:bg-[#FAF8F3]/60 transition-colors">
              {row.map((cell, cIndex) => (
                <td key={cIndex} className="p-3.5 text-[#202124]">
                  {parseInlineFormatting(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
