/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // laat staan of verwijder als je geen /app gebruikt
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0b121a", // alias voor jouw achtergrondkleur
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
