import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { fileURLToPath, URL } from 'node:url'

const base = '/vitepress_blog/' // '/vite-plugin-pwa/'

if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = {
    getItem: (key) => null, // 返回 null 表示未找到該鍵值
    setItem: (key, value) => {}, // 空函數，因為在 SSR 中我們不實際存儲數據
    removeItem: (key) => {}, // 提供 removeItem 的基礎實現
    clear: () => {} // 提供 clear 方法的基礎實現
  };
}

export default withPwa(defineConfig({
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  base,
  assetsDir: './assets/ja', // pwa prompt
  publicDir: '../public',
  lang: 'en-US',
  title: 'VitePress',
  description: 'Vite Plugin PWA Integration example for VitePress',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: 'favicon.ico' }],
    ['link', { rel: 'mask-icon', href: 'favicon.svg', color: '#ffffff' }],
    ['meta', {
      name: 'keywords',
      content: 'PWA, VitePress, workbox, Vite, vite-plugin',
    }],
    ['link', { rel: 'apple-touch-icon', href: './icons/icon-192x192.png', sizes: '192x192' }],
  ],
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024',
    },
    nav: [
      {
        text: 'Jujue',
        items: [
          { text: 'Content', link: '/guide/Jujue/Content/1' },
          { text: 'Media', link: '/guide/Jujue/Media/1' },
          { text: 'WebSite', link: '/guide/Jujue/Website/1' },
        ],
      },
      { text: 'Worker', link: '/guide/Worker' },
      { text: 'Agents', link: '/guide/Agents' },

    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Jujue',
          collapsible: true,
          items: [
            {
              text: 'Content',
              collapsible: true,
              items: [
                { text: 'Content 1', link: '/guide/Jujue/Content/1' },
                { text: 'Content 2', link: '/guide/Jujue/Content/2' }
              ]
            },
            {
              text: 'Media',
              collapsible: true,
              items: [
                { text: 'Media 1', link: '/guide/Jujue/Media/1' },
                { text: 'Media 2', link: '/guide/Jujue/Media/2' }
              ]
            },
            {
              text: 'WebSite',
              collapsible: true,
              items: [
                { text: 'Website 1', link: '/guide/Jujue/Website/1' },
                { text: 'Website 2', link: '/guide/Jujue/Website/2' }
              ]
            }
          ]
        },
        {
          text: 'Worker',
          collapsible: true,
          items: [
            { text: 'Worker Overview', link: '/guide/Worker/' }
            // 其他 Worker 相关页面
          ]
        },
        {
          text: 'Agents',
          collapsible: true,
          items: [
            { text: 'Agents Overview', link: '/guide/Agents/' }
            // 其他 Agents 相关页面
          ]
        }
      ]
    },
    search : {
      provider: 'local'
    },
    socialLinks: [
      { icon: "github", link: "" },
    ],
  },
  pwa: {
    mode: 'development',
    // registerType: 'autoUpdate',
    injectRegister: 'script-defer',
    includeAssets: ['favicon.ico'],
    manifest: {
      name: 'VitePress PWA',
      short_name: 'VitePressPWA',
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

}))