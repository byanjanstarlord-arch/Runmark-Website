export interface EnvironmentState {
  python: string;
  django: string;
  os: string;
  node: string;
  packageManager: string;
  postgres: string;
  redis: string;
  docker: string;
}

export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  envA: EnvironmentState;
  envB: EnvironmentState;
}

export const playgroundOptions = {
  python: ["3.12.4", "3.12.10", "3.11.9", "3.10.14", "3.9.18", "Not Installed"],
  django: ["5.1.2", "5.0.6", "4.2.13", "4.1.10", "Not Installed"],
  os: ["Windows 11", "Ubuntu 24.04 (Linux)", "macOS Sequoia (Darwin)", "Debian 12 (Linux)"],
  node: ["22.14.0", "20.18.0", "18.20.4", "16.20.2", "Not Installed"],
  packageManager: ["npm", "pnpm", "yarn", "uv", "pip", "Not Installed"],
  postgres: ["16.3", "15.7", "14.12", "Stopped", "Not Installed"],
  redis: ["7.2.4", "7.0.15", "6.2.14", "Stopped", "Not Installed"],
  docker: ["28.0.1", "26.1.4", "24.0.7", "Daemon Stopped", "Not Installed"]
};

export const defaultEnvA: EnvironmentState = {
  python: "3.12.4",
  django: "5.1.2",
  os: "Windows 11",
  node: "22.14.0",
  packageManager: "npm",
  postgres: "16.3",
  redis: "7.2.4",
  docker: "28.0.1"
};

export const defaultEnvB: EnvironmentState = {
  python: "3.11.9",
  django: "5.1.2",
  os: "Ubuntu 24.04 (Linux)",
  node: "20.18.0",
  packageManager: "yarn",
  postgres: "16.3",
  redis: "Stopped",
  docker: "28.0.1"
};

export const playgroundPresets: PresetScenario[] = [
  {
    id: "classic-drift",
    name: "Classic Team Onboarding Drift",
    description: "New developer machine has newer Python & Node, but background Redis is stopped.",
    envA: {
      python: "3.12.4",
      django: "5.1.2",
      os: "Windows 11",
      node: "22.14.0",
      packageManager: "npm",
      postgres: "16.3",
      redis: "7.2.4",
      docker: "28.0.1"
    },
    envB: {
      python: "3.11.9",
      django: "5.1.2",
      os: "Ubuntu 24.04 (Linux)",
      node: "20.18.0",
      packageManager: "yarn",
      postgres: "16.3",
      redis: "Stopped",
      docker: "28.0.1"
    }
  },
  {
    id: "perfect-match",
    name: "Exact Environment Parity",
    description: "Both environments are identical in every runtime, dependency, and service.",
    envA: {
      python: "3.12.4",
      django: "5.1.2",
      os: "Ubuntu 24.04 (Linux)",
      node: "22.14.0",
      packageManager: "uv",
      postgres: "16.3",
      redis: "7.2.4",
      docker: "28.0.1"
    },
    envB: {
      python: "3.12.4",
      django: "5.1.2",
      os: "Ubuntu 24.04 (Linux)",
      node: "22.14.0",
      packageManager: "uv",
      postgres: "16.3",
      redis: "7.2.4",
      docker: "28.0.1"
    }
  },
  {
    id: "missing-runtime",
    name: "Critical Missing Service & Runtime Mismatch",
    description: "Missing Postgres and major Python version mismatch causing immediate runtime crashes.",
    envA: {
      python: "3.12.4",
      django: "5.1.2",
      os: "macOS Sequoia (Darwin)",
      node: "22.14.0",
      packageManager: "pnpm",
      postgres: "16.3",
      redis: "7.2.4",
      docker: "28.0.1"
    },
    envB: {
      python: "3.9.18",
      django: "4.2.13",
      os: "Ubuntu 24.04 (Linux)",
      node: "18.20.4",
      packageManager: "npm",
      postgres: "Not Installed",
      redis: "Not Installed",
      docker: "Daemon Stopped"
    }
  }
];

export interface DiffResult {
  property: string;
  label: string;
  valA: string;
  valB: string;
  status: "same" | "changed" | "critical" | "warning";
  explanation?: string;
}

export function computeEnvironmentDiff(envA: EnvironmentState, envB: EnvironmentState): DiffResult[] {
  const fields: { key: keyof EnvironmentState; label: string }[] = [
    { key: "python", label: "Python Runtime" },
    { key: "django", label: "Django Framework" },
    { key: "os", label: "Operating System" },
    { key: "node", label: "Node.js Runtime" },
    { key: "packageManager", label: "Package Manager" },
    { key: "postgres", label: "PostgreSQL Service" },
    { key: "redis", label: "Redis Service" },
    { key: "docker", label: "Docker Container Tool" }
  ];

  return fields.map(({ key, label }) => {
    const valA = envA[key];
    const valB = envB[key];

    if (valA === valB) {
      return {
        property: key,
        label,
        valA,
        valB,
        status: "same"
      };
    }

    // Determine severity
    let status: "changed" | "critical" | "warning" = "changed";
    let explanation = "";

    if (valB === "Not Installed" || valB === "Stopped" || valB === "Daemon Stopped") {
      status = "critical";
      explanation = `${label} is required on Environment B but is currently ${valB}.`;
    } else if (key === "python" || key === "node") {
      status = "warning";
      explanation = `Runtime version discrepancy may trigger syntax errors or incompatible binary wheels.`;
    } else if (key === "os") {
      status = "warning";
      explanation = `OS differences can cause path delimiter issues, line-ending mismatches, or missing C bindings.`;
    } else {
      status = "changed";
      explanation = `${label} versions differ between machines.`;
    }

    return {
      property: key,
      label,
      valA,
      valB,
      status,
      explanation
    };
  });
}
