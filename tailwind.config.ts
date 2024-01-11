import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
      fontFamily: {
        sans: ["var(--font-blinker)", ...defaultTheme.fontFamily.sans],
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
      },
      grayscale: {
        50: "50%",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("tailwind-scrollbar"),
    require("tailwindcss-animate"),
  ],
};
export default config;
