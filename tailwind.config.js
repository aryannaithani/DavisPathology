/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#E94B35",
          foreground: "#FFFFFF",
          50: "#FEF2F0",
          100: "#FDE1DC",
          200: "#FBC3B9",
          300: "#F89688",
          400: "#F16D5A",
          500: "#E94B35",
          600: "#D63520",
          700: "#B42A1A",
          800: "#8F2317",
          900: "#6E1E15",
        },
        secondary: {
          DEFAULT: "#F5C542",
          foreground: "#171717",
          50: "#FEFAEB",
          100: "#FDF3CD",
          200: "#FBE89C",
          300: "#F8D96B",
          400: "#F5C542",
          500: "#E6AD1E",
          600: "#C88E14",
          700: "#A06E12",
          800: "#7A5513",
          900: "#634515",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "#737373",
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
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
