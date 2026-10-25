import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── HEALWEAL Monochrome Design Tokens ── */
        "hw-primary": "#000000",
        "hw-accent": "#000000",
        "hw-accent-hover": "#18181B",
        "hw-surface-soft": "#F4F4F5",
        "hw-surface-subtle": "#FAFAFA",
        "hw-text-primary": "#000000",
        "hw-text-secondary": "#52525B",
        "hw-text-tertiary": "#71717A",

        /* Neutral monochrome utility mappings */
        "hw-white": "#FFFFFF",
        "hw-gray-50": "#FAFAFA",
        "hw-gray-100": "#F4F4F5",
        "hw-gray-200": "#E4E4E7",
        "hw-gray-300": "#D4D4D8",
        "hw-gray-500": "#71717A",
        "hw-gray-600": "#52525B",
        "hw-gray-900": "#18181B",

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
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        display: [
          '"Plus Jakarta Sans"',
          "Inter",
          "sans-serif",
        ],
      },
      boxShadow: {
        "hw-sm": "0 1px 2px rgba(0, 0, 0, 0.04)",
        "hw-md": "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)",
        "hw-lg": "0 16px 40px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.02)",
        "hw-card": "0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.04)",
        "hw-card-hover": "0 16px 40px -4px rgba(0, 0, 0, 0.12), 0 6px 16px -2px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
  darkMode: ["class"],
} satisfies Config;
