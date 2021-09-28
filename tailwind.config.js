module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#009660",
        secondary: "#1D2325",
        third: "#121213",
      },

      fontFamily: {
        roboto: ["Roboto"],
        monsterrat: ["Montserrat"],
      },

      minHeight: {
        minHForIndexPicture: "13rem",
      },

      maxHeight: {
        maxHForIndexPicture: "13rem",
      },

      minWidth: {
        minWForIndexPicture: "15rem",
      },

      maxWidth: {
        maxWForIndexPicture: "15rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
