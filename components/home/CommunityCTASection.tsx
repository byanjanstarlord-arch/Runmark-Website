import React from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Star, Github, ArrowRight } from "lucide-react";

export function CommunityCTASection() {
  return (
    <section className="py-20 bg-[#FAF8F3] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF8F3] border border-[#E8E2D9] p-10 sm:p-16 shadow-warm-md max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
            Open Source & Community Driven
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
            Build with confidence.
          </h2>

          <p className="text-base sm:text-lg text-[#77736C] max-w-xl mx-auto leading-relaxed">
            Join a growing community of developers eliminating environment discrepancies across teams.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={siteConfig.githubUrl}
              external
              variant="primary"
              size="lg"
              leftIcon={<Star className="w-4 h-4 fill-white" />}
            >
              Star on GitHub
            </Button>
            <Button
              href="/community"
              variant="secondary"
              size="lg"
            >
              Join Community
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
