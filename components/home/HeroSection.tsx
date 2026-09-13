"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroInteractiveCard } from "@/components/home/HeroInteractiveCard";
import { gsap } from "gsap";
import { 
  Copy, 
  Check, 
  ArrowRight, 
  CheckCircle2
} from "lucide-react";

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      // 1. "Your code runs somewhere." appears smoothly with gentle stagger
      tl.fromTo(
        ".hero-word-black",
        {
          opacity: 0,
          y: 26,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.08,
        }
      )
      // 2. Then: "Make sure it runs"
      .fromTo(
        ".hero-word-orange-lead",
        {
          opacity: 0,
          y: 26,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.08,
        },
        "+=0.1"
      )
      // 3. Then: "everywhere." - orange climax with subtle spring emphasis
      .fromTo(
        ".hero-word-orange-accent",
        {
          opacity: 0,
          y: 30,
          scale: 0.92,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "back.out(1.5)",
        },
        "+=0.15"
      );
    }, headlineRef);

    return () => ctx.revert();
  }, []);

  const copyCommand = () => {
    navigator.clipboard.writeText(siteConfig.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-warm-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2">
              <Link href="/changelog">
                <Badge variant="orange" size="md" className="cursor-pointer hover:bg-[#FFE6DC] transition-colors py-1 px-3.5 text-xs sm:text-sm font-semibold">
                  <span className="font-bold">v{siteConfig.version}</span>
                  <span className="text-[#202124] ml-1.5 font-medium">Now with Environment Contracts</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 inline-block" />
                </Badge>
              </Link>
            </div>

            {/* Main Headline */}
            <h1 
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.14] text-[#202124]"
            >
              <span className="block">
                <span className="hero-word-black inline-block">Your</span>{" "}
                <span className="hero-word-black inline-block">code</span>{" "}
                <span className="hero-word-black inline-block">runs</span>{" "}
                <span className="hero-word-black inline-block">somewhere.</span>
              </span>
              <span className="block text-[#FF5A1F] mt-1 sm:mt-1.5">
                <span className="hero-word-orange-lead inline-block">Make</span>{" "}
                <span className="hero-word-orange-lead inline-block">sure</span>{" "}
                <span className="hero-word-orange-lead inline-block">it</span>{" "}
                <span className="hero-word-orange-lead inline-block">runs</span>{" "}
                <span className="hero-word-orange-accent inline-block relative">
                  everywhere.
                </span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#77736C] max-w-2xl leading-relaxed font-normal">
              Runmark helps you understand, snapshot, compare, and verify the environment your code depends on.
            </p>

            {/* CTAs and Install Pill */}
            <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                href="/docs/getting-started/introduction"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="text-base font-semibold px-6 py-3"
              >
                Get Started
              </Button>
              <Button
                href={siteConfig.githubUrl}
                external
                variant="secondary"
                size="lg"
                className="text-base font-medium px-6 py-3"
              >
                View on GitHub
              </Button>
            </div>

            {/* Copyable CLI Command Pill */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <button
                onClick={copyCommand}
                className="group flex items-center gap-3.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-[#121316] border-2 border-[#2A2E33] hover:border-[#FF5A1F] text-base sm:text-lg md:text-xl text-[#F0F6FC] font-mono hover:bg-[#181B20] transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-[#FF5A1F]/15 cursor-pointer active:scale-[0.99]"
                title="Click to copy install command"
              >
                <span className="text-[#FF5A1F] select-none font-bold text-lg sm:text-xl md:text-2xl">$</span>
                <span className="text-[#F0F6FC] font-semibold tracking-wide">{siteConfig.installCommand}</span>
                <span className="text-[#8B949E] group-hover:text-white transition-all ml-2 sm:ml-3 p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 group-hover:scale-105">
                  {copied ? (
                    <Check className="w-5 h-5 text-[#3FB950]" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </span>
              </button>
              {copied && (
                <span className="text-sm sm:text-base text-[#3FB950] font-medium flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> Copied to clipboard!
                </span>
              )}
            </div>
          </div>

          {/* Right Hero Visual — Interactive Living Environment Intelligence Card */}
          <div className="lg:col-span-5 relative flex justify-center py-6 lg:py-0">
            <HeroInteractiveCard />
          </div>
        </div>
      </div>
    </section>
  );
}
