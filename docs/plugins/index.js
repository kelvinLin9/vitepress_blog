import { createPinia } from "pinia"
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import axios from "axios";
import router from '../router';
import moment from 'moment';
import utils from './utils';
import i18n from './i18n';
import VueSocialSharing from 'vue-social-sharing';
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { marked } from "marked";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import DOMPurify from 'dompurify';

// Configuration for the markdown renderer with syntax highlighting
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class
  pedantic: false,
  gfm: true,
  breaks: true,
  smartypants: false,
  xhtml: false
});

// Function to register all plugins and global properties
export function registerPlugins(app) {
  loadFonts();
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$utils = utils;
  app.config.globalProperties.$moment = moment;
  // app.config.globalProperties.$marked = marked;
  // app.config.globalProperties.$marked = (text) => DOMPurify.sanitize(marked(text));
  app.config.globalProperties.$marked = (text) => {
    // console.log("原始 Markdown 文本:", text);
    const html = marked(text);
    // console.log("轉換後的 HTML:", DOMPurify.sanitize(html));
    return DOMPurify.sanitize(html);
  };
  app.config.globalProperties.$loading = LoadingPlugin;
  
  app.use(pinia)
     .use(vuetify)
     .use(router)
     .use(i18n)
     .use(VueSocialSharing)
     .use(LoadingPlugin);
}

