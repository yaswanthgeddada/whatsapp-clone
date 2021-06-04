const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      pale: {
        light: "#262d31",
        DEFAULT: "#131c21",
      },
      wgreen: "#1d6f70",
      wbgreen: "#00af9c",
      profileHead: "#323739",

      transparent: "transparent",
      current: "currentColor",
      gray: colors.trueGray,
      white: colors.white,
      red: colors.red,
      blue: colors.lightBlue,
      yellow: colors.amber,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
