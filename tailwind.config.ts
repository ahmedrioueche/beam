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
          secondary: '#FF6B6B', //
          background: '#f4f4f5', // Light gray background for soft contrast
          foreground: '#1f1f23', // Very dark gray for text
          surface: '#ffffff', // Pure white for cards and surfaces
          muted: '#71717a', // Muted gray for secondary text
          text: {
            primary: '#36454F', //Charcoal
            secondary: '#71717a', // Muted gray for secondary text
          },
        },
        dark: {
          primary: '#C95FF9', // Slightly lighter purple for dark mode contrast
          secondary: '#D5006D', // Cooler green for contrast on dark backgrounds
          background: '#1E1E24', // Dark gray for background
          foreground: '#E4E4EB', // Light gray for text on dark mode
          surface: '#2C2C34', // Darker surface for cards, etc.
          muted: '#a1a1aa', // Muted light gray for secondary text
          text: {
            primary: '#FCF5E5', //Parchment
            secondary: '#A1A1AA', // Muted light gray for secondary text on dark mode
          },
        },
      },
      fontFamily: {
        f1: ['Gelasio', 'serif'],
        f2: ['Satisfy', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
  ],
  darkMode: 'class',  
};

export default config;
