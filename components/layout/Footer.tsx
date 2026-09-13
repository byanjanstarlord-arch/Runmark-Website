"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/site-config";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================
// RUNMARK CINEMATIC FOOTER
// Cream / Orange / Editorial Theme
// ============================================================

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* ------------------------------------------------------------
   FOOTER BASE
------------------------------------------------------------ */

.runmark-footer {
  --runmark-orange: #ff572f;
  --runmark-cream: #faf8f3;
  --runmark-ink: #202124;
  --runmark-muted: #77736d;

  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;

  overflow: hidden;

  background: var(--runmark-cream);
  color: var(--runmark-ink);
}

/* ------------------------------------------------------------
   AMBIENT BACKGROUND
------------------------------------------------------------ */

.runmark-footer-aurora {
  position: absolute;
  width: 65vw;
  height: 65vw;
  max-width: 900px;
  max-height: 900px;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  background:
    radial-gradient(
      circle,
      rgba(255, 87, 47, 0.13) 0%,
      rgba(255, 190, 130, 0.08) 35%,
      transparent 70%
    );

  filter: blur(60px);
  pointer-events: none;

  animation: runmark-aurora-breathe 12s ease-in-out infinite alternate;
}

@keyframes runmark-aurora-breathe {
  0% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.5;
  }

  50% {
    transform: translate(-48%, -52%) scale(1.05);
    opacity: 0.8;
  }

  100% {
    transform: translate(-52%, -48%) scale(1.15);
    opacity: 0.55;
  }
}

/* ------------------------------------------------------------
   GRID
------------------------------------------------------------ */

.runmark-footer-grid {
  position: absolute;
  inset: 0;

  background-size: 52px 52px;

  background-image:
    linear-gradient(
      to right,
      rgba(32, 33, 36, 0.045) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgba(32, 33, 36, 0.045) 1px,
      transparent 1px
    );

  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );

  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );

  pointer-events: none;
}

/* ------------------------------------------------------------
   GIANT BACKGROUND TEXT
------------------------------------------------------------ */

.runmark-footer-giant-text {
  position: absolute;

  left: 50%;
  bottom: -4vh;

  transform: translateX(-50%);

  font-size: clamp(90px, 19vw, 360px);

  line-height: 0.78;

  font-weight: 800;

  letter-spacing: -0.08em;

  white-space: nowrap;

  color: transparent;

  -webkit-text-stroke: 1px rgba(32, 33, 36, 0.075);

  background: linear-gradient(
    180deg,
    rgba(32, 33, 36, 0.08),
    transparent 70%
  );

  -webkit-background-clip: text;
  background-clip: text;

  pointer-events: none;
  user-select: none;
  will-change: transform, opacity;
}

/* ------------------------------------------------------------
   MARQUEE
------------------------------------------------------------ */

.runmark-footer-marquee {
  position: absolute;

  top: 72px;
  left: -5%;

  width: 110%;

  transform: rotate(-2deg);

  overflow: hidden;

  border-top: 1px solid rgba(32, 33, 36, 0.09);
  border-bottom: 1px solid rgba(32, 33, 36, 0.09);

  background: rgba(250, 248, 243, 0.72);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  padding: 14px 0;

  z-index: 10;
}

.runmark-footer-marquee-track {
  display: flex;
  width: max-content;

  animation: runmark-marquee 36s linear infinite;
}

.runmark-footer-marquee-group {
  display: flex;
  align-items: center;
  gap: 34px;

  padding-right: 34px;

  white-space: nowrap;

  font-family: 'DM Mono', monospace;

  font-size: 11px;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  color: rgba(32, 33, 36, 0.6);
}

.runmark-footer-marquee-dot {
  color: var(--runmark-orange);
}

@keyframes runmark-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

/* ------------------------------------------------------------
   GLASS PILL
------------------------------------------------------------ */

.runmark-footer-pill {
  background: rgba(255, 255, 255, 0.48);

  border: 1px solid rgba(32, 33, 36, 0.10);

  box-shadow:
    0 8px 28px rgba(32, 33, 36, 0.035),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.runmark-footer-pill:hover {
  background: rgba(255, 255, 255, 0.85);

  border-color: rgba(255, 87, 47, 0.35);

  box-shadow:
    0 14px 35px rgba(32, 33, 36, 0.07),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

/* ------------------------------------------------------------
   ORANGE BUTTON
------------------------------------------------------------ */

.runmark-footer-orange-button {
  background: var(--runmark-orange);

  color: white;

  border: 1px solid var(--runmark-orange);

  box-shadow:
    0 8px 20px rgba(255, 87, 47, 0.16);

  transition:
    background 0.3s ease,
    box-shadow 0.3s ease;
}

.runmark-footer-orange-button:hover {
  background: #f04b27;

  box-shadow:
    0 14px 30px rgba(255, 87, 47, 0.25);
}

/* ------------------------------------------------------------
   ANIMATED RUNMARK ICON
------------------------------------------------------------ */

.runmark-footer-icon {
  position: relative;

  display: flex;

  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;

  border-radius: 14px;

  background: rgba(255, 255, 255, 0.88);

  border: 1px solid rgba(255, 87, 47, 0.22);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow:
    0 8px 20px rgba(32, 33, 36, 0.05),
    0 0 16px rgba(255, 87, 47, 0.12);

  animation: runmark-icon-float 5s ease-in-out infinite;
}

@keyframes runmark-icon-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-4px) rotate(1deg);
  }
}

/* ------------------------------------------------------------
   STATUS DOT
------------------------------------------------------------ */

.runmark-footer-status-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #27a85b;

  box-shadow:
    0 0 0 4px rgba(39, 168, 91, 0.10);

  animation: runmark-status-pulse 2.5s ease-in-out infinite;
}

@keyframes runmark-status-pulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.15);
  }
}

/* ------------------------------------------------------------
   BACK TO TOP
------------------------------------------------------------ */

.runmark-footer-top-button {
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.runmark-footer-top-button:hover {
  transform: translateY(-4px);
}

/* ------------------------------------------------------------
   ACCESSIBILITY
------------------------------------------------------------ */

@media (prefers-reduced-motion: reduce) {
  .runmark-footer *,
  .runmark-footer *::before,
  .runmark-footer *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ------------------------------------------------------------
   MOBILE
------------------------------------------------------------ */

@media (max-width: 768px) {
  .runmark-footer-marquee {
    top: 48px;
  }

  .runmark-footer-giant-text {
    bottom: 2vh;
  }
}
`;

// ============================================================
// MAGNETIC BUTTON
// ============================================================

type MagneticButtonProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
};

const MagneticButton = React.forwardRef<
  HTMLElement,
  MagneticButtonProps
>(({ className = "", children, as: Component = "button", ...props }, forwardedRef) => {
  const localRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = localRef.current;

    if (!element) return;

    // Disable magnetic movement on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);

      gsap.to(element, {
        x: x * 0.18,
        y: y * 0.18,
        rotationX: -y * 0.04,
        rotationY: x * 0.04,
        scale: 1.025,
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.35)",
        overwrite: true,
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);

      gsap.killTweensOf(element);
    };
  }, []);

  const Tag = Component as any;

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        (localRef as React.MutableRefObject<HTMLElement | null>).current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLElement | null>).current =
            node;
        }
      }}
      className={`cursor-pointer will-change-transform ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
});

MagneticButton.displayName = "MagneticButton";

// ============================================================
// MARQUEE CONTENT
// ============================================================

const MarqueeGroup = () => (
  <div className="runmark-footer-marquee-group">
    <span>Environment Contracts</span>
    <span className="runmark-footer-marquee-dot">✦</span>

    <span>Deterministic Builds</span>
    <span className="runmark-footer-marquee-dot">✦</span>

    <span>Developer First</span>
    <span className="runmark-footer-marquee-dot">✦</span>

    <span>Know What Makes Your Code Run</span>
    <span className="runmark-footer-marquee-dot">✦</span>

    <span>Open Source</span>
    <span className="runmark-footer-marquee-dot">✦</span>
  </div>
);

// ============================================================
// MAIN FOOTER
// ============================================================

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { lenis } = useSmoothScroll();

  useEffect(() => {
    // 1. Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(
        [
          giantTextRef.current,
          badgeRef.current,
          headingRef.current,
          subtitleRef.current,
          contentRef.current,
        ].filter(Boolean),
        {
          opacity: 1,
          y: 0,
          scale: 1,
        }
      );
      return;
    }

    const isMobile = window.innerWidth < 768;
    // On desktop, the trigger is the spacer wrapperRef; on mobile, it's the footer itself
    const triggerEl = (!isMobile && wrapperRef.current) ? wrapperRef.current : footerRef.current;
    if (!triggerEl) return;

    const ctx = gsap.context(() => {
      // ------------------------------------------------------
      // GIANT TEXT PARALLAX REVEAL (Scrubbed with curtain pull)
      // ------------------------------------------------------
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          {
            y: "14vh",
            scale: 0.85,
            opacity: 0.25,
          },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl,
              start: isMobile ? "top 95%" : "top bottom",
              end: isMobile ? "bottom 90%" : "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      // ------------------------------------------------------
      // FOREGROUND CONTENT REVEAL (Play smoothly & stay visible!)
      // ------------------------------------------------------
      const contentElements = [
        badgeRef.current,
        headingRef.current,
        subtitleRef.current,
        contentRef.current,
      ].filter(Boolean);

      // Create standalone timeline for content reveal
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        contentElements,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          clearProps: "transform",
        }
      );

      // Trigger reveal with ScrollTrigger
      ScrollTrigger.create({
        trigger: triggerEl,
        start: isMobile ? "top 80%" : "top 70%",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
      });

      // ------------------------------------------------------
      // INTERSECTION OBSERVER SAFETY NET
      // Guarantees 100% reliability if ScrollTrigger metrics ever desync
      // ------------------------------------------------------
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
              tl.play();
            }
          });
        },
        { threshold: [0, 0.2, 0.5] }
      );

      if (footerRef.current) {
        observer.observe(footerRef.current);
      }
      if (wrapperRef.current) {
        observer.observe(wrapperRef.current);
      }

      return () => {
        observer.disconnect();
      };
    });

    // ------------------------------------------------------
    // MULTI-STAGE REFRESH (Fonts, dynamic content, and Lenis)
    // ------------------------------------------------------
    ScrollTrigger.refresh();

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 800);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Desktop Curtain Spacer: pushes the scroll height so the fixed footer is revealed underneath */}
      <div
        ref={wrapperRef}
        className="hidden md:block relative w-full h-screen pointer-events-none"
        aria-hidden="true"
      />

      {/* Footer Element */}
      <footer
        ref={footerRef}
        className="runmark-footer relative z-10 md:fixed md:bottom-0 md:left-0 md:z-0 flex min-h-screen md:h-screen w-full flex-col justify-between overflow-hidden"
      >

        {/* ==================================================
            AMBIENT BACKGROUND
        ================================================== */}

        <div className="runmark-footer-aurora" />

        <div className="runmark-footer-grid" />

        {/* ==================================================
            GIANT RUNMARK TEXT
        ================================================== */}

        <div
          ref={giantTextRef}
          className="runmark-footer-giant-text"
        >
          RUNMARK
        </div>

        {/* ==================================================
            MOVING MARQUEE
        ================================================== */}

        <div className="runmark-footer-marquee">
          <div className="runmark-footer-marquee-track">
            <MarqueeGroup />
            <MarqueeGroup />
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </div>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pt-28 md:pt-24 text-center">

          <div
            ref={badgeRef}
            className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "#ff572f" }}
          >
            <span className="runmark-footer-status-dot" />

            Open source & community driven
          </div>

          <h2
            ref={headingRef}
            className="mb-7 font-black tracking-[-0.055em]"
            style={{
              fontSize: "clamp(44px, 6vw, 92px)",
              lineHeight: 1.05,
            }}
          >
            Build with
            <br />

            <span style={{ color: "#ff572f" }}>
              confidence.
            </span>
          </h2>

          <p
            ref={subtitleRef}
            className="mb-10 max-w-2xl leading-relaxed"
            style={{
              color: "#77736d",
              fontSize: "clamp(16px, 1.4vw, 20px)",
            }}
          >
            Git tracks your code.
            <br className="hidden sm:block" />

            Runmark tracks what makes your code run.
          </p>

          {/* ==================================================
              BUTTONS
          ================================================== */}

          <div
            ref={contentRef}
            className="flex flex-wrap justify-center gap-4"
          >
            <MagneticButton
              as="a"
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="runmark-footer-orange-button flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold md:px-10 md:py-5 md:text-base"
            >
              Star on GitHub

              <span className="text-lg">↗</span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="/docs/getting-started/introduction"
              className="runmark-footer-pill flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold md:px-10 md:py-5 md:text-base"
            >
              Read Documentation

              <span className="text-lg">→</span>
            </MagneticButton>
          </div>

        </div>

        {/* ==================================================
            BOTTOM FOOTER BAR
        ================================================== */}

        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">

          {/* BRAND */}

          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="runmark-footer-icon p-1.5 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-icon.png"
                alt="Runmark"
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>

            <div className="text-left">
              <div className="text-lg font-extrabold tracking-tight text-[#202124] group-hover:text-[#ff572f] transition-colors">
                Runmark
              </div>

              <div
                className="text-xs"
                style={{ color: "#77736d" }}
              >
                Know what makes your code run.
              </div>
            </div>
          </Link>

          {/* LINKS */}

          <div className="flex flex-wrap justify-center gap-5 text-sm font-medium md:gap-7">
            <a
              href="/features"
              className="transition-opacity hover:opacity-60"
            >
              Features
            </a>

            <a
              href="/docs/getting-started/introduction"
              className="transition-opacity hover:opacity-60"
            >
              Docs
            </a>

            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-60"
            >
              GitHub ↗
            </a>
          </div>

          {/* COPYRIGHT + TOP */}

          <div className="flex items-center gap-5">

            <span
              className="text-xs"
              style={{ color: "#77736d" }}
            >
              © 2026 Runmark
            </span>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="runmark-footer-pill runmark-footer-top-button flex h-11 w-11 items-center justify-center rounded-full"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </MagneticButton>

          </div>

        </div>

      </footer>
    </>
  );
}

export const Footer = CinematicFooter;
