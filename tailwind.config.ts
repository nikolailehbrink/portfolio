import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import resolveConfig from "tailwindcss/resolveConfig";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
      },
    },
    extend: {
      screens: { "2xl": "1440px" },
      fontFamily: {
        blinker: ["var(--font-blinker)", ...defaultTheme.fontFamily.sans],
      },
      grayscale: {
        50: "50%",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        blue: {
          DEFAULT: "#0B8DD8",
          50: "#F8FCFF",
          100: "#DBF1FD",
          200: "#A0D9FA",
          300: "#66C2F7",
          400: "#2CABF4",
          500: "#0B8DD8",
          600: "#0974B1",
          700: "#075A8A",
          800: "#054164",
          900: "#03283D",
        },
        orange: {
          DEFAULT: "#FF8116",
          50: "#FFFDFC",
          100: "#FFEFE2",
          200: "#FFD4AF",
          300: "#FFB87C",
          400: "#FF9D49",
          500: "#FF8116",
          600: "#E26800",
          700: "#AF5000",
          800: "#7C3900",
          900: "#492200",
        },
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
    },
  },
  plugins: [typography, containerQueries, scrollbar, animate],
} satisfies Config;

export default config;

export const tailwindConfig = resolveConfig(config);
