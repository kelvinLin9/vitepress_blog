<template>
  <div ref="abcContainer" v-text="content"></div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import abcjs from 'abcjs';

const props = defineProps({
  content: String
});

const abcContainer = ref(null);

onMounted(() => {
  if (abcContainer.value) {
    // 确保解码内容
    const decodedContent = decodeURIComponent(props.content);
    abcjs.renderAbc(abcContainer.value, decodedContent);
  }
})
</script>

