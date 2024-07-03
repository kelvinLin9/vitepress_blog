import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

// markdown-it plugins
import markdownItAnchor from 'markdown-it-anchor'
// import markdownItMermaid from "@wekanteam/markdown-it-mermaid"
// import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import markdownItAbc from '../../src/mixins/abc.js'

import conf from '../../src/config/config.js'
const base = '/jdocs/' // '/vite-plugin-pwa/'

// login
import { defineStore } from 'pinia'
import { useAuthStore } from '../../src/store/auth.js'
// const authStore = useAuthStore()
// console.log('asdf', authStore.Uid)

// localStorage
if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = {
    getItem: (key) => null, 
    setItem: (key, value) => {}, 
    removeItem: (key) => {}, 
    clear: () => {} 
  };
}

console.log(globalThis.localStorage)

export default withPwa(defineConfig({
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
    plugins: [
      AutoSidebar({
        // You can also set options to adjust sidebar data
      })
    ],
  },
  base,
  assetsDir: './assets/ja', // pwa prompt
  srcDir: '.',
  srcExclude: ['**/README.md', '**/TODO.md'],
  lang: 'en-US',
  title: 'jDocs',
  description: 'Vite Plugin PWA Integration example for VitePress',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: 'favicon.ico' }],
    ['link', { rel: 'mask-icon', href: 'favicon.ico', color: '#ffffff' }],
    ['meta', {
      name: 'keywords',
      content: 'PWA, VitePress, jujue, jDocs',
    }],
    ['link', { rel: 'apple-touch-icon', href: './icons/icon-192x192.png', sizes: '192x192' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css' }],
  ],
  themeConfig: {
    logo: { src: './icons/icon-192x192.png', width: 24, height: 24 },
    footer: {
      message: '',
      copyright: '',
    },
    nav: [
      {
        text: 'Lab',
        items: [
          { text: 'Plugin', link: '/guide/lab/plugin' },
          { text: 'Settings', link: '/guide/lab/settings' },
        ]
      },
      { text: 'ydrive', link: '/guide' },
      {
        text: 'Mine',
        items: [
          { text: '', 
            items: [
              { text: 'My Profile', link: '/guide/mine/profile' },
              { text: 'My Wallet', link: '/guide/mine/wallet' },
              { text: 'My Usage', link: '/guide/mine/usage' },
              { text: 'My Runtime', link: '/guide/mine/runtime' },
              { text: 'My Setting', link: '/guide/mine/setting' },
              { text: 'FAQ', link: '/guide/mine/faq' },
            ]
          },
          { text: '登入' , link: 'http://localhost:5173/jdocs/' },
          
        ]
      },
    ],
    search : {
      provider: 'local'
    },
    // socialLinks: [
    //   { icon: "mdi mdi-account", link: "" },
    // ],
  },
  pwa: {
    mode: 'development',
    // registerType: 'autoUpdate',
    injectRegister: 'script-defer',
    includeAssets: ['favicon.ico'],
    manifest: {
      name: 'jDocs',
      short_name: 'jDocs',
      theme_color: '#ffffff',
      icons: [
        {
          src: './icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: './icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: './icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    },
    experimental: {
      includeAllowlist: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
    },
  },
  markdown: {
    math: true,
    config: (md) => {
      md.use(markdownItAbc)
      // md.use(markdownItMermaid)
    },
  },
}))
