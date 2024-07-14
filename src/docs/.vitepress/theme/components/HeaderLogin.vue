<script setup>
import { useData } from '../composables/data'
import JNavBarMenuGroup from './JNavBarMenuGroup.vue'

const { theme } = useData()
</script>
<template>
  <nav v-if="theme.navCustom" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden">Main Navigation</span>
    <template v-for="item in theme.navCustom" :key="item.text">
      <JNavBarMenuGroup :item="item" />
    </template>
  </nav>
</template>


<style>

</style>