import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#05070B",
        blueDark: "#09111D",
        gold: "#D8A74A",
        goldLight: "#E7C06A",
        textPrimary: "#F7F4EE",
        textSecondary: "#B8BDC7"
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(216, 167, 74, 0.4), 0 12px 40px rgba(216, 167, 74, 0.15)"
      }
    }
  },
  plugins: []
} satisfies Config;
