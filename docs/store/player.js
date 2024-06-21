import { defineStore } from "pinia"
import { ref, computed, watch, onUnmounted } from 'vue'
import Hls from 'hls.js'
import { usejStoryDataStore } from "./jStoryData"
import { useSettingStore } from "./setting"

export const usePlayerStore = defineStore('playerStore', () => {
  const jStoryDataStore = usejStoryDataStore()
  const settingStore = useSettingStore()

  const isjStoryPlay = ref(false)
  const isjStoryPlayPin = ref(true)
  const isFullScreen = ref(false)
  const isPin = ref(false)
  const showVolumeIcon = ref(false)
  const showShare = ref(false)
  const showBackIcon = ref(false)
  const showInfo = ref(false)
  const showMenu = ref(false)
  const showInfoTV = ref(false)
  const shortPlayCount = ref(0)
  const storyPlayCount = ref(0)

  const isVideoLoop = computed(() => { 
    if(jStoryDataStore.jStoryType === 'short') {
      if(settingStore.localPlayerSettings.short.loopPlayback > 0) {
        return false
      }
      return true 
    }
    return false
  })
  const isAudioLoop = computed(() => { 
    if(jStoryDataStore.jStoryType === 'podcast') {
      return settingStore.localPlayerSettings.prog.loopPlayback === 'repeatOne' 
    } else if (jStoryDataStore.jStoryType === 'photos') {
      if(settingStore.localPlayerSettings.story.loopPlaybackAudio > 0) {
        return false
      }
      return true
    } else if (jStoryDataStore.jStoryType === 'stream') {
      return true      
    } else {
      return true
    }
  })
  const isAudioLoopPin = computed(() => { 
    if(jStoryDataStore.jStoryTypePin === 'podcast') {
      return true 
    } else if (jStoryDataStore.jStoryTypePin === 'photos') {
      return true
    } else if (jStoryDataStore.jStoryTypePin === 'stream') {
      return true      
    } else {
      return true
    }
  })



  const audioPinRefs = ref(null)
  const audioRefs = ref(null)
  const videoRefs = ref(null)
  const jStoryVideoRefs = ref(null)
  const ytPlayerRefs = ref(null)
  const duration = ref(0)
  const durationVideo = ref(0)
  const durationPin = ref(0)
  const timer = ref(0)
  const timerVideo = ref(0)
  const timerPin = ref(0)
  const currentTime = ref(0)
  const currentTimeVideo = ref(0)
  const currentTimePin = ref(0)
  const percentage = ref(0)
  const percentageVideo = ref(0)
  const percentagePin = ref(0)
  const playbackRates = ref([1.0, 1.5, 2.0, 3.0, 0.5])
  const playbackRatesPin = ref([1.0, 1.5, 2.0, 3.0, 0.5])
  const currentRateIndex = ref(0)
  const currentRateIndexPin = ref(0)
  const shuffle = ref(false)
  const shufflePin = ref(false)
  const nowPlayIndexX = ref(0)
  const nowPlayIndexY = ref(0)  
  const nowPlayIndexXPin = ref(0)
  const nowPlayIndexYPin = ref(0)
  const swiperXRefs = ref([])
  const swiperYRefs = ref(null)

  // muted
  const isAudioMuted = ref(false)
  const isVideoMuted = ref(false)
  const isAudioMutedPin = ref(false)


  // 清理計時器
  const cleanup = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
    if (timerVideo.value) {
      clearInterval(timerVideo.value);
      timerVideo.value = null;
    }
    if (timerPin.value) {
      clearInterval(timerPin.value);
      timerPin.value = null;
    }
  };

  // 當 store 被銷毀時執行清理
  onUnmounted(cleanup);









  watch(showMenu, (n) => {
    console.log('isAudioMuted', n)
  }, {deep: true})
  // stream
  const hls = ref(null)

  // yt
  const autoplayTimeY = computed(() => {
    // console.log(jStoryDataStore.jStoryType, settingStore.localPlayerSettings.liveTV.loopPlayback > 0)
    switch (jStoryDataStore.jStoryType) {
      case 'livetv':
        return settingStore.localPlayerSettings.liveview.loopPlayback > 0 ? settingStore.localPlayerSettings.liveview.loopPlayback*1000 : 90000000
      case 'liveview':
        return settingStore.localPlayerSettings.liveview.loopPlayback > 0 ? settingStore.localPlayerSettings.liveview.loopPlayback*1000 : 90000000;
      default:
        return 90000000;
    }
  });
  const autoplayTimeX = computed(() => {
    switch (jStoryDataStore.jStoryType) {
      case 'photos':
        return settingStore.localPlayerSettings.story.loopPlaybackAlbum > 0 ? settingStore.localPlayerSettings.story.loopPlaybackAlbum*1000 : 90000000
      default:
        return 90000000;
    }
  });

  watch (isAudioMuted, (newVal) => {
    if(newVal) {
      if(audioRefs.value) {
        audioRefs.value.muted = true
      }
      if(audioPinRefs.value) {
        audioPinRefs.value.muted = false
      }
    } else {
      if(audioRefs.value) {
        audioRefs.value.muted = false
      }
      if(audioPinRefs.value) {
        audioPinRefs.value.muted = true
      }
    }
  })
  
  watch (isVideoMuted, (newVal) => {
    if(newVal) {
      if(videoRefs?.value[0]) {
        videoRefs.value[0].muted = true
      }
      if(audioPinRefs.value) {
        audioPinRefs.value.muted = false
      }
    } else {
      if(videoRefs?.value[0]) {
        videoRefs.value[0].muted = false
      }
      if(audioPinRefs.value) {
        audioPinRefs.value.muted = true
      }
    }
  })






  const changeAudioCurrentTime = () => {
    currentTime.value = parseInt(percentage.value * 0.01 * duration.value)
    console.log(currentTime.value, audioRefs.value.currentTime)
    audioRefs.value.currentTime = currentTime.value
  }  
  const changeAudioCurrentTimePin = () => {
    currentTimePin.value = parseInt(percentagePin.value * 0.01 * durationPin.value)
    audioPinRefs.value.currentTime = currentTimePin.value
  }
  const changeVideoCurrentTime = () => {
    currentTimeVideo.value = parseInt(percentageVideo.value * 0.01 * durationVideo.value)
    console.log(currentTimeVideo.value, videoRefs.value[0].currentTime)
    videoRefs.value[0].currentTime = currentTimeVideo.value
  }
  
  const fastForward = (sec) => {
    audioRefs.value.currentTime = currentTime.value + sec
  }
  const fastRewind = (sec) => {
    audioRefs.value.currentTime = currentTime.value - sec
  }
  const nextEpX = () => {
    swiperXRefs.value[nowPlayIndexY.value].slideNext(500)
  }
  const prevEpY = () => {
    // swiperYRefs.value.slideNext()
    if(nowPlayIndexY.value > 0) {
      nowPlayIndexY.value -= 1
    } else {
      nowPlayIndexY.value = jStoryDataStore.jStoryPlaylist.length - 1
    }
    jStoryDataStore.getjStoryData(nowPlayIndexY.value)
    console.log(nowPlayIndexY.value , jStoryDataStore.jStoryPlaylist)
  } 
  const nextEpY = () => {
    if(nowPlayIndexY.value < jStoryDataStore.jStoryPlaylist.length - 1) {
      nowPlayIndexY.value += 1
    } else {
      nowPlayIndexY.value = 0
    }
    jStoryDataStore.getjStoryData(nowPlayIndexY.value)
    console.log(nowPlayIndexY.value , jStoryDataStore.jStoryPlaylist)
  } 
  const prevEpYPin = () => {
    // swiperYRefs.value.slideNext()
    if(nowPlayIndexYPin.value > 0) {
      nowPlayIndexYPin.value -= 1
    } else {
      nowPlayIndexYPin.value = jStoryDataStore.jStoryPlaylistPin.length - 1
    }
    jStoryDataStore.getjStoryDataPin(nowPlayIndexYPin.value)
    console.log(nowPlayIndexYPin.value , jStoryDataStore.jStoryPlaylist)
  } 
  const nextEpYPin = () => {
    if(nowPlayIndexYPin.value < jStoryDataStore.jStoryPlaylistPin.length - 1) {
      nowPlayIndexYPin.value += 1
    } else {
      nowPlayIndexYPin.value = 0
    }
    jStoryDataStore.getjStoryDataPin(nowPlayIndexYPin.value)
    console.log(nowPlayIndexYPin.value , jStoryDataStore.jStoryPlaylist)
  }      
  const changePlaybackRate = () => {
    currentRateIndex.value = (currentRateIndex.value + 1) % playbackRates.value.length
    audioRefs.value.playbackRate = playbackRates.value[currentRateIndex.value]
  }


  const nextEpShuffle = () => {
    console.log('nextEpShuffle')
    let randomIndex
    if (jStoryDataStore.jStoryProgData.length === 1) {
        randomIndex = 0;
    } else {
      do {
          randomIndex = Math.floor(Math.random() * jStoryDataStore.jStoryProgData.length);
      } while (randomIndex === nowPlayIndexX.value);
    }
    swiperXRefs.value[nowPlayIndexY.value].slideTo(randomIndex, 500)
  }




  const handleVideoLoopPlayback = () => {
    if (jStoryDataStore.jStoryType === 'short' && settingStore.localPlayerSettings.short.loopPlayback > 0 ) {
      if(isFullScreen.value === true) {
        shortPlayCount.value += 1
        if (shortPlayCount.value >= settingStore.localPlayerSettings.short.loopPlayback) {
          console.log('該換頁了')
          shortPlayCount.value = 0
          swiperYRefs.value.slideNext()
        } else {
          console.log('繼續播')
          videoRefs.value[0].play()
        }
      } else {
        console.log('繼續播')
        shortPlayCount.value = 0
        videoRefs.value[0].play()
      }
    }
  }
  const handleAudioLoopPlayback = () => {
    if (jStoryDataStore.jStoryType === 'photos') {
      handleStoryLoopPlayback()   
    } else if (jStoryDataStore.jStoryType === 'podcast') {
      handlePodcastPlayback()
    }
  }
  const handleStoryLoopPlayback = () => {
    console.log('handleStoryLoopPlayback', isAudioLoop.value)
    if (settingStore.localPlayerSettings.story.loopPlaybackAudio > 0) {
      if(isFullScreen.value === true) {
        storyPlayCount.value += 1
        if (storyPlayCount.value >= settingStore.localPlayerSettings.story.loopPlaybackAudio) {
          console.log('該換頁了')
          storyPlayCount.value = 0
          swiperYRefs.value.slideNext()
        } else {
          console.log('繼續播')
          audioRefs.value.play()
        
        }
      } else {
        console.log('繼續播')
        storyPlayCount.value = 0
        audioRefs.value.play()
      }
    }
  }
  const handlePodcastPlayback = () => {
    console.log('該換頁了')
    if (settingStore.localPlayerSettings.prog.loopPlayback === 'repeatAll') {
      swiperXRefs.value[nowPlayIndexY.value].slideNext(500)
    } else if (settingStore.localPlayerSettings.prog.loopPlayback === 'shuffle') {
      console.log('shuffle')
      nextEpShuffle()
    }
  }





  const handleAudioLoopPlaybackPin = () => {
    if (jStoryDataStore.jStoryTypePin === 'photos') {
      handleStoryLoopPlaybackPin()   
    } else if (jStoryDataStore.jStoryTypePin === 'podcast') {
      handlePodcastPlaybackPin()
    }
  }
  const handleStoryLoopPlaybackPin = () => {
    // console.log('handleStoryLoopPlayback', isAudioLoop.value)
    // if (settingStore.localPlayerSettings.story.loopPlaybackAudio > 0) {
    //   if(isFullScreen.value === true) {
    //     storyPlayCount.value += 1
    //     if (storyPlayCount.value >= settingStore.localPlayerSettings.story.loopPlaybackAudio) {
    //       console.log('該換頁了')
    //       storyPlayCount.value = 0
    //       swiperYRefs.value.slideNext()
    //     } else {
    //       console.log('繼續播')
    //       audioRefs.value.play()
        
    //     }
    //   } else {
    //     console.log('繼續播')
    //     storyPlayCount.value = 0
    //     audioRefs.value.play()
    //   }
    // }
  }
  const handlePodcastPlaybackPin = () => {
    console.log('該換頁了')
    // if (settingStore.localPlayerSettings.prog.loopPlayback === 'repeatAll') {
    //   swiperXRefs.value[nowplayIndexY.value].slideNext(500)
    // } else if (settingStore.localPlayerSettings.prog.loopPlayback === 'shuffle') {
    //   console.log('shuffle')
    //   nextEpShuffle()
    // }
  }





 // PodcastPlayMode
  const podcastPlayModes = ["repeatOne", "repeatAll", "shuffle"];
  function togglePodcastPlayMode() {
    const currentIndex = podcastPlayModes.indexOf(settingStore.localPlayerSettings.prog.loopPlayback);
    const nextIndex = (currentIndex + 1) % podcastPlayModes.length;
    settingStore.localPlayerSettings.prog.loopPlayback = podcastPlayModes[nextIndex];
    console.log(settingStore.localPlayerSettings.prog.loopPlayback)
  }
  const podcastPlayModeIcon = computed(() => {
    switch (settingStore.localPlayerSettings.prog.loopPlayback) {
      case "repeatOne":
        return "mdi-repeat-once";
      case "repeatAll":
        return "mdi-repeat";
      case "shuffle":
        return "mdi-shuffle-variant";
      default:
        return "mdi-repeat";
    }
  })



  const getAudioInfo = () => {
    // console.log('getAudioInfo', audioRefs.value) 
    if (jStoryDataStore.jStoryType !== 'stream') {
      setTimeout(() => {
        // console.log('getAudioInfo', audioRefs.value) 
        jStoryDataStore.detailLoading = false
        duration.value = Math.floor(audioRefs.value.duration)
        audioRefs.value.playbackRate = playbackRates.value[currentRateIndex.value]
        audioRefs.value.volume = 0.5
        if (isjStoryPlay.value) {
          audioRefs.value.play()
          isjStoryPlay.value = true
        }
        if (isPin.value) {
          audioRefs.value.muted = isAudioMuted.value
        } else {
          audioRefs.value.muted = false
          isAudioMuted.value = false
        }
      },300)
      timer.value = setInterval(() => {
        currentTime.value = Math.floor(audioRefs.value?.currentTime)
        percentage.value = Math.floor(currentTime.value * 100 / duration.value)
      },1000)        
    } else {
      console.log('stream')
      playStream()
    }
  }

  const audioCanplay = () => {
    duration.value = Math.floor(audioRefs.value.duration)
  }
  const audioCanplayPin = () => {
    durationPin.value = Math.floor(audioPinRefs.value.duration)
  }
  const videoCanplay = () => {
    durationVideo.value = Math.floor(videoRefs.value[0].duration)
  }
  const getVideoInfo = () => {
    // console.log('getVideoInfo', videoRefs.value[0].src) 
    setTimeout(() => {
      jStoryDataStore.detailLoading = false
      durationVideo.value = Math.floor(videoRefs.value[0].duration)
      videoRefs.value[0].playbackRate = playbackRates.value[currentRateIndex.value]
      videoRefs.value[0].volume = 0.5
      if (settingStore.localPlayerSettings.autoPlay) {
        videoRefs.value[0].play()
        isjStoryPlay.value = true
      }
      if (isPin.value) {
        videoRefs.value[0].muted = true
      } else {
        videoRefs.value[0].muted = false
        audioRefs.value.pause()
      }
    },100)
    timerVideo.value = setInterval(() => {
      currentTimeVideo.value = Math.floor(videoRefs.value[0].currentTime)
      percentageVideo.value = Math.floor(currentTimeVideo.value * 100 / durationVideo.value)
    },1000) 
  }

  const getAudioInfoPin = () => {
    console.log('getAudioInfoPin', audioPinRefs.value.src)
    if (jStoryDataStore.jStoryTypePin !== 'stream') {
      setTimeout(() => {
        durationPin.value = Math.floor(audioPinRefs.value.duration)
        audioPinRefs.value.playbackRate = playbackRates.value[currentRateIndex.value]
        audioPinRefs.value.volume = 0.5
        if (settingStore.localPlayerSettings.autoPlay) {
          if (isjStoryPlayPin.value) {
            audioPinRefs.value.play()
            isAudioMuted.value = true
            isVideoMuted.value = true
          } else {
            audioPinRefs.value.pause()
          }
        }
      },100)
      timerPin.value = setInterval(() => {
        currentTimePin.value = Math.floor(audioPinRefs.value?.currentTime)
        percentagePin.value = Math.floor(currentTimePin.value * 100 / durationPin.value)
      },1000)        
    } else {
      console.log('stream')
      handleStreamPin(jStoryDataStore.jStoryDataPin.media.audio.url)
    }
  }

  const play = () => {
    if( jStoryDataStore.jStoryType !== 'stream') {
      if(isjStoryPlay.value) {
        audioRefs.value.pause()
        isjStoryPlay.value = false 
      } else {
        audioRefs.value.play()
        isjStoryPlay.value = true
      } 
    } else {
      if(isjStoryPlay.value) {
        // audioPinRefs.value.pause()
        // isjStoryPlay.value = false 
      } else {
        // audioPinRefs.value.play()
        // isjStoryPlay.value = true
      } 
    }
  }
  const playFooter = () => {
    console.log('playFooter', jStoryDataStore.jStoryType)
    if( jStoryDataStore.jStoryType === 'short') {
      if(isjStoryPlay.value) {
        videoRefs.value[0].pause()
        isjStoryPlay.value = false 
      } else {
        videoRefs.value[0].play()
        isjStoryPlay.value = true
      } 
    } else if (jStoryDataStore.jStoryType === 'liveview') {
      if(isjStoryPlay.value) {
        ytPlayerRefs.value.pauseVideo()
        isjStoryPlay.value = false 
      } else {
        ytPlayerRefs.value.playVideo()
        isjStoryPlay.value = true
      } 
    } else {
      if(isjStoryPlay.value) {
        audioRefs.value.pause()
        isjStoryPlay.value = false 
      } else {
        audioRefs.value.play()
        isjStoryPlay.value = true
      } 
    }
  }
  const playFooterPin = () => {
    if(isjStoryPlayPin.value) {
      audioPinRefs.value.pause()
      isjStoryPlayPin.value = false 
    } else {
      audioPinRefs.value.play()
      isjStoryPlayPin.value = true
      isAudioMuted.value = true
      isVideoMuted.value = true
    } 
  }
  const playStream = () => {
    console.log('playStream')
    // console.log(jStoryDataStore.jStoryData.media.audio.url)
    handleStream(jStoryDataStore.jStoryData.media.audio.url)
  }

  const handleStream = (loadSource) => {
    if (hls.value) {
      hls.value.destroy();
    }
    console.log(audioRefs.value)
    const video = audioRefs.value;
    if (Hls.isSupported()) {
      console.log('Hls.isSupported')
      const hls = new Hls();
      hls.loadSource(loadSource);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if(!isPin.value) {          
          video.play()
          isjStoryPlay.value = true
        }
        console.log('Hls.Events')
      });
    } 
  }

  const handleStreamPin = (loadSource) => {
    console.log('handleStreamPin', loadSource)
    if (hls.value) {
      hls.value.destroy();
    }
    const video = audioPinRefs.value;
    if (Hls.isSupported()) {
      console.log('Hls.isSupported')
      const hls = new Hls();
      hls.loadSource(loadSource);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if(isPin.value) {          
          video.play()
          isjStoryPlayPin.value = true
          isAudioMuted.value = true
          isVideoMuted.value = true
        }
      });
    } 
  }

  watch(isAudioMuted, (n) => {
    console.log('isAudioMuted', n)
  })
  watch(isVideoMuted, (n) => {
    console.log('isVideoMuted', n)
  })
  // watch(isAudioMutedPin, (n) => {

  // })



  return {
    isjStoryPlay,
    isFullScreen,
    isAudioMuted,
    isVideoMuted,
    isAudioMutedPin,

    isVideoLoop,
    isAudioLoop,
    isAudioLoopPin,    
    isPin,
    showVolumeIcon,
    showShare,
    showBackIcon,
    showInfo,
    showMenu,
    showInfoTV,
    shortPlayCount,
    storyPlayCount,

    audioPinRefs,
    audioRefs,
    videoRefs,
    jStoryVideoRefs,
    ytPlayerRefs,
    duration,
    timer,
    currentTime,
    percentage,
    playbackRates,
    currentRateIndex,
    shuffle,
    nowPlayIndexX,
    nowPlayIndexY,
    nowPlayIndexXPin,
    nowPlayIndexYPin,
    swiperXRefs,
    swiperYRefs,
    durationPin,
    timerPin,
    currentTimePin,
    percentagePin,
    playbackRatesPin,
    currentRateIndexPin,
    shufflePin,
    isjStoryPlayPin,
    durationVideo,
    timerVideo,
    currentTimeVideo,
    percentageVideo,
    podcastPlayModes,
    podcastPlayModeIcon,
    
    autoplayTimeY,
    autoplayTimeX,

    play,
    playFooter,
    playFooterPin,
    fastForward,
    fastRewind,
    nextEpX,
    prevEpY,
    nextEpY,
    prevEpYPin,
    nextEpYPin,
    changeAudioCurrentTime,
    changeAudioCurrentTimePin,
    changeVideoCurrentTime,
    changePlaybackRate,
    getAudioInfo,
    getVideoInfo,
    getAudioInfoPin,
    handleVideoLoopPlayback,
    handleAudioLoopPlayback,
    handleStoryLoopPlayback,
    handlePodcastPlayback,
    handleAudioLoopPlaybackPin,
    handleStoryLoopPlaybackPin,
    handlePodcastPlaybackPin,
    nextEpShuffle,
    togglePodcastPlayMode,
    audioCanplay,
    audioCanplayPin,
    videoCanplay,


    hls,
    playStream,
    handleStream,

  };


},
{ 
  persist: {
    key: 'jStoryPlayers',
    paths: ['nowPlayIndexY', 'nowPlayIndexX', 'nowPlayIndexYPin', 'nowPlayIndexXPin', 'isAudioMuted', 'isPin'],
    storage: localStorage,
  } ,
}
);

