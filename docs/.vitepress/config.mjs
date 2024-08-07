import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
import { en } from './en.js'
import { zh } from './zh.js'

// markdown-it plugins
import markdownItAnchor from 'markdown-it-anchor'
// import markdownItMermaid from "@wekanteam/markdown-it-mermaid"
// import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import markdownItAbc from '../../src/mixins/abc.js'


// localStorage
if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = {
    getItem: (key) => null, 
    setItem: (key, value) => {}, 
    removeItem: (key) => {}, 
    clear: () => {} 
  };
}

// console.log(globalThis.localStorage)

export default withPwa(defineConfig({
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },
    plugins: [
      // AutoSidebar({
      //   // You can also set options to adjust sidebar data
      //   path: '/docs/en',
      //   ignoreList: ['mine'],
      // })
    ],
  },
  base: '/vitepress_blog',
  assetsDir: './assets/ja', // pwa prompt
  srcExclude: ['**/README.md', '**/TODO.md'],
  lang: 'en-US',
  title: "Kelvin's Blog",
  description: '',
  lastUpdated: true,
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
    sidebar: [
      {
        text: '123',
        items: [
          { text: '456', link: '' }
        ]
      },
      {
        text: '简介',
        collapsed: false,
        items: [
          { text: '什么是 VitePress？', link: 'what-is-vitepress' },
          { text: '快速开始', link: 'getting-started' },
          { text: '路由', link: 'routing' },
          { text: '部署', link: 'deploy' }
        ]
      },
    ]
    // search : {
    //   provider: 'local'
    // },
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
  rewrites: {
    'en/:rest*': ':rest*'
  },
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '繁體中文', ...zh },
  }
}))
