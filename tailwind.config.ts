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
          primary: "#0066FF",
          "primary-hover": "#0052CC",
          "primary-dark": "#0040A8",
          "primary-light": "#EFF6FF",
          blue: "#0066FF",
          "blue-hover": "#0052CC",
          "blue-dark": "#0040A8",
          "blue-light": "#EFF6FF",
          orange: "#0066FF",
          "orange-hover": "#0052CC",
          "orange-dark": "#0040A8",
          "orange-light": "#EFF6FF",
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
