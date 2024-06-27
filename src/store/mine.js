import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Toast } from "../mixins/sweetAlert"
import { useWebChatStore } from './webchat';
import { useAuthStore } from "./auth";

import utils from "../plugins/utils";
import conf from "../config/config";

const { withAsyncErrorHandling } = utils

export const useMineStore = defineStore('MineStore', () =>{
  const webChatStore = useWebChatStore()
  const authStore = useAuthStore()

  const debug = ref(true);
  const mineToken = ref('');
  const assets = ref([]);
  const mineLoading = ref(false);
  // const mineState = ref('');

  // mine
  const checkUser = withAsyncErrorHandling(async() => {
    if (debug.value) console.log('checkUser', authStore.user?.Uid, authStore.user)
    mineLoading.value = true
    if (!authStore.user?.Uid) {
      // throw new Error('no uid')
      console.error('no uid')
      return
    }
    const payload = {
      "req":"chkuser",
      "data":{
        "autoadd": true,
        "uid": authStore.user.Uid,
        "email": authStore.user.Email,
        "displayname": authStore.user.DisplayName,
      }
    }
    const reply = await webChatStore.mcSend(
      conf.MINE.MMA,
      conf.MINE.TOPIC.MINE_USER,
      payload,
    );
    // 這邊不知道為什麼多一層 要再問後端
    // if (debug.value) console.log('checkUser', reply)
    const result = utils.resultHandle(reply)
    if (result?.result?.ErrCode === 0 || result?.result?.ErrMsg === 'OK') {
      mineToken.value = result.result.result.token
    } else {
      console.error(result?.result?.ErrMsg)
    }
  }, () => mineLoading.value = false) 
  

  const getAssets = withAsyncErrorHandling(
    async(query) => {
      if (!mineToken.value) {
        throw new Error('no mineToken')
      }
      mineLoading.value = true
      const payload = {
        "req": "search",
        "data":{ 
          "token": mineToken.value,
          "query": query,
        }
      }
      const reply = await webChatStore.mcSend(
        conf.MINE.MMA,
        conf.MINE.TOPIC.MINE_ASSETS,
        payload,
      );
      const result = utils.resultHandle(reply)
      console.log('getAssets', result)
      if (result.result.ErrCode === 0 || result.result.ErrMsg === 'OK') {
        assets.value = result.result.result.data
      } else { 
        throw new Error(result.result.ErrMsg || result);
      }
      if (debug.value) console.log('getAssets', assets.value)
  }, () => mineLoading.value = false)

  // name、apptype、content are required
  const createAssets = withAsyncErrorHandling(
    async(id, description ,apptype, title, content) => {
      console.log('createAssets', title, apptype, id, content)
      if (debug.value) console.log('createAssets', title, apptype, id, content)
      if (!mineToken.value) {
        return
      }
      mineLoading.value = true
      const payload = {
        "req": "new",
        "data":{ 
          "token": mineToken.value,
          "assets": {
            "name": id,
            "description": description,
            "apptype": apptype,
            "category": title,
            "content": content
          },
        }
      }
      // if (debug.value) console.log('payload', payload)
      const reply = await webChatStore.mcSend(
        conf.MINE.MMA,
        conf.MINE.TOPIC.MINE_ASSETS,
        payload,
      );
      const result = utils.resultHandle(reply)
      if (debug.value) console.log('createAssets', result)
      getAssets()
  }, () => mineLoading.value = false)

const updateAssets = withAsyncErrorHandling(
  async(assetsid, name, description ,apptype, title, content) => {
    console.log('updateAssets', assetsid, name, description ,apptype, title, content)
    if (!mineToken.value) {
      throw new Error('no mineToken')
    }
    mineLoading.value = true
    const payload = {
      "req": "update",
      "data":{ 
        "token": mineToken.value,
        "assetsid": assetsid,
        "assets": {
          "name": name,
          "description": description,
          "apptype": apptype,
          "category": title,
          "content": content
        },
      }
    }
    const reply = await webChatStore.mcSend(
      conf.MINE.MMA,
      conf.MINE.TOPIC.MINE_ASSETS,
      payload,
    );
    const result = utils.resultHandle(reply)
    if (debug.value) console.log('updateAssets', result)
    getAssets()
  }, () => mineLoading.value = false)

const deleteAssets = withAsyncErrorHandling(
  async(id) => {
    if (!mineToken.value) {
      throw new Error('no mineToken')
    }
    const payload = {
      "req": "remove",
      "data":{ 
        "token": mineToken.value,
        "assetsid": id,
      }
    }
    const reply = await webChatStore.mcSend(
      conf.MINE.MMA,
      conf.MINE.TOPIC.MINE_ASSETS,
      payload,
    );
    const result = utils.resultHandle(reply)
    if (debug.value) console.log('deleteAssets', result)
  }, () => mineLoading.value = false)

  return {
    checkUser,
    getAssets,
    createAssets,
    updateAssets,
    deleteAssets,
    mineToken,
    assets,
  }
})