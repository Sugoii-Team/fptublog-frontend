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
            a:{
              textDecoration: 'none',
              color: theme('colors.blue.600'),
              fontWeight: '600',
              '&:hover':{
                textDecoration:'underline',
              }
            },
            // ul:{
            //   listStyleType: 'disc',
            // }
          }
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

      height: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '100px',
      },
      width: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '100px',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

