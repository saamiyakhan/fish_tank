import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // FISHY Aquatic Colors
        ocean: {
          DEFAULT: "hsl(var(--ocean-blue))",
          50: "hsl(200 100% 95%)",
          100: "hsl(200 100% 90%)",
          500: "hsl(var(--ocean-blue))",
          600: "hsl(200 100% 35%)",
          700: "hsl(200 100% 25%)",
        },
        teal: {
          DEFAULT: "hsl(var(--teal))",
          400: "hsl(180 100% 45%)",
          500: "hsl(var(--teal))",
          600: "hsl(180 100% 25%)",
        },
        aqua: {
          DEFAULT: "hsl(var(--aqua))",
          400: "hsl(185 85% 65%)",
          500: "hsl(var(--aqua))",
          600: "hsl(185 85% 45%)",
        },
        seafoam: "hsl(var(--seafoam))",
        coral: "hsl(var(--coral))",
        deep: "hsl(var(--deep-blue))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "water-wave": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bubble": {
          "0%": { transform: "translateY(100%) scale(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-100%) scale(1)", opacity: "0" },
        },
        "tab-slide": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "water-wave": "water-wave 3s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "bubble": "bubble 2s linear infinite",
        "tab-slide": "tab-slide 0.3s ease-out",
      },
      backgroundImage: {
        "gradient-ocean": "var(--gradient-ocean)",
        "gradient-aqua": "var(--gradient-aqua)",
        "gradient-deep": "var(--gradient-deep)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
