/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        abcWhyte: ["ABC Whyte", "sans-serif"],
        abcWhyteVar: ["ABC Whyte Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
