export interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "core" | "contracts" | "security" | "developer_experience";
  status: "stable" | "new" | "planned" | "experimental";
  command?: string;
  docsUrl: string;
  iconName: string;
  benefits: string[];
  terminalExample?: {
    command: string;
    output: string;
  };
}

export const featuresList: FeatureItem[] = [
  {
    id: "environment-scanning",
    title: "Environment Scanning",
    tagline: "Inspect complete runtime, dependency, and service state in milliseconds.",
    description: "Runmark inspects host operating system facts, runtimes (Python, Node, Docker, Git), project signals (pyproject.toml, package.json, Dockerfile), declared/locked dependencies, background services (PostgreSQL, Redis), and port availability without mutating system state.",
    category: "core",
    status: "stable",
    command: "runmark scan",
    docsUrl: "/docs/cli/runmark-scan",
    iconName: "Search",
    benefits: [
      "Zero system mutation — safe read-only inspection",
      "Subprocess timeout clamping and bounded memory",
      "Automatic detection of Python, Node, Docker, Git, Postgres, Redis",
      "Clean visual tree representation with Rich terminal formatting"
    ],
    terminalExample: {
      command: "runmark scan",
      output: `╭─ Runmark Scan ─────────────────────────────────────────────────────────────╮
│ Host System: Windows 11 (AMD64)                                            │
│ Project: my-django-app (Python 3.12.4, Django 5.1.2)                       │
│ Runtimes:                                                                  │
│   ✓ Python 3.12.4                                                          │
│   ✓ Node.js 22.14.0                                                        │
│   ✓ Docker 28.0.1                                                          │
│   ✓ Git 2.48.0                                                             │
│ Backing Services:                                                          │
│   ✓ PostgreSQL 16.3 (Port 5432 - Active)                                  │
│   ✓ Redis 7.2.4 (Port 6379 - Active)                                       │
│ Canonical Digest: ce19840abda5675a69937dfa7c49bbf25ba3a2a3b10180ac3b95d1... │
╰────────────────────────────────────────────────────────────────────────────╯`
    }
  },
  {
    id: "smart-snapshots",
    title: "Smart Snapshots",
    tagline: "Capture reliable, portable environment fingerprints.",
    description: "Persist immutable environment snapshots into local atomic storage (`.runmark/snapshots/`). Every snapshot includes a deterministic SHA-256 fingerprint generated from canonicalized environment properties.",
    category: "core",
    status: "stable",
    command: "runmark snapshot -m \"Initial dev baseline\"",
    docsUrl: "/docs/concepts/environment-snapshots",
    iconName: "Camera",
    benefits: [
      "Deterministic SHA-256 environment fingerprinting",
      "Decoupled from code commits and developer hostnames",
      "Atomic filesystem persistence with fsync protection",
      "Tagged messages for tracking onboarding milestones"
    ],
    terminalExample: {
      command: "runmark snapshot -m \"Sprint baseline working state\"",
      output: `✓ Snapshot captured: snap_01J8F9X2K3Q7W
  • Message: Sprint baseline working state
  • Fingerprint: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
  • Stored in: .runmark/snapshots/snap_01J8F9X2K3Q7W.json`
    }
  },
  {
    id: "drift-detection",
    title: "Drift Detection",
    tagline: "Compare environments and spot differences instantly.",
    description: "Semantic diff engine that compares your live environment against a baseline snapshot or two snapshots against each other. Categorizes changes as ADDED, REMOVED, CHANGED, or UNCHANGED with rule-driven severity.",
    category: "core",
    status: "stable",
    command: "runmark diff",
    docsUrl: "/docs/cli/runmark-diff",
    iconName: "GitCompare",
    benefits: [
      "Categorized diffing: ADDED, REMOVED, CHANGED, UNCHANGED",
      "Severity triage: CRITICAL, WARNING, INFO",
      "Highlights subtle minor/patch version drifts before runtime failures",
      "Supports machine-readable JSON output for automation"
    ],
    terminalExample: {
      command: "runmark diff",
      output: `⚠ Environment Drift Detected (2 differences):
  [CHANGED] Python Runtime: 3.12.4 → 3.11.9 (WARNING)
  [CHANGED] OS Platform: Windows → Linux (WARNING)
  [UNCHANGED] PostgreSQL: 16.3
  [UNCHANGED] Redis: 7.2.4`
    }
  },
  {
    id: "environment-contracts",
    title: "Environment Contracts",
    tagline: "Define and share explicit environment contracts for your projects.",
    description: "Declare required runtimes, dependencies, services, ports, container tools, and environment variable requirements in a version-controlled `runmark.json` file validated against formal JSON schemas.",
    category: "contracts",
    status: "new",
    command: "runmark contract init --dry-run",
    docsUrl: "/docs/concepts/environment-contracts",
    iconName: "FileCheck2",
    benefits: [
      "Evidence-driven contract synthesis (pyproject.toml, package.json, Dockerfile)",
      "Strict numeric version constraint checking (>=3.11, 3.12.x, <4.0)",
      "Semantic contract diffing against Git HEAD (runmark contract diff)",
      "Zero secret storage guarantee (names only, never credentials)"
    ],
    terminalExample: {
      command: "runmark check --explain",
      output: `╭─ Runmark Contract Evaluation ──────────────────────────────────────────────╮
│ Contract: runmark.json (Version 1)                                         │
│ Overall Status: PASS (6/6 checks satisfied)                                │
│                                                                            │
│ ✓ runtime.python: >=3.11,<3.13 [Found: 3.12.4]                            │
│ ✓ runtime.node: >=20 [Found: 22.14.0]                                      │
│ ✓ service.postgresql: >=15 [Found: 16.3]                                   │
│ ✓ environment.required: DATABASE_URL [Present: Yes (Secret)]               │
╰────────────────────────────────────────────────────────────────────────────╯`
    }
  },
  {
    id: "verification",
    title: "Verification & CI Exit Codes",
    tagline: "Ensure your code runs in any environment with automated CI checks.",
    description: "Evaluates the host machine against a verified snapshot or project contract, yielding standardized exit codes suitable for CI pipelines, pull request gates, and pre-commit hooks.",
    category: "core",
    status: "stable",
    command: "runmark verify --strict",
    docsUrl: "/docs/cli/runmark-verify",
    iconName: "ShieldCheck",
    benefits: [
      "Deterministic exit codes: 0 (Success), 1 (Drift/Failure), 2 (Usage), 3 (Internal), 4 (Security)",
      "Ideal for pre-commit hooks and GitHub Actions workflows",
      "Strict mode enforcing exact version matches",
      "Prevent broken PRs caused by environment discrepancies"
    ]
  },
  {
    id: "doctor-diagnostics",
    title: "Doctor / Diagnostics",
    tagline: "Diagnose environment discrepancies and get actionable remediation advice.",
    description: "Deep diagnostic engine that breaks down issues into concrete observed evidence, inferred reasoning, and clear read-only fix instructions to get developers back to coding quickly.",
    category: "developer_experience",
    status: "stable",
    command: "runmark doctor",
    docsUrl: "/docs/cli/runmark-doctor",
    iconName: "Stethoscope",
    benefits: [
      "Concrete observed facts vs inferred deductions",
      "Actionable commands to restore missing runtimes or services",
      "Port conflict and daemon outage diagnostics",
      "Structured diagnostic codes (ENV_MISSING_REQUIRED, RUNTIME_VERSION_MISMATCH)"
    ],
    terminalExample: {
      command: "runmark doctor",
      output: `[CRITICAL] ENV_MISSING_REQUIRED: Required environment variable 'DATABASE_URL' is missing.
  • Evidence: Variable declared in .env.example but absent from environment.
  • Explanation: Database connection cannot be established without this variable.
  • Remediation: Define DATABASE_URL in your .env file or local shell environment.`
    }
  },
  {
    id: "secret-redaction",
    title: "Zero-Secret Guarantee",
    tagline: "Multi-pass redaction prevents secrets and credentials from leaking.",
    description: "In-memory redactor automatically recognizes API keys (OpenAI, AWS, GitHub, Stripe, Slack), private keys, JWTs, and database URIs, masking values before storage or report export.",
    category: "security",
    status: "stable",
    command: "runmark share --output report.md",
    docsUrl: "/docs/security/zero-secret",
    iconName: "Lock",
    benefits: [
      "Pattern matching for cloud providers, tokens, and cryptographic keys",
      "Automatic username & user home masking (<USER_HOME>)",
      "Export boundary canary checks aborting on credential leaks (Exit code 4)",
      "URI sanitization stripping embedded passwords from database connection strings"
    ]
  },
  {
    id: "cross-platform",
    title: "Cross-Platform Precision",
    tagline: "Consistent behavior on Windows, macOS, and Linux.",
    description: "Engineered specifically to handle path separators, binary names (.exe vs POSIX), architecture strings (AMD64, arm64, x86_64), and platform-specific service discovery gracefully.",
    category: "developer_experience",
    status: "stable",
    docsUrl: "/docs/getting-started/installation",
    iconName: "Cpu",
    benefits: [
      "Native Windows, macOS (Darwin), and Linux support",
      "Consistent POSIX relative paths in snapshots and contracts",
      "Safe binary decoding with errors='replace' protection",
      "Universal CLI experience across team members"
    ]
  },
  {
    id: "extensible-plugins",
    title: "Extensible Architecture",
    tagline: "Plugin system and custom detectors.",
    description: "Designed around single-responsibility Detector base classes. Community and custom team detectors can observe bespoke internal databases, cloud emulators, and SDKs.",
    category: "developer_experience",
    status: "planned",
    docsUrl: "/docs/concepts/reproducibility",
    iconName: "Blocks",
    benefits: [
      "Standard Detector base class with DetectionContext",
      "Custom service and runtime inspection plugins",
      "Safe isolation preventing plugin crashes from corrupting scans",
      "Coming in Roadmap Milestone v0.5.0"
    ]
  }
];
