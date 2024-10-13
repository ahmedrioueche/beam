import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#B816F9', // Vibrant purple as the primary color
          secondary: '#16F96A', // Bright green for contrast and accents
          background: '#f4f4f5', // Light gray background for soft contrast
          foreground: '#1f1f23', // Very dark gray for text
          surface: '#ffffff', // Pure white for cards and surfaces
          muted: '#71717a', // Muted gray for secondary text
        },
        dark: {
          primary: '#C95FF9', // Slightly lighter purple for dark mode contrast
          secondary: '#16F9B3', // Cooler green for contrast on dark backgrounds
          background: '#1E1E24', // Dark gray for background
          foreground: '#E4E4EB', // Light gray for text on dark mode
          surface: '#2C2C34', // Darker surface for cards, etc.
          muted: '#a1a1aa', // Muted light gray for secondary text
        },
      },
      fontFamily: {
        f_1: ['Gelasio', 'serif'],
        f_2: ['Sacramento', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
  ],
  darkMode: 'class',  
};
export default config;
