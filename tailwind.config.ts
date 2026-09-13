import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "muted-foreground": "var(--muted-foreground)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        card: "var(--card)",
        border: "var(--border)",
        success: "var(--success)",
        error: "var(--error)",
        terminal: {
          DEFAULT: "var(--terminal)",
          border: "var(--terminal-border)",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "warm-sm": "0 1px 2px rgba(32, 33, 36, 0.04), 0 1px 1px rgba(32, 33, 36, 0.02)",
        "warm-md": "0 4px 12px rgba(32, 33, 36, 0.06), 0 1px 3px rgba(32, 33, 36, 0.04)",
        "warm-lg": "0 12px 28px rgba(32, 33, 36, 0.08), 0 2px 6px rgba(32, 33, 36, 0.04)",
        "warm-xl": "0 20px 40px rgba(32, 33, 36, 0.1), 0 4px 12px rgba(32, 33, 36, 0.05)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      }
    },
  },
  plugins: [],
};
export default config;
