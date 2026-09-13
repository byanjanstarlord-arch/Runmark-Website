export interface ChangelogRelease {
  version: string;
  date: string;
  title: string;
  tag: "Latest" | "Stable" | "Beta" | "Alpha";
  isLatest?: boolean;
  summary: string;
  highlights: string[];
  sections: {
    category: "Features" | "Improvements" | "Bug Fixes" | "Security";
    items: string[];
  }[];
  githubUrl: string;
  docsUrl?: string;
}

export const changelogData: ChangelogRelease[] = [
  {
    version: "v0.2.2",
    date: "Aug 29, 2026",
    title: "JSON Schema Bundling & Packaging Optimization",
    tag: "Latest",
    isLatest: true,
    summary: "Bundles JSON schemas directly into Python package distribution data and refines contract validation packaging.",
    highlights: [
      "Package data bundling for contract-v1.json and runmark-v1.json",
      "Offline schema resolution without external network requests",
      "Performance polish for instant contract evaluation"
    ],
    sections: [
      {
        category: "Features",
        items: [
          "Bundled official JSON schemas into package distribution for zero-network validation",
          "Added strict fallback mechanisms for localized schema validation"
        ]
      },
      {
        category: "Improvements",
        items: [
          "Optimized package distribution size and wheels",
          "Improved mypy strict type definitions across detector context models"
        ]
      },
      {
        category: "Bug Fixes",
        items: [
          "Fixed path resolution bug when validating schemas in isolated virtual environments",
          "Corrected edge case with Windows executable extensions during runtime scanning"
        ]
      }
    ],
    githubUrl: "https://github.com/byanjanstarlord-arch/Runmark/releases",
    docsUrl: "/docs/concepts/environment-contracts"
  },
  {
    version: "v0.2.1",
    date: "Aug 15, 2026",
    title: "Contract Bootstrap & Developer Experience",
    tag: "Stable",
    summary: "Introduces complete Environment Contracts (`runmark.json`), evidence-driven contract synthesis (`runmark contract init`), semantic contract diffing, and `runmark check` evaluation.",
    highlights: [
      "Added environment contract generation (`runmark contract init`)",
      "Semantic contract requirement diffing (`runmark contract diff`)",
      "Live environment verification against contracts (`runmark check --explain`)",
      "Enhanced security boundaries with pre-export secret scanning (Exit code 4)",
      "Improved CLI rich formatting and developer ergonomics"
    ],
    sections: [
      {
        category: "Features",
        items: [
          "Added `runmark contract init` with `--dry-run` and `--yes` flags to bootstrap `runmark.json` from project evidence",
          "Added `runmark contract diff` to compare working tree contract against Git baseline `HEAD:runmark.json`",
          "Added `runmark check` and `runmark check --explain` with detailed diagnostic cards",
          "Added `runmark contract validate` and `runmark contract show` subcommands",
          "Implemented formal JSON schema specification (`schemas/contract-v1.json`)"
        ]
      },
      {
        category: "Security",
        items: [
          "Added `ContractSanitizer` with fail-safe abort (Exit code 4) to ensure no credentials enter contract files",
          "Added URI credential stripping for postgres, redis, and mysql connection strings"
        ]
      },
      {
        category: "Improvements",
        items: [
          "Improved Rich console output with modern table layouts and status glyphs",
          "Enhanced Windows terminal UTF-8 rendering compatibility",
          "Numeric version constraint evaluation (>=3.11, 3.12.x, <4.0)"
        ]
      },
      {
        category: "Bug Fixes",
        items: [
          "Fixed false positives in dependency detector when comments exist in requirements.txt",
          "Resolved path masking for nested home directory subfolders"
        ]
      }
    ],
    githubUrl: "https://github.com/byanjanstarlord-arch/Runmark/releases/tag/v0.2.1",
    docsUrl: "/docs/concepts/environment-contracts"
  },
  {
    version: "v0.2.0",
    date: "Jul 18, 2026",
    title: "Environment Intelligence & Doctor Mode",
    tag: "Stable",
    summary: "Introduced deep diagnostic engine (`runmark doctor`), service health checks for PostgreSQL/Redis, and semantic drift triage.",
    highlights: [
      "New `runmark doctor` command with evidence and remediation advice",
      "PostgreSQL and Redis service port and daemon detectors",
      "Semantic drift severity tiers (CRITICAL, WARNING, INFO)",
      "Standardized CI exit codes (0, 1, 2, 3, 4)"
    ],
    sections: [
      {
        category: "Features",
        items: [
          "Added `runmark doctor` command providing observed evidence, inferred reasoning, and remediation instructions",
          "Added PostgreSQL and Redis port and process detectors",
          "Added container detection for Docker and Docker Compose definitions",
          "Introduced multi-severity diff categorization"
        ]
      },
      {
        category: "Improvements",
        items: [
          "Faster parallel detector execution with individual timeout guards",
          "Atomic snapshot writes with fsync protection against corruption"
        ]
      }
    ],
    githubUrl: "https://github.com/byanjanstarlord-arch/Runmark/releases",
    docsUrl: "/docs/cli/runmark-doctor"
  },
  {
    version: "v0.1.2",
    date: "May 28, 2026",
    title: "Share & Portable Diagnostics",
    tag: "Stable",
    summary: "Introduced `runmark share` to generate portable, sanitized diagnostic markdown and JSON reports for bug reports and team chat.",
    highlights: [
      "Added `runmark share` command with Markdown and JSON export formats",
      "Enhanced ExportSanitizer with user home masking (<USER_HOME>)",
      "Improved error handling and detector fault isolation"
    ],
    sections: [
      {
        category: "Features",
        items: [
          "Added `runmark share --output report.md` and `--json` export options",
          "Added portable diagnostic report schema"
        ]
      },
      {
        category: "Security",
        items: [
          "Enforced export canary scan with automatic abort if unmasked tokens are detected"
        ]
      }
    ],
    githubUrl: "https://github.com/byanjanstarlord-arch/Runmark/releases",
    docsUrl: "/docs/cli/runmark-share"
  },
  {
    version: "v0.1.1",
    date: "May 05, 2026",
    title: "Stability & Windows Support",
    tag: "Stable",
    summary: "Refined cross-platform detector accuracy, improved subprocess timeout management, and enhanced Windows path handling.",
    highlights: [
      "Improved Windows path handling and subprocess spawning",
      "Better dependency parser for pyproject.toml and package.json",
      "Enhanced terminal color detection"
    ],
    sections: [
      {
        category: "Bug Fixes",
        items: [
          "Fixed subprocess execution hanging on interactive prompts by passing DEVNULL stdin",
          "Resolved environment variable casing on Windows systems",
          "Addressed mypy strict compliance across all core modules"
        ]
      }
    ],
    githubUrl: "https://github.com/byanjanstarlord-arch/Runmark/releases"
  },
  {
    version: "v0.1.0",
    date: "Apr 10, 2026",
    title: "Initial Open-Source Release",
    tag: "Stable",
    summary: "The initial public release of Runmark — bringing environment observability, fingerprinting, snapshots, and verification to modern developers.",
    highlights: [
      "Core CLI commands: init, scan, snapshot, diff, verify, history",
      "Deterministic SHA-256 fingerprinting engine",
      "Zero-Secret in-memory redactor",
      "Local-first atomic storage in `.runmark/`"
    ],
    sections: [
      {
        category: "Features",
        items: [
          "Added `runmark init`, `runmark scan`, `runmark snapshot`, `runmark diff`, `runmark verify`, and `runmark history`",
          "Implemented detectors for Python, Node, Git, Docker, and system architecture",
          "Introduced deterministic SHA-256 environment digest",
          "Created `.runmark/` repository local storage specification"
        ]
      }
    ],
    githubUrl: "https://github.com/byanjanstarlord-arch/Runmark/releases"
  }
];
