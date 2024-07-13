import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Toast } from "../mixins/sweetAlert"
import { useWebChatStore } from './webchat';
import { useAuthStore } from "./auth";
import axios from 'axios';

import utils from "../plugins/utils";
import conf from "../config/config";

const { withAsyncErrorHandling } = utils

export const useDocsStore = defineStore('DocsStore', () =>{
  const webChatStore = useWebChatStore()
  const authStore = useAuthStore()
  
  const docsLoading = ref(false);
  const docsData = ref([])

  // docs
  const getDocs = withAsyncErrorHandling(async() => {
    docsLoading.value = true
    const payload = { "text":  "crm" }
    const reply = await webChatStore.mcSend(
      conf.DOCS.MMA,
      conf.DOCS.TOPIC.DOCS_GET,
      payload,
    );
    const result = utils.resultHandle(reply)
    console.log('getDocs', result)
    if (result?.ErrCode === 0 || result?.ErrMsg === 'OK') {
      // docsState.value = result.result.result
      console.log(result)
      transformData(result.Data.data)
    } else {
      console.error(result?.result?.ErrMsg)
    }
  })

  const getDocsByAgent = withAsyncErrorHandling(async() => {
    // console.log('getDocsByAgent' `>${webChatStore.regInfo.EiName}}`)
    // console.log('getDocsByAgent' `>${webChatStore.regInfo.EiName}@${webChatStore.regInfo.EiUMMA.split(';')[0]}`)
    const ticket = utils.addTickets()
    console.log(webChatStore.regInfo)
    docsLoading.value = true
    const payload = {
      "kind":"docsgirl",
      "text":"crm",
      "EiName":`>${webChatStore.regInfo.EiName}@${webChatStore.regInfo?.EiUMMA?.split(';')[0]}`,
      "ticket":ticket,
    }
    const reply = await webChatStore.mcSend(
      conf.DOCS.MMA,
      conf.DOCS.TOPIC.PORTAL_DOCS,
      payload,
    );
    console.log('getDocsByAgent', reply)
    const result = utils.resultHandle(reply)
    if (result?.result?.ErrCode === 0 || result?.result?.ErrMsg === 'OK') {
      // docsState.value = result.result.result
    } else {
      console.error(result?.result?.ErrMsg)
    }
  })


  async function transformData(data) {
    const transformed = await Promise.all(data.map(async item => {
        const res = await axios.get(item.link);
        return {
            name: item.txt,
            content: res.data
        };
    }));

    console.log(transformed);
    docsData.value = transformed
    return transformed;
}

  return {
    docsLoading,
    docsData,
    getDocs,
    getDocsByAgent,
  }
})