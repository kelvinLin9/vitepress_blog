<template>
  <header :class="['bg-white', scrolledUp ? 'sticky top-0 z-10' : '', localjDocsSettings?.darkMode ? 'bg-gray-800 text-white' : '']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-2 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#" @click="handleLogoClick">
            <img :src="logo" alt="Logo" class="h-8 w-auto sm:h-10">
          </a>
        </div>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <button @click="uploadDialog = true" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            Upload
          </button>
          <button v-if="$route.path === '/' || $route.path.includes('/story')" @click="$router.push('/search')" class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Search
          </button>
        </div>
      </div>
    </div>
  </header>
  <hr />

  <!-- Upload Dialog Placeholder -->
  <div v-if="uploadDialog" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="uploadDialog = false">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <UploadBox @close="uploadDialog = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import UploadBox from "@/components/widgets/UploadBox.vue"
import { ref, computed } from "vue"
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router";
import { useSettingStore } from "@/store/setting"
import utils from '@/plugins/utils'
const route = useRoute()

const logo = computed(() => {
  const imageName = ['search', 'nearby', 'webchat'].includes(route.name) ? 'jujue-icons/jujue.png' : 'jujue-icons/actor.png';
  return utils.handleImg(imageName);
});

const uploadDialog = ref(false)
const settingStore = useSettingStore()
const { scrolledUp, localjDocsSettings } = storeToRefs(settingStore)

function handleLogoClick() {
  route.path === '/' ? $router.go(0) : $router.push('/')
}
</script>

<style scoped>
/* Tailwind CSS 已經處理大部分樣式，這裡可能不需要額外的樣式 */
</style>
