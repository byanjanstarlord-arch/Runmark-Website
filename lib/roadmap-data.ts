export interface RoadmapMilestone {
  version: string;
  targetDate: string;
  title: string;
  status: "completed" | "in_progress" | "planned" | "future";
  description: string;
  category: "Foundation" | "Contracts" | "CI Integration" | "Team Workflows" | "Ecosystem" | "Cloud";
  items: {
    title: string;
    description: string;
    completed?: boolean;
  }[];
}

export const roadmapData: RoadmapMilestone[] = [
  {
    version: "v0.1.0 – v0.2.2",
    targetDate: "Shipped",
    title: "Foundation & Environment Contracts",
    status: "completed",
    category: "Foundation",
    description: "Core CLI, deterministic fingerprinting, atomic local snapshotting, secret redaction, evidence-driven contract synthesis, and semantic diffing.",
    items: [
      { title: "Local-First Architecture", description: "Zero-telemetry, offline-first execution with atomic .runmark storage", completed: true },
      { title: "Deterministic Fingerprinting", description: "SHA-256 canonical hashing of platform, runtimes, and dependencies", completed: true },
      { title: "Zero-Secret Guarantee", description: "Multi-pattern credential redactor and pre-export canary security scanner", completed: true },
      { title: "Environment Contracts (runmark.json)", description: "Evidence-driven contract synthesis and runmark check verification", completed: true }
    ]
  },
  {
    version: "v0.3.0",
    targetDate: "Q4 2026",
    title: "CI Integration & Automation",
    status: "in_progress",
    category: "CI Integration",
    description: "First-class integration with GitHub Actions, GitLab CI, and container runners to ensure build reproducibility.",
    items: [
      { title: "Official GitHub Action", description: "runmark/action for automated PR contract checking and drift alerts" },
      { title: "PR Drift Comments", description: "Automated Markdown diff summaries posted directly to Pull Requests" },
      { title: "Status Checks & Gating", description: "Block deployments when runtime or service contracts are violated" }
    ]
  },
  {
    version: "v0.4.0",
    targetDate: "Q1 2027",
    title: "Team Workflows & Shared Baselines",
    status: "planned",
    category: "Team Workflows",
    description: "Seamless synchronization of verified team baselines and onboarding templates across engineering teams.",
    items: [
      { title: "Team Baseline Profiles", description: "Share and enforce standard developer environment baselines across teams" },
      { title: "Onboarding Templates", description: "One-command verification for new hire developer machines" },
      { title: "Organization Policies", description: "Company-wide security and runtime minimum version standards" }
    ]
  },
  {
    version: "v0.5.0",
    targetDate: "Q2 2027",
    title: "Ecosystem & Plugin Architecture",
    status: "planned",
    category: "Ecosystem",
    description: "Community and third-party plugin system allowing custom detectors for specialized databases, message brokers, and cloud emulators.",
    items: [
      { title: "Plugin SDK", description: "Lightweight Python/WASM interface for implementing custom Detector classes" },
      { title: "Community Registry", description: "Curated registry of community-maintained detector modules" },
      { title: "Custom Remediation Rules", description: "Configurable doctor remediation runbooks for enterprise tech stacks" }
    ]
  },
  {
    version: "v0.6.0",
    targetDate: "Q3 2027",
    title: "Cloud & Remote Development Environments",
    status: "future",
    category: "Cloud",
    description: "Observe, verify, and diagnose ephemeral cloud development environments like GitHub Codespaces, Gitpod, and Dev Containers.",
    items: [
      { title: "Dev Container Deep Inspection", description: "Inspect host-to-container parity and port binding alignment" },
      { title: "Codespaces & Cloud IDE Hooks", description: "Automated pre-flight check when cloud workspaces boot" },
      { title: "Remote State Diagnostics", description: "Export and triage container discrepancies without SSH access" }
    ]
  },
  {
    version: "v1.0.0",
    targetDate: "Late 2027",
    title: "Stable & Enterprise-Ready",
    status: "future",
    category: "Foundation",
    description: "Long-term API stability, comprehensive documentation, binary distribution, and enterprise compliance reporting.",
    items: [
      { title: "Long-Term Support (LTS)", description: "Guaranteed contract schema backwards-compatibility" },
      { title: "Standalone Native Binaries", description: "Zero-dependency single executable distribution via Homebrew, Winget, and APT" },
      { title: "Enterprise Compliance Export", description: "SOC2 & ISO environment reproducibility audit trails" }
    ]
  }
];
