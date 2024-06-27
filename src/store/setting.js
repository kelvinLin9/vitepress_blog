import { defineStore } from "pinia"
import { ref } from "vue";
import conf from "../config/config";
import { useAuthStore } from "../store/auth";
import { useMineStore } from "../store/mine";
import utils from "../plugins/utils";

export const useSettingStore =  defineStore("settingStore", () => {  
  const authStore = useAuthStore()
  const mineStore = useMineStore()


  const windowSize = ref({
      x: 0,
      y: 0,
    })
  const xyRatio = ref(0)
  const lastScrollPosition = ref(0)
  const scrolledUp = ref(false) 
  const localPlayerSettings = ref({
      "autoPlay": true,
      "darkMode": false,
      "footerMode": "none",
      "initView": "home",
      "initStory": "default",
      "customStory":"",
      "short": {
        "loopPlayback": 0,
        "muted":false,
      },
      "story": {
        "loopPlaybackAudio": 0,
        "loopPlaybackAlbum": 0,
        "muted":false,
      },
      "stream": {
        "muted":false,
      },
      "prog": {
        "loopPlayback":"repeatAll",
        "loopPlaybackPin":"repeatAll",
        "muted":false,
      },
      "liveview": {
        "loopPlayback": 0,
        "muted":false,
      },
  })
 
  const settingsTemp = JSON.parse(JSON.stringify(localPlayerSettings.value))


  

    const onResize =  () => {
      windowSize.value = { x: window.innerWidth, y: window.innerHeight }
      xyRatio.value = windowSize.value.x / windowSize.value.y
    }   
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (lastScrollPosition.value > currentScrollPosition) {
        if (!scrolledUp.value && lastScrollPosition.value - currentScrollPosition > 20) {
          scrolledUp.value = true;
        }
      } else if (lastScrollPosition.value - currentScrollPosition < -20) {
        scrolledUp.value = false;
      }
      lastScrollPosition.value = currentScrollPosition;
    }
    const hiddenScrollbar =  () => {
      const styleTag = document.createElement('style');
      styleTag.id = 'hide-scrollbar-style';
      styleTag.textContent = `::-webkit-scrollbar { display: none; }`;
      document.head.appendChild(styleTag);
    }
    const removeHiddenScrollbar = () => {
      const styleTag = document.getElementById('hide-scrollbar-style');
      if (styleTag) {
        document.head.removeChild(styleTag);
      }
    }

    const getSettings = async () => {
      console.log(authStore.Uid)
      try {
        const localVersion = JSON.parse(localStorage.getItem('version'));
        console.log(!localVersion, conf.version)
        if (!localVersion || localVersion.version !== conf.version) {
          console.log('Reset local player settings')
          // resetLocalPlayerSettings()
          // localStorage.setItem('jStorySettings', JSON.stringify(localPlayerSettings.value));
          localStorage.setItem('version', JSON.stringify({ version: conf.version }));
        } else {
          const settings = localStorage.getItem('jStorySettings');
          if(settings !== null) {
            localPlayerSettings.value = JSON.parse(settings);
          }
        }
      } catch (error) {
        console.error("Failed to get or set local player settings:", error);
      }
    }

    const resetLocalPlayerSettings = () => {
      localPlayerSettings.value = settingsTemp
    }
    
    return {
      windowSize,
      xyRatio,
      lastScrollPosition,
      scrolledUp,
      localPlayerSettings,

      onResize,
      handleScroll,
      hiddenScrollbar,
      removeHiddenScrollbar,
      getSettings,
      resetLocalPlayerSettings,
    }
  },
);
