<template>
  <!-- <div v-html="docsData[0].content"></div> -->
  <!-- {{ docsData[0].content }} -->
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useDocsStore } from "../../store/docs"

const docsStore = useDocsStore()
const { docsData } = storeToRefs(docsStore)
const getDocs = docsStore.getDocs
const getDocsByAgent = docsStore.getDocsByAgent

</script>

<style>

</style>