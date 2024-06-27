<script setup>
import { reactive, onMounted } from "vue";
import { useAuthStore } from "../../store/auth";
import { Toast } from "../../mixins/sweetAlert";

const authStore = useAuthStore();

const state = reactive({
  loading: true,
  authLoading: true,
  createProfileLoading: false,
  errorMsg: "",
  errorLoading: false,
  oauthParams: {},
  returnUrl: null,
});

onMounted(() => {
  readQueryParam();
  storeUserInfo();
});

const readQueryParam = () => {
  const queryParams = new URLSearchParams(window.location.search);
  let data = queryParams.get('data');
  try {
    if (data) state.oauthParams = JSON.parse(data);
    state.returnUrl = authStore.returnUrl;
  } catch (error) {
    state.errorMsg = "Account data is not valid";
    state.errorLoading = true;
  }
};

const storeUserInfo = () => {
  if (state.oauthParams.errMsg === "OK") {
    authStore.login(state.oauthParams.userInfo);
  }
  // console.log(state)
  authStore.clearReturnUrl();
  window.location.href = state.returnUrl || "/";
  Toast.fire({
    title: '登入成功',
    icon: 'success'
  })
};
</script>
