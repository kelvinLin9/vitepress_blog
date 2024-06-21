import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Toast } from "../mixins/sweetAlert"
import utils from "../plugins/utils";
import conf from "../config/config";


export const useYoutubeStore = defineStore('YoutubeStore', () =>{

  const player = ref(null);
  const lastVolume = ref(100); 
  const isPlaying = ref(false);
  const isMuted = ref(false);
  const volume = ref(100);
  
  const playPauseIcon = computed(() => isPlaying.value ? 'mdi-pause' : 'mdi-play');
  const muteIcon = computed(() => isMuted.value ? 'volume_off' : 'volume_up');
  
  const togglePlayPause = () => {
    console.log('togglePlayPause')
    isPlaying.value = !isPlaying.value;
    isPlaying.value ? player.value?.playVideo() : player.value?.stopVideo() ;
  }
  
  const stopVideo = () => {
    isPlaying.value = false;
    player.value?.stopVideo()
  }
  
  const adjustVolume = () => {
    if (!isMuted.value) {
      player.value?.setVolume(volume.value);
      lastVolume.value = volume.value;
    }
  }
  
  const toggleMute = () => {
    if (isMuted.value) {
      volume.value = lastVolume.value;
      player.value?.unMute();
    } else {
      lastVolume.value = volume.value;
      volume.value = 0;
      player.value?.mute();
    }
    isMuted.value = !isMuted.value;
  }
  
  const youtubePlayer = ref(null);


  return {
    player,
    isPlaying,
    isMuted,
    volume,
    playPauseIcon,
    muteIcon,
    togglePlayPause,
    stopVideo,
    adjustVolume,
    toggleMute,
    youtubePlayer,
  }
})