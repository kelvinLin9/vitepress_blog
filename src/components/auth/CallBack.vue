<script setup>
import { reactive, onMounted } from "vue";
import { useAuthStore } from "../../store/auth";
import { Toast } from "../../mixins/sweetAlert";
import axios from "axios";

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
    // console.log(state.oauthParams);
    state.returnUrl = authStore.returnUrl;
  } catch (error) {
    state.errorMsg = "Account data is not valid";
    state.errorLoading = true;
  }
};

const storeUserInfo = async () => {
  if (state.oauthParams.errMsg === "OK") {
    // console.log(state.oauthParams.userInfo);
    authStore.login(state.oauthParams.userInfo);
    try {
      // rkh
      let res = await axios({
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + state.oauthParams.userInfo.AccessToken},
        url: "https://account.ypcloud.com/auth/profile"
      });
      console.log(res);
      // console.log(state)
      authStore.clearReturnUrl();
      window.location.href = state.returnUrl || "/";
      Toast.fire({
        title: '登入成功',
        icon: 'success'
      })
    } catch (error) {
      state.errorMsg = "Failed to get user profile";
      state.errorLoading = true;
    }
  }
};
</script>
