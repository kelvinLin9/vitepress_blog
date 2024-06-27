import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

// markdown-it plugins
import markdownItAnchor from 'markdown-it-anchor'
// import markdownItFoo from 'markdown-it-foo'
// import markdownItMathjax3 from 'markdown-it-mathjax3'
// import markdownItMusic from 'markdown-it-music'
// import markdownItMermaid from "@wekanteam/markdown-it-mermaid";
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import markdownItAbc from '../../src/mixins/abc.js'

import conf from '../../src/config/config.js'
const base = '/jdocs/' // '/vite-plugin-pwa/'

// localStorage
if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = {
    getItem: (key) => null, 
    setItem: (key, value) => {}, 
    removeItem: (key) => {}, 
    clear: () => {} 
  };
}


import fg from 'fast-glob'
import matter from 'gray-matter'

const files = fg.sync(['guide/**/*.md'], { cwd: 'docs' }).map(file => {
  // const { data } = matter.read('docs/' + file)
  return file
})

console.log('files', files)

function buildNav(files) {
  const nav = [];

  // Helper function to find or create nav entry
  const findOrCreateEntry = (pathParts) => {
      let currentLevel = nav;
      pathParts.forEach((part, index) => {
          let existing = currentLevel.find(item => item.text === part);
          if (!existing) {
              existing = {
                  text: part,
                  items: []
              };
              currentLevel.push(existing);
          }
          // Only navigate into 'items' if not at the last part or if this part is not a file
          if (index !== pathParts.length - 1) {
              currentLevel = existing.items;
          } else {
              // Set link for last part if it's a file or if no sub-items
              existing.link = `/guide/${pathParts.join('/')}`;
              if (existing.items.length === 0) delete existing.items;
          }
      });
      return currentLevel;
  };

  files.forEach(file => {
      const path = file.replace('.md', '');
      const parts = path.split('/');
      const fileName = parts.pop();

      // Check if the file is an index file
      if (fileName === 'index') {
          findOrCreateEntry(parts).link = `/guide/${parts.join('/')}`;
      } else {
          // Normal file or sub-directory index
          findOrCreateEntry([...parts, fileName]);
      }
  });

  // Remove unnecessary 'items' if it's just a single link without actual sub-items
  const cleanupNav = (items) => {
      items.forEach(item => {
          if (item.items && !item.items.length) {
              delete item.items;
          } else if (item.items) {
              cleanupNav(item.items);
          }
      });
  };

  cleanupNav(nav);

  return nav;
}



const navItems = generateNav(files);
console.log(navItems);
console.log(JSON.stringify(navItems, null, 2)); // 使用缩进的 JSON 字符串表示















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
  },
  base,
  assetsDir: './assets/ja', // pwa prompt
  lang: 'en-US',
  title: 'jDocs',
  description: 'Vite Plugin PWA Integration example for VitePress',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: 'favicon.ico' }],
    ['link', { rel: 'mask-icon', href: 'favicon.ico', color: '#ffffff' }],
    ['meta', {
      name: 'keywords',
      content: 'PWA, VitePress, workbox, Vite, vite-plugin',
    }],
    ['link', { rel: 'apple-touch-icon', href: './icons/icon-192x192.png', sizes: '192x192' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css' }],
  ],
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024',
    },
    nav: [
      { text: 'Worker', link: '/guide/Worker' },
      { text: 'Agents', link: '/guide/Agents' },
      {
        text: 'Jujue',
        items: [
          { text: 'Content', link: '/guide/Jujue/Content/1' },
          { text: 'Media', link: '/guide/Jujue/Media/1' },
          { text: 'WebSite', link: '/guide/Jujue/Website/1' },
        ],
      },
      {
        text: 'Lab',
        items: [
          { text: 'Plugin', link: '/guide/Lab/plugin' },
          { text: 'Settings', link: '/guide/Lab/settings' },
          { text: 'Import', link: '/guide/Lab/import' },
        ]
      }
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
          ]
        },
        {
          text: 'Agents',
          collapsible: true,
          items: [
            { text: 'Agents Overview', link: '/guide/Agents/' }
          ]
        },
        {
          text: 'Lab',
          collapsible: true,
          items: [
            { text: 'Plugin', link: '/guide/Lab/plugin' },
            { text: 'Settings', link: '/guide/Lab/settings' },
            { text: 'Import', link: '/guide/Lab/import' },
          ]
        }
      ]
    },
    search : {
      provider: 'local'
    },
    socialLinks: [
      { icon: "mdi mdi-account", link: "" },
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
  markdown: {
    math: true,
    config: (md) => {
      // md.use(markdownItMathjax3)
      md.use(markdownItAbc)
      // md.use(markdownItMermaid)
    },
  },
}))