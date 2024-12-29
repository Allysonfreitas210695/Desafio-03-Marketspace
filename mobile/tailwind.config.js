/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#364D9D",
          600: "#647AC7",
        },
        red: {
          600: "#EE7979",
        },
        gray: {
          100: "#1A181B",
          200: "#3E3A40",
          300: "#5F5B62",
          400: "#9F9BA1",
          500: "#D9D8DA",
          600: "#EDECEE",
          700: "#F7F7F8",
        },
      },
      fontFamily: {
        regular: ["Karla_400Regular"],
        bold: ["Karla_700Bold"],
      },
    },
  },
  plugins: [],
};
