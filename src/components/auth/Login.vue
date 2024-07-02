<template>
  <div v-if="Uid" class="text-end">
    HI: {{ Uid }}
    <button
      @click="onLogout()"
      type="button" 
      class="border rounded-lg px-2" 
    >
      登出
    </button>
  </div>
  <div v-if="!Uid" class="text-end">
    <button 
      @click="onLogin()"
      type="button" 
      class="border rounded-lg px-2 bg-primary" 
    >
      登入
    </button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../store/auth";
import conf from "../../config/config";
import { Toast } from "../../mixins/sweetAlert";

  const authStore = useAuthStore();
  const { Uid } = storeToRefs(authStore)

  const onLogin = () => {
    console.log(window.location)
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

<style scoped>
button {
  cursor: pointer;
  border: none;
  background-color: transparent;
  /* display: block; */
}
button:hover {
  opacity: 0.8;
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
.text-end {
  text-align: end;
}
.bg-primary {
  background-color: #1976D2; /* Blue */
  color: white;
}
</style>