---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Kelvin"
  text: "A VitePress Site"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { storeToRefs } from "pinia"
import { useWebChatStore } from "./store/webchat"

const webChatStore = useWebChatStore()
const { appState } = storeToRefs(webChatStore)
const appReady = webChatStore.appReady
const getSubList = webChatStore.getSubList
const startMMS = webChatStore.startMMS


const data = ref({})
const weatherInfo = ref({});
onMounted(async () => {
  startMMS()
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  data.value = res
  console.log(res)
});
</script>

## hi

