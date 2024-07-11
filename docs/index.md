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
# features:
#   - icon: 
#       src: 'https://m3.ypcloud.com/cms/jdi_cards_sphere_cms_fbed0b95d1.png'
#     title: AI Docs
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - icon: 
#       src: "https://cdn.jsdelivr.net/npm/@mdi/svg/svg/abjad-hebrew.svg"
#     title: Group Docs
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: My Docs
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

  <!-- <div class="text-3xl font-bold underline">
    Hello world!!
  </div> -->

<script setup>
import { useData } from 'vitepress'
import Search from "../src/components/common/Search.vue"
const { site } = useData()

</script>

<style scoped>
  
</style>

<Search />
