/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Added src/ just in case
  ],
  theme: {
    extend: {
      colors: {
        // Just use the name; Tailwind provides bg-, text-, border- prefixes
        'main-black': '#000000',
        'card-dark': '#161616',
        'border-dim': '#262626',
        'cta-orange': '#FF6A00',
        'brand-red': '#9E1B32',
      },
    },
  },
  plugins: [],
};