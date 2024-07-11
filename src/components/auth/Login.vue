<template>
  <div v-if="user?.Uid" class="text-end">
    <!-- HI: {{ Uid }} -->
    <button
      @click="onLogout()"
      type="button" 
      class="border rounded-lg px-1" 
    >
      Logout
    </button>
  </div>
  <div v-else class="text-end">
    <button 
      @click="onLogin()"
      type="button" 
      class="border rounded-lg px-1 bg-primary" 
    >
      Login
    </button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../store/auth";
import conf from "../../config/config";
import { Toast } from "../../mixins/sweetAlert";

  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore)

  const onLogin = () => {
    console.log(window.location)
    console.log(conf)
    if(conf.baseURL === '/') {
      conf.baseURL = ''
    }
    console.log(`${conf.LOGIN_URL + window.location.origin + conf.baseURL + '/callback'}`)
    window.location.href = `${conf.LOGIN_URL + window.location.origin + conf.baseURL + '/callback'}` 
  };
  const onLogout = () => {
  authStore.logout();
  Toast.fire({
    title: '登出成功',
    icon: 'success'
  })
};



</script>