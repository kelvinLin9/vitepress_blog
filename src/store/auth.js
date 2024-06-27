import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const Uid = ref(null);
    const user = ref(null);
    const returnUrl = ref(null);

    function signup(authData) {
      setUser({
        UToken: authData.UToken,
        Uid: authData.Uid,
      });
    }

    function login(authData) {
      authData.username = authData.UserName;
      authData.password = authData.AccessToken;

      setUser(authData);
    }

    function logout() {
      Uid.value = null;
      user.value = null;
    }

    function setReturnUrl(url) {
      returnUrl.value = url;
    }

    function clearReturnUrl() {
      returnUrl.value = null;
    }

    // Helper methods for modifying state
    function setUser(userData) {
      Uid.value = userData.Uid;
      user.value = userData;
    }

    const isAuthenticated = computed(() => {
      return Uid.value != null;
    });

    function $reset() {
      Uid.value = null;
      user.value = null;
      returnUrl.value = null;
    }

    return {
      signup,
      login,
      logout,
      setReturnUrl,
      clearReturnUrl,
      Uid,
      user,
      returnUrl,
      $reset,
      isAuthenticated,
    };
  },
  { persist: true }
);
