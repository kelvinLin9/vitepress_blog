// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

import './styles/tailwind/tailwind.css'
import './styles/vars.css'

// pinia
import { createPinia } from "pinia"
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

// pwa 
import RegisterSW from './components/RegisterSW.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'

// mdit plugin
import AbcNotation from './components/AbcNotation.vue'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client' 

// layout components
import Init from './components/Init.vue'
import HeaderLogin from './components/HeaderLogin.vue'


/** @type {import('vitepress').Theme} */
export default {
  // extends: DefaultTheme, 
  Layout: () => {
    return h(Layout, null, {
      'layout-bottom': () => h(ReloadPrompt),
      'layout-top': () => h(Init),
      'nav-bar-content-after': () => h(HeaderLogin),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(pinia)
    app.use(TwoslashFloatingVue)
    app.component('AbcNotation', AbcNotation)
  }
}
