import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["Fira Code", "Consolas", "Monaco", "Courier New", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        "paper-foreground": "var(--paper-foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
