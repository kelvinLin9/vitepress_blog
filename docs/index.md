---
# https://vitepress.dev/reference/default-theme-home-page
layout: 

hero:
  name: "jDocs"
  text: ""
  tagline: Document Management System
  # actions:
  #   - theme: brand
  #     text: Setting
  #     link: /settings
  #   - theme: alt
  #     text: Login
  #     target: "_self"
  #     link: "https://account.ypcloud.com/auth/verify/?ReturnURL=http://localhost:5173/jdocs/callback"
features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
import Login from "../src/components/auth/Login.vue"
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { storeToRefs } from "pinia"
import { useWebChatStore } from "../src/store/webchat"

const webChatStore = useWebChatStore()
const { appState } = storeToRefs(webChatStore)
const appReady = webChatStore.appReady
const getSubList = webChatStore.getSubList
const startMMS = webChatStore.startMMS

onMounted(async () => {
  startMMS()
});

watch(() => appState.value, async(n) => {
  console.log('appState', n)
  if (appState.value === 'reg ok') {
    await appReady()
    await getSubList()
    // track()
    // console.log(regInfo.value.EiUMMA)
    // if (regInfo.value.EiUMMA) {
    //   whoIs()
    // }
    // if (Uid.value) {
    //   await checkUser()
    // } else {
    //   handleSetting('local')
    // }
  }
})
</script>
<Login/>
## hi

{{ appState }}
<!-- {{ Uid }} -->


<!--.vitepress/theme/MyLayout.vue-->



