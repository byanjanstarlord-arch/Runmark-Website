import React from "react";
import { Metadata } from "next";
import { ContactClient } from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact & Support — Connect with the Runmark Team",
  description: "Get in touch with the Runmark maintainers for bug reports, feature suggestions, or developer inquiries. Built for the open-source community.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Support — Runmark",
    description: "Get in touch with the Runmark maintainers for bug reports, feature suggestions, or developer inquiries.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
