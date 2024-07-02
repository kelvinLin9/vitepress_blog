import configLab from './lab-jdocs-site.json';
import configApps from './apps-jdocs-site.json';

// const viteSiteConfig = import.meta.env.VITE_SITE_CONFIG

let siteConfig = {};
switch (false) {
  case 'lab-jdocs-site.json':
    // console.log('lab-jdocs-site', configLab);
    siteConfig = configLab;
    break;
  case 'apps-jdocs-site.json':
    // console.log('apps-jdocs-site', configApps);
    siteConfig = configApps;
    break;
  default:
    siteConfig = configApps;
    // siteConfig = configApps;
    // console.log('apps-jdocs-site', configApps);
    break;
}

const config = {
  "version": "0.0.1",
  "baseURL": siteConfig.BASE_URL || "/",
  "wsurl": "https://ws1.ypcloud.com",
  "OBJ_STORE": ">svc/OBJSTORE",
  "LOGIN_URL": siteConfig.VUE_LOGIN_URL || "https://account.ypcloud.com/auth/verify/?ReturnURL=",
  "LOGOUT_URL": siteConfig.VUE_LOGOUT_URL || "https://account.ypcloud.com/auth/logout/?ReturnURL=https://web.git.page/jdocs",

  "EI_NAME_PREFIX": "wbjDocs-",
  "EI_TYPE": ".web",
  "ENABLE_TRACK": siteConfig.TRACK.ENABLE || 1,
  "TRACK_PAGE": "jdocs",
  "TRACK_SOURCE": "jdocs",
  
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
  "SYS": siteConfig.SYS,
};
export default config;

