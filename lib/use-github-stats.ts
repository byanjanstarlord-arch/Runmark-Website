"use client";

import { useState, useEffect } from "react";

interface GitHubStats {
  stars: number | null;
  forks: number | null;
  openIssues: number | null;
  latestTag: string;
  loading: boolean;
  error: boolean;
}

export function useGitHubStats(repoPath: string = "byanjanstarlord-arch/Runmark") {
  const [stats, setStats] = useState<GitHubStats>({
    stars: null,
    forks: null,
    openIssues: null,
    latestTag: "v0.2.2",
    loading: true,
    error: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();
        if (isMounted) {
          setStats({
            stars: typeof data.stargazers_count === "number" ? data.stargazers_count : null,
            forks: typeof data.forks_count === "number" ? data.forks_count : null,
            openIssues: typeof data.open_issues_count === "number" ? data.open_issues_count : null,
            latestTag: "v0.2.2",
            loading: false,
            error: false,
          });
        }
      } catch (err) {
        if (isMounted) {
          setStats((prev) => ({
            ...prev,
            loading: false,
            error: true,
          }));
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [repoPath]);

  return stats;
}
