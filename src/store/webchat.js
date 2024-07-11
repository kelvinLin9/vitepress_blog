import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { open, reg, set, send, call, pub, sub, subList, getxs, setxs } from '../modules/webmms'
import { getRegProp, saveRegProp } from '../modules/webmms/regmc.js'
import { useNearbyStore } from './nearby.js'
import { useUploadStore } from './upload.js'
import { Toast } from "../mixins/sweetAlert"
import utils from "../plugins/utils";
// import { withAsyncErrorHandling, showErrorToast } from "../plugins/utils";
import conf from "../config/config";


const MAX_MSGSTORE_LENGTH = 200
const MAX_PUBSTORE_LENGTH = 200
const MAX_SUBSTORE_LENGTH = 200

export const useWebChatStore = defineStore('webChatStore', () =>{
  const nearbyStore = useNearbyStore()
  const uploadStore = useUploadStore()

  const wsOpened = ref(false);
  const wsErr = ref('');
  const wsState = ref('');
  const mcState = ref('');
  const regInfo = ref({
    "EiName": "",
    "EiType": conf.EI_TYPE,
    "EiTag": "",
    "EiLoc":"",
    "EiToken": "",
    "SToken": "",
  });
  const appState = ref('');
  const wsMsgStore = ref([]);
  const wsPubStore = ref([]);
  const wsSubStore = ref([]);
  const wsMsg = ref([]);
  const debug = ref(true);



  const wsOpen = async (url) => {
      try {
        if (!wsOpened.value) {
          const res = await open(url, (type, msg, cb) => {
            if (type === 'state') {
              if(debug.value) console.log('webChat: state: %o', msg);
              wsState.value = msg;
            } else if (type === 'message') {
              if(debug.value) console.log('webChat: message: %o', msg);
              handleXMsg(msg)



              // if (msg.ctl.To.Topic === 'note://miki') wsMsgStore.value.push(msg);
              // if (wsMsgStore.value.length > MAX_MSGSTORE_LENGTH) wsMsgStore.value.shift()
              if (typeof cb === 'function') cb({"ErrCode":0, "ErrMsg":"OK"});
            } else if (type === 'pubmsg') {
              if(debug.value) console.log('webchat: pubmsg: %o', msg)
              wsPubStore.value.push(msg);
              if (wsPubStore.value.length > MAX_PUBSTORE_LENGTH) {
                wsPubStore.value.shift();
              }
              // 送到＃的訊息自己也會拿到一份，要濾掉
              handlePubMsg({
                "group": "web", // 要想辦法改動態變數
                "from": msg.body.payload.from,
                "to": msg.body.topic,
                "msg": msg.body.payload.msg,
                // "checked": true, // 接收方不用checked
              }, 'GET')
            } else if (type === 'submsg') {
              if(debug.value) console.log('webchat: submsg: %o', msg)
              if (wsSubStore.value.length > MAX_SUBSTORE_LENGTH) {
                wsSubStore.value.shift();
              }
              wsSubStore.value.push(msg);
              getSubList()
            }
          });
          if(debug.value) console.log('webChat: wsOpen open result=%o', res);
          if (res.state === 'connected') {
            wsState.value = 'connected';
            wsOpened.value = true;
            let ret = await mcReg(regInfo.value);
            return ret;
          } else if (res.state === 'disconnected'){
            if(debug.value) console.log('webmms: ws: wsOpen disconnected');

          } else {
            return {"ErrCode": -254, "ErrMsg": `ws: ${res.state}`};
          }
        }
      } catch (err) {
        if(debug.value) console.log('webChat: wsOpen %s', err.message);
        return {"ErrCode": -254,"ErrMsg": `open: ${err.message}`};
      }
  };
  const mcReg = async (info) => {
    if(debug.value) console.log(info)
    try {
      if (mcState.value === 'ok') {
        return {"ErrCode": 0, "ErrMsg": "OK"};
      } else {
        if (!wsErr.value) {
          if(debug.value) console.log('webChat: mcReg start');
          const res = await reg(info);
          if(debug.value) console.log('webChat: mcReg result=', res);
          if (res.ErrCode === 0 && res.result) {
            regInfo.value = res.result;
            mcState.value = 'ok';
            return {"ErrCode": 0, "ErrMsg": "OK", "result": res.result};
          } else {
            mcState.value = res.ErrMsg;
            return res;
          }
        } else {
          return {"ErrCode": -254, "ErrMsg": `ws: ${wsErr.value}`};
        }
      }
    } catch (err) {
      if(debug.value) console.log('webchat: mcReg %s', err.message);
      return {"ErrCode": -254, "ErrMsg": `reg: ${err.message}`};
    }
  };
  // custom
  const mcSet = async (info) => {
    try {
      let eInfo = info || regInfo.value;
      if (!wsErr.value) {
        if(debug.value) console.log('webchat: mcSet start');
        const res = await set(eInfo);
        if(debug.value) console.log('webchat: mcSet result=', res);
        if (res.ErrCode === 0 && res.result) {
          const { EiName, EiType, EiTag } = res.result;
          regInfo.value = { ...regInfo.value, EiName, EiType, EiTag };
          return {"ErrCode": 0, "ErrMsg": "OK", "result": res.result};
        } else {
          return res;
        }
      } else {
        return {"ErrCode": -254, "ErrMsg": `ws: ${wsErr.value}`};
      }
    } catch (err) {
      if(debug.value) console.log('webchat: mcSet %s', err.message);
      return {"ErrCode": -254, "ErrMsg": `set: ${err.message}`};
    }
  };
  const mcSend = async (ddn, topic, data, t1, t2) => {
    try {
      if (!wsErr.value) {
        const res = await send(ddn, topic, data, t1, t2);
        return res;
      } else {
        return {"ErrCode": -254, "ErrMsg": `ws: ${wsErr.value}`};
      }
    } catch (err) {
      if(debug.value) console.log('webchat: mcSend %s', err.message);
      return {"ErrCode": -254, "ErrMsg": `send: ${err.message}`};
    }
  };
  const mcCall = async (ddn, topic, func, data, t1, t2) => {
    try {
      if (!wsErr.value) {
        const res = await call(ddn, topic, func, data, t1, t2);
        return res;
      } else {
        return {"ErrCode": -254, "ErrMsg": `ws: ${wsErr.value}`};
      }
    } catch (err) {
      if(debug.value) console.log('webchat: call %s', err.message);
      return {"ErrCode": -254, "ErrMsg": `send: ${err.message}`};
    }
  };
  const wsPub = async (topic, payload) => {
    try {
      if (!wsErr.value) {
        const res = await pub(topic, payload);
        if(debug.value) console.log('webchat wsPub send result=%s', JSON.stringify(res));
        if (!res.err && topic.charAt(0) !== '#') {
          wsPubStore.value.push({"func":"pub", "body":{"topic":topic, "payload":payload}});
          if (wsPubStore.value.length > MAX_PUBSTORE_LENGTH) {
            wsPubStore.value.shift();
          }
        }
        return res;
      } else {
        return {"ErrCode": -254, "ErrMsg": `ws: ${wsErr.value}`};
      }
    } catch (err) {
      if(debug.value) console.log('webchat: wsPub %s', err.message);
      return {"ErrCode": -254, "ErrMsg": `pub: ${err.message}`};
    }
  }; 
  const wsSub = async (topic) => {
    try {
      if (!wsErr.value) {
        const res = await sub(topic);
        return res;
      } else {
        return {"ErrCode": -254, "ErrMsg": `ws: ${wsErr.value}`};
      }
    } catch (err) {
      if(debug.value) console.log('webchat: wsSub %s', err.message);
      return {"ErrCode": -254, "ErrMsg": `sub: ${err.message}`};
    }
  };


  const getConfig = async (catalog, IDname) => {
    try {
      if (!wsErr.value) {
        const res = await getxs(catalog, IDname);
        return res;
      } else {
        return {"ErrCode": -254, "ErrMsg": `ws: ${wsErr.value}`};
      }
    } catch (err) {
      if(debug.value) console.log('webchat: getConfig %s', err.message);
      return {"ErrCode": -254, "ErrMsg": `get: ${err.message}`};
    }
  };
  const setConfig = async (catalog, IDname, data) => {
    try {
      if (!wsErr.value) {
        const res = await setxs(catalog, IDname, data);
        return res;
      } else {
        return {"ErrCode": -254, "ErrMsg": `ws: ${wsErr.value}`};
      }
    } catch (err) {
      if(debug.value) console.log('webchat: setConfig %s', err.message);
      return {"ErrCode": -254, "ErrMsg": `set: ${err.message}`};
    }
  };
  const saveEi = (eInfo) => {
    let ret = saveRegProp(eInfo);
    return ret;
  };
  const setAppState = (newState) => {
    appState.value = newState;
  };







  // custom
  const startMMS = async() => {
    setAppState('open')
    const res = await wsOpen(conf.wsurl)
    console.log('app open webmms result=%o', res)
    regInfo.value = res.result
    if (res.ErrCode === 0) {
      if (regInfo.value.EiName === '') {
        console.log('app open webmms no EiName')
        regInfo.value.EiName = 'wbJSTORY-' + Math.random().toString(36).substring(2, 8)
      } 
      const res = await mcSet(regInfo.value)
      console.log('mcSet result=%o', res)
      if (res.ErrCode === 0) {
        setAppState('reg ok', res)
      } else {
        setAppState(res.ErrMsg)
      }
    } else {
      setAppState(res.ErrMsg)
    }
  
    // if (res.ErrCode === 0) {
    //   console.log(res.result.EiTag)
    //   console.log(regInfo.value.EiTag)
  
    //   // let ei = webChatStore.getSavedEi()
    //   // if (reged.EiName !== ei.EiName || reged.EiTag !== ei.EiTag || reged.EiType !== ei.EiType){
    //   //   setAppState('set')
    //   //   let sret = await mcSet(ei)
    //   //   if (sret.ErrCode === 0) setAppState('set ok')
    //   // }
      
    // }
    // else {
    //   setAppState(res.ErrMsg)
    // }
  }
  const appReady = async () => {
    try {
      if (regInfo.value) {
        let { EiName, EiTag } = regInfo.value;
        if (!EiName && !EiTag) {
          if(debug.value) console.log('home appReady no EiName and EiTag');
        } else {
          if (EiName) {
            let rSetName = await wsSub(EiName); 
            if(debug.value) console.log('home appReady sub %s result=%o', EiName, rSetName);
          }
          if (EiTag) {
            let tagArr = EiTag.split(',');
            for (let i = 0; i < tagArr.length; i++) {
              let rSetTag = await wsSub(tagArr[i].trim());
              if(debug.value) console.log('home appReady sub %s result=%o', tagArr[i], rSetTag);
            }
          }
        }
      }
    } catch (err) {
      if(debug.value) console.log('home appReady: %s', err.message);
    }
  };


  // who is
  const whoIs = async () => {
    try {
      let reply = await mcSend(
        conf.SYS.MMA,
        conf.SYS.TOPIC.IN_LOCAL,
        {"cmd": "whois"}
      )
      if(reply) {
        const result = utils.resultHandle(reply)
        if(result) { 
          console.log(result.result.EiMMA)
          regInfo.value.EiUMMA = result.result.EiMMA
        }else {
          console.log(result)
        }
      }
    }catch (err) {
      console.log(err)
    }
  }



  // web chat
  const webChatSubList = ref([])
  const chatTabList = ref(['fav', 'home', 'office', 'group1', 'web'])
  const chatTab = ref('webchat')

  // 要渲染的對話陣列 改成在 nearbyStore 整合數據
  // name缺失 要改用key嗎
  const webChatMsg = computed(() => {
    if(debug.value) console.log(sendPubData.value.to, nearbyStore.nearbyData)
    // const index = nearbyStore.nearbyData.findIndex((item) => item.from.toLowerCase() === sendPubData.value.to.toLowerCase())
    const index = nearbyStore.nearbyData.findIndex((item) => item.from === sendPubData.value.to)
    if(debug.value) console.log(index)
    if (index !== -1) {
      return nearbyStore.nearbyData[index].info
    } else {
      return nearbyStore.nearbyData[0]?.info
    }
  })
  const sendPubData = ref({
    "mma": "",
    "key": "",
    "group": "",
    "from": "",
    "to": "",
    "msg": "",
    "time": ""
  })
  const webChatLoading = ref(false)
  const showChatList = ref(true)




  const getSubList = async () => {
    try {
      let res = await subList();
      // console.log('home getWSSubList result=%o', res);
      if (!res.err) {
        if (res.reply.ErrCode === 0 && res.reply.Result.length > 0) {
          webChatSubList.value.info = [];
          res.reply.Result.forEach((item) => {  
            // 處裡回傳大小寫問題
            const existingIndex = webChatSubList.value.findIndex((cell) => cell.from.toLowerCase() === item.toLowerCase());
            if (existingIndex === -1) {
              let cell = { 
                "type": conf.EI_TYPE,
                "from": item,
                "name": item,
                "key": item,
                "group": "web",
                "status": "online",
                "isPin": false,
                "isGroup": false,
                "isMaster": false,
                "info": [] 
              };
              webChatSubList.value.push(cell);
            }
          });
          
          if(debug.value) console.log('home getWSSubList webChatSubList=%o', webChatSubList.value);
        } else {
          if(debug.value) console.log('home getWSSubList: %s', res.reply.ErrMsg);
        }
      }
    } catch (err) {
      if(debug.value) console.log('home getWSSubList: %s', err.message);
    }
  };

  // The starting point for all msg!!
  const handlePubMsg = async (msgWrap, option) => {
    if(debug.value) console.log(msgWrap, option);
    if(!msgWrap.id)msgWrap.id = utils.makeId(6)
    msgWrap.time = new Date().toLocaleString('zh-TW', {
      hour12: false,
    })

    if (option === 'GET') {
      if (msgWrap.from === regInfo.value.EiName) return // 自己發的已經處理過了 要濾掉
      if (msgWrap.to[0] === '#') {
        const index = nearbyStore.nearbyData.findIndex((item) => item.from.toLowerCase() === msgWrap.to.toLowerCase())
        if(debug.value) console.log(index)
        if (index !== -1) {
          nearbyStore.nearbyData[index].info.push(msgWrap)
          if(debug.value) console.log(sendPubData.value.to)
          if (sendPubData.value.to !== msgWrap.to) {
            Toast.fire({
              title: `${msgWrap.from} &rArr; ${msgWrap.to}`,
              text: msgWrap.msg,
              icon: 'info',
            })
          }
        }
      } else {
        const index = nearbyStore.nearbyData.findIndex((item) => item.from.toLowerCase() === msgWrap.from.toLowerCase())
        // if(debug.value) console.log(index, msgWrap)
        // if(debug.value) console.log(nearbyStore.nearbyData)
        if (index !== -1) {
          nearbyStore.nearbyData[index].info.push(msgWrap)
          // if(debug.value) console.log(sendPubData.value.to)
          // if(debug.value) console.log(nearbyStore.nearbyData[index].info)
          // 現在會有大小寫不一致的問題 先硬改小寫
          if (sendPubData.value.to.toLowerCase() !== msgWrap.from.toLowerCase()) {
            Toast.fire({
              title: msgWrap.from,
              text: msgWrap.msg,
              icon: 'info',
            })
          }
        }
      }
    } else if (option === 'SEND') {
      const index = nearbyStore.nearbyData.findIndex((item) => item.from.toLowerCase() === msgWrap.to.toLowerCase())
      if(debug.value) console.log(index)
      if (index !== -1) {
        nearbyStore.nearbyData[index].info.push(msgWrap)
      }
    }
  }

  const markPubMsgChecked = (mma, id) => {
    console.log(mma, id)
    const nearbyDataIndex = nearbyStore.nearbyData.findIndex((item) => item.token?.mma === mma)
    console.log(nearbyDataIndex)
    if (nearbyDataIndex !== -1) {
      const infoIndex = nearbyStore.nearbyData[nearbyDataIndex].info.findIndex((item) => item.id === id)
      console.log(nearbyStore.nearbyData[nearbyDataIndex].info[infoIndex])
      if (infoIndex !== -1) {
        nearbyStore.nearbyData[nearbyDataIndex].info[infoIndex].checked = true
      }
    }
  }

  const handleEnterKey = (event) => {
    if (!event.shiftKey) {
      event.preventDefault();
      sendMoteMsg(sendPubData.value.group);
    }
  }
  

  // send msg
  const sendMoteMsg = async(group) => {
    console.log(sendPubData.value)
    if (sendPubData.value.msg === "") return
    if (sendPubData.value.msg.startsWith('/')){
      const res = handleCommand(sendPubData.value.msg.split(' ')[0].toLowerCase(), group)
      console.log(res)

      handlePubMsg({
        "id": "",
        "group": group,
        "from": sendPubData.value.to,
        "to": regInfo.value.EiName,
        "msg": res,
        "checked": false,
      }, 'GET')
      sendPubData.value.msg = ""


    } else {
      const groupMap = {
        "ss": async () => {
          sendSSMsg(sendPubData.value.msg, group, sendPubData.value.mma, sendPubData.value.key)
        },
        "bot": async () => {
          sendBotMsg({
            "EiName": `>${regInfo.value.EiName}@jj`,
            "text": sendPubData.value.msg
          },
          group,
          sendPubData.value.mma)
        },
        "web": async () => {
          sendWebPub(group)
        },
        "mote": async () => {
          Toast.fire({ 
            title: "還沒寫",
            icon: 'error',
          })
        },
        "agent": async () => {
          sendAgentMsg({
            "ticket": utils.addTickets(),
            "kind": 'yt',
            "EiName": `>${regInfo.value.EiName}@jj`,
            "text": sendPubData.value.msg
          },
          group,
          sendPubData.value.mma)
        },
        "qbix": async () => {
          Toast.fire({ 
            title: "還沒寫",
            icon: 'error',
          })
        }
      }
      const action = groupMap[group];
      if (action) {
        try {
          await action();
        } catch (error) {
          console.error('Error executing action for group:', group, error);
        }
      } else {
        Toast.fire({
          title: 'No action defined for type: ' + group,
          icon: 'error',
        })
      }
    }
  }

  const sendWebPub = async(group) => {
    let topic = sendPubData.value.to
    let payload = {"msg": sendPubData.value.msg, "from": regInfo.value.EiName}
    if(debug.value) console.log('home sendMoteMsg topic=%s payload=%o', topic, JSON.stringify(payload))
    
    let res = await wsPub(topic, payload)
    if(debug.value) console.log('home sendMoteMsg result=%o', JSON.stringify(res))
    if (res.err === '') {
      handlePubMsg({
        "group": group,
        "from": regInfo.value.EiName,
        "to": sendPubData.value.to,
        "msg": sendPubData.value.msg,
        "checked": false,
      }, 'SEND')
      console.log('home sendMoteMsg success')
      sendPubData.value.msg = ""
    } else {
      if(debug.value) console.log('home sendMoteMsg error=%s', res.err)
    }
  }


  const sendSSMsg = utils.withAsyncErrorHandling(async (payload, group, token, key) => {
    console.log(payload, group, token, key);
    const mma = `>${key}@${token}`;
    if (!mma) {
      utils.showErrorToast(new Error('Not Find MMA'));
      return;
    }
    const id = utils.makeId(6);
    handlePubMsg({
      "id": id,
      "group": group,
      "from": regInfo.value.EiName,
      "to": sendPubData.value.to,
      "msg": sendPubData.value.msg,
      "checked": false,
    }, 'SEND');
  
    webChatLoading.value = true;
    console.log(mma);
    let reply = await mcSend(
      mma,
      "ss://tv", // topic 現在可以不寫
      payload
    );
    console.log(reply);
    markPubMsgChecked(mma, id);
    const result = utils.resultHandle(reply);
    if (result.ErrMsg === 'OK' || result.ErrCode === 0) {
      handlePubMsg({
        "id": id,
        "group": group,
        "from": sendPubData.value.to,
        "to": regInfo.value.EiName,
        "msg": result.ErrMsg,
        "checked": false,
      }, 'GET');
    } else {
      handlePubMsg({
        "id": id,
        "group": 'sys',
        "from": sendPubData.value.to,
        "to": regInfo.value.EiName,
        "msg": result.ErrMsg,
        "checked": false,
      }, 'GET');
    }
    sendPubData.value.msg = "";
  }, () => webChatLoading.value = false);


  // const sendSSMsg = async(payload, group, token, key) => {
  //   console.log(payload, group, token, key)
  //   const mma = `>${key}@${token}`
  //   if (!mma) {
  //     Toast.fire({
  //       title: '沒有MMA',
  //       icon: 'error',
  //     })
  //     // sendPubData.value.msg = ""
  //     // return
  //   }
  //   const id = utils.makeId(6)
  //   handlePubMsg({
  //     "id": id,
  //     "group": group,
  //     "from": regInfo.value.EiName,
  //     "to": sendPubData.value.to,
  //     "msg": sendPubData.value.msg,
  //     "checked": false,
  //   }, 'SEND')
  //   webChatLoading.value = true
  //   console.log(mma)
  //   try {
  //     let reply = await mcSend(
  //         // ">demo@ss",
  //         // ">p22/ss/ss-app",
  //         mma,
  //         "ss://tv", // topic 現在可以不寫
  //         payload
  //     )
  //     if(reply) {
  //       console.log(reply)
  //       markPubMsgChecked(mma, id)
  //       const result = utils.resultHandle(reply)
  //       if (result.ErrMsg) {
  //         handlePubMsg({
  //           "id": id,
  //           "group": group,
  //           "from": sendPubData.value.to,
  //           "to": regInfo.value.EiName,
  //           "msg": result.ErrMsg,
  //           "checked": false,
  //         }, 'GET')
  //       }


  //       sendPubData.value.msg = ""
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     Toast.fire({
  //       title: err,
  //       icon: 'error',
  //     })
  //     return false
  //   } finally {
  //     webChatLoading.value = false
  //   }
  // }

  const sendAgentMsg = async(payload, group, mma) => {
    console.log(payload)
    if (!mma) {
      Toast.fire({
        title: '沒有MMA',
        icon: 'error',
      })
      // sendPubData.value.msg = ""
      // return
    }
    webChatLoading.value = true
    setTimeout(() => {
      webChatLoading.value = false
      console.log(XMsgBox.value)
      console.log(XMsgBox.value.get(payload.ticket.id))
      if (XMsgBox.value.get(payload.ticket.id)) {
        handlePubMsg({
          "id": id,
          "group": group,
          "from": sendPubData.value.to,
          "to": regInfo.value.EiName,
          "msg": XMsgBox.value.get(payload.ticket.id),
          "checked": false,
        }, 'GET')
      }
    }, conf.TICKET_EXPIRY_DURATION)

    const id = utils.makeId(6)
    handlePubMsg({
      "id": id,
      "group": group,
      "from": regInfo.value.EiName,
      "to": sendPubData.value.to,
      "msg": sendPubData.value.msg,
      "checked": false,
    }, 'SEND')
    try {
      let reply = await mcSend(
        // ">ioc/qbix/qx-susanchen-sllljvsn-cast-app",
        ">hub/cast",
        conf.WEBCAST.TOPIC.WEB_CAST,
        payload
      )
      if(reply) {
        console.log(reply)
        markPubMsgChecked(mma, id)
        // const result = utils.resultHandle(reply)
        // if (result.ErrMsg) {
        //   handlePubMsg({
        //     "id": id,
        //     "group": group,
        //     "from": sendPubData.value.to,
        //     "to": regInfo.value.EiName,
        //     "msg": result.ErrMsg,
        //     "checked": false,
        //   }, 'GET')
        // }


        sendPubData.value.msg = ""
      }
    } catch (err) {
      console.log(err);
      Toast.fire({
        title: err,
        icon: 'error',
      })
      return false
    }
  }

  const sendBotMsg = async(payload, group, mma) => {
    console.log(payload, mma)
    if (!mma) {
      Toast.fire({
        title: '沒有MMA',
        icon: 'error',
      })
      // sendPubData.value.msg = ""
      // return
    }
    webChatLoading.value = true
    // setTimeout(() => {
    //   webChatLoading.value = false
    //   console.log(XMsgBox.value)
    //   if (XMsgBox.value.get(payload.ticket.id)) {
    //     handlePubMsg({
    //       "id": id,
    //       "group": group,
    //       "from": sendPubData.value.to,
    //       "to": regInfo.value.EiName,
    //       "msg": 'Timeout',
    //       "checked": false,
    //     }, 'GET')
    //   }
    // }, conf.TICKET_EXPIRY_DURATION)

    const id = utils.makeId(6)
    handlePubMsg({
      "id": id,
      "group": group,
      "from": regInfo.value.EiName,
      "to": sendPubData.value.to,
      "msg": sendPubData.value.msg,
      "checked": false,
    }, 'SEND')
    try {
      let reply = await mcSend(
        // ">q11/qbix/qx-fbuilder-8193-app",
        mma,
        conf.WEBCAST.TOPIC.WEB_CAST,
        payload
      )
      if(reply) {
        console.log(reply)
        markPubMsgChecked(mma, id)
        webChatLoading.value = false
        const result = utils.resultHandle(reply)
        console.log(result)
        if (result.ErrCode === 0 || result.ErrMsg === 'OK') {
          handlePubMsg({
            "id": id,
            "group": group,
            "from": sendPubData.value.to,
            "to": regInfo.value.EiName,
            "msg": result.Data,
            "checked": false,
          }, 'GET')
        } else { 
          Toast.fire({
            title: result.ErrMsg,
            icon: 'error',
          })
        }


        sendPubData.value.msg = ""
      }
    } catch (err) {
      console.log(err);
      Toast.fire({
        title: err,
        icon: 'error',
      })
      return false
    }
  }




  // command
  const handleCommand = (msg, group) => {
    console.log(msg, group)
    const groupMap = {
      "ss": () => {
        console.log('ss', commandMap[group][msg])
        return commandMap[group][msg]
      },
      "bot": async () => {
        //
      },
      "web": async () => {
        //
      },
      "mote": async () => {
        //
      },
      "agent": async () => {
        //
      },
      "qbix": async () => {
        //
      }
    }
    const action = groupMap[group];
    if (action) {
      try {
        return action();
      } catch (error) {
        console.error('Error executing action for command:', msg, error);
      }
    } else {
      Toast.fire({
        title: 'No action defined for command: ' + msg,
        icon: 'error',
      })
    }
  }

  const commandMap = {
    "ss": {
  "/help": `
  | # | Command   | Description                      |
  |---|-----------|----------------------------------|
  | 1 | Drop      | Show image or video on screen    |
  | 2 | Notify    | Show a notification message      |
  | 3 | Toast     | Show a toast message             |
  | 4 | Marquee   | Show a marquee text              |
  | 5 | Text      | Show text to screen              |
  | 6 | App       | Show a website on screen         |
  | 7 | Touch     | Control screen                   |
  | 8 | Status    | Show status of screen            |
  `,
      "/t": `# hi`
    },
    "bot": {
      "/help": ``,
    }
  }    


  // handleXMsg

  const XMsgBox = ref(new Map())
  const sendUseTime = async (time, id) => {
    const payload = {
      "type": "message",
      "content": time > 3000 ? `docs://get ${id} ${time} high` : `docs://get ${id} ${time}`
    }
    try {
      const res = await mcSend(
        conf.COMM.MMA,
        conf.COMM.TOPIC.SEND_TG,
        payload
      )
      return res
    } catch (error){
      console.log('sendUseTime error', error)
    }
  }
  const handleXMsg = (msg) => {
    console.log('XMsg', msg.data.Data)
    if (msg.data.ErrCode !== 0) {
      Toast.fire({
        title: msg.data.ErrCode,
        text: msg.data.ErrMsg,
        icon: 'error',
      });
      return;
    }
    // 現在回傳的跟jstory結構不一樣 要再討論
    const ticketId = msg.data.Data.envelope.ticket.id;
    const ticket = utils.tickets.get(ticketId);
    const useTime = Date.now() - ticket.timestamp;
    sendUseTime(useTime, ticket.id);
    console.log('Ticket:', ticket, 'Use time:', useTime);
    if (!ticket) {
      Toast.fire({
        title: `無此ticket或ticket已過期: ${ticketId}`,
        icon: 'error',
      });
      return;
    }
    // 未來要處理多個來源的情況
    if (useTime < 3000) {
      XMsgBox.value.set(ticketId, msg.data.Data.content) 
      if (XMsgBox.value.length === 0) {
        Toast.fire({
          title: `ticket${ticketId}無資料`,
          icon: 'error',
        });
        return;
      }
    }
  }





return {
  wsOpened,
  wsErr,
  wsState,
  mcState,
  regInfo,
  appState,
  wsMsgStore,
  wsPubStore,
  wsMsg,

  wsOpen,
  mcReg,
  mcSet,
  mcSend,
  mcCall,
  wsPub,
  wsSub,

  getConfig,
  setConfig,
  saveEi,
  setAppState,

  // init
  startMMS,
  appReady,

  // who is
  whoIs,

  // web chat
  webChatSubList,
  sendPubData,
  webChatLoading,
  webChatMsg,
  showChatList,
  chatTabList,
  chatTab,

  getSubList,
  handlePubMsg,
  sendMoteMsg,
  handleEnterKey,

  // handleXMsg
  XMsgBox,
};
},
{ 
persist: {
  key: 'regInfo',
  paths: ['regInfo.EiName', 'regInfo.EiTag', 'regInfo.EiType', 'regInfo.EiLoc', 'regInfo.EiToken', 'regInfo.SToken'],
  storage: localStorage,
} ,
})