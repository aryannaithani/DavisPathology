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
          DEFAULT: "#F1654C",
          foreground: "#FFFFFF",
          50: "#FEF4F2",
          100: "#FDE6E2",
          200: "#FBCDC4",
          300: "#F7A89A",
          400: "#F47D68",
          500: "#F1654C",
          600: "#DF472B",
          700: "#BB341C",
          800: "#952C1A",
          900: "#7A281A",
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
