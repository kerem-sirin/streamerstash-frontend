// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7C3AED', // A vibrant purple
        'primary-focus': '#6D28D9', // A darker purple for hover/focus states
        'secondary': '#F3F4F6', // A light gray for backgrounds
        'accent': '#F59E0B',    // A warm amber for call-to-action elements
        'dark-primary': '#111827', // Dark background for dark mode
        'dark-secondary': '#1F2937', // Slightly lighter dark background
      }
    },
  },
  plugins: [],
}