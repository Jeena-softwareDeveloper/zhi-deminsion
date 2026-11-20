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
          orange: "#F97316",
          "orange-hover": "#EA580C",
          "orange-dark": "#C2410C",
          "orange-light": "#FFF7ED",
          dark: "#0B1320",
          navy: "#0F172A",
          surface: "#1E293B",
          card: "#FFFFFF",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["'Montserrat'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["'Montserrat'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
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
