// tailwind.config.js
module.exports = {
  corePlugins: {
    listStyleType: false,
  },
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: "none",
              color: theme("colors.blue.600"),
              fontWeight: "600",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            // ul:{
            //   listStyleType: 'disc',
            // }
          },
        },
      }),
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
        minHForCommentAvatar: "3rem",
        minHForSidePic: "80px",
      },

      maxHeight: {
        maxHForIndexPicture: "13rem",
        maxHForCommentAvatar: "3rem",
        maxHForSidePic: "80px",
      },

      minWidth: {
        minWForIndexPicture: "15rem",
        minWForCommentAvatar: "3rem",
        minWForSidePic: "100px",
      },

      maxWidth: {
        maxWForIndexPicture: "15rem",
        maxWForCommentAvatar: "3rem",
        maxWForSidePic: "100px",
      },

      height: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "100px",
      },
      width: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "100px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
