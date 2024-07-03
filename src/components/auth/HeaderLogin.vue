<template>
  <ul class="user_state">
    <li v-if="!auth">
      <div class="relative">
        <button @click="menuOpen = !menuOpen" class="cursor-pointer">
          <span class="material-icons">account_circle</span>
        </button>
        <div v-if="menuOpen" class="absolute right-0 mt-2 w-72 bg-white shadow-lg">
          <ul class="divide-y divide-gray-100">
            <li @click="$router.push('/settings')" class="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <span class="material-icons">tune</span>
              <span class="ml-3">{{ $t('menu.settings') }}</span>
            </li>
          </ul>
          <div class="flex justify-end p-4">
            <button @click="onLogin" class="py-2 px-4 border border-primary rounded text-primary text-sm">
              {{ $t('menu.login') }}
            </button>
          </div>
        </div>
      </div>
    </li>
    <li v-if="auth">
      <div class="relative">
        <button @click="menuOpen = !menuOpen" class="cursor-pointer bg-purple-300 rounded-full w-10 h-10 flex items-center justify-center text-white">
          {{ user.FullName.substring(0, 1) }}
        </button>
        <div v-if="menuOpen" class="absolute right-0 mt-2 w-72 bg-white shadow-lg">
          <ul class="divide-y divide-gray-100">
            <li class="p-4">
              <div class="text-lg">{{ user.UserName }}</div>
              <div class="text-gray-500">{{ user.FullName }}</div>
            </li>
            <li class="p-4">
              <div class="flex items-center">
                <span class="material-icons">translate</span>
                <button @click="switchLang('en_US')" class="ml-3">English</button>
                <button @click="switchLang('zh_TW')" class="ml-3">中文</button>
              </div>
            </li>
            <!-- Add more items as needed -->
          </ul>
          <div class="flex justify-end p-4">
            <button @click="onLogout" class="py-2 px-4 border border-primary rounded text-primary text-sm">
              {{ $t('menu.logout') }}
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    onLogin() {
      // 登入邏輯
    },
    onLogout() {
      // 登出邏輯
    },
    switchLang(lang) {
      // 切換語言邏輯
    }
  }
};
</script>

<style scoped>
.material-icons {
  font-family: 'Material Icons';
}
</style>
