<template>
  <ul class="user_state">
    <li v-if="!auth">
      <v-menu
        transition="slide-x-transition"
        :close-on-content-click="true"
        :nudge-width="200"
        offset-y
        bottom
      >
        <template v-slot:activator="{ props }">
          <v-icon class="cursor-pointer" v-bind="props">mdi-account</v-icon>
        </template>

        <v-card max-width="300" class="mt-2">
          <v-list>

            <v-list-item class="cursor-pointer d-flex align-center" @click="$router.push('/settings')"> 
              <v-icon>mdi-tune</v-icon>
              <!-- <span class="ms-3">{{ $t('menu.settings') }}</span> -->
            </v-list-item>


          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="user_btn"
              small
              outlined
              text
              @click="onLogin"
            >
              <!-- {{ $t('menu.login') }} -->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </li>




    <li v-if="auth">
      <v-menu
        transition="slide-x-transition"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
        bottom
      >
        <template v-slot:activator="{ props }">
          <v-avatar 
            class="cursor-pointer"
            color="#AB9EF9" 
            size="small"
            v-bind="props"
          >
            {{ user.FullName.substring(0, 1) }}
          </v-avatar>
          <!-- <v-btn class="user_btn_fab" fab light small v-bind="props">
            <v-icon>mdi-account</v-icon>
          </v-btn> -->
        </template>

        <v-card max-width="300" class="mt-2">
          <v-list>
            <v-list-item 
              :title="user.UserName"
              :subtitle="user.FullName"
            >
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
            <v-list>
              <v-list-item class="cursor-pointer d-flex align-center"> 

                <v-list-group value="Actions">
                  <template v-slot:activator="{ props }">
                    <div class="d-flex align-center">
                      <v-icon class="">mdi-translate</v-icon>
                      <v-list-item
                        v-bind="props"
                        density="dense"
                        append-icon="mdi-chevron-down"
                        :title="$t('menu.lang')" 
                      ></v-list-item>
                    </div>
                  </template>
                  <v-list-item @click="switchLang('en_US')">
                    <v-list-item-title>English</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="switchLang('zh_TW')">
                    <v-list-item-title>中文</v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </v-list-item>








            </v-list>

          <v-divider></v-divider>
          <v-list>
            <v-list-item class="cursor-pointer d-flex align-center" @click="$router.push('/profile')"> 
              <div class="d-flex">
                <v-icon class="">mdi-card-account-details-outline</v-icon>
                <!-- <span class="ms-3">{{ $t('menu.profile') }}</span> -->
              </div>
            </v-list-item>
            <v-list-item link class="cursor-pointer d-flex align-center">
              <div class="d-flex">
                <v-icon>mdi-wallet-membership</v-icon>
                <!-- <span class="ms-3">{{ $t('menu.wallet') }}</span>  -->
              </div>
            </v-list-item>
            <v-list-item link class="cursor-pointer d-flex align-center"> 
              <div class="d-flex">
                <v-icon>mdi-semantic-web</v-icon>
                <!-- <span class="ms-3">{{ $t('menu.usage') }} </span> -->
              </div>
            </v-list-item>
            <v-list-item link class="cursor-pointer d-flex align-center">
              <div class="d-flex">
                <v-icon>mdi-timer-sand</v-icon>
                <!-- <span class="ms-3">{{ $t('menu.runtime') }} </span> -->
              </div>
            </v-list-item>
            <v-list-item class="cursor-pointer d-flex align-center" @click="$router.push('/settings')"> 
              <div class="d-flex">
                <v-icon>mdi-cog-outline</v-icon>
                <!-- <span class="ms-3">{{ $t('menu.settings') }}</span> -->
              </div>
            </v-list-item>
            <v-list-item class="cursor-pointer d-flex align-center" @click="$router.push('/fqa')"> 
              <div class="d-flex">
                <v-icon>mdi-frequently-asked-questions</v-icon>
                <!-- <span class="ms-3">{{ $t('menu.fqa') }}</span> -->
              </div>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              class="user_btn"
              small
              outlined
              text
              @click="onLogout"
              >{{ $t('menu.logout') }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-menu>
    </li>
  </ul>

  
</template>

<script setup>
import { onMounted, computed, watch, ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { storeToRefs } from "pinia";
import { Toast } from "../../mixins/sweetAlert";
// import { useI18n } from "vue-i18n";
import conf from "../../config/config";
// import i18n from "../plugins/i18n"

const authStore = useAuthStore();
const authStoreState = storeToRefs(useAuthStore());

// Computed Properties
const auth = computed(() => authStoreState.isAuthenticated.value)
const user = computed(() => authStoreState.user.value)
const loginUrl = computed(() => conf.LOGIN_URL)

// Methods
const onLogin = () => {
  // console.log(`${window.location.origin}/story/`)
  console.log(`${loginUrl.value + window.location.origin + '/callback'}`)
  window.location.href = `${loginUrl.value + window.location.origin + '/callback'}` 
};

const onLogout = () => {
  authStore.logout();
  Toast.fire({
    title: '登出成功',
    icon: 'success'
  })
};

const showLanguages = ref(false)
// const { locale } = useI18n();
const switchLang = (lang) => {
  console.log('switchLang', i18n)
  // locale.value = lang
  // i18n.locale = "zh_TW"

}
</script>

<style scoped>
.user_state {
  /* position: absolute; */
  padding: 0;
  list-style-type: none;
  right: 0;
  top: 0;
}
.user_btn {
  text-transform: unset;
}
.user_btn_fab {
  height: 30px;
  width: 30px;
}
</style>
<style>
.user_btn .v-icon--right {
  margin-left: 5px !important;
}
</style>