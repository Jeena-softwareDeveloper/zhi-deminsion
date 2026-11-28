import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0052CC",
          "primary-hover": "#003D99",
          "primary-dark": "#002B6B",
          "primary-light": "#EFF6FF",
          blue: "#0052CC",
          "blue-hover": "#003D99",
          "blue-dark": "#002B6B",
          "blue-light": "#EFF6FF",
          orange: "#F97316",
          "orange-hover": "#EA580C",
          "orange-dark": "#C2410C",
          "orange-light": "#FFF7ED",
          dark: "#0B1320",
          navy: "#0F172A",
          surface: "#1E293B",
          card: "#FFFFFF",
          light: "#F8FAFC",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Times New Roman", "Georgia", "serif"],
        display: ["var(--font-heading)", "Times New Roman", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        tight: '-0.015em',
        normal: '0',
        wide: '0.02em',
        wider: '0.05em',
        widest: '0.15em',
        brand: '0.28em',
      },
    },
  },
  plugins: [],
};
export default config;
