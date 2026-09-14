module.exports = {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── HEALWEAL 10X Design Tokens ── */
        "hw-primary": "#0B1220",
        "hw-accent": "#214ECF",
        "hw-accent-hover": "#1A3EB0",
        "hw-surface-soft": "#F5F7FA",
        "hw-surface-subtle": "#FAFCFF",
        "hw-text-primary": "#111827",
        "hw-text-secondary": "#667085",
        "hw-text-tertiary": "#98A2B3",
        "hw-teal": "#00B388",

        /* Legacy mappings preserved for full compatibility */
        "hw-white": "#FFFFFF",
        "hw-lightblue": "#F5F7FA",
        "hw-lightblue2": "#EEF4FF",
        "hw-navy": "#0B1220",
        "hw-indigo": "#214ECF",
        "hw-cyan": "#22C1FF",
        "hw-slate": "#667085",
        "hw-mist": "#F8FAFC",

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
        "hw-sm": "0 1px 2px rgba(11, 18, 32, 0.04)",
        "hw-md": "0 4px 20px -2px rgba(11, 18, 32, 0.05), 0 2px 6px -1px rgba(11, 18, 32, 0.03)",
        "hw-lg": "0 16px 40px -4px rgba(11, 18, 32, 0.08), 0 4px 12px -2px rgba(11, 18, 32, 0.02)",
        "hw-card": "0 1px 3px rgba(11, 18, 32, 0.04), 0 8px 24px rgba(11, 18, 32, 0.04)",
        "hw-card-hover": "0 16px 40px -4px rgba(33, 78, 207, 0.10), 0 6px 16px -2px rgba(11, 18, 32, 0.06)",
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
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  darkMode: ["class"],
};
