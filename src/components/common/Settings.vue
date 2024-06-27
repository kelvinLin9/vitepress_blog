<template>
  <VForm v-slot="{ meta }" @submit="saveLocalSettings">

    <div class="text-medium-emphasis fs-12">Mote</div>
    <div class="w-100 my-1">
      <div class="d-flex align-center justify-space-between">
        <label for="EiName">
          &ensp;Name
        </label>
        <VField 
          name="EiName"
          id="EiName" 
          
          type="text"
          class="border w-50 px-1 text-end rounded-lg"
          v-model.lazy="regInfo.EiName"
        />
      </div>
      <ErrorMessage class="text-red d-block text-end fs-12" name="EiName"/>
    </div>
    <div class="w-100 my-1">
      <div class="d-flex align-center justify-space-between">
        <label for="EiTag">
          &ensp;Tag
        </label>
        <VField 
          name="EiTag"
          id="EiTag" 
          rules=""
          type="text"
          class="border w-50 px-1 text-end rounded-lg"
          v-model.lazy="regInfo.EiTag"
        />
      </div>
      <ErrorMessage class="text-red d-block text-end fs-12" name="EiTag"/>
    </div>

    <div class="text-end mt-6">
      <!-- <button 
        type="button" 
        class="border rounded-lg px-2 me-2" 
        @click="resetLocalPlayerSettings()"
      >
        預設
      </button>
      <button 
        type="button" 
        class="border rounded-lg px-2 me-2" 
      >
        自動
      </button> -->
      <button 
        class="border rounded-lg px-2 bg-primary"
      >
        確定
      </button>
    </div>
  </VForm>


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
const { localPlayerSettings } = storeToRefs(settingStore)
const resetLocalPlayerSettings = settingStore.resetLocalPlayerSettings

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
  localStorage.setItem('jStorySettings', JSON.stringify(localPlayerSettings.value));
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
    await updateAssets(
      assets.value[0].assetsid,
      assets.value[0].name,
      assets.value[0].description,
      assets.value[0].apptype,
      assets.value[0].category,
      localPlayerSettings.value
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
.setting-container {
  min-height: calc(100dvh - 108px);
  max-width: 360px;
}
.custom-checkbox {
  display: flex;
  justify-content: space-between;
  /* align-self: ; */
}
.custom-checkbox .v-label {
  order: -1;
  margin-right: 20px;
}
.mdi-chevron-down {
  position: absolute;
  top: 50%;
  transform: translateY(-50%)
}

input[type="number"] {

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  };
}

// select {
//   background: #003d79;
//   color: #fafafa;
//   /* margin: 15px; */
//   /* width: 300px; */
//   /* height: 3em; */
//   /* padding: 8px; */
//   /* position: relative; */
//   border-radius: 5px;
//   /* background-position: right 0.5em top 50%, 0 0; */
//   /* background-size: contain, cover; */
//   /* background-repeat: no-repeat, repeat; */
// }
.select-dark-mode {
    // border: 1px solid #1A1A1A; /* 暗模式下的邊框顏色 */
    background-color: #1A1A1A;
    color: #ffffff;
    option {
      border-radius: 28px !important;
    }
  }

.sweet-overlay {
    z-index: 10000 !important;
}




.d-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.align-center {
  align-items: center;
}

.justify-space-between {
  justify-content: space-between;
}

.text-end {
  text-align: end;
}

.border {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
}

.rounded-lg {
  border-radius: 8px;
}

.px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.ms-1 {
  margin-left: 0.25rem;
}

.ms-auto {
  margin-left: auto;
}

.me-2 {
  margin-right: 0.5rem;
}

.my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.fs-12 {
  font-size: 12px;
}

.fs-16 {
  font-size: 16px;
}

.text-medium-emphasis {
  color: #666;
}

.text-red {
  color: red;
}

.bg-primary {
  background-color: #1976D2; /* Blue */
  color: white;
}

.w-25 {
  width: 25%;
}

.w-50 {
  width: 50%;
}

.w-100 {
  width: 100%;
}

select, input[type="checkbox"], input[type="text"], input[type="number"] {
  outline: none;
}

select.select-dark-mode, input.select-dark-mode {
  background-color: #333;
  color: white;
}

button {
  cursor: pointer;
  border: none;
  background-color: transparent;
}

button:hover {
  opacity: 0.8;
}

</style>
