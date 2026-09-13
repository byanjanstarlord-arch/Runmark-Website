import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { FeatureHighlightsSection } from "@/components/home/FeatureHighlightsSection";
import { TerminalDemoSection } from "@/components/home/TerminalDemoSection";
import { PlaygroundPreviewSection } from "@/components/home/PlaygroundPreviewSection";
import { LatestReleaseSection } from "@/components/home/LatestReleaseSection";
import { CommunityCTASection } from "@/components/home/CommunityCTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TechStackSection />
      <ProblemSection />
      <WorkflowSection />
      <FeatureHighlightsSection />
      <TerminalDemoSection />
      <PlaygroundPreviewSection />
      <LatestReleaseSection />
      <CommunityCTASection />
    </div>
  );
}
