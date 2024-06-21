import "vuetify/styles"
import "@mdi/font/css/materialdesignicons.css"
import 'material-design-icons-iconfont/dist/material-design-icons.css'




// Composables
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { aliases, mdi } from "vuetify/iconsets/mdi"
import { mdiAccount } from "@mdi/js"
import { md } from 'vuetify/iconsets/md'
// import colors from "vuetify/lib/util/colors" // 內建顏色


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: "#6CD089",
          secondary: "#007BFF",
          warning: "#FFEF9F",
          danger: "#F7D5DF",
          onlineBorder: '#FFFFFF'
          
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#1A1A1A',
          surface: '#1A1A1A',
          primary: "#6CD089",
          secondary: "#007BFF",
          warning: "#FFEF9F",
          danger: "#F7D5DF",
          onlineBorder: '#000000'
          
        },
      },
    },
  },
  display: {
    thresholds: {
      xs: 0,
      sm: 420,
      md: 586,
      lg: 768,
      xl: 992,
      xxl: 1200,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      account: mdiAccount,
    },
    sets: {
      mdi,
      md,
    },
  },
})