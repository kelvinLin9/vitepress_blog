---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "jDocs"
  text: "AI Docs Center"
  tagline: 
  # actions:
  #   - theme: brand
  #     text: Setting
  #     link: /settings
  #   - theme: alt
  #     text: Login
  #     target: "_self"
  #     link: "https://account.ypcloud.com/auth/verify/?ReturnURL=http://localhost:5173/jdocs/callback"
features:
  - title: AI Docs
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Group Docs
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: My Docs
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from "pinia"
import { useWebChatStore } from "../src/store/webchat"
import { useTrackStore } from "../src/store/track"

const webChatStore = useWebChatStore()
const { appState } = storeToRefs(webChatStore)
const appReady = webChatStore.appReady
const startMMS = webChatStore.startMMS

const trackStore = useTrackStore()
const track = trackStore.track

onMounted(async () => {
  startMMS()
});

watch(() => appState.value, async(n) => {
  console.log('appState', n)
  if (appState.value === 'reg ok') {
    await appReady()
    if (typeof window !== 'undefined') {
      console.log(typeof window)
      track()
    }
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
<!-- ## mms test

{{ appState }} -->

  <div class="text-3xl font-bold underline">
    Hello world!!
  </div>
  <div class="flex">
  
  <h1>123</h1>
  <h1>123</h1>
  </div> 


