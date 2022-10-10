/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        abcWhyte: ["ABC Whyte Regular", "sans-serif"],
        abcWhyteVar: ["ABC Whyte Variable", "sans-serif"],
      },
      colors: {
        "accent-dark": "#191919",
        "dark-bg": "#111",
        slate: colors.slate,
        blue: colors.blue,
        gray: colors.gray,
        red: colors.red,
        yellow: colors.yellow,
        white: colors.white,
        black: colors.black,
        transparent: colors.transparent,
        zinc: colors.zinc,
        neutral: colors.neutral,
        rose: colors.rose,
        amber: colors.amber,
        lime: colors.lime,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        indigo: colors.indigo,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        orange: colors.orange,
        green: colors.green,
      },
    },
  },
  plugins: [],
};
