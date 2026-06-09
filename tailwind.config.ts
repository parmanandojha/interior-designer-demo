import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        bone: "#f4f0ea",
        paper: "#eeeae3",
        mute: "#8a857d",
        line: "#1a1a1a",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        display: ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "1", letterSpacing: "-0.045em" }],
        section: ["clamp(1.875rem, 3.5vw, 3.25rem)", { lineHeight: "1.3", letterSpacing: "-0.035em" }],
        card: ["clamp(1.25rem, 1.65vw, 1.75rem)", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        lead: ["clamp(1.05rem, 1.15vw, 1.25rem)", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        hero: ["clamp(1.875rem, 3.5vw, 3.25rem)", { lineHeight: "1.3", letterSpacing: "-0.035em" }],
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
