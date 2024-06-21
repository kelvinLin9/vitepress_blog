import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { Toast } from "../mixins/sweetAlert"
import { useWebChatStore } from './webchat';
import utils from "../plugins/utils";
import conf from "../config/config";

export const useNearbyStore = defineStore('nearbyStore', () => {
  const webChatStore = useWebChatStore()

  // v-data-table
  const search = ref('')
  const headers = ref([
    { key: 'group', title: 'Type', sortable: false, width: '50px' },
    { key: 'status', title: 'Status', sortable: false, width: '20px'},
    { key: 'name', title: 'Name'},
    { key: 'actions', title: 'Actions', sortable: false,  width: '100px'},
  ])

  const typeList = ref(['ss', 'bot', 'web', 'mote', 'agent', 'qbix', 'cam', 'others'])
  const selectedList = ref(['all', 'favorite', 'my', 'public'])
  const selected = ref('all')
  const nearbyLoading = ref(false);
  const nearbyChatDialog = ref(false);
  const nearbyList = ref([]);
  const nearbyGroup = ref('ss');

  const nearbyData = computed(() => {
    switch (nearbyGroup.value) {
      case 'web':
        return webChatStore.webChatSubList;
      // case 'type2':
        // return calculateListType2();
      // case 'type3':
        // return calculateListType3();
      default:
        console.log('nearbyData', nearbyList.value)
        return nearbyList.value;
    }
  });
  



  const getNearbyIcon = (group) => {
    const typeMap = {
      "ss": "jujue-icons/ss.png",
      "bot": "jujue-icons/bot.png",
      "web": "jujue-icons/web.png",
      "mote": "jujue-icons/mote.png",
      "agent": "jujue-icons/agent.png",
      "qbix": "jujue-icons/qbix.png",
      "sys": "jujue-icons/sys.png",
    }
    const imgName = typeMap[group];
    if (imgName) {
      return utils.handleImg(imgName)
    } else {
      return utils.handleImg(imgName)
    }
  }
  // 寫作group，讀作type
  const handleNearbyGroup = async (group) => {
    // console.log('group', group);
    const groupMap = {
      "ss": async () => {
        await getNearbyMoteList('ss');
      },
      "bot": async () => {  
        await getNearbyMoteList('bot');
      },
      "web": async () => { 
        await webChatStore.getSubList();
      },
      "mote": async () => { 
        await getNearbyMoteList('mote');
      },
      "agent": async () => { 
        await getNearbyMoteList('agent');
      },
      "qbix": async () => { 
        await getNearbyQBixList('qbix');
      },
      "cam": async () => { 
        await getNearbyMoteList('cam');
      },
      "others": async () => { 
        //
      }
    };
    const action = groupMap[group];
    if (action) {
      try {
        await action();
      } catch (error) {
        console.error('Error executing action for group:', group, error);
      }
    } else {
      Toast.fire({
        title: 'No action defined for group: ' + group,
        icon: 'error',
      })
    }
  };
  
  const getNearbyMoteList = utils.withAsyncErrorHandling(async(group) => {
    nearbyLoading.value = true;
    nearbyList.value = [];
    const payload = {
      "fields": {"group": `${group}`},
      "filters": {
        "limit": {"first": 0, "num": 1000},
        "sortBy": {"field": "timestamp", "sort": "DESC"}
      },
    };
    const reply = await webChatStore.mcSend(
      conf.NEARBY.MMA_MOTEC,
      conf.NEARBY.TOPIC.RC_SEARCH,
      payload,
    );
    const result = utils.resultHandle(reply);
    if (result.ErrCode === 0 || result.ErrMsg === 'OK') {
      nearbyList.value = normalizeNearbyData(result.Data.data);
    } else {
      throw new Error(result.ErrMsg || result);
    }
  }, () => nearbyLoading.value = false);


  const getNearbyQBixList = utils.withAsyncErrorHandling(async (group) => {
    nearbyLoading.value = true;
    nearbyList.value = [];
    const payload = {
      "fields": {"group": `${group}`},
      "filters": {
        "limit": {"first": 0, "num": 1000},
        "sortBy": {"field": "timestamp", "sort": "DESC"}
      },
    };
    const reply = await webChatStore.mcSend(
      conf.NEARBY.MMA_QBIXC,
      conf.NEARBY.TOPIC.RC_SEARCH,
      payload,
    );
    const result = utils.resultHandle(reply);
    if (result.ErrCode === 0 || result.ErrMsg === 'OK') {
      nearbyList.value = normalizeNearbyData(result.Data.data);
    } else {
      throw new Error(result.ErrMsg || result);
    }
  }, () => nearbyLoading.value = false);
  

  // 之後看能不能移出去 
  const normalizeNearbyData = (data) => {
    return data.map(item => {
      if (!item.name) {
        item.name = item.key;
      }
      return {
        ...item,
        from: item.name,
        isPin: false,
        isGroup: false,
        isMaster: false,
        info: []
      };
    });
  }


  // for ss test
  // const addSSDemo = async () => {
  //   const ssDemo = {
  //     "token": {
  //       "mma": ">demo@ss"
  //     },
  //     "ddn": "*s8UOK3E",
  //     "name": "Demo",
  //     "type": ".tv",
  //     "tag": "#6D16",
  //     "group": "ss",
  //     "key": "*demo-ss",
  //     "loc": "25.033493,121.564101",
  //     "right": {},
  //     "value": "",
  //     "listKey": "",
  //     "itemKey": "ss_*demo-ss",
  //     "chatid": "",
  //     "geo": ",",
  //     "timestamp": 1650861896169,
  //     "update_time": 1651036173467,
  //     "from": "Demo",
  //     "isPin": false,
  //     "isGroup": false,
  //     "isMaster": false,
  //     "info": []
  // }
  //   nearbyList.value.unshift(ssDemo)
  // }



  // add self group
  // const myGroup = ref(new Map())
  // const newGroupName = ref('');

  // const createGroup = () => {
  //   if (newGroupName.value.trim()) {
  //     const newGroup = {
  //       id: utils.makeId(6),
  //       name: newGroupName.value,
  //       data: []
  //       };
  //       myGroup.value.push(newGroup);
  //       newGroupName.value = '';
  //       saveToLocalStorage();
  //     }
  //   };

  // const archiveData = async (group) => {
  //   const dataToArchive = await fetchData();
  //   group.data.push(...dataToArchive);
  //   saveToLocalStorage();
  // };
  // const saveToLocalStorage = () => {
  //   localStorage.setItem('groups', JSON.stringify(myGroup.value));
  // };

  


  return {
    search,
    headers,
    typeList,
    selectedList,
    selected,
    nearbyLoading,
    nearbyChatDialog,
    nearbyList,
    nearbyGroup,
    nearbyData,
    // myGroup,

    getNearbyMoteList,
    getNearbyIcon,
    handleNearbyGroup,
  }
},
{ 
  persist: {
    key: 'nearby',
    paths: ['nearbyGroup', 'selected', 'myGroup'],
    storage: localStorage,
  } ,
})