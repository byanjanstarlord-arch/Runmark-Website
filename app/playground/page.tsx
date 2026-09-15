import React from "react";
import { Metadata } from "next";
import { PlaygroundClient } from "@/components/playground/PlaygroundClient";

export const metadata: Metadata = {
  title: "Interactive Playground — Environment Drift Simulator",
  description: "Test and simulate development environment drift, fingerprint comparisons, and doctor diagnostics interactively in your browser with Runmark.",
  alternates: {
    canonical: "/playground",
  },
  openGraph: {
    title: "Interactive Playground — Environment Drift Simulator | Runmark",
    description: "Simulate development environment drift and compare snapshots interactively in your browser.",
    url: "/playground",
  },
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
