// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import RegisterSW from './components/RegisterSW.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 'layout-bottom': () => h(RegisterSW)
      'layout-bottom': () => h(ReloadPrompt)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
