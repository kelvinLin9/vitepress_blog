<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from "pinia"
import { useWebChatStore } from "../src/store/webchat"

const webChatStore = useWebChatStore()
const { appState } = storeToRefs(webChatStore)
const appReady = webChatStore.appReady
const startMMS = webChatStore.startMMS

onMounted(async () => {
  startMMS()
});

watch(() => appState.value, async(n) => {
  console.log('appState', n)
  if (appState.value === 'reg ok') {
    await appReady()
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