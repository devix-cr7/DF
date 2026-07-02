import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forge: {
          bg: "rgb(var(--forge-bg) / <alpha-value>)",
          panel: "rgb(var(--forge-panel) / <alpha-value>)",
          panel2: "rgb(var(--forge-panel2) / <alpha-value>)",
          border: "rgb(var(--forge-border) / <alpha-value>)",
          borderHi: "rgb(var(--forge-borderHi) / <alpha-value>)",
          text: "rgb(var(--forge-text) / <alpha-value>)",
          muted: "rgb(var(--forge-muted) / <alpha-value>)",
          faint: "rgb(var(--forge-faint) / <alpha-value>)",
        },
        ember: {
          50: "#FFF4E9",
          200: "#F3C08A",
          400: "#E8963F",
          500: "#D97B2B",
          600: "#B9601C",
          700: "#8F4A16",
        },
        temper: {
          400: "#5B93B8",
          500: "#3E6B8A",
          600: "#2E5268",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.5)",
        glow: "0 0 0 1px rgba(217,123,43,0.25), 0 0 24px -4px rgba(217,123,43,0.35)",
      },
      backgroundImage: {
        "forge-gradient": "linear-gradient(135deg, #D97B2B 0%, #B9601C 45%, #8F4A16 100%)",
        "steel-gradient": "linear-gradient(180deg, #161920 0%, #111317 100%)",
      },
      keyframes: {
        "pour": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "ember-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "rise": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pour: "pour 3s ease-in-out infinite",
        "ember-pulse": "ember-pulse 2.4s ease-in-out infinite",
        rise: "rise 0.35s cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
