import axios from 'axios';
import { Toast } from "../mixins/sweetAlert"
import conf from "../config/config";
// device detector
import DeviceDetector from 'device-detector-js';


const deviceInfo = async() => {
  console.log(typeof window)
  if (typeof window !== 'undefined') {
    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;
    const device = deviceDetector.parse(userAgent);
    console.log(device);
    const result = {};
    result.model = device.device.model;
    result.brand = device.device.brand;
    result.type = device.device.type;
    result.os_name = device.os.name;
    result.os_platform = device.os.platform;
    result.os_version = device.os.version;
    result.browser_name = device.client.name;
    result.browser_version = device.client.version;
    result.browser_engine = device.client.engine;
    result.browser_engine_version = device.client.engineVersion;
    // result.isMobile = device.device.isMobile;
    // result.isTablet = device.device.isTablet;
    // result.isDesktop = device.device.isDesktop;
  
    console.log(result)
    let getIP = await axios.get('https://jsonip.com/');
    if(getIP.status == 200)
      result.IP = getIP.data.ip;
    return result;
  }
}


const makeId = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const isInLastMinutes = (start) => {
  if (!start) return false;

  const startTime = new Date(start).getTime();
  const currentTime = Date.now();
  const oneMinuteInMillIs = 60 * 1000;

  // 檢查startTime是否是有效的日期
  if (isNaN(startTime)) return false;
  return (currentTime - startTime) <= oneMinuteInMillIs;
}
const currentDate = (iso) => {
  const now = new Date();
  if (!iso) {
    // return YYYY-MM-DD 
    return now.toISOString().split('T')[0];
  } else {
    // return ISO
    return now.toISOString();
  }
}
const currentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是從0開始的
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const resultHandle = (res) => {
  if (res.err !== '') {
    return res.err;
  }
  let result = res.reply;
  if (typeof result === 'string') {
    return result;
  } else if (Array.isArray(result)) {
    result = result[0];
  }
  if (typeof result === 'object' && result !== null) {
    if (result.Reply === '') {
      result = result.IN && result.IN.State ? result.IN.State : '';
    } else {
      result = result.Reply || result;
    }
  }
  return result;
}
const versionToNumber = (versionStr) => {
  const parts = versionStr.split(".");
  return parseInt(parts[0]) * 10000 + parseInt(parts[1]) * 100 + parseInt(parts[2]);
}
const handleImg = (val) => {
  const imgUrl = new URL(`../assets/images/${val}`, import.meta.url);
  return imgUrl;
}
const copyText = async (msg) => {
  if (!msg) {
    return;
  }
  try {
    await navigator.clipboard.writeText(msg);
    Toast.fire({
      title: 'Copied!',
      icon: 'success',
    })
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

// tickets
const tickets = new Map()
const addTickets = () => {
  const ticketId = makeId(6);
  const ticket = {
    id: ticketId,
    timestamp: Date.now(),
  };
  tickets.set(ticketId, ticket);
  setTimeout(() => {
    if (tickets.has(ticketId)) {
      tickets.delete(ticketId);
    }
  }, conf.TICKET_EXPIRY_DURATION + 3000);

  return ticket;
};

// error handling
const showErrorToast = (message, code) => {
  Toast.fire({
    title: message || 'An unknown error occurred',
    Text: code || '',
    icon: 'error',
  });
};
const withAsyncErrorHandling = (targetFunction, finallyCallback) => {
  return async (...args) => {
    try {
      return await targetFunction(...args);
    } catch (error) {
      console.error('Error occurred:', error);
      showErrorToast(error);
      return false;
    } finally {
      if (finallyCallback) {
        finallyCallback();
      }
    }
  };
}

// web API




export default {
  deviceInfo,
  makeId,
  isInLastMinutes,
  currentDate,
  currentTime,
  resultHandle,
  versionToNumber,
  handleImg,
  copyText,

  tickets,
  addTickets,

  showErrorToast,
  withAsyncErrorHandling,
}
