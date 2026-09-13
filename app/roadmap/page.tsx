import React from "react";
import { Metadata } from "next";
import { roadmapData } from "@/lib/roadmap-data";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Clock, Circle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Roadmap — Runmark Product Vision",
  description: "Explore the development roadmap for Runmark: CI integration, team baselines, custom plugin ecosystem, and cloud dev containers.",
};

export default function RoadmapPage() {
  return (
    <div className="py-12 md:py-20 bg-warm-grid min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <Badge variant="orange" size="md">Future Horizons</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#202124] tracking-tight">
            Roadmap
          </h1>
          <p className="text-base sm:text-lg text-[#77736C]">
            The journey ahead. Built in the open alongside the developer community.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="space-y-8 relative border-l-2 border-[#E8E2D9] ml-4 sm:ml-6 pl-6 sm:pl-8">
          {roadmapData.map((milestone) => (
            <div key={milestone.version} className="relative group">
              
              {/* Timeline Marker Dot */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full border-4 border-[#FAF8F3] ${
                milestone.status === "completed"
                  ? "bg-[#238636]"
                  : milestone.status === "in_progress"
                  ? "bg-[#FF5A1F] animate-pulse"
                  : "bg-[#D8D2C7]"
              }`} />

              {/* Milestone Card */}
              <div className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-6 sm:p-8 shadow-warm-sm hover:border-[#D8D2C7] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E2D9] gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-[#FF5A1F] bg-[#FFF2EC] px-2.5 py-1 rounded-lg border border-[#FFD9CA]">
                      {milestone.version}
                    </span>
                    <h3 className="text-lg font-bold text-[#202124]">
                      {milestone.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#77736C]">
                      {milestone.targetDate}
                    </span>
                    {milestone.status === "completed" && (
                      <Badge variant="success" size="sm">Shipped</Badge>
                    )}
                    {milestone.status === "in_progress" && (
                      <Badge variant="orange" size="sm">In Progress</Badge>
                    )}
                    {milestone.status === "planned" && (
                      <Badge variant="default" size="sm">Planned</Badge>
                    )}
                    {milestone.status === "future" && (
                      <Badge variant="outline" size="sm">Future</Badge>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#77736C] leading-relaxed mb-6">
                  {milestone.description}
                </p>

                {/* Milestone Deliverables */}
                <div className="space-y-3">
                  {milestone.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9] flex items-start gap-3"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#238636] shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#77736C] shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-[#202124]">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#77736C] mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
