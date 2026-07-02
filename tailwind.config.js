/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F1E8",
        sand: "#D8B98A",
        terracotta: "#B8754D",
        nile: "#2F7890",
        "nile-deep": "#123F4A",
        palm: "#6F8A5B",
        gold: "#C9A45C",
        brown: "#241A13",
        sky: "#D3E6EC",
        "sky-deep": "#A9CBD6",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
