<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from "pinia"
import { useWebChatStore } from "../../../../src/store/webchat"
import { useTrackStore } from "../../../../src/store/track"
import { useAuthStore } from "../../../../src/store/auth"
import { useMineStore } from "../../../../src/store/mine"
import { useSettingStore } from "../../../../src/store/setting"
import { useDocsStore } from "../../../../src/store/docs"
import axios from 'axios';
 

const webChatStore = useWebChatStore()
const { appState, regInfo } = storeToRefs(webChatStore)
const appReady = webChatStore.appReady
const startMMS = webChatStore.startMMS
const whoIs = webChatStore.whoIs

const trackStore = useTrackStore()
const track = trackStore.track

const authStore = useAuthStore()
const { Uid } = storeToRefs(authStore)

const mineStore = useMineStore()
const { assets, mineToken } = storeToRefs(mineStore)
const checkUser = mineStore.checkUser
const getAssets = mineStore.getAssets
const createAssets = mineStore.createAssets

const settingStore = useSettingStore()
const { localjDocsSettings } = storeToRefs(settingStore)
const onResize = settingStore.onResize
const getSettings = settingStore.getSettings

const useDocs = useDocsStore()
const getDocs = useDocs.getDocs
const getDocsByAgent = useDocs.getDocsByAgent


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
    console.log(regInfo.value.EiUMMA)
    if (regInfo.value.EiUMMA) {
      whoIs()
    }
    checkUser()
    // getDocs()
    getDocsByAgent()
    getmd("https://s3.ypcloud.com/guide/crm-topic-1.md?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=mikiypcloud%2F20240711%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240711T092228Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=88aafb3644ee5e94d06ca58ee47e2631e6471e2b6ab7f9b3c936dd010641fc48")
    // if (Uid.value) {
    //   await checkUser()
    // } else {
    //   handleSetting('local')
    // }
  }
})

watch(() => Uid.value, async(n) => {
  if (n === '') {
    return
  }
  checkUser()
})

// if have token, get assets
watch(() => mineToken.value, async(n) => {
  console.log('token', n)
  if (n === '') {
    return
  }
  await getAssets()
  const index = assets.value.findIndex((asset) => asset.name === 'jdocs-setting')
    if (index === -1) {
      // console.log('no setting')
      createAssets('jdocs-setting', '', 'jdocs', 'setting', localjDocsSettings.value)
    } else {
      console.log('settings', assets.value[index].content)
      localjDocsSettings.value = assets.value[index].content
    }
})

//
const getmd = async (path) => {
  try {
    const res = await axios.get(path)
    console.log(res)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

</script>
<template></template>