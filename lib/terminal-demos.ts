export type TerminalPhase = 
  | "IDLE" 
  | "TYPING" 
  | "SCANNING" 
  | "RUNTIMES" 
  | "SERVICES" 
  | "FINGERPRINT" 
  | "COMPLETE";

export type HighlightKey = "subsecond" | "zerosecret" | "deterministic" | null;

export interface TerminalLine {
  text: string;
  type?: "heading" | "info" | "success" | "warning" | "error" | "muted" | "box" | "divider";
}

export interface DemoStep {
  phase: TerminalPhase;
  lines: TerminalLine[];
  progress: number;
  rightNarrative: {
    status: string;
    activeHighlight: HighlightKey;
  };
  durationMs: number;
}

export interface TerminalDemo {
  id: "scan" | "check" | "contract" | "diff";
  name: string;
  cmd: string;
  steps: DemoStep[];
  summary: {
    badge: string;
    details: string;
    time: string;
  };
}

export const TERMINAL_DEMOS: Record<string, TerminalDemo> = {
  scan: {
    id: "scan",
    name: "runmark scan",
    cmd: "runmark scan",
    steps: [
      {
        phase: "SCANNING",
        lines: [
          { text: "⠋ Inspecting project evidence manifests...", type: "info" }
        ],
        progress: 15,
        rightNarrative: {
          status: "Scanning project environment...",
          activeHighlight: null
        },
        durationMs: 700
      },
      {
        phase: "RUNTIMES",
        lines: [
          { text: "╭─ Runmark Environment Scan ───────────────────────────────────────────────────╮", type: "box" },
          { text: "│ Project: HerSakhi (Python, Django)                                           │", type: "box" },
          { text: "│ Host OS: Windows 11 (AMD64)                                                  │", type: "box" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Runtimes:                                                                    │", type: "box" },
          { text: "│   ✓ Python 3.12.10 (CPython 64-bit)                                          │", type: "success" },
          { text: "│   ✓ Node.js 22.19.0                                                          │", type: "success" },
          { text: "│   ✓ Git 2.53.0                                                               │", type: "success" },
          { text: "│   ✗ Docker (Not installed / Daemon inactive)                                 │", type: "warning" }
        ],
        progress: 45,
        rightNarrative: {
          status: "→ Checking runtimes & dependencies...",
          activeHighlight: "subsecond"
        },
        durationMs: 900
      },
      {
        phase: "SERVICES",
        lines: [
          { text: "╭─ Runmark Environment Scan ───────────────────────────────────────────────────╮", type: "box" },
          { text: "│ Project: HerSakhi (Python, Django)                                           │", type: "box" },
          { text: "│ Host OS: Windows 11 (AMD64)                                                  │", type: "box" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Runtimes:                                                                    │", type: "box" },
          { text: "│   ✓ Python 3.12.10 (CPython 64-bit)                                          │", type: "success" },
          { text: "│   ✓ Node.js 22.19.0                                                          │", type: "success" },
          { text: "│   ✓ Git 2.53.0                                                               │", type: "success" },
          { text: "│   ✗ Docker (Not installed / Daemon inactive)                                 │", type: "warning" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Backing Services:                                                            │", type: "box" },
          { text: "│   ✓ PostgreSQL 16.3 (Port 5432 - Active)                                     │", type: "success" },
          { text: "│   ✗ Redis (Port 6379 - Closed)                                               │", type: "warning" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Environment Variables:                                                       │", type: "box" },
          { text: "│   ✓ DATABASE_URL (Present, Secret Redacted)                                  │", type: "success" },
          { text: "│   ✓ OPENROUTER_API_KEY (Present, Secret Redacted)                            │", type: "success" }
        ],
        progress: 75,
        rightNarrative: {
          status: "→ Masking variables & secrets...",
          activeHighlight: "zerosecret"
        },
        durationMs: 900
      },
      {
        phase: "FINGERPRINT",
        lines: [
          { text: "╭─ Runmark Environment Scan ───────────────────────────────────────────────────╮", type: "box" },
          { text: "│ Project: HerSakhi (Python, Django)                                           │", type: "box" },
          { text: "│ Host OS: Windows 11 (AMD64)                                                  │", type: "box" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Runtimes:                                                                    │", type: "box" },
          { text: "│   ✓ Python 3.12.10 (CPython 64-bit)                                          │", type: "success" },
          { text: "│   ✓ Node.js 22.19.0                                                          │", type: "success" },
          { text: "│   ✓ Git 2.53.0                                                               │", type: "success" },
          { text: "│   ✗ Docker (Not installed / Daemon inactive)                                 │", type: "warning" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Backing Services:                                                            │", type: "box" },
          { text: "│   ✓ PostgreSQL 16.3 (Port 5432 - Active)                                     │", type: "success" },
          { text: "│   ✗ Redis (Port 6379 - Closed)                                               │", type: "warning" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Environment Variables:                                                       │", type: "box" },
          { text: "│   ✓ DATABASE_URL (Present, Secret Redacted)                                  │", type: "success" },
          { text: "│   ✓ OPENROUTER_API_KEY (Present, Secret Redacted)                            │", type: "success" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Canonical Digest: ce19840abda5675a69937dfa7c49bbf25ba3a2a3b10180ac3b95d1... │", type: "info" },
          { text: "│ Snapshot saved to .runmark/snapshots/snap_01J8F9X2K3Q7W.json                  │", type: "info" },
          { text: "╰──────────────────────────────────────────────────────────────────────────────╯", type: "box" }
        ],
        progress: 90,
        rightNarrative: {
          status: "→ Generating deterministic fingerprint...",
          activeHighlight: "deterministic"
        },
        durationMs: 800
      },
      {
        phase: "COMPLETE",
        lines: [
          { text: "╭─ Runmark Environment Scan ───────────────────────────────────────────────────╮", type: "box" },
          { text: "│ Project: HerSakhi (Python, Django)                                           │", type: "box" },
          { text: "│ Host OS: Windows 11 (AMD64)                                                  │", type: "box" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Runtimes:                                                                    │", type: "box" },
          { text: "│   ✓ Python 3.12.10 (CPython 64-bit)                                          │", type: "success" },
          { text: "│   ✓ Node.js 22.19.0                                                          │", type: "success" },
          { text: "│   ✓ Git 2.53.0                                                               │", type: "success" },
          { text: "│   ✗ Docker (Not installed / Daemon inactive)                                 │", type: "warning" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Backing Services:                                                            │", type: "box" },
          { text: "│   ✓ PostgreSQL 16.3 (Port 5432 - Active)                                     │", type: "success" },
          { text: "│   ✗ Redis (Port 6379 - Closed)                                               │", type: "warning" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Environment Variables:                                                       │", type: "box" },
          { text: "│   ✓ DATABASE_URL (Present, Secret Redacted)                                  │", type: "success" },
          { text: "│   ✓ OPENROUTER_API_KEY (Present, Secret Redacted)                            │", type: "success" },
          { text: "│                                                                              │", type: "box" },
          { text: "│ Canonical Digest: ce19840abda5675a69937dfa7c49bbf25ba3a2a3b10180ac3b95d1... │", type: "info" },
          { text: "│ Snapshot saved to .runmark/snapshots/snap_01J8F9X2K3Q7W.json                  │", type: "info" },
          { text: "╰──────────────────────────────────────────────────────────────────────────────╯", type: "box" },
          { text: "──────────────────────────────────────────────────────────────────────────────", type: "divider" },
          { text: "✓ Scan complete", type: "success" },
          { text: "  7 checks passed · 1 warning", type: "muted" },
          { text: "  Completed in 0.42s", type: "muted" }
        ],
        progress: 100,
        rightNarrative: {
          status: "✓ Environment scan complete",
          activeHighlight: null
        },
        durationMs: 0
      }
    ],
    summary: {
      badge: "Scan Complete",
      details: "7 passed · 1 warning",
      time: "0.42s"
    }
  },

  check: {
    id: "check",
    name: "runmark check",
    cmd: "runmark check --explain",
    steps: [
      {
        phase: "SCANNING",
        lines: [
          { text: "⠋ Evaluating host environment against runmark.json...", type: "info" }
        ],
        progress: 25,
        rightNarrative: {
          status: "Evaluating contract rules...",
          activeHighlight: null
        },
        durationMs: 700
      },
      {
        phase: "RUNTIMES",
        lines: [
          { text: "╭─ Runmark Contract Evaluation ──────────────────────────────────────────────╮", type: "box" },
          { text: "│ Contract: runmark.json (Version 1)                                         │", type: "box" },
          { text: "│ Target: Production Compatibility Baseline                                  │", type: "box" },
          { text: "│                                                                            │", type: "box" },
          { text: "│ ✓ runtime.python: >=3.11,<3.13 [Found: 3.12.10]                            │", type: "success" },
          { text: "│ ✓ runtime.node: >=20 [Found: 22.19.0]                                      │", type: "success" },
          { text: "│ ✓ runtime.git: >=2.40 [Found: 2.53.0]                                      │", type: "success" }
        ],
        progress: 60,
        rightNarrative: {
          status: "→ Checking runtime constraints...",
          activeHighlight: "subsecond"
        },
        durationMs: 900
      },
      {
        phase: "SERVICES",
        lines: [
          { text: "╭─ Runmark Contract Evaluation ──────────────────────────────────────────────╮", type: "box" },
          { text: "│ Contract: runmark.json (Version 1)                                         │", type: "box" },
          { text: "│ Target: Production Compatibility Baseline                                  │", type: "box" },
          { text: "│                                                                            │", type: "box" },
          { text: "│ ✓ runtime.python: >=3.11,<3.13 [Found: 3.12.10]                            │", type: "success" },
          { text: "│ ✓ runtime.node: >=20 [Found: 22.19.0]                                      │", type: "success" },
          { text: "│ ✓ runtime.git: >=2.40 [Found: 2.53.0]                                      │", type: "success" },
          { text: "│ ✓ service.postgresql: >=15 [Found: 16.3]                                   │", type: "success" },
          { text: "│ ✓ environment.required: DATABASE_URL [Present: Yes (Secret)]               │", type: "success" },
          { text: "│ ✓ environment.required: SECRET_KEY [Present: Yes (Secret)]                 │", type: "success" },
          { text: "╰────────────────────────────────────────────────────────────────────────────╯", type: "box" }
        ],
        progress: 85,
        rightNarrative: {
          status: "→ Verifying service requirements & secrets...",
          activeHighlight: "zerosecret"
        },
        durationMs: 800
      },
      {
        phase: "COMPLETE",
        lines: [
          { text: "╭─ Runmark Contract Evaluation ──────────────────────────────────────────────╮", type: "box" },
          { text: "│ Contract: runmark.json (Version 1)                                         │", type: "box" },
          { text: "│ Target: Production Compatibility Baseline                                  │", type: "box" },
          { text: "│                                                                            │", type: "box" },
          { text: "│ ✓ runtime.python: >=3.11,<3.13 [Found: 3.12.10]                            │", type: "success" },
          { text: "│ ✓ runtime.node: >=20 [Found: 22.19.0]                                      │", type: "success" },
          { text: "│ ✓ runtime.git: >=2.40 [Found: 2.53.0]                                      │", type: "success" },
          { text: "│ ✓ service.postgresql: >=15 [Found: 16.3]                                   │", type: "success" },
          { text: "│ ✓ environment.required: DATABASE_URL [Present: Yes (Secret)]               │", type: "success" },
          { text: "│ ✓ environment.required: SECRET_KEY [Present: Yes (Secret)]                 │", type: "success" },
          { text: "╰────────────────────────────────────────────────────────────────────────────╯", type: "box" },
          { text: "──────────────────────────────────────────────────────────────────────────────", type: "divider" },
          { text: "✓ PASS: 6/6 checks satisfied", type: "success" },
          { text: "  Host machine satisfies project environment contract. Ready to run!", type: "muted" },
          { text: "  Evaluated in 0.18s", type: "muted" }
        ],
        progress: 100,
        rightNarrative: {
          status: "✓ Contract evaluation passed",
          activeHighlight: null
        },
        durationMs: 0
      }
    ],
    summary: {
      badge: "Contract Satisfied",
      details: "6/6 passed",
      time: "0.18s"
    }
  },

  contract: {
    id: "contract",
    name: "contract init",
    cmd: "runmark contract init --dry-run",
    steps: [
      {
        phase: "SCANNING",
        lines: [
          { text: "⠋ Inspecting project evidence manifests...", type: "info" }
        ],
        progress: 25,
        rightNarrative: {
          status: "Discovering project signatures...",
          activeHighlight: null
        },
        durationMs: 700
      },
      {
        phase: "RUNTIMES",
        lines: [
          { text: "🔍 Discovered Project Signals:", type: "info" },
          { text: "  ✓ Python project detected (pyproject.toml: python >=3.12)", type: "success" },
          { text: "  ✓ PostgreSQL requirement found (compose.yaml: image postgres:16)", type: "success" },
          { text: "  ✓ Required environment variables parsed (.env.example)", type: "success" }
        ],
        progress: 60,
        rightNarrative: {
          status: "→ Inferring environment boundaries...",
          activeHighlight: "subsecond"
        },
        durationMs: 900
      },
      {
        phase: "FINGERPRINT",
        lines: [
          { text: "🔍 Discovered Project Signals:", type: "info" },
          { text: "  ✓ Python project detected (pyproject.toml: python >=3.12)", type: "success" },
          { text: "  ✓ PostgreSQL requirement found (compose.yaml: image postgres:16)", type: "success" },
          { text: "  ✓ Required environment variables parsed (.env.example)", type: "success" },
          { text: "", type: "muted" },
          { text: "Synthesized Contract Candidate:", type: "info" },
          { text: "  • platform: [\"windows\", \"linux\", \"darwin\"]", type: "muted" },
          { text: "  • runtime: {\"python\": \">=3.12\", \"node\": \">=22\"}", type: "muted" },
          { text: "  • services: {\"postgresql\": {\"version\": \">=16\", \"required\": true}}", type: "muted" },
          { text: "  • environment: {\"required\": [\"DATABASE_URL\", \"SECRET_KEY\"]}", type: "muted" }
        ],
        progress: 85,
        rightNarrative: {
          status: "→ Generating contract schema...",
          activeHighlight: "deterministic"
        },
        durationMs: 800
      },
      {
        phase: "COMPLETE",
        lines: [
          { text: "🔍 Discovered Project Signals:", type: "info" },
          { text: "  ✓ Python project detected (pyproject.toml: python >=3.12)", type: "success" },
          { text: "  ✓ PostgreSQL requirement found (compose.yaml: image postgres:16)", type: "success" },
          { text: "  ✓ Required environment variables parsed (.env.example)", type: "success" },
          { text: "", type: "muted" },
          { text: "Synthesized Contract Candidate:", type: "info" },
          { text: "  • platform: [\"windows\", \"linux\", \"darwin\"]", type: "muted" },
          { text: "  • runtime: {\"python\": \">=3.12\", \"node\": \">=22\"}", type: "muted" },
          { text: "  • services: {\"postgresql\": {\"version\": \">=16\", \"required\": true}}", type: "muted" },
          { text: "  • environment: {\"required\": [\"DATABASE_URL\", \"SECRET_KEY\"]}", type: "muted" },
          { text: "──────────────────────────────────────────────────────────────────────────────", type: "divider" },
          { text: "✓ Contract blueprint synthesized", type: "success" },
          { text: "  [Dry Run] No files modified. Run with --yes to generate runmark.json.", type: "muted" }
        ],
        progress: 100,
        rightNarrative: {
          status: "✓ Contract blueprint ready",
          activeHighlight: null
        },
        durationMs: 0
      }
    ],
    summary: {
      badge: "Contract Ready",
      details: "Schema synthesized",
      time: "0.22s"
    }
  },

  diff: {
    id: "diff",
    name: "runmark diff",
    cmd: "runmark diff",
    steps: [
      {
        phase: "SCANNING",
        lines: [
          { text: "⠋ Comparing baseline snapshot against current host environment...", type: "info" }
        ],
        progress: 30,
        rightNarrative: {
          status: "Comparing environment digests...",
          activeHighlight: null
        },
        durationMs: 700
      },
      {
        phase: "RUNTIMES",
        lines: [
          { text: "⚠ Environment Drift Detected (2 differences):", type: "warning" },
          { text: "  [CHANGED] Python Runtime: 3.12.10 → 3.11.9 (WARNING)", type: "warning" },
          { text: "  [CHANGED] OS Platform: Windows → Linux (WARNING)", type: "warning" },
          { text: "  [UNCHANGED] PostgreSQL: 16.3 (Port 5432)", type: "muted" },
          { text: "  [UNCHANGED] Node.js: 22.19.0", type: "muted" }
        ],
        progress: 75,
        rightNarrative: {
          status: "→ Spotting environment deviations...",
          activeHighlight: "subsecond"
        },
        durationMs: 900
      },
      {
        phase: "COMPLETE",
        lines: [
          { text: "⚠ Environment Drift Detected (2 differences):", type: "warning" },
          { text: "  [CHANGED] Python Runtime: 3.12.10 → 3.11.9 (WARNING)", type: "warning" },
          { text: "  [CHANGED] OS Platform: Windows → Linux (WARNING)", type: "warning" },
          { text: "  [UNCHANGED] PostgreSQL: 16.3 (Port 5432)", type: "muted" },
          { text: "  [UNCHANGED] Node.js: 22.19.0", type: "muted" },
          { text: "──────────────────────────────────────────────────────────────────────────────", type: "divider" },
          { text: "⚠ 2 discrepancies flagged", type: "warning" },
          { text: "  Run 'runmark doctor' to view actionable remediation advice.", type: "muted" }
        ],
        progress: 100,
        rightNarrative: {
          status: "⚠ Drift detected — remedies ready",
          activeHighlight: null
        },
        durationMs: 0
      }
    ],
    summary: {
      badge: "Drift Flagged",
      details: "2 differences found",
      time: "0.29s"
    }
  }
};
