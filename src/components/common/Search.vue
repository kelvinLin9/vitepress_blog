<template>
<!-- <div class="flex justify-center items-center">
  <div class="w-2/4 h-20 bg-gray-100 rounded-r-full rounded-l-full shadow-lg text-xl flex items-center justify-center py-1 space-x-2 hover:cursor-pointer px-8">
    <input 
    type="text" 
    placeholder="Search" 
    class="bg-gray-100 w-3/4 h-3/4 focus:outline-none flex-1">
    
    <button type="submit" class="rounded-full flex justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-700 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
    </button>
  </div>
</div> -->



<div class="px-4 rounded-full border md:w-1/2 bg-white text-black">
  <div class="flex justify-between">
    <div class="flex items-center">
      <button>
        <span class="mdi mdi-microphone"></span>
      </button>
    </div>
    <div class="w-full">
      <input
        type="text"
        placeholder="Topic or Expression"
        class="form-input block w-full focus:ring-0 py-2"
        v-model="searchText"
        @keydown.enter="handleEnterKey"
        @focus="showSearchHistory = true"  
        @blur="closeMenu()"
        :disabled="searchLoading"
      />
    </div>
    <div class="flex items-center space-x-2">
      <button @click="searchText = '//'" v-if="!searchText">
        <span class="mdi mdi-slash-forward"></span>
      </button>
      <button @click="searchText = '@@'" v-if="!searchText">
        <span class="mdi mdi-at"></span>
      </button>
      <EmojiDialog v-if="!searchText" />
      <button v-if="searchText" @click="searchInputHandle()">
        <span class="mdi mdi-send"></span>
      </button>
    </div>
  </div>
</div>

<div 
  v-if="showSearchHistory && searchHistoryFilter.length > 0"
  class="md:w-1/2 bg-white text-black"
>
  <div class="border rounded">
    <div
      v-for="(item, index) in searchHistoryFilter"
      :key="index"
      @click="searchText = item, searchInputHandle()"
      class="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-200"
    >
      <span class="flex items-center">
        <span class="mdi mdi-clock-outline mx-2"></span>
        {{ item }}
      </span>
      <button @click.stop="deleteSearchHistory(index)">
        <span class="mdi mdi-close me-2"></span>
      </button>
    </div>
  </div>
</div>


</template>

<script setup>
// import ChatWindow from "@/components/common/ChatWindow.vue"
import EmojiDialog from "../../components/widgets/EmojiDialog.vue"
// import Loading from 'vue-loading-overlay';
import { onMounted } from "vue"
import { storeToRefs } from "pinia" 
import { useSearchStore } from "../../store/search"
import { useAuthStore } from '../../store/auth'
// import { useWebChatStore } from '../../store/webchat'
// import { useNearbyStore } from "../../store/nearby"

const searchStore = useSearchStore()
const { searchData, searchText, chatMode, showSearchHistory, searchLoading, searchHistoryFilter } = storeToRefs(searchStore)
const getSearchHistory = searchStore.getSearchHistory
const searchInputHandle = searchStore.searchInputHandle
const deleteSearchHistory = searchStore.deleteSearchHistory
const handleEnterKey = searchStore.handleEnterKey

const closeMenu = () => {
  setTimeout(() => {
    showSearchHistory.value = false
  }, 200)
}

getSearchHistory()

onMounted(() => {
  searchData.value = []
})

// chat
// const authStore = useAuthStore()
// const { user } = storeToRefs(authStore)

// const webChatStore = useWebChatStore()
// const { 
//   webChatMsg, 
//   regInfo, 
//   sendPubData, 
//   webChatLoading,  
// } = storeToRefs(webChatStore)
// const sendMoteMsg = webChatStore.sendMoteMsg

// const nearbyStore = useNearbyStore()
// const { nearbyChatDialog } = storeToRefs(nearbyStore)
// const getNearbyIcon = nearbyStore.getNearbyIcon

// // chat window emits
// const updateSendPubData = (chatMsg) => {
//   sendPubData.value.msg = chatMsg
//   // sendMoteMsg(sendPubData.value.group, sendPubData.value.msg)
//   sendMoteMsg(sendPubData.value.group)
// }
</script>