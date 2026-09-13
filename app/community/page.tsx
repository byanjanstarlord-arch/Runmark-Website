import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  Github, 
  MessageSquare, 
  GitPullRequest, 
  Bug, 
  Sparkles, 
  FileText, 
  Share2, 
  Star 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Community — Join the Runmark Open-Source Movement",
  description: "Connect with developers building the future of reproducible development environments.",
};

export default function CommunityPage() {
  const waysToInvolve = [
    { title: "Report Bugs", desc: "Found an unexpected detector issue or edge case? Open an issue on GitHub.", icon: Bug },
    { title: "Suggest Features", desc: "Have ideas for contract schemas or custom detectors? Start a discussion.", icon: Sparkles },
    { title: "Improve Documentation", desc: "Help make guides, tutorials, and examples clearer for developers.", icon: FileText },
    { title: "Build Plugins", desc: "Create custom detectors for bespoke databases and internal services.", icon: GitPullRequest },
    { title: "Share Your Use Cases", desc: "Tell us how Runmark helped eliminate drift in your team or CI setup.", icon: Share2 },
  ];

  return (
    <div className="py-12 md:py-20 bg-warm-grid min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" size="md">Community & Open Source</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#202124] tracking-tight">
            Community
          </h1>
          <p className="text-base sm:text-xl text-[#77736C]">
            Build together. Grow together. Let&apos;s eliminate &ldquo;works on my machine&rdquo; forever.
          </p>
        </div>

        {/* 3 Core Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* GitHub Card */}
          <div className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-8 shadow-warm-sm flex flex-col justify-between hover:shadow-warm-md transition-all">
            <div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] text-[#202124] w-fit mb-5">
                <Github className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#202124] mb-2.5">GitHub</h3>
              <p className="text-sm text-[#77736C] leading-relaxed mb-6">
                Star the repository, explore source code, inspect schemas, and track active development.
              </p>
            </div>
            <Button href={siteConfig.githubUrl} external variant="secondary" size="md" className="w-full text-sm font-semibold">
              Open on GitHub
            </Button>
          </div>

          {/* Discussions Card */}
          <div className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-8 shadow-warm-sm flex flex-col justify-between hover:shadow-warm-md transition-all">
            <div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] text-[#FF5A1F] w-fit mb-5">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#202124] mb-2.5">Discussions</h3>
              <p className="text-sm text-[#77736C] leading-relaxed mb-6">
                Ask questions, propose ideas, share architecture patterns, and discuss with the community.
              </p>
            </div>
            <Button href={siteConfig.discussionsUrl} external variant="secondary" size="md" className="w-full text-sm font-semibold">
              Join Discussions
            </Button>
          </div>

          {/* Contribute Card */}
          <div className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-8 shadow-warm-sm flex flex-col justify-between hover:shadow-warm-md transition-all">
            <div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] text-[#238636] w-fit mb-5">
                <GitPullRequest className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#202124] mb-2.5">Contribute</h3>
              <p className="text-sm text-[#77736C] leading-relaxed mb-6">
                Help build new detectors, improve performance, write docs, and expand test coverage.
              </p>
            </div>
            <Button href="/docs/contributing/development-setup" variant="primary" size="md" className="w-full text-sm font-semibold">
              Contribution Guide
            </Button>
          </div>

        </div>

        {/* Ways to Get Involved Checklist */}
        <div className="rounded-3xl bg-[#FFFDF9] border border-[#E8E2D9] p-8 sm:p-12 shadow-warm-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124]">
            Ways to get involved
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {waysToInvolve.map((way) => {
              const Icon = way.icon;
              return (
                <div
                  key={way.title}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] flex items-start gap-3.5"
                >
                  <div className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8E2D9] text-[#FF5A1F] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#202124]">{way.title}</h4>
                    <p className="text-xs sm:text-sm text-[#77736C] mt-1 leading-relaxed">{way.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Values Banner */}
        <div className="rounded-3xl bg-[#17191C] text-[#E6EDF3] border border-[#2A2E33] p-8 sm:p-14 shadow-warm-md text-center space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F]">
            Built by Developers, for Developers
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            A growing community of developers.
          </h2>
          <p className="text-base text-[#77736C] max-w-xl mx-auto leading-relaxed">
            Runmark is built in the open. Join us in making development environments more reliable, understandable, and reproducible.
          </p>
          <div className="pt-3 flex justify-center">
            <Button
              href={siteConfig.githubUrl}
              external
              variant="primary"
              size="lg"
              className="text-base font-semibold px-6 py-3"
              leftIcon={<Star className="w-4 h-4 fill-white" />}
            >
              Star on GitHub
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
