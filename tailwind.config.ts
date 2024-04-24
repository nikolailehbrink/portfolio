import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";
import resolveConfig from "tailwindcss/resolveConfig";
import type { PluginAPI } from "tailwindcss/types/config";

const config = {
  darkMode: "selector",
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
      typography: (theme: PluginAPI["theme"]) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.neutral.50"),
              borderBottom: "2px solid",
              borderColor: theme("colors.neutral.700"),
              textDecoration: "none",
              lineHeight: "1.2",
              "&:hover": {
                borderColor: theme("colors.neutral.50"),
              },
            },
            h1: {
              margin: ".75rem 0",
              fontSize: "3rem",
            },
            h2: {
              margin: ".75em 0 .5em",
            },
            h3: {
              margin: ".75em 0 .5em",
            },
            h4: {
              margin: ".75em 0 .5em",
            },
            p: {
              margin: "0.75em 0",
              lineHeight: "1.5",
            },
            img: {
              margin: 0,
            },
          },
        },
        lg: {
          css: {
            h1: {
              margin: ".75em 0",
            },
            h2: {
              margin: ".75em 0 .5em",
            },
            h3: {
              margin: ".75em 0 .5em",
            },
            h4: {
              margin: ".75em 0 .5em",
            },
            p: {
              margin: "0.75em 0",
              lineHeight: "1.5",
            },
            img: {
              margin: 0,
            },
          },
        },
      }),
      screens: { "2xl": "1440px" },
      fontFamily: {
        blinker: ["var(--font-blinker)", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-160": "linear-gradient(160deg, var(--tw-gradient-stops))",
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
