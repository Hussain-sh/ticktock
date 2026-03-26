import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#E5E7EB",
          500: "#6B7280",
          900: "#111928",
        },
        primary: {
          600: "#1C64F2",
          700: "#1A56DB",
        },
      },
    },
  },
};

export default config;
