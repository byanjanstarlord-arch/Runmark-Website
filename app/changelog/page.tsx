"use client";

import React, { useState } from "react";
import Link from "next/link";
import { changelogData } from "@/lib/changelog-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GitCommit, ExternalLink, ArrowRight, Sparkles, Tag } from "lucide-react";

export default function ChangelogPage() {
  const [filter, setFilter] = useState<"all" | "Stable" | "Beta" | "Alpha">("all");

  const filteredReleases = filter === "all"
    ? changelogData
    : changelogData.filter((r) => r.tag === filter || (filter === "Stable" && r.tag === "Latest"));

  return (
    <div className="py-12 md:py-20 bg-warm-grid min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <Badge variant="orange" size="md">Release History</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#202124] tracking-tight">
            Changelog
          </h1>
          <p className="text-base sm:text-lg text-[#77736C]">
            Track the continuous evolution, features, and fixes across Runmark releases.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {(["all", "Stable", "Beta", "Alpha"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === tab
                  ? "bg-[#202124] text-white shadow-warm-sm"
                  : "bg-[#FFFDF9] text-[#77736C] border border-[#E8E2D9] hover:text-[#202124]"
              }`}
            >
              {tab === "all" ? "All Releases" : tab}
            </button>
          ))}
        </div>

        {/* Release Timeline Cards */}
        <div className="space-y-8 relative">
          {filteredReleases.map((release, idx) => (
            <div
              key={release.version}
              className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-6 sm:p-8 shadow-warm-sm relative hover:border-[#D8D2C7] transition-all"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E2D9] gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FFF2EC] text-[#FF5A1F] font-mono font-bold text-sm">
                    {release.version}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-[#202124]">
                        {release.title}
                      </h3>
                      {release.isLatest && (
                        <Badge variant="orange" size="sm">Latest</Badge>
                      )}
                    </div>
                    <p className="text-xs text-[#77736C] font-mono mt-0.5">
                      Released on {release.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {release.docsUrl && (
                    <Button href={release.docsUrl} variant="secondary" size="sm">
                      Read Docs
                    </Button>
                  )}
                  <Button
                    href={release.githubUrl}
                    external
                    variant="outline"
                    size="sm"
                    rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    View Release
                  </Button>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-[#77736C] mb-6 leading-relaxed">
                {release.summary}
              </p>

              {/* Categorized Sections */}
              <div className="space-y-4">
                {release.sections.map((section) => (
                  <div key={section.category} className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#202124] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                      <span>{section.category}</span>
                    </h4>
                    <ul className="space-y-1.5 ml-4">
                      {section.items.map((item, iIndex) => (
                        <li key={iIndex} className="text-xs text-[#77736C] list-disc leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
