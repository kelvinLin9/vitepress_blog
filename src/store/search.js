import { defineStore } from "pinia";
import { ref, computed } from "vue";
// import { useRouter } from "vue-router";
// import { usejStoryDataStore } from './jStoryData';
import { useWebChatStore } from "./webchat"
import { useNearbyStore } from "./nearby";
// import { usePlayerStore } from "./player"
import { Toast } from '../mixins/sweetAlert';
import utils from "../plugins/utils";
import axios from "axios";



export const useSearchStore = defineStore("searchStore", () => {
  // const jStoryDataStore = usejStoryDataStore();
  // const playerStore = usePlayerStore();
  // const router = useRouter();
  const webChatStore = useWebChatStore();
  const nearbyStore = useNearbyStore();
  const resultHandle = utils.resultHandle;

  const searchData = ref([]);
  const searchText = ref("");
  const searchHistory = ref([]);
  const searchCategory = ref("title");
  const chatMode = ref(false);
  const total = ref(0);
  const searchLoading = ref(false);
  const showSearchHistory = ref(false);
  const searchDialog = ref(false);
  const chatData = ref([]);

  const searchInputHandle = async () => {
    // searchText.value = searchText.value.trim()
    if(searchText.value.length === 0) return
    if (chatMode.value) {
      // searchLoading.value = true
      // chatData.value.push({ from: 'user', msg: searchText.value })
      // await chatGPT(searchText.value)
      await chat(searchText.value)
      searchText.value = ""
      searchLoading.value = false
    } else {
      const prefixPatterns = {
        "page://": () => { 
          const sanitizedString = searchText.value.replace('page://', '')
          const newUrl = `https://git.page/${sanitizedString}`
          window.open(newUrl, '_blank')
        },
        "//": () => {
          const sanitizedString = searchText.value.replace('//', '')
          const newUrl = `https://git.page/${sanitizedString}`
          window.open(newUrl, '_blank')
        },
        "##": async() => {
          // const sanitizedString = searchText.value.replace('##', '').toLocaleLowerCase()
          // searchLoading.value = true
          // let payload = { "filter": [ {"tags": sanitizedString} ] };
          // console.log(payload)
          // const res = await jStoryDataStore.getBrickDataByTags(payload)
          // if (res) router.push({name: 'brick', params: {brickName: sanitizedString}})

          // playerStore.isFullScreen = res
          // jStoryDataStore.brickMode = res
          // searchLoading.value = false

        },
        "%%": () => {
          // 
        },
        "^^": () => {
          //
        },
        ">>": () => {
          // 
        },
        "@@": () => {
          return
          const sanitizedString = searchText.value.replace('@@', '').toLocaleLowerCase()
          nearbyStore.nearbyChatDialog = true
          console.log(sanitizedString, nearbyStore.nearbyChatDialog)

          webChatStore.sendPubData.to = sanitizedString
          webChatStore.sendPubData.group = 'bot'


          // getBotMMA(sanitizedString)
          // webChatStore.sendPubData.mma = item.token.mma
          // 去要mma
        },
        "/": () => {
          console.log('searchDialog')
        },
      }
    
      let prefixHandled = false
      for (const [prefix, action] of Object.entries(prefixPatterns)) {
        if (searchText.value.startsWith(prefix)) {
          action()
          prefixHandled = true
          break
        }
      }
  
      if (!prefixHandled) {
        const lowerCaseValue = searchText.value.toLowerCase()
        const parts = lowerCaseValue.split('.')
        const format = parts.at(-1)
        const input = searchText.value.replace(`.${format}`, '')
        // searchLoading.value = true
        const dotActions = {
          "story": async () => {
            // jStoryDataStore.chapter = 1
            // searchDialog.value = !await jStoryDataStore.getjStoryModeData(input);
            // router.push({name: 'story', params: {storyName: input}})
            // searchLoading.value = false
            // console.log(searchDialog.value)
          },
          "brick": async() => {
            // let payload = { "filter": [ {"tags": input} ] };
            // const res = await jStoryDataStore.getBrickModeData(input);
            // if (res) {
            //   playerStore.isFullScreen = true;
            // }
            // searchLoading.value = false;
          },
          "shop": async() => {
            const newUrl = `https://apps.shoppu.tv/shop/${input}.shop`
            window.open(newUrl, '_blank')
          },
          //
        };
    
        const hasDot = searchText.value.includes('.')
        if (hasDot) {
          if(dotActions[format]) {
            dotActions[format]()
          } else {
            Toast.fire({
              title: 'Format不存在，請重新輸入',
              icon: 'error',
            })
          }
        } else {
          Toast.fire({
            title: '無效指令，請重新輸入',
            icon: 'error',
          })
          searchLoading.value = false
        }
      }
  
      searchCache()
      
    }
  }
  
  const getBotMMA = async(name) => {
    const payload = {
      "type": "bot",
      "name": name
    }
    try {
      let reply = await webChatStore.mcSend(
        ">hub/look",
        `look://mote`,
        payload
      )
      if(reply) {
        const result = resultHandle(reply)
        if(result) { 
          console.log(result)
        }else {
          console.log(result)
        }
      }
    }catch (err) {
      console.log(err)
    }
  }

  const searchCache = async() => {
    // console.log(searchText.value)
    if (!searchHistory.value.includes(searchText.value)) {
      searchHistory.value.unshift(searchText.value)
      if (searchHistory.value.length > 10) {
        searchHistory.value.pop()
      }
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
    searchText.value = ""
  }


  const getSearchHistory = () => {
    searchHistory.value = JSON.parse(localStorage.getItem('searchHistory')) || []
  }

  const deleteSearchHistory = (index) => {
    searchHistory.value.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
  };

  const searchHistoryFilter = computed(() => {
    return searchHistory.value.filter((item) => {
      return item.match(searchText.value)
    }) 
  });

  const chat = async(message) => {
    console.log("chat")
      try {
        let reply = await webChatStore.mcSend(
            ">gn/worker/gnchat-app",
            `gn://bible`,
            message || "Hello"
        )
        if(reply) {
          const result = resultHandle(reply)
          if(result) { 
            console.log(result.Data)
            chatData.value.push({ from: 'AI', msg: result.Data })

            // this.angleSearchData = result.Data
          }else {
            console.log(result)
          }
        }
      }catch (err) {
        console.log(err)
    }
  }

  // const chatGPT = async(message) => {
  //   console.log("chatGPT", searchText.value)
  //   axios.post('https://story-demo-mongo.onrender.com/openai/generate',
  //     {
  //       "messages": JSON.stringify(message)
  //     }
  //   ).then((res) => {
  //     console.log(res)
  //     console.log(res.data.response.message.content)
  //     chatData.value.push({ from: 'AI', msg: res.data.response.message.content })
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  const chatGPT = async (message) => {
    try {
      const res = await axios.post('https://story-demo-mongo.onrender.com/openai/generate', {
        messages: JSON.stringify(message),
      });
      chatData.value.push({ from: 'AI', msg: res.data.response.message.content });
      console.log(res.data.response);
    } catch (err) {
      console.log("axios.post error", err);
    }
  };
  


  const handleEnterKey = (event) => {
    if (!event.isComposing) {
      searchInputHandle()
    }
  }








  return {
    searchData,
    searchText,
    searchHistory,
    searchCategory,
    chatMode,
    total,
    searchLoading,
    showSearchHistory,
    searchHistoryFilter,
    searchDialog,

    searchCache,
    searchInputHandle,
    getSearchHistory,
    deleteSearchHistory,
    handleEnterKey,

    chatData,
    chat,
    chatGPT,

  }
});

