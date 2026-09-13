export interface DocSection {
  id: string;
  title: string;
}

export interface DocArticle {
  slug: string[];
  title: string;
  group: string;
  description: string;
  headings: DocSection[];
  markdownContent: string;
}

export interface DocGroup {
  id: string;
  title: string;
  items: {
    title: string;
    slug: string;
    description: string;
    badge?: string;
  }[];
}

export const docGroups: DocGroup[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      { title: "Introduction", slug: "getting-started/introduction", description: "What Runmark is and why environment intelligence matters." },
      { title: "Installation", slug: "getting-started/installation", description: "Installing Runmark on Windows, macOS, and Linux." },
      { title: "Quick Start", slug: "getting-started/quick-start", description: "Get up and running with Runmark in under two minutes." },
      { title: "First Scan", slug: "getting-started/first-scan", description: "Running your first environment inspection and understanding the output." },
      { title: "Your First Snapshot", slug: "getting-started/your-first-snapshot", description: "Capturing and persisting a verified baseline environment." }
    ]
  },
  {
    id: "concepts",
    title: "Core Concepts",
    items: [
      { title: "Environment Snapshots", slug: "concepts/environment-snapshots", description: "Immutable records of your machine state and dependencies." },
      { title: "Environment Fingerprints", slug: "concepts/environment-fingerprints", description: "Deterministic SHA-256 canonical hashing of environment facts." },
      { title: "Environment Drift", slug: "concepts/environment-drift", description: "How drift occurs and how Runmark triages discrepancy severity." },
      { title: "Environment Contracts", slug: "concepts/environment-contracts", description: "Declarative project requirements stored in runmark.json.", badge: "New" },
      { title: "Verification", slug: "concepts/verification", description: "Evaluating machine state against contracts and snapshots with CI exit codes." },
      { title: "Reproducibility", slug: "concepts/reproducibility", description: "Guiding principles for reproducible developer environments." }
    ]
  },
  {
    id: "cli",
    title: "CLI Reference",
    items: [
      { title: "runmark init", slug: "cli/runmark-init", description: "Initialize Runmark tracking in the current project." },
      { title: "runmark scan", slug: "cli/runmark-scan", description: "Inspect and display complete runtime, dependency, and service state." },
      { title: "runmark check", slug: "cli/runmark-check", description: "Evaluate host machine compliance against project contract (runmark.json)." },
      { title: "runmark snapshot", slug: "cli/runmark-snapshot", description: "Capture and persist an immutable baseline snapshot." },
      { title: "runmark diff", slug: "cli/runmark-diff", description: "Compare environment state between snapshots or against live machine." },
      { title: "runmark verify", slug: "cli/runmark-verify", description: "Verify current machine environment against a baseline snapshot." },
      { title: "runmark doctor", slug: "cli/runmark-doctor", description: "Diagnose discrepancies and obtain actionable remediation advice." },
      { title: "runmark share", slug: "cli/runmark-share", description: "Generate a sanitized, portable diagnostic report for issues or chat." },
      { title: "runmark contract", slug: "cli/runmark-contract", description: "Bootstrap, validate, diff, and show runmark.json environment contracts." },
      { title: "runmark history", slug: "cli/runmark-history", description: "List and view previous snapshot history." },
      { title: "runmark version", slug: "cli/runmark-version", description: "Display tool version and platform diagnostics." }
    ]
  },
  {
    id: "configuration",
    title: "Configuration",
    items: [
      { title: "Configuration Overview", slug: "configuration/configuration-overview", description: "How Runmark reads configuration and manifest files." },
      { title: "runmark.json Specification", slug: "configuration/runmark-json", description: "Complete schema specification for project environment contracts." },
      { title: "Environment Variables", slug: "configuration/environment-variables", description: "Tracking required and optional environment variables securely." },
      { title: "Ignore Rules", slug: "configuration/ignore-rules", description: "Configuring detectors to skip specific paths or services." }
    ]
  },
  {
    id: "security",
    title: "Security Architecture",
    items: [
      { title: "Zero-Secret Guarantee", slug: "security/zero-secret", description: "How Runmark guarantees secrets and credentials never leak." },
      { title: "Secret Redaction", slug: "security/secret-redaction", description: "Multi-pattern recognition for API keys, tokens, and private keys." },
      { title: "URI Sanitization", slug: "security/uri-sanitization", description: "Stripping embedded passwords from database connection strings." },
      { title: "Path & User Privacy", slug: "security/path-privacy", description: "Preventing local username and filesystem path leaks." },
      { title: "Security Best Practices", slug: "security/security-best-practices", description: "Recommended security posture for team environments." }
    ]
  },
  {
    id: "integrations",
    title: "Integrations",
    items: [
      { title: "Git Workflows", slug: "integrations/git-workflows", description: "Integrating contracts and baselines with Git repositories." },
      { title: "CI/CD & GitHub Actions", slug: "integrations/ci-cd", description: "Automating environment verification in CI pipelines." },
      { title: "Docker & Containers", slug: "integrations/docker", description: "Inspecting containerized services and Docker Compose definitions." }
    ]
  },
  {
    id: "contributing",
    title: "Contributing",
    items: [
      { title: "Development Setup", slug: "contributing/development-setup", description: "Setting up your local environment to contribute to Runmark." },
      { title: "Project Architecture", slug: "contributing/architecture", description: "Deep dive into detectors, scanners, diff engines, and state models." },
      { title: "Contribution Guide", slug: "contributing/contribution-guide", description: "PR workflow, coding standards, and test expectations." },
      { title: "Code of Conduct", slug: "contributing/code-of-conduct", description: "Community standards and pledge." },
      { title: "Bug Reports & Feedback", slug: "contributing/bug-reports", description: "How to file high-quality bug reports and feature requests." }
    ]
  }
];

export const docArticles: Record<string, DocArticle> = {
  "getting-started/introduction": {
    "slug": [
      "getting-started",
      "introduction"
    ],
    "title": "Introduction to Runmark",
    "group": "Getting Started",
    "description": "Know what makes your code run. Local-first development environment observability, fingerprinting, comparison, and verification.",
    "headings": [
      {
        "id": "what-is-runmark",
        "title": "What is Runmark?"
      },
      {
        "id": "the-problem",
        "title": "The Problem: Works on My Machine"
      },
      {
        "id": "how-runmark-helps",
        "title": "How Runmark Helps"
      },
      {
        "id": "what-runmark-is-not",
        "title": "What Runmark is NOT"
      },
      {
        "id": "core-principles",
        "title": "Core Principles"
      }
    ],
    "markdownContent": "# Introduction to Runmark\n\n> **Know what makes your code run.**\n> *Git tracks your code. Runmark tracks what makes your code run.*\n\nRunmark is a **local-first, zero-telemetry developer infrastructure tool** designed to observe, snapshot, compare, verify, and diagnose developer machine environments.\n\n---\n\n### What is Runmark?\n\nModern software depends on an intricate web of invisible machine state:\n- Exact runtime minor/patch versions (Python `3.12.4` vs `3.11.9`, Node.js `22.14.0` vs `20.18.0`)\n- Host operating system semantics and architecture (Windows `AMD64`, Linux `x86_64`, macOS `arm64`)\n- Background backing services (PostgreSQL `16.3` on port `5432`, Redis `7.2` on port `6379`)\n- Required environment variables (e.g. `DATABASE_URL`, `SECRET_KEY`)\n- Container tooling and Docker Compose definitions\n\nWhile **Git** tracks the lines of code in your files, Git has zero awareness of whether your local machine satisfies the runtime requirements needed to execute that code.\n\n**Runmark bridges this gap.** It creates deterministic fingerprints of your environment, alerts you to drift before runtime crashes happen, and proves whether a developer machine or CI runner satisfies project requirements.\n\n---\n\n### The Problem: \"Works on My Machine\"\n\nConsider a typical scenario across engineering teams:\n- **Developer A** has Python 3.12, Node 22, PostgreSQL 16 running on port 5432, and all required environment variables set.\n- **Developer B** has Python 3.11, Node 20, PostgreSQL not installed, Redis stopped, and a missing environment variable.\n\nBoth developers checkout the **exact same Git commit**, yet the application crashes for Developer B. Hours of debugging follow, usually culminating in: *\"Oh, you need Python 3.12 and a local Postgres instance running on port 5432.\"*\n\nRunmark eliminates this entire class of developer friction.\n\n---\n\n### How Runmark Helps\n\n1. **Observe Without Mutating**: Runs non-destructive, safe inspection across runtimes, dependencies, services, ports, and environment variables.\n2. **Deterministic Fingerprints**: Generates a canonical SHA-256 digest of your machine state decoupled from Git commits, timestamps, and usernames.\n3. **Environment Contracts (`runmark.json`)**: Allows teams to declare and version-control environment requirements alongside source code.\n4. **Contract Proof (`runmark check`)**: Evaluates host machine compliance with clear diagnostic cards before builds or tests run.\n5. **Semantic Drift Triage**: Compares environments and classifies discrepancies into `CRITICAL`, `WARNING`, and `INFO` severity tiers.\n6. **Actionable Doctor Advice**: Explains why an environment failed with concrete observed evidence and exact remediation commands.\n7. **Zero-Secret Export**: Generates sanitized Markdown or JSON reports ready to share with teammates without leaking API keys or credentials.\n\n---\n\n### What Runmark is NOT\n\n- **Runmark is NOT a package manager.** It does not replace `pip`, `uv`, `npm`, `pnpm`, or `cargo`.\n- **Runmark is NOT a container manager.** It does not replace `docker`, `podman`, or Kubernetes.\n- **Runmark is NOT an AI assistant.** It operates on deterministic facts, structural inspection, and formal JSON schemas.\n- **Runmark is NOT a cloud platform.** It is 100% offline, local-first, and contains zero external telemetry.\n- **Runmark is NOT an automatic installer.** It never mutates system packages or installs software without user consent.\n\n---\n\n### Core Principles\n\n- **Local-First & Offline**: All metadata is stored strictly in `.runmark/` in your project root.\n- **Zero Secrets**: Multi-pass redactors scrub credentials, API tokens, and passwords in database URIs before any persistence.\n- **Evidence-Driven**: Project manifests (`pyproject.toml`, `package.json`, `Dockerfile`) take precedence over machine observations.\n- **Deterministic**: Given identical environment configurations, Runmark produces identical canonical fingerprints."
  },
  "getting-started/installation": {
    "slug": [
      "getting-started",
      "installation"
    ],
    "title": "Installation",
    "group": "Getting Started",
    "description": "Installing Runmark on Windows, macOS, and Linux.",
    "headings": [
      {
        "id": "requirements",
        "title": "System Requirements"
      },
      {
        "id": "install-pip",
        "title": "Install via pip"
      },
      {
        "id": "install-pipx",
        "title": "Install via pipx (Recommended)"
      },
      {
        "id": "install-source",
        "title": "Install from Source"
      },
      {
        "id": "verify-installation",
        "title": "Verifying Installation"
      }
    ],
    "markdownContent": "# Installation\n\nRunmark is distributed as a lightweight Python CLI package with zero complex C-extensions or external binary dependencies.\n\n---\n\n### System Requirements\n\n- **Python**: Python `3.10` or higher (Python 3.11, 3.12, 3.13 fully supported)\n- **Operating Systems**:\n  - **Windows**: Windows 10, Windows 11 (AMD64, ARM64)\n  - **macOS**: macOS 12+ (Apple Silicon M1/M2/M3/M4, Intel x86_64)\n  - **Linux**: Ubuntu, Debian, Fedora, Arch, Alpine, RHEL (x86_64, arm64)\n- **Privileges**: Standard user permissions (Administrator/root is **not** required)\n\n---\n\n### Install via pip\n\n```bash\npip install runmark\n```\n\nTo upgrade an existing installation:\n\n```bash\npip install --upgrade runmark\n```\n\n---\n\n### Install via pipx (Recommended for Global CLI)\n\n```bash\npipx install runmark\n```\n\n---\n\n### Install from Source\n\n```bash\ngit clone https://github.com/byanjanstarlord-arch/Runmark.git\ncd Runmark\npip install -e .\n```\n\n---\n\n### Verifying Installation\n\n```bash\nrunmark version\n```\n\nExpected output:\n\n```text\n\u256d\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256e\n\u2502 Runmark 0.2.2                                                                \u2502\n\u2502                                                                              \u2502\n\u2502 \u2022 Schema Version:  1.0                                                       \u2502\n\u2502 \u2022 Python Runtime:  3.12.10                                                   \u2502\n\u2502 \u2022 OS / Platform:   Windows (AMD64)                                           \u2502\n\u2502                                                                              \u2502\n\u2502 Git tracks your code. Runmark tracks what makes your code run.               \u2502\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256f\n```"
  },
  "getting-started/quick-start": {
    "slug": [
      "getting-started",
      "quick-start"
    ],
    "title": "Quick Start Guide",
    "group": "Getting Started",
    "description": "Get up and running with Runmark in under two minutes.",
    "headings": [
      {
        "id": "step-1-init",
        "title": "1. Initialize Runmark"
      },
      {
        "id": "step-2-bootstrap-contract",
        "title": "2. Bootstrap an Environment Contract"
      },
      {
        "id": "step-3-scan-environment",
        "title": "3. Scan Current Machine"
      },
      {
        "id": "step-4-check-contract",
        "title": "4. Check Machine Against Contract"
      },
      {
        "id": "step-5-capture-snapshot",
        "title": "5. Capture a Working Snapshot"
      },
      {
        "id": "step-6-detect-drift",
        "title": "6. Compare State and Spot Drift"
      }
    ],
    "markdownContent": "# Quick Start Guide\n\nThis step-by-step tutorial takes you from zero to a fully tracked, reproducible development environment in under 2 minutes.\n\n---\n\n### 1. Initialize Runmark in Your Project\n\n```bash\ncd my-project\nrunmark init\n```\n\n---\n\n### 2. Bootstrap an Environment Contract (`runmark.json`)\n\n```bash\n# Preview discovered evidence without writing files\nrunmark contract init --dry-run\n\n# Generate the canonical runmark.json contract\nrunmark contract init --yes\n```\n\n---\n\n### 3. Scan Your Environment\n\n```bash\nrunmark scan\n```\n\n---\n\n### 4. Check Your Machine Against the Contract\n\n```bash\nrunmark check --explain\n```\n\n---\n\n### 5. Capture a Working Baseline Snapshot\n\n```bash\nrunmark snapshot -m \"Sprint baseline with Python 3.12 and Postgres 16\"\n```\n\n---\n\n### 6. Compare State and Spot Drift\n\n```bash\nrunmark diff\n```"
  },
  "getting-started/first-scan": {
    "slug": [
      "getting-started",
      "first-scan"
    ],
    "title": "Your First Scan",
    "group": "Getting Started",
    "description": "Running your first environment inspection and understanding the output.",
    "headings": [
      {
        "id": "running-scan",
        "title": "Running a Scan"
      },
      {
        "id": "what-is-collected",
        "title": "What is Collected"
      }
    ],
    "markdownContent": "# Your First Scan\n\nThe `runmark scan` command is the foundational observation engine of Runmark.\n\n```bash\nrunmark scan\n```\n\n### What is Collected\n- Host Operating System and CPU architecture\n- Detected runtimes (Python, Node, Docker, Git)\n- Discovered framework signals (Django, FastAPI, React, Next.js)\n- Backing services (PostgreSQL on 5432, Redis on 6379)\n- Required environment variable status"
  },
  "getting-started/your-first-snapshot": {
    "slug": [
      "getting-started",
      "your-first-snapshot"
    ],
    "title": "Your First Snapshot",
    "group": "Getting Started",
    "description": "Capturing and persisting a verified baseline environment.",
    "headings": [
      {
        "id": "creating-a-snapshot",
        "title": "Creating a Snapshot"
      }
    ],
    "markdownContent": "# Your First Snapshot\n\nCapture and persist your environment state into an immutable baseline:\n\n```bash\nrunmark snapshot -m \"Working dev baseline\"\n```\n\nSnapshots are stored atomically in `.runmark/snapshots/` with deterministic SHA-256 fingerprints."
  },
  "concepts/environment-contracts": {
    "slug": [
      "concepts",
      "environment-contracts"
    ],
    "title": "Environment Contracts (runmark.json)",
    "group": "Core Concepts",
    "description": "Define what a project needs, then prove whether the current environment satisfies those requirements.",
    "headings": [
      {
        "id": "overview",
        "title": "Overview"
      },
      {
        "id": "contract-file",
        "title": "The runmark.json Contract File"
      },
      {
        "id": "version-constraints",
        "title": "Version Constraint Syntax"
      }
    ],
    "markdownContent": "# Environment Contracts (`runmark.json`)\n\n> **Define what a project needs, then prove whether the current environment satisfies those requirements.**\n\nEnvironment Contracts allow engineering teams to define explicit, version-controlled machine environment requirements directly alongside source code in a `runmark.json` file.\n\n```json\n{\n  \"$schema\": \"https://runmark.dev/schemas/contract-v1.json\",\n  \"version\": 1,\n  \"project\": { \"name\": \"my-service\" },\n  \"platform\": {\n    \"os\": [\"linux\", \"darwin\", \"windows\"],\n    \"architecture\": [\"x86_64\", \"arm64\", \"amd64\"]\n  },\n  \"runtime\": {\n    \"python\": \">=3.11,<3.13\",\n    \"node\": \">=20\"\n  },\n  \"dependencies\": {\n    \"python\": { \"fastapi\": \">=0.100.0\" }\n  },\n  \"services\": {\n    \"postgresql\": { \"version\": \">=14\", \"required\": true },\n    \"redis\": \">=7.0\"\n  },\n  \"environment\": {\n    \"required\": [\"DATABASE_URL\"],\n    \"optional\": [\"DEBUG\"]\n  },\n  \"network\": {\n    \"ports\": {\n      \"8000\": { \"protocol\": \"tcp\", \"required\": true }\n    }\n  }\n}\n```\n\n### Version Constraint Syntax\n\n| Expression | Description | Matches | Does Not Match |\n|---|---|---|---|\n| `3.12.4` | Exact version | `3.12.4` | `3.12.5`, `3.11.4` |\n| `3.12.x` | Wildcard minor | `3.12.0`, `3.12.4` | `3.11.9`, `3.13.0` |\n| `>=3.12` | Greater than or equal | `3.12.0`, `3.13.1` | `3.11.9` |\n| `<4.0` | Strictly less than | `3.12.4`, `3.99.0` | `4.0.0` |\n| `>=3.11,<3.13` | Compound range | `3.11.0`, `3.12.4` | `3.10.9`, `3.13.0` |"
  },
  "concepts/environment-snapshots": {
    "slug": [
      "concepts",
      "environment-snapshots"
    ],
    "title": "Environment Snapshots",
    "group": "Core Concepts",
    "description": "Immutable records of your machine state and dependencies.",
    "headings": [
      {
        "id": "snapshots",
        "title": "Environment Snapshots"
      }
    ],
    "markdownContent": "# Environment Snapshots\n\nAn Environment Snapshot encapsulates the runnable conditions of a project at a single point in time. It includes host architecture, runtime binaries, dependency trees, backing service status, ports, and environment variable requirements."
  },
  "concepts/environment-fingerprints": {
    "slug": [
      "concepts",
      "environment-fingerprints"
    ],
    "title": "Environment Fingerprints",
    "group": "Core Concepts",
    "description": "Deterministic SHA-256 canonical hashing of environment facts.",
    "headings": [
      {
        "id": "fingerprints",
        "title": "Environment Fingerprints"
      }
    ],
    "markdownContent": "# Environment Fingerprints\n\nA Runmark Environment Fingerprint is a deterministic 64-character SHA-256 hexadecimal hash computed from normalized environment facts:\n\n```text\nce19840abda5675a69937dfa7c49bbf25ba3a2a3b10180ac3b95d1cff86c123f\n```\n\nTwo developer machines running identical runtime versions, backing services, and dependency sets produce the exact same fingerprint."
  },
  "concepts/environment-drift": {
    "slug": [
      "concepts",
      "environment-drift"
    ],
    "title": "Environment Drift",
    "group": "Core Concepts",
    "description": "How drift occurs and how Runmark triages discrepancy severity.",
    "headings": [
      {
        "id": "drift",
        "title": "Environment Drift"
      }
    ],
    "markdownContent": "# Environment Drift\n\nEnvironment drift occurs when a developer machine or CI runner gradually deviates from the project's verified working baseline.\n\n### Severity Tiers\n- **`CRITICAL`**: Missing required runtime, stopped mandatory database, missing required `.env` variable.\n- **`WARNING`**: Minor version discrepancies or host OS differences.\n- **`INFO`**: Dependency patch updates or branch switches."
  },
  "concepts/verification": {
    "slug": [
      "concepts",
      "verification"
    ],
    "title": "Verification & CI Exit Codes",
    "group": "Core Concepts",
    "description": "Evaluating machine state against contracts and snapshots with CI exit codes.",
    "headings": [
      {
        "id": "exit-codes",
        "title": "Standard Exit Codes"
      }
    ],
    "markdownContent": "# Verification & CI Exit Codes\n\nVerification evaluates whether the host machine satisfies an explicit baseline snapshot or project contract.\n\n### Standard Exit Codes\n- **`0`**: Success / Passed\n- **`1`**: Drift detected / Contract unsatisfied\n- **`2`**: Usage or syntax error\n- **`3`**: Internal detector fault\n- **`4`**: Security violation"
  },
  "concepts/reproducibility": {
    "slug": [
      "concepts",
      "reproducibility"
    ],
    "title": "Reproducibility Principles",
    "group": "Core Concepts",
    "description": "Guiding principles for reproducible developer environments.",
    "headings": [
      {
        "id": "reproducibility",
        "title": "Reproducibility Principles"
      }
    ],
    "markdownContent": "# Reproducibility Principles\n\nReproducibility connects source code, locked dependencies, container configurations, and machine runtime state into a verified, reliable development ecosystem."
  },
  "cli/runmark-scan": {
    "slug": [
      "cli",
      "runmark-scan"
    ],
    "title": "runmark scan",
    "group": "CLI Reference",
    "description": "Inspect and display complete runtime, dependency, and service state.",
    "headings": [
      {
        "id": "usage",
        "title": "Usage"
      }
    ],
    "markdownContent": "# `runmark scan`\n\nInspect and display the complete runtime, dependency, backing service, and environment state of the current project.\n\n```bash\nrunmark scan [OPTIONS]\n```\n\n### Options\n- `--path <PATH>`: Target project directory.\n- `--json`: Output raw, machine-readable JSON representation."
  },
  "cli/runmark-check": {
    "slug": [
      "cli",
      "runmark-check"
    ],
    "title": "runmark check",
    "group": "CLI Reference",
    "description": "Evaluate host machine compliance against project contract (runmark.json).",
    "headings": [
      {
        "id": "usage",
        "title": "Usage"
      }
    ],
    "markdownContent": "# `runmark check`\n\nEvaluate whether the host machine environment satisfies all requirements declared in `runmark.json`.\n\n```bash\nrunmark check --explain\n```\n\n### Options\n- `--explain`: Print detailed diagnostic cards for failed or unknown requirements.\n- `--path <PATH>`: Target directory.\n- `--json`: Output machine-readable JSON payload."
  },
  "cli/runmark-contract": {
    "slug": [
      "cli",
      "runmark-contract"
    ],
    "title": "runmark contract",
    "group": "CLI Reference",
    "description": "Bootstrap, validate, diff, and show runmark.json environment contracts.",
    "headings": [
      {
        "id": "subcommands",
        "title": "Subcommands"
      }
    ],
    "markdownContent": "# `runmark contract`\n\nManage, bootstrap, validate, and compare project environment contracts (`runmark.json`).\n\n- `runmark contract init --dry-run`: Preview discovered evidence without modifying files.\n- `runmark contract init --yes`: Bootstrap contract directly.\n- `runmark contract diff`: Compare working tree contract against Git `HEAD:runmark.json`.\n- `runmark contract validate`: Validate JSON schema and security boundaries.\n- `runmark contract show`: Display normalized contract specification."
  },
  "cli/runmark-init": {
    "slug": [
      "cli",
      "runmark-init"
    ],
    "title": "runmark init",
    "group": "CLI Reference",
    "description": "Initialize Runmark tracking in the current project.",
    "headings": [
      {
        "id": "usage",
        "title": "Usage"
      }
    ],
    "markdownContent": "# `runmark init`\n\nInitialize Runmark tracking in the current project directory. Creates the local `.runmark/` repository."
  },
  "cli/runmark-snapshot": {
    "slug": [
      "cli",
      "runmark-snapshot"
    ],
    "title": "runmark snapshot",
    "group": "CLI Reference",
    "description": "Capture and persist an immutable baseline snapshot.",
    "headings": [
      {
        "id": "usage",
        "title": "Usage"
      }
    ],
    "markdownContent": "# `runmark snapshot`\n\nCapture and persist the current environment state into an immutable baseline snapshot with a descriptive message (`-m`)."
  },
  "cli/runmark-diff": {
    "slug": [
      "cli",
      "runmark-diff"
    ],
    "title": "runmark diff",
    "group": "CLI Reference",
    "description": "Compare environment state between snapshots or against live machine.",
    "headings": [
      {
        "id": "usage",
        "title": "Usage"
      }
    ],
    "markdownContent": "# `runmark diff`\n\nCompare environment state between two snapshots or compare the live machine against a baseline snapshot."
  },
  "cli/runmark-verify": {
    "slug": [
      "cli",
      "runmark-verify"
    ],
    "title": "runmark verify",
    "group": "CLI Reference",
    "description": "Verify current machine environment against a baseline snapshot.",
    "headings": [
      {
        "id": "usage",
        "title": "Usage"
      }
    ],
    "markdownContent": "# `runmark verify`\n\nVerify that the current host machine environment matches a baseline snapshot with CI exit codes."
  },
  "cli/runmark-doctor": {
    "slug": [
      "cli",
      "runmark-doctor"
    ],
    "title": "runmark doctor",
    "group": "CLI Reference",
    "description": "Diagnose discrepancies and obtain actionable remediation advice.",
    "headings": [
      {
        "id": "usage",
        "title": "Usage"
      }
    ],
    "markdownContent": "# `runmark doctor`\n\nDiagnose environment discrepancies with clear separation of observed evidence, inferred reasoning, and read-only remediation advice."
  },
  "cli/runmark-share": {
    "slug": [
      "cli",
      "runmark-share"
    ],
    "title": "runmark share",
    "group": "CLI Reference",
    "description": "Generate a sanitized, portable diagnostic report for issues or chat.",
    "headings": [
      {
        "id": "usage",
        "title": "Usage"
      }
    ],
    "markdownContent": "# `runmark share`\n\nGenerate a sanitized, portable diagnostic report in Markdown or JSON format, ready to attach to GitHub Issues or share in Slack."
  },
  "cli/runmark-history": {
    "slug": [
      "cli",
      "runmark-history"
    ],
    "title": "runmark history",
    "group": "CLI Reference",
    "description": "List and view previous snapshot history.",
    "headings": [
      {
        "id": "usage",
        "title": "Usage"
      }
    ],
    "markdownContent": "# `runmark history`\n\nList and inspect previous environment snapshots saved in the current project."
  },
  "cli/runmark-version": {
    "slug": [
      "cli",
      "runmark-version"
    ],
    "title": "runmark version",
    "group": "CLI Reference",
    "description": "Display tool version and platform diagnostics.",
    "headings": [
      {
        "id": "usage",
        "title": "Usage"
      }
    ],
    "markdownContent": "# `runmark version`\n\nDisplay the installed Runmark CLI version, active schema version, and platform diagnostics."
  },
  "configuration/configuration-overview": {
    "slug": [
      "configuration",
      "configuration-overview"
    ],
    "title": "Configuration Overview",
    "group": "Configuration",
    "description": "How Runmark reads configuration and manifest files.",
    "headings": [
      {
        "id": "overview",
        "title": "Configuration Overview"
      }
    ],
    "markdownContent": "# Configuration Overview\n\nRunmark reads configuration from both project manifests and the dedicated `.runmark/` repository directory."
  },
  "configuration/runmark-json": {
    "slug": [
      "configuration",
      "runmark-json"
    ],
    "title": "runmark.json Specification",
    "group": "Configuration",
    "description": "Complete schema specification for project environment contracts.",
    "headings": [
      {
        "id": "schema",
        "title": "Schema Overview"
      }
    ],
    "markdownContent": "# `runmark.json` Specification\n\nThe `runmark.json` file defines project environment requirements validated against `schemas/contract-v1.json`."
  },
  "configuration/environment-variables": {
    "slug": [
      "configuration",
      "environment-variables"
    ],
    "title": "Environment Variables",
    "group": "Configuration",
    "description": "Tracking required and optional environment variables securely.",
    "headings": [
      {
        "id": "env-vars",
        "title": "Environment Variables"
      }
    ],
    "markdownContent": "# Environment Variables\n\nDeclare required and optional variables in `runmark.json`. Values are always scrubbed and never stored in plaintext."
  },
  "configuration/ignore-rules": {
    "slug": [
      "configuration",
      "ignore-rules"
    ],
    "title": "Ignore Rules",
    "group": "Configuration",
    "description": "Configuring detectors to skip specific paths or services.",
    "headings": [
      {
        "id": "ignore-rules",
        "title": "Ignore Rules"
      }
    ],
    "markdownContent": "# Ignore Rules\n\nConfigure ignore rules in `.runmark/config.toml` to skip specific detectors, ports, or background services."
  },
  "security/zero-secret": {
    "slug": [
      "security",
      "zero-secret"
    ],
    "title": "Zero-Secret Guarantee",
    "group": "Security Architecture",
    "description": "How Runmark guarantees secrets and credentials never leak.",
    "headings": [
      {
        "id": "zero-secret-principle",
        "title": "Zero-Secret Principle"
      }
    ],
    "markdownContent": "# Zero-Secret Guarantee\n\n> **Runmark observes metadata, never secret values.**\n\nAll raw detector results pass through an in-memory redactor before model construction, canonical hashing, console rendering, or snapshot persistence."
  },
  "security/secret-redaction": {
    "slug": [
      "security",
      "secret-redaction"
    ],
    "title": "Secret Redaction",
    "group": "Security Architecture",
    "description": "Multi-pattern recognition for API keys, tokens, and private keys.",
    "headings": [
      {
        "id": "redaction",
        "title": "Secret Redaction"
      }
    ],
    "markdownContent": "# Secret Redaction\n\nMulti-pattern recognition for API keys (OpenAI, Stripe, GitHub, AWS), private keys, and authentication tokens."
  },
  "security/uri-sanitization": {
    "slug": [
      "security",
      "uri-sanitization"
    ],
    "title": "URI Sanitization",
    "group": "Security Architecture",
    "description": "Stripping embedded passwords from database connection strings.",
    "headings": [
      {
        "id": "uri-sanitization",
        "title": "URI Sanitization"
      }
    ],
    "markdownContent": "# URI Sanitization\n\nDatabase connection strings frequently contain passwords. Runmark strips user authentication credentials across postgres, redis, and mysql connection strings."
  },
  "security/path-privacy": {
    "slug": [
      "security",
      "path-privacy"
    ],
    "title": "Path & User Privacy",
    "group": "Security Architecture",
    "description": "Preventing local username and filesystem path leaks.",
    "headings": [
      {
        "id": "path-privacy",
        "title": "Path Privacy"
      }
    ],
    "markdownContent": "# Path & User Privacy\n\nAbsolute paths under user home directories are masked as `<USER_HOME>/...` to prevent privacy leaks across developer machines."
  },
  "security/security-best-practices": {
    "slug": [
      "security",
      "security-best-practices"
    ],
    "title": "Security Best Practices",
    "group": "Security Architecture",
    "description": "Recommended security posture for team environments.",
    "headings": [
      {
        "id": "best-practices",
        "title": "Best Practices"
      }
    ],
    "markdownContent": "# Security Best Practices\n\nDeclare variable names, never values. Keep Runmark updated to benefit from latest credential signature rules."
  },
  "integrations/git-workflows": {
    "slug": [
      "integrations",
      "git-workflows"
    ],
    "title": "Git Workflows",
    "group": "Integrations",
    "description": "Integrating contracts and baselines with Git repositories.",
    "headings": [
      {
        "id": "git",
        "title": "Git Workflows"
      }
    ],
    "markdownContent": "# Git Workflows\n\nCommit `runmark.json` to version control and run `runmark check` in pre-commit hooks."
  },
  "integrations/ci-cd": {
    "slug": [
      "integrations",
      "ci-cd"
    ],
    "title": "CI/CD & GitHub Actions",
    "group": "Integrations",
    "description": "Automating environment verification in CI pipelines.",
    "headings": [
      {
        "id": "ci-cd",
        "title": "CI/CD Workflows"
      }
    ],
    "markdownContent": "# CI/CD & GitHub Actions\n\nAdd Runmark check to your GitHub Actions pipeline to prevent broken builds due to environment discrepancies."
  },
  "integrations/docker": {
    "slug": [
      "integrations",
      "docker"
    ],
    "title": "Docker & Containers",
    "group": "Integrations",
    "description": "Inspecting containerized services and Docker Compose definitions.",
    "headings": [
      {
        "id": "docker",
        "title": "Docker & Containers"
      }
    ],
    "markdownContent": "# Docker & Containers\n\nRunmark inspects Docker Compose services and verifies container status alongside host runtimes."
  },
  "contributing/development-setup": {
    "slug": [
      "contributing",
      "development-setup"
    ],
    "title": "Development Setup",
    "group": "Contributing",
    "description": "Setting up your local environment to contribute to Runmark.",
    "headings": [
      {
        "id": "setup",
        "title": "Development Setup"
      }
    ],
    "markdownContent": "# Development Setup\n\n```bash\ngit clone https://github.com/byanjanstarlord-arch/Runmark.git\ncd Runmark\npip install -e .\npytest\n```"
  },
  "contributing/architecture": {
    "slug": [
      "contributing",
      "architecture"
    ],
    "title": "Project Architecture",
    "group": "Contributing",
    "description": "Deep dive into detectors, scanners, diff engines, and state models.",
    "headings": [
      {
        "id": "arch",
        "title": "Project Architecture"
      }
    ],
    "markdownContent": "# Project Architecture\n\nModular architecture separating Detectors, Scanner orchestrator, Contract Evaluator, Semantic Diff engine, and Security redactors."
  },
  "contributing/contribution-guide": {
    "slug": [
      "contributing",
      "contribution-guide"
    ],
    "title": "Contribution Guide",
    "group": "Contributing",
    "description": "PR workflow, coding standards, and test expectations.",
    "headings": [
      {
        "id": "guide",
        "title": "Contribution Guide"
      }
    ],
    "markdownContent": "# Contribution Guide\n\nFork the repo, create a feature branch, adhere to strict mypy and ruff standards, and submit a PR!"
  },
  "contributing/code-of-conduct": {
    "slug": [
      "contributing",
      "code-of-conduct"
    ],
    "title": "Code of Conduct",
    "group": "Contributing",
    "description": "Community standards and pledge.",
    "headings": [
      {
        "id": "conduct",
        "title": "Code of Conduct"
      }
    ],
    "markdownContent": "# Code of Conduct\n\nWe are committed to providing a welcoming, harassment-free environment for all contributors."
  },
  "contributing/bug-reports": {
    "slug": [
      "contributing",
      "bug-reports"
    ],
    "title": "Bug Reports & Feedback",
    "group": "Contributing",
    "description": "How to file high-quality bug reports and feature requests.",
    "headings": [
      {
        "id": "bugs",
        "title": "Bug Reports & Feedback"
      }
    ],
    "markdownContent": "# Bug Reports & Feedback\n\nGenerate a report via `runmark share --output report.md` and attach it to an issue at https://github.com/byanjanstarlord-arch/Runmark/issues."
  }
};
