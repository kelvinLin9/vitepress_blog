import configLab from './lab-jstory-site.json';
import configApps from './apps-jstory-site.json';

// const viteSiteConfig = import.meta.env.VITE_SITE_CONFIG

let siteConfig = {};
switch (false) {
  case 'lab-jstory-site.json':
    // console.log('lab-jstory-site', configLab);
    siteConfig = configLab;
    break;
  case 'apps-jstory-site.json':
    // console.log('apps-jstory-site', configApps);
    siteConfig = configApps;
    break;
  default:
    siteConfig = configApps;
    // siteConfig = configApps;
    // console.log('apps-jstory-site', configApps);
    break;
}

const config = {
  "version": "0.5.4",
  "baseURL": siteConfig.BASE_URL || "/",
  "default_story": "jujue",
  "default_image": "https://picsum.photos/900/1600?image=",
  "DEFAULT_AVATAR": "https://i.pravatar.cc/150?img=",
  "wsurl": "https://ws1.ypcloud.com",
  "OBJ_STORE": ">svc/OBJSTORE",
  "LOGIN_URL": siteConfig.VUE_LOGIN_URL || "https://account.ypcloud.com/auth/verify/?ReturnURL=",
  "LOGOUT_URL": siteConfig.VUE_LOGOUT_URL || "https://account.ypcloud.com/auth/logout/?ReturnURL=https://git.page/jstory",

  "EI_NAME_PREFIX": "wbJSTORY",
  "EI_TYPE": ".web",
  "ENABLE_TRACK": siteConfig.TRACK.ENABLE || 1,
  "TRACK_PAGE": "jstory",
  "TRACK_SOURCE": "jstory",
  
  "TICKET_EXPIRY_DURATION": 3000,

  "TRACK": siteConfig.TRACK,
  "STORY": siteConfig.STORY,
  "WEBCAST": siteConfig.WEBCAST,
  "NEARBY": siteConfig.NEARBY,
  "COMM": siteConfig.COMM,
  "GN_MOD": siteConfig.GN_MOD,
  "GN_POST": siteConfig.GN_POST,
  "GN_GN": siteConfig.GN_GN,
  "S3": siteConfig.S3,
  "MINE": siteConfig.MINE,
};
export default config;

