<template>
  <div class="container mx-auto max-w-lg vp-raw">
    <VForm v-slot="{ meta }" @submit="saveLocalSettings">

      <div class="text-sm font-bold text-gray-500">Mote</div>
      <div class="w-full my-1">
        <div class="flex align-center justify-between">
          <label for="EiName" class="font-bold md:text-right mb-1 md:mb-0 pr-4">
            &ensp;Name
          </label>
          <VField 
            name="EiName"
            id="EiName" 
            
            type="text"
            class="border-neutral-900 shadow rounded p-1"
            v-model.lazy="regInfo.EiName"
          />
        </div>
        <ErrorMessage class="text-red d-block text-end fs-12" name="EiName"/>
      </div>
      <div class="my-1">
        <div class="flex align-center justify-between">
          <label for="EiTag" class="font-bold md:text-right mb-1 md:mb-0 pr-4">
            &ensp;Tag
          </label>
          <VField 
            name="EiTag"
            id="EiTag" 
            rules=""
            type="text"
            class="border-neutral-900 shadow rounded p-1 "
            v-model.lazy="regInfo.EiTag"
          />
        </div>
        <ErrorMessage class="text-red d-block text-end fs-12" name="EiTag"/>
      </div>

      <div class="text-sm font-bold text-gray-500">AI Market</div>
      <div class="my-1">
        <div class="flex align-center justify-between">
          <label for="MarketAPIKey" class="font-bold md:text-right mb-1 md:mb-0 pr-4">
            &ensp;Data Market API Key
          </label>
          <VField 
            name="MarketAPIKey"
            id="MarketAPIKey" 
            
            type="text"
            class="border-neutral-900 shadow rounded p-1 "
            v-model.lazy="localjDocsSettings.MarketAPIKey"
          />
        </div>
        <ErrorMessage class="text-red d-block text-end fs-12" name="MarketAPIKey"/>
      </div>





      <div class="text-end mt-6">
        <button 
          type="submit"
          class="border-2 border-black rounded-lg px-2"
        >
          確定
        </button>
      </div>
    </VForm>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../store/setting";
import { useWebChatStore } from "../../store/webchat";
import { useAuthStore } from "../../store/auth";
import { useMineStore } from "../../store/mine";
import { Toast } from "../../mixins/sweetAlert";

const webChatStore = useWebChatStore()
const { regInfo, appState } = storeToRefs(webChatStore)
const getSubList = webChatStore.getSubList
const wsSub = webChatStore.wsSub
const mcSet = webChatStore.mcSet
const appReady = webChatStore.appReady
const startMMS = webChatStore.startMMS

const settingStore = useSettingStore()
const { localjDocsSettings } = storeToRefs(settingStore)
const resetocaljDocsSettings = settingStore.resetocaljDocsSettings

const authStore = useAuthStore()
const { Uid } = storeToRefs(authStore)

const mineStore = useMineStore()
const { assets, mineToken } = storeToRefs(mineStore)
const updateAssets = mineStore.updateAssets


import { Field as VField, Form as VForm, ErrorMessage, defineRule, configure } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';

const saveLocalSettings = async(e) => {
  console.log(e)
  localStorage.setItem('jDocsSettings', JSON.stringify(localjDocsSettings.value));
  if (oldEiName.value !== e.EiName || oldEiTag.value !== e.EiTag) {
    oldEiName.value = e.EiName
    oldEiTag.value = e.EiTag
    console.log(e.EiName, e.EiTag)
    regInfo.value.EiName = e.EiName
    regInfo.value.EiTag = e.EiTag
    await mcSet(regInfo.value)
    await wsSub(e.EiName)
    await wsSub(e.EiTag)
    await getSubList()
  }
  if (Uid.value) {
    console.log('updateAssets')
    console.log(assets.value)
    console.log(localjDocsSettings.value)
    await updateAssets(
      assets.value[0].assetsid,
      assets.value[0].name,
      assets.value[0].description,
      assets.value[0].apptype,
      assets.value[0].category,
      localjDocsSettings.value
    )
  }
  Toast.fire({
    title: '成功儲存設定',
    icon: 'success'
  })
}

  const oldEiName = ref("")
  const oldEiTag = ref("")
  
  onMounted (() => {
    startMMS()
    oldEiName.value = regInfo.EiName
    oldEiTag.value = regInfo.EiTag

    // Object.keys(AllRules).forEach((rule) => {
    //   defineRule(rule, AllRules[rule]);
    // });

    // configure({
    //   generateMessage: localize({ zh_TW: zh_TW }),
    //   validateOnInput: true,
    // });
    // setLocale('zh_TW');
  })

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

<style lang="scss" scoped>


</style>
