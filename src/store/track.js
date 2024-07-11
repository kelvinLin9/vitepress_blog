import { defineStore } from "pinia";
import conf from "../config/config";
import utils from "../plugins/utils";
import { useAuthStore } from "./auth";
import { useWebChatStore } from "./webchat";
import { computed, watch } from "vue";


const formatKeyName = (appId, bid) => `sys-log-${appId.replace(/\./g, '')}-${bid.replace(/\./g, '')}`;

const shouldTrack = (appId, bid) => {
  console.log('shouldTrack', appId, bid);
  const oldDate = localStorage.getItem(formatKeyName(appId, bid));
  console.log('oldDate', oldDate, !utils.isInLastMinutes(oldDate));
  return !utils.isInLastMinutes(oldDate);
};


const buildPayload = (appinfo, bid, source, device, isAuthenticated, uid) => ({
  App: appinfo,
  Meta: {
    Date: utils.currentTime(),
    Source: source,
    User: { Uid: isAuthenticated ? uid : null },
    Device: device,
    Page: { Page: `page://${conf.TRACK_PAGE}` },
  },
});

export const useTrackStore = defineStore("track", () => {
  const authStore = useAuthStore();
  const webmmsStore = useWebChatStore();

  const pageParams = computed(() => ({
    bid: webmmsStore.regInfo?.DDN || '',
    source: conf.TRACK_SOURCE,
    appinfo: {
      product: conf.TRACK_SOURCE,
      app_id: '',
      docs: '',
    },
  }));

  const track = async () => {
    if (!conf.ENABLE_TRACK) return;

    const { appinfo, bid, source } = pageParams.value;
    if (!shouldTrack(appinfo.app_id, bid)) return;

    try {
      const device = await utils.deviceInfo();
      const payload = buildPayload(appinfo, bid, source, device, authStore.isAuthenticated, authStore.Uid);

      // console.log('params', pageParams.value);
      console.log('track payload', payload);
      // console.log(conf.TRACK)
      const reply = await webmmsStore.mcSend(conf.TRACK.MMA, conf.TRACK.TOPIC.LOG, payload);
      // console.log(reply)
      if (reply) {
        const result = utils.resultHandle(reply);
        // console.log('result', result);
        if (result.ErrMsg === 'OK') {
          console.log(appinfo.app_id)
          localStorage.setItem(formatKeyName(appinfo.app_id, bid), utils.currentDate(true));
        } else {
          console.log(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { 
    track 
  };
});