import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    r && setInterval(async () => {
      // 检查更新，如果vite.config.ts配置为autoUpdate，此操作将直接触发更新，并刷新页面激活更新
      await r.update()
    }, 30000)
  },
})









// // update script

// const getHtml = async () => {
//   return await fetch('/').then(res => res.text())
// }

// const parserScript = (html) => {
//   const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/ig)
//   return html.match(reg)
// }

// let flag = true
// const compare = (oldArr, newArr) => {
//   const base = oldArr.length
//   const arr = Array.from(new Set(oldArr.concat(newArr)))
//   console.log(arr.length !== base)
//   // console.log(oldArr, newArr, arr.length, base, flag)
//   if (arr.length !== base && flag) {
//       flag = false
//     if (window.confirm('App有更新，是否立即刷新?')) {
//       window.location.reload();
//     }
//   }
// }

// let oldScript = null
// const init = async () => {
//   const html = await getHtml()
//   oldScript = parserScript(html)
// }

// init()

// setInterval(async () => {
//   const newHtml = await getHtml()
//   const newScript = parserScript(newHtml)
//   compare(oldScript, newScript)
// }, 30000)