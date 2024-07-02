// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
// import './style.css'
import './styles/tailwind.css'

import { createPinia } from "pinia"
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

import RegisterSW from './components/RegisterSW.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'

//
import Theme from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client' 
// import '@shikijs/vitepress-twoslash/style.css' 
// import type { EnhanceAppContext } from 'vitepress'

// abcjs
import AbcNotation from './components/AbcNotation.vue'

// layout
import Init from './components/Init.vue'
import Navbar from './components/Navbar.vue'


/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme, 
  // extends: Theme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 'layout-bottom': () => h(RegisterSW)
      'layout-bottom': () => h(ReloadPrompt),
      'layout-top': () => h(Init),
      'layout-header': () => h(Navbar),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(pinia)
    app.use(TwoslashFloatingVue)
    app.component('AbcNotation', AbcNotation)
  }
}
