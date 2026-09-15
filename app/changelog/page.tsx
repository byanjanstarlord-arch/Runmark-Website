import React from "react";
import { Metadata } from "next";
import { ChangelogClient } from "@/components/changelog/ChangelogClient";

export const metadata: Metadata = {
  title: "Changelog & Release Notes — Runmark",
  description: "Track all release history, new CLI features, bug fixes, and improvements for Runmark development environment observability.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "Changelog & Release Notes — Runmark",
    description: "Track all release history, new CLI features, bug fixes, and improvements for Runmark.",
    url: "/changelog",
  },
};

export default function ChangelogPage() {
  return <ChangelogClient />;
}
