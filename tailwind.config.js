/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand Colors (light theme — trust blue on gray) ──
        brand: {
          50:  "#f0f6fc",
          100: "#e2ecf7",
          200: "#c5d9ef",
          300: "#94b8e0",
          400: "#5b94d0",
          500: "#3b7fc9",
          600: "#2563b8",
          700: "#1d549f",
          800: "#1a457f",
          900: "#173a66",
          950: "#0f2744",
        },
        // ── Semantic Aliases ──────────────────────────
        primary: {
          DEFAULT: "#2563b8",
          foreground: "#ffffff",
          hover: "#1d549f",
        },
        secondary: {
          DEFAULT: "#173a66",
          foreground: "#ffffff",
          hover: "#1a457f",
        },
        accent: {
          DEFAULT: "#60a5fa",
          foreground: "#1e3a8a",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        background: "#fafbfc",
        foreground: "#1e293b",
        border: "#e2e7ee",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg":  ["3rem",    { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-md":  ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.3" }],
      },
      spacing: {
        "section": "6rem",
        "section-sm": "4rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "blue-sm": "0 2px 8px rgba(37, 99, 235, 0.15)",
        "blue-md": "0 4px 16px rgba(37, 99, 235, 0.2)",
        "blue-lg": "0 8px 32px rgba(37, 99, 235, 0.25)",
        "blue-xl": "0 16px 48px rgba(37, 99, 235, 0.3)",
        "card":    "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 6px rgba(0,0,0,0.05), 0 10px 40px rgba(37,99,235,0.12)",
      },
      backgroundImage: {
        "gradient-blue": "linear-gradient(135deg, #3b7fc9 0%, #2563b8 100%)",
        "gradient-blue-light": "linear-gradient(135deg, #f5f7fa 0%, #eef4fb 50%, #e2ecf7 100%)",
        "gradient-hero": "linear-gradient(160deg, #fafbfc 0%, #f3f5f8 35%, #eef2f7 60%, #e8f0fa 100%)",
        "gradient-hero-accent": "radial-gradient(ellipse 80% 60% at 85% 15%, rgba(59, 127, 201, 0.12) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 10% 80%, rgba(37, 99, 184, 0.08) 0%, transparent 50%)",
        "gradient-hero-dark": "linear-gradient(135deg, #0f2744 0%, #173a66 40%, #1d549f 75%, #2563b8 100%)",
        "gradient-cta": "linear-gradient(135deg, #173a66 0%, #1d549f 50%, #2563b8 100%)",
        "gradient-mesh": "radial-gradient(at 40% 20%, rgba(59, 127, 201, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(37, 99, 184, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(148, 184, 224, 0.2) 0px, transparent 50%)",
        "noise": "url('/images/noise.svg')",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "slide-in":   "slideIn 0.5s ease forwards",
        "float":      "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
